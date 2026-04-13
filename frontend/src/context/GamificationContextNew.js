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
    condition: (stats) => stats.recipesCreated >= 1
  },
  RECIPE_MASTER: {
    id: 'recipe_master',
    name: 'Recipe Master',
    description: 'Created 10 recipes',
    icon: '👨‍🍳',
    points: 100,
    condition: (stats) => stats.recipesCreated >= 10
  },
  SOCIAL_CHEF: {
    id: 'social_chef',
    name: 'Social Chef',
    description: 'Posted 50 comments',
    icon: '💬',
    points: 75,
    condition: (stats) => stats.commentsPosted >= 50
  },
  FOODIE: {
    id: 'foodie',
    name: 'Foodie',
    description: 'Favorited 25 recipes',
    icon: '❤️',
    points: 60,
    condition: (stats) => stats.favoritesCount >= 25
  },
  EXPLORER: {
    id: 'explorer',
    name: 'Cuisine Explorer',
    description: 'Tried 10 different cuisines',
    icon: '🌍',
    points: 120,
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
    condition: (stats) => stats.recipesCreated >= 1
  },
  STREAK_WEEK: {
    id: 'streak_week',
    name: 'Week Warrior',
    description: 'Logged in for 7 consecutive days',
    icon: '⚡',
    condition: (stats) => stats.streak >= 7
  },
  LEVEL_5: {
    id: 'level_5',
    name: 'Rising Star',
    description: 'Reached level 5',
    icon: '⭐',
    condition: (stats) => stats.level >= 5
  },
  LEVEL_10: {
    id: 'level_10',
    name: 'Cooking Pro',
    description: 'Reached level 10',
    icon: '🏆',
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
      setUserStats(result.profile);
      
      // Check for level up
      if (result.leveledUp) {
        addAchievementUnlocked(`Level ${result.profile.level}`);
      }
    } catch (error) {
      console.error('Error awarding points:', error);
    }
  }, [user, addAchievementUnlocked]);

  // Stat update functions
  const updateRecipesCreated = useCallback((count) => {
    if (!user) return;
    const updatedProfile = gamificationService.updateStats('recipesCreated', count);
    setUserStats(updatedProfile);
  }, [user]);

  const updateCommentsPosted = useCallback((increment) => {
    if (!user) return;
    const newCount = userStats.commentsPosted + increment;
    const updatedProfile = gamificationService.updateStats('commentsPosted', newCount);
    setUserStats(updatedProfile);
  }, [user, userStats.commentsPosted]);

  const updateFavoritesCount = useCallback((count) => {
    if (!user) return;
    const updatedProfile = gamificationService.updateStats('favoritesCount', count);
    setUserStats(updatedProfile);
  }, [user]);

  const updateCuisinesExplored = useCallback((count) => {
    if (!user) return;
    const updatedProfile = gamificationService.updateStats('cuisinesExplored', count);
    setUserStats(updatedProfile);
  }, [user]);

  const updateDietaryPreferences = useCallback((count) => {
    if (!user) return;
    const updatedProfile = gamificationService.updateStats('dietaryPreferences', count);
    setUserStats(updatedProfile);
  }, [user]);

  const updateCommentLikes = useCallback((increment) => {
    if (!user) return;
    const newCount = userStats.commentLikes + increment;
    const updatedProfile = gamificationService.updateStats('commentLikes', newCount);
    setUserStats(updatedProfile);
  }, [user, userStats.commentLikes]);

  // Calculate progress to next level
  const getProgressToNextLevel = () => {
    const currentLevelXP = (userStats.level - 1) * 100;
    const nextLevelXP = userStats.level * 100;
    const progress = userStats.experience - currentLevelXP;
    const total = nextLevelXP - currentLevelXP;
    return Math.min((progress / total) * 100, 100);
  };

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
    BADGES,
    ACHIEVEMENTS,
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
};
