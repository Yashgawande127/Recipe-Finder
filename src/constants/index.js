// Application constants
export const APP_CONFIG = {
  NAME: 'Recipe Finder',
  VERSION: '1.0.0',
  DESCRIPTION: 'A full-stack web application for discovering, creating, and sharing recipes',
};

// File Upload Configuration
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  MAX_FILES_PER_UPLOAD: 5,
};

// Pagination Configuration
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
  PAGE_SIZE_OPTIONS: [6, 12, 24, 48],
};

// Recipe Configuration
export const RECIPE_CONFIG = {
  MAX_TITLE_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_INGREDIENTS: 50,
  MAX_INSTRUCTIONS: 20,
  MAX_TAGS: 10,
  MAX_COMMENT_LENGTH: 1000,
  MAX_REPLY_LENGTH: 500,
};

// User Configuration
export const USER_CONFIG = {
  MAX_USERNAME_LENGTH: 30,
  MIN_USERNAME_LENGTH: 3,
  MAX_BIO_LENGTH: 500,
  MAX_NAME_LENGTH: 50,
};

// Gamification Configuration
export const GAMIFICATION_CONFIG = {
  POINTS: {
    RECIPE_CREATED: 10,
    RECIPE_RATED: 3,
    COMMENT_POSTED: 2,
    COMMENT_LIKED: 1,
    RECIPE_FAVORITED: 1,
    DAILY_LOGIN: 5,
    ACHIEVEMENT_UNLOCKED: 25,
  },
  LEVELS: {
    XP_PER_LEVEL: 100,
    MAX_LEVEL: 100,
  },
  STREAKS: {
    MAX_STREAK: 365,
    STREAK_BONUS: 2,
  },
};

// Notification Configuration
export const NOTIFICATION_CONFIG = {
  MAX_NOTIFICATIONS: 100,
  AUTO_DELETE_DAYS: 30,
  TYPES: {
    RECIPE_REVIEW: 'recipe_review',
    NEW_FOLLOWER: 'new_follower',
    RECIPE_LIKE: 'recipe_like',
    COMMENT_REPLY: 'comment_reply',
    ACHIEVEMENT: 'achievement',
    SYSTEM: 'system',
  },
};

// Meal Planning Configuration
export const MEAL_PLAN_CONFIG = {
  MAX_MEALS_PER_DAY: 5,
  MAX_SHOPPING_ITEMS: 100,
  DIETARY_PREFERENCES: [
    'vegetarian',
    'vegan',
    'glutenFree',
    'dairyFree',
    'nutFree',
    'lowCarb',
    'keto',
    'paleo',
  ],
};

// UI Configuration
export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 5000,
  LOADING_TIMEOUT: 10000,
  INFINITE_SCROLL_THRESHOLD: 100,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
  FILE_TOO_LARGE: 'File size is too large.',
  INVALID_FILE_TYPE: 'Invalid file type.',
  UPLOAD_FAILED: 'File upload failed. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  RECIPE_CREATED: 'Recipe created successfully!',
  RECIPE_UPDATED: 'Recipe updated successfully!',
  RECIPE_DELETED: 'Recipe deleted successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  LOGIN_SUCCESS: 'Welcome back!',
  REGISTRATION_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  COMMENT_POSTED: 'Comment posted successfully!',
  RATING_SUBMITTED: 'Rating submitted successfully!',
  FAVORITE_ADDED: 'Added to favorites!',
  FAVORITE_REMOVED: 'Removed from favorites!',
  MEAL_PLAN_SAVED: 'Meal plan saved successfully!',
  SHOPPING_LIST_GENERATED: 'Shopping list generated successfully!',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
  PREFERENCES: 'preferences',
  CART: 'cart',
  RECENT_SEARCHES: 'recent_searches',
  FAVORITES: 'favorites',
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  RECIPE_DETAIL: '/recipe/:id',
  CREATE_RECIPE: '/create-recipe',
  EDIT_RECIPE: '/edit-recipe/:id',
  MY_RECIPES: '/my-recipes',
  FAVORITES: '/favorites',
  MEAL_PLANNING: '/meal-planning',
  SEASONAL_COLLECTIONS: '/seasonal-collections',
  COLLECTION_DETAIL: '/collection/:id',
};

// Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// Z-Index Values
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
};

export default {
  APP_CONFIG,
  UPLOAD_CONFIG,
  PAGINATION_CONFIG,
  RECIPE_CONFIG,
  USER_CONFIG,
  GAMIFICATION_CONFIG,
  NOTIFICATION_CONFIG,
  MEAL_PLAN_CONFIG,
  UI_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  STORAGE_KEYS,
  ROUTES,
  BREAKPOINTS,
  Z_INDEX,
}; 