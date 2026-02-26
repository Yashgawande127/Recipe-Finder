import React, { createContext, useContext, useState, useEffect } from 'react';
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

  // Load notifications from local storage
  const loadNotifications = () => {
    if (!user) return;
    
    try {
      const userNotifications = notificationsService.getNotifications();
      setNotifications(userNotifications);
      setUnreadCount(userNotifications.filter(n => !n.read).length);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  // Load notifications when user changes
  useEffect(() => {
    if (user) {
      loadNotifications();
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [user]);

  const addNotification = (notification) => {
    if (!user) return;

    const newNotification = notificationsService.addNotification(notification);
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  const markAsRead = (notificationId) => {
    if (!user) return;
    
    try {
      const updatedNotifications = notificationsService.markAsRead(notificationId);
      setNotifications(updatedNotifications);
      setUnreadCount(updatedNotifications.filter(n => !n.read).length);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = () => {
    if (!user) return;
    
    try {
      const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
      updatedNotifications.forEach(n => notificationsService.markAsRead(n.id));
      setNotifications(updatedNotifications);
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const deleteNotification = (notificationId) => {
    if (!user) return;
    
    try {
      const updatedNotifications = notificationsService.deleteNotification(notificationId);
      setNotifications(updatedNotifications);
      setUnreadCount(updatedNotifications.filter(n => !n.read).length);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const deleteAllNotifications = () => {
    if (!user) return;
    
    try {
      // Delete all notifications one by one
      notifications.forEach(n => notificationsService.deleteNotification(n.id));
      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      console.error('Error deleting all notifications:', error);
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

  const value = {
    notifications,
    unreadCount,
    loading,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
    addCommentReply,
    addRecipeLike,
    addAchievementUnlocked,
    addNewFollower,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
