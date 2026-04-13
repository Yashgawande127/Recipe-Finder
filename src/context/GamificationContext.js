import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';
import { gamificationService } from '../services/dataService';

const GamificationContext = createContext();

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

// Badge definitions
export const BADGES = {
  FIRST_RECIPE: {
    id: 'first_recipe',
    name: 'First Recipe',
    description: 'Created your first recipe',
    icon: '🍳',
    points: 50,
    requirement: 1,
    condition: (stats) => stats.recipesCreated >= 1
  },
  RECIPE_MASTER: {
    id: 'recipe_master',
    name: 'Recipe Master',
    description: 'Created 10 recipes',
    icon: '👨‍🍳',
    points: 100,
    requirement: 10,
    condition: (stats) => stats.recipesCreated >= 10
  },
  SOCIAL_CHEF: {
    id: 'social_chef',
    name: 'Social Chef',
    description: 'Posted 50 comments',
    icon: '💬',
    points: 75,
    requirement: 50,
    condition: (stats) => stats.commentsPosted >= 50
  },
  FOODIE: {
    id: 'foodie',
    name: 'Foodie',
    description: 'Favorited 25 recipes',
    icon: '❤️',
    points: 60,
    requirement: 25,
    condition: (stats) => stats.favoritesCount >= 25
  },
  EXPLORER: {
    id: 'explorer',
    name: 'Cuisine Explorer',
    description: 'Tried 10 different cuisines',
    icon: '🌍',
    points: 120,
    requirement: 10,
    condition: (stats) => stats.cuisinesExplored >= 10
  }
};

// Achievement definitions
export const ACHIEVEMENTS = {
  FIRST_RECIPE: {
    id: 'first_recipe_achievement',
    name: 'Welcome Chef!',
    description: 'Created your first recipe',
    icon: '🎉',
    requirement: 1,
    condition: (stats) => stats.recipesCreated >= 1
  },
  STREAK_WEEK: {
    id: 'streak_week',
    name: 'Week Warrior',
    description: 'Logged in for 7 consecutive days',
    icon: '⚡',
    requirement: 7,
    condition: (stats) => stats.streak >= 7
  },
  LEVEL_5: {
    id: 'level_5',
    name: 'Rising Star',
    description: 'Reached level 5',
    icon: '⭐',
    requirement: 5,
    condition: (stats) => stats.level >= 5
  },
  LEVEL_10: {
    id: 'level_10',
    name: 'Cooking Pro',
    description: 'Reached level 10',
    icon: '🏆',
    requirement: 10,
    condition: (stats) => stats.level >= 10
  }
};

