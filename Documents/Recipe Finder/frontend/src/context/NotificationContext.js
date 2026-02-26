import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { notificationsService } from '../services/dataService';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load notifications from API
  const loadNotifications = useCallback(() => {
    if (!user) return;
    
    try {
      const userNotifications = notificationsService.getNotifications();
      setNotifications(userNotifications);
      const unreadCount = notificationsService.getUnreadCount();
      setUnreadCount(unreadCount);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  }, [user]);

  // Load notifications when user changes
  useEffect(() => {
    if (user) {
      loadNotifications();
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [user, loadNotifications]);

  const addNotification = (notification) => {
    if (!user) return;

    try {
      const newNotification = notificationsService.addNotification(notification);
      setNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  const markAsRead = (notificationId) => {
    if (!user) return;
    
    try {
      notificationsService.markAsRead(notificationId);
      setNotifications(prev => prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = () => {
    if (!user) return;
    
    try {
      notificationsService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const deleteNotification = (notificationId) => {
    if (!user) return;
    
    try {
      notificationsService.deleteNotification(notificationId);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
      setUnreadCount(prev => {
        const deletedNotification = notifications.find(n => n.id === notificationId);
        return deletedNotification && !deletedNotification.read ? Math.max(0, prev - 1) : prev;
      });
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const clearAllNotifications = () => {
    if (!user) return;
    
    try {
      notificationsService.clearAllNotifications();
      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      console.error('Error clearing all notifications:', error);
    }
  };

  // Helper functions for common notification types
  const addCommentReply = (recipeName, commenterName) => {
    addNotification({
      type: 'comment_reply',
      title: 'New Comment Reply',
      message: `${commenterName} replied to your comment on ${recipeName}`,
      icon: '💬'
    });
  };

  const addRecipeLike = (recipeName, likerName) => {
    addNotification({
      type: 'recipe_like',
      title: 'Recipe Liked',
      message: `${likerName} liked your recipe "${recipeName}"`,
      icon: '❤️'
    });
  };

  const addAchievementUnlocked = (achievementName) => {
    addNotification({
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: `You've unlocked the "${achievementName}" achievement`,
      icon: '🏆'
    });
  };

  const addNewFollower = (followerName) => {
    addNotification({
      type: 'new_follower',
      title: 'New Follower',
      message: `${followerName} started following you`,
      icon: '👥'
    });
  };

  const addFavoriteRecipe = (recipeName) => {
    addNotification({
      type: 'favorite_added',
      title: 'Recipe Favorited!',
      message: `"${recipeName}" has been added to your favorites`,
      icon: '❤️'
    });
  };

  const removeFavoriteRecipe = (recipeName) => {
    addNotification({
      type: 'favorite_removed',
      title: 'Favorite Removed',
      message: `"${recipeName}" has been removed from your favorites`,
      icon: '💔'
    });
  };

  const value = {
    notifications,
    unreadCount,
    loading,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    addCommentReply,
    addRecipeLike,
    addAchievementUnlocked,
    addNewFollower,
    addFavoriteRecipe,
    removeFavoriteRecipe,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