export const GamificationProvider = ({ children }) => {
  const { user } = useAuth();
  const { addAchievementUnlocked } = useNotifications();
  
  // User stats
  const [userStats, setUserStats] = useState({
    level: 1,
    experience: 0,
    streak: 0,
    lastActivity: new Date().toISOString(),
    recipesCreated: 0,
    commentsPosted: 0,
    favoritesCount: 0,
    cuisinesExplored: 0,
    dietaryPreferences: 0,
    commentLikes: 0
  });
  
  // Badges and achievements
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [earnedAchievements, setEarnedAchievements] = useState([]);

  // Load gamification profile
  const loadProfile = useCallback(() => {
    if (!user) return;
    
    try {
      const profile = gamificationService.getProfile();
      setUserStats(profile);
    } catch (error) {
      console.error('Error loading gamification profile:', error);
    }
  }, [user]);

  // Load profile when user changes
  useEffect(() => {
    if (user) {
      loadProfile();
    } else {
      setUserStats({
        level: 1,
        experience: 0,
        streak: 0,
        lastActivity: new Date().toISOString(),
        recipesCreated: 0,
        commentsPosted: 0,
        favoritesCount: 0,
        cuisinesExplored: 0,
        dietaryPreferences: 0,
        commentLikes: 0
      });
      setEarnedBadges([]);
      setEarnedAchievements([]);
    }
  }, [user, loadProfile]);

  // Check for new badges
  const checkForNewBadges = useCallback(() => {
    const newBadges = [];
    
    Object.values(BADGES).forEach(badge => {
      if (!earnedBadges.find(earned => earned.id === badge.id) && badge.condition(userStats)) {
        newBadges.push({
          ...badge,
          earnedAt: new Date().toISOString()
        });
      }
    });

    if (newBadges.length > 0) {
      setEarnedBadges(prev => [...prev, ...newBadges]);
      
      // Trigger notifications for new badges
      newBadges.forEach(badge => {
        addAchievementUnlocked(badge.name);
      });
    }
  }, [earnedBadges, userStats, addAchievementUnlocked]);

  // Check for new achievements
  const checkForNewAchievements = useCallback(() => {
    const newAchievements = [];
    
    Object.values(ACHIEVEMENTS).forEach(achievement => {
      if (!earnedAchievements.find(earned => earned.id === achievement.id) && achievement.condition(userStats)) {
        newAchievements.push({
          ...achievement,
          earnedAt: new Date().toISOString()
        });
      }
    });

    if (newAchievements.length > 0) {
      setEarnedAchievements(prev => [...prev, ...newAchievements]);
      
      // Trigger notifications for new achievements
      newAchievements.forEach(achievement => {
        addAchievementUnlocked(achievement.name);
      });
    }
  }, [earnedAchievements, userStats, addAchievementUnlocked]);

  // Check for new badges and achievements
  useEffect(() => {
    if (user) {
      checkForNewBadges();
      checkForNewAchievements();
    }
  }, [user, checkForNewBadges, checkForNewAchievements]);

  const awardPoints = useCallback((points, reason) => {
    if (!user) return;
    
    try {
      const result = gamificationService.awardPoints(points, reason);
      setUserStats(result.gamification || result);
      
      // Check for level up
      if (result.leveledUp) {
        addAchievementUnlocked(`Level ${result.gamification.level}`);
      }
    } catch (error) {
      console.error('Error awarding points:', error);
    }
  }, [user, addAchievementUnlocked]);

  // Stat update functions
  const updateRecipesCreated = useCallback((count) => {
    if (!user) return;
    try {
      const updatedProfile = gamificationService.updateStats('recipesCreated', count);
      setUserStats(updatedProfile);
    } catch (error) {
      console.error('Error updating recipes created:', error);
    }
  }, [user]);

  const updateCommentsPosted = useCallback((increment) => {
    if (!user) return;
    try {
      const newCount = userStats.commentsPosted + increment;
      const updatedProfile = gamificationService.updateStats('commentsPosted', newCount);
      setUserStats(updatedProfile);
    } catch (error) {
      console.error('Error updating comments posted:', error);
    }
  }, [user, userStats.commentsPosted]);

  const updateFavoritesCount = useCallback((count) => {
    if (!user) return;
    try {
      const updatedProfile = gamificationService.updateStats('favoritesCount', count);
      setUserStats(updatedProfile);
    } catch (error) {
      console.error('Error updating favorites count:', error);
    }
  }, [user]);

  const updateCuisinesExplored = useCallback((count) => {
    if (!user) return;
    try {
      const updatedProfile = gamificationService.updateStats('cuisinesExplored', count);
      setUserStats(updatedProfile);
    } catch (error) {
      console.error('Error updating cuisines explored:', error);
    }
  }, [user]);

  const updateDietaryPreferences = useCallback((count) => {
    if (!user) return;
    try {
      const updatedProfile = gamificationService.updateStats('dietaryPreferences', count);
      setUserStats(updatedProfile);
    } catch (error) {
      console.error('Error updating dietary preferences:', error);
    }
  }, [user]);

  const updateCommentLikes = useCallback((increment) => {
    if (!user) return;
    try {
      const newCount = userStats.commentLikes + increment;
      const updatedProfile = gamificationService.updateStats('commentLikes', newCount);
      setUserStats(updatedProfile);
    } catch (error) {
      console.error('Error updating comment likes:', error);
    }
  }, [user, userStats.commentLikes]);

  // Calculate progress to next level
  const getProgressToNextLevel = () => {
    const currentLevelXP = (userStats.level - 1) * 100;
    const nextLevelXP = userStats.level * 100;
    const progress = userStats.experience - currentLevelXP;
    const total = nextLevelXP - currentLevelXP;
    return Math.min((progress / total) * 100, 100);
  };

  // Calculate progress for a specific badge
  const getProgressForBadge = useCallback((badgeId) => {
    const badge = Object.values(BADGES).find(b => b.id === badgeId);
    if (!badge) return 0;

    switch (badgeId) {
      case 'first_recipe':
      case 'recipe_master':
        return userStats.recipesCreated;
      case 'social_chef':
        return userStats.commentsPosted;
      case 'foodie':
        return userStats.favoritesCount;
      case 'explorer':
        return userStats.cuisinesExplored;
      default:
        return 0;
    }
  }, [userStats]);

  // Calculate progress for a specific achievement
  const getProgressForAchievement = useCallback((achievementId) => {
    const achievement = Object.values(ACHIEVEMENTS).find(a => a.id === achievementId);
    if (!achievement) return 0;

    switch (achievementId) {
      case 'first_recipe_achievement':
        return userStats.recipesCreated;
      case 'streak_week':
        return userStats.streak;
      case 'level_5':
      case 'level_10':
        return userStats.level;
      default:
        return 0;
    }
  }, [userStats]);

  const value = {
    userStats,
    earnedBadges,
    earnedAchievements,
    awardPoints,
    updateRecipesCreated,
    updateCommentsPosted,
    updateFavoritesCount,
    updateCuisinesExplored,
    updateDietaryPreferences,
    updateCommentLikes,
    getProgressToNextLevel,
    getProgressForBadge,
    getProgressForAchievement,
    BADGES,
    ACHIEVEMENTS,
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
};
