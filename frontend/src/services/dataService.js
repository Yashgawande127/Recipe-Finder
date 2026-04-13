// Frontend-only data service for Recipe Finder
// All data is stored locally in the browser

import localRecipes, { seasonalRecipes } from '../data/recipes';

// Demo users for local authentication
const demoUsers = [
  {
    id: '1',
    name: 'Demo User',
    username: 'demouser',
    email: 'demo@example.com',
    password: 'password123'
  },
  {
    id: '2',
    name: 'Chef Master',
    username: 'chefmaster',
    email: 'chef@example.com',
    password: 'chef123'
  }
];

// Helper function to generate unique IDs
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

// Authentication Service
export const authService = {
  login: (credentials) => {
    const user = demoUsers.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );
    
    if (user) {
      const userData = { 
        id: user.id, 
        name: user.name, 
        username: user.username,
        email: user.email
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return { success: true, user: userData };
    } else {
      throw new Error('Invalid email or password');
    }
  },

  register: (userData) => {
    // Check if user already exists
    const existingUser = demoUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }
    
    // Create new user
    const newUser = {
      id: generateId(),
      name: userData.name || `${userData.firstName} ${userData.lastName}`.trim(),
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password
    };
    
    // Add to demo users (in memory only)
    demoUsers.push(newUser);
    
    const userResponse = { 
      id: newUser.id, 
      name: newUser.name, 
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userResponse));
    return { success: true, user: userResponse };
  },

  logout: () => {
    localStorage.removeItem('currentUser');
    return { success: true };
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
};

// Recipe Service
export const recipeService = {
  getAllRecipes: () => {
    let allRecipes = [...localRecipes];
    
    // Add seasonal recipes
    Object.values(seasonalRecipes).forEach(collection => {
      if (collection.recipes) {
        allRecipes = [...allRecipes, ...collection.recipes];
      }
    });
    
    // Add user-created recipes from localStorage
    const userRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]');
    allRecipes = [...allRecipes, ...userRecipes];
    
    return allRecipes;
  },

  getRecipeById: (id) => {
    const allRecipes = recipeService.getAllRecipes();
    return allRecipes.find(r => r.id.toString() === id.toString());
  },

  createRecipe: (recipeData) => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) throw new Error('User not authenticated');
    
    const userRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]');
    
    const newRecipe = {
      ...recipeData,
      id: generateId(),
      author: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar
      },
      createdAt: new Date().toISOString(),
      rating: 0,
      reviews: 0,
      featured: false
    };
    
    userRecipes.push(newRecipe);
    localStorage.setItem('userRecipes', JSON.stringify(userRecipes));
    
    return newRecipe;
  },

  updateRecipe: (id, recipeData) => {
    const userRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]');
    const recipeIndex = userRecipes.findIndex(r => r.id.toString() === id.toString());
    
    if (recipeIndex !== -1) {
      userRecipes[recipeIndex] = { 
        ...userRecipes[recipeIndex], 
        ...recipeData,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('userRecipes', JSON.stringify(userRecipes));
      return userRecipes[recipeIndex];
    } else {
      throw new Error('Recipe not found or you do not have permission to edit it');
    }
  },

  deleteRecipe: (id) => {
    const userRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]');
    const filteredRecipes = userRecipes.filter(r => r.id.toString() !== id.toString());
    
    if (filteredRecipes.length < userRecipes.length) {
      localStorage.setItem('userRecipes', JSON.stringify(filteredRecipes));
      return { success: true };
    } else {
      throw new Error('Recipe not found or you do not have permission to delete it');
    }
  },

  getUserRecipes: (userId = null) => {
    const userRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]');
    if (userId) {
      return userRecipes.filter(recipe => recipe.author?.id === userId);
    }
    return userRecipes;
  },

  searchRecipes: (query, filters = {}) => {
    let recipes = recipeService.getAllRecipes();
    
    if (query) {
      const searchTerm = query.toLowerCase();
      recipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.description?.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm)
        )
      );
    }
    
    if (filters.cuisine) {
      recipes = recipes.filter(recipe => recipe.cuisine === filters.cuisine);
    }
    
    if (filters.diet) {
      recipes = recipes.filter(recipe => recipe.diet === filters.diet);
    }
    
    return recipes;
  }
};

// Favorites Service
export const favoritesService = {
  getFavorites: () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    // Clean up any invalid favorites (missing title or id)
    const validFavorites = favorites.filter(recipe => 
      recipe && 
      (recipe.id || recipe._id) && 
      recipe.title && 
      typeof recipe.title === 'string'
    );
    
    // If we had to clean up, save the cleaned data back
    if (validFavorites.length !== favorites.length) {
      localStorage.setItem('favorites', JSON.stringify(validFavorites));
    }
    
    return validFavorites;
  },

  addToFavorites: (recipe) => {
    const favorites = favoritesService.getFavorites();
    const recipeId = recipe.id || recipe._id;
    
    if (!favorites.find(fav => (fav.id || fav._id) === recipeId)) {
      favorites.push(recipe);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
    return favorites;
  },

  removeFromFavorites: (recipeId) => {
    const favorites = favoritesService.getFavorites();
    const filteredFavorites = favorites.filter(fav => (fav.id || fav._id) !== recipeId);
    localStorage.setItem('favorites', JSON.stringify(filteredFavorites));
    return filteredFavorites;
  },

  isFavorite: (recipeId) => {
    const favorites = favoritesService.getFavorites();
    return favorites.some(fav => (fav.id || fav._id) === recipeId);
  }
};

// Comments Service
export const commentsService = {
  getCommentsForRecipe: (recipeId) => {
    const comments = JSON.parse(localStorage.getItem('recipeComments') || '{}');
    return comments[recipeId] || [];
  },

  addComment: (recipeId, commentText) => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) throw new Error('User not authenticated');
    
    const comments = JSON.parse(localStorage.getItem('recipeComments') || '{}');
    
    const newComment = {
      id: generateId(),
      content: commentText,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: []
    };
    
    if (!comments[recipeId]) {
      comments[recipeId] = [];
    }
    
    comments[recipeId].push(newComment);
    localStorage.setItem('recipeComments', JSON.stringify(comments));
    
    return newComment;
  },

  deleteComment: (commentId) => {
    const comments = JSON.parse(localStorage.getItem('recipeComments') || '{}');
    
    Object.keys(comments).forEach(recipeId => {
      comments[recipeId] = comments[recipeId].filter(c => c.id !== commentId);
    });
    
    localStorage.setItem('recipeComments', JSON.stringify(comments));
    return { success: true };
  },

  editComment: (commentId, newContent) => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) throw new Error('User not authenticated');
    
    const comments = JSON.parse(localStorage.getItem('recipeComments') || '{}');
    
    Object.keys(comments).forEach(recipeId => {
      comments[recipeId] = comments[recipeId].map(comment => {
        if (comment.id === commentId && comment.author.id === currentUser.id) {
          return {
            ...comment,
            content: newContent,
            updatedAt: new Date().toISOString(),
            edited: true
          };
        }
        return comment;
      });
    });
    
    localStorage.setItem('recipeComments', JSON.stringify(comments));
    return { success: true };
  },

  likeComment: (commentId) => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) throw new Error('User not authenticated');
    
    const comments = JSON.parse(localStorage.getItem('recipeComments') || '{}');
    
    Object.keys(comments).forEach(recipeId => {
      comments[recipeId] = comments[recipeId].map(comment => {
        if (comment.id === commentId) {
          const likedBy = comment.likedBy || [];
          const isLiked = likedBy.includes(currentUser.id);
          
          return {
            ...comment,
            likes: isLiked ? comment.likes - 1 : comment.likes + 1,
            likedBy: isLiked 
              ? likedBy.filter(id => id !== currentUser.id)
              : [...likedBy, currentUser.id]
          };
        }
        return comment;
      });
    });
    
    localStorage.setItem('recipeComments', JSON.stringify(comments));
    return { success: true };
  },

  addReply: (recipeId, parentCommentId, replyText) => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) throw new Error('User not authenticated');
    
    const comments = JSON.parse(localStorage.getItem('recipeComments') || '{}');
    
    const newReply = {
      id: generateId(),
      content: replyText,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      parentId: parentCommentId
    };
    
    if (!comments[recipeId]) {
      comments[recipeId] = [];
    }
    
    // Find the parent comment and add the reply
    comments[recipeId] = comments[recipeId].map(comment => {
      if (comment.id === parentCommentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };
      }
      return comment;
    });
    
    localStorage.setItem('recipeComments', JSON.stringify(comments));
    return newReply;
  }
};

// Ratings Service
export const ratingsService = {
  addRating: (recipeId, rating) => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) throw new Error('User not authenticated');
    
    const ratings = JSON.parse(localStorage.getItem('recipeRatings') || '{}');
    
    if (!ratings[recipeId]) {
      ratings[recipeId] = {};
    }
    
    ratings[recipeId][currentUser.id] = rating;
    localStorage.setItem('recipeRatings', JSON.stringify(ratings));
    
    return { success: true, rating };
  },

  getRatings: (recipeId) => {
    const ratings = JSON.parse(localStorage.getItem('recipeRatings') || '{}');
    return ratings[recipeId] || {};
  },

  getAverageRating: (recipeId) => {
    const ratings = ratingsService.getRatings(recipeId);
    const ratingValues = Object.values(ratings);
    
    if (ratingValues.length === 0) return 0;
    
    const sum = ratingValues.reduce((acc, rating) => acc + rating, 0);
    return sum / ratingValues.length;
  },

  getRatingCount: (recipeId) => {
    const ratings = ratingsService.getRatings(recipeId);
    return Object.keys(ratings).length;
  },

  getUserRating: (recipeId) => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return null;
    
    const ratings = ratingsService.getRatings(recipeId);
    return ratings[currentUser.id] || null;
  },

  updateRating: (recipeId, rating) => {
    // updateRating is the same as addRating for this implementation
    return ratingsService.addRating(recipeId, rating);
  }
};

// Meal Planning Service
export const mealPlanService = {
  getCurrentMealPlan: () => {
    return JSON.parse(localStorage.getItem('currentMealPlan') || '{}');
  },

  addRecipeToMealPlan: (recipeId, day, mealType, servings = 1) => {
    const mealPlan = mealPlanService.getCurrentMealPlan();
    
    if (!mealPlan[day]) {
      mealPlan[day] = {};
    }
    if (!mealPlan[day][mealType]) {
      mealPlan[day][mealType] = [];
    }
    
    mealPlan[day][mealType].push({ recipeId, servings });
    localStorage.setItem('currentMealPlan', JSON.stringify(mealPlan));
    
    return mealPlan;
  },

  removeRecipeFromMealPlan: (recipeId, day, mealType) => {
    const mealPlan = mealPlanService.getCurrentMealPlan();
    
    if (mealPlan[day] && mealPlan[day][mealType]) {
      mealPlan[day][mealType] = mealPlan[day][mealType].filter(
        item => item.recipeId !== recipeId
      );
    }
    
    localStorage.setItem('currentMealPlan', JSON.stringify(mealPlan));
    return mealPlan;
  },

  generateShoppingList: () => {
    const mealPlan = mealPlanService.getCurrentMealPlan();
    console.log('Meal plan data:', mealPlan);
    const shoppingList = [];
    const ingredientMap = new Map();
    
    // Helper function to categorize ingredients
    const categorizeIngredient = (ingredient) => {
      const lowerIngredient = ingredient.toLowerCase();
      
      // Produce - Fruits and Vegetables
      if (lowerIngredient.includes('tomato') || lowerIngredient.includes('onion') || 
          lowerIngredient.includes('garlic') || lowerIngredient.includes('basil') ||
          lowerIngredient.includes('lettuce') || lowerIngredient.includes('carrot') ||
          lowerIngredient.includes('bell pepper') || lowerIngredient.includes('mushroom') ||
          lowerIngredient.includes('spinach') || lowerIngredient.includes('broccoli') ||
          lowerIngredient.includes('cucumber') || lowerIngredient.includes('avocado') ||
          lowerIngredient.includes('lemon') || lowerIngredient.includes('lime') ||
          lowerIngredient.includes('apple') || lowerIngredient.includes('banana') ||
          lowerIngredient.includes('potato') || lowerIngredient.includes('cilantro') ||
          lowerIngredient.includes('parsley') || lowerIngredient.includes('ginger') ||
          lowerIngredient.includes('celery') || lowerIngredient.includes('green') ||
          lowerIngredient.includes('eggplant') || lowerIngredient.includes('zucchini') ||
          lowerIngredient.includes('cabbage') || lowerIngredient.includes('kale') ||
          lowerIngredient.includes('radish') || lowerIngredient.includes('beet') ||
          lowerIngredient.includes('turnip') || lowerIngredient.includes('squash') ||
          lowerIngredient.includes('pumpkin') || lowerIngredient.includes('corn') ||
          lowerIngredient.includes('peas') || lowerIngredient.includes('berry') ||
          lowerIngredient.includes('strawberr') || lowerIngredient.includes('blueber') ||
          lowerIngredient.includes('orange') || lowerIngredient.includes('grape') ||
          lowerIngredient.includes('scallion') || lowerIngredient.includes('chive') ||
          (lowerIngredient.includes('fresh') && (lowerIngredient.includes('herb') || lowerIngredient.includes('mint')))) {
        return 'produce';
      }
      
      // Dairy & Eggs
      if (lowerIngredient.includes('cheese') || lowerIngredient.includes('milk') ||
          lowerIngredient.includes('butter') || lowerIngredient.includes('cream') ||
          lowerIngredient.includes('yogurt') || lowerIngredient.includes('mozzarella') ||
          lowerIngredient.includes('parmesan') || lowerIngredient.includes('cheddar') ||
          lowerIngredient.includes('ricotta') || lowerIngredient.includes('eggs') ||
          lowerIngredient.includes('feta') || lowerIngredient.includes('goat') ||
          lowerIngredient.includes('brie') || lowerIngredient.includes('swiss') ||
          lowerIngredient.includes('sour cream') || lowerIngredient.includes('heavy cream') ||
          lowerIngredient.includes('half and half') || lowerIngredient.includes('buttermilk')) {
        return 'dairy';
      }
      
      // Meat & Seafood
      if (lowerIngredient.includes('chicken') || lowerIngredient.includes('beef') ||
          lowerIngredient.includes('pork') || lowerIngredient.includes('fish') ||
          lowerIngredient.includes('salmon') || lowerIngredient.includes('shrimp') ||
          lowerIngredient.includes('pancetta') || lowerIngredient.includes('bacon') ||
          lowerIngredient.includes('ground') || lowerIngredient.includes('turkey') ||
          lowerIngredient.includes('ham') || lowerIngredient.includes('sausage') ||
          lowerIngredient.includes('meat') || lowerIngredient.includes('steak') ||
          lowerIngredient.includes('lamb') || lowerIngredient.includes('duck') ||
          lowerIngredient.includes('crab') || lowerIngredient.includes('lobster') ||
          lowerIngredient.includes('tuna') || lowerIngredient.includes('cod') ||
          lowerIngredient.includes('tilapia') || lowerIngredient.includes('halibut') ||
          lowerIngredient.includes('scallops') || lowerIngredient.includes('mussels') ||
          lowerIngredient.includes('oyster') || lowerIngredient.includes('clam')) {
        return 'meat';
      }
      
      // Spices & Seasonings
      if (lowerIngredient.includes('salt') || lowerIngredient.includes('pepper') ||
          lowerIngredient.includes('oregano') || lowerIngredient.includes('thyme') ||
          lowerIngredient.includes('rosemary') || lowerIngredient.includes('cumin') ||
          lowerIngredient.includes('paprika') || lowerIngredient.includes('cinnamon') ||
          lowerIngredient.includes('nutmeg') || lowerIngredient.includes('bay') ||
          lowerIngredient.includes('spice') || lowerIngredient.includes('seasoning') ||
          lowerIngredient.includes('vanilla') || lowerIngredient.includes('extract') ||
          lowerIngredient.includes('clove') || lowerIngredient.includes('cardamom') ||
          lowerIngredient.includes('allspice') || lowerIngredient.includes('turmeric') ||
          lowerIngredient.includes('curry') || lowerIngredient.includes('chili') ||
          lowerIngredient.includes('cayenne') || lowerIngredient.includes('mustard seed') ||
          lowerIngredient.includes('coriander') || lowerIngredient.includes('fennel') ||
          lowerIngredient.includes('dill') || lowerIngredient.includes('sage') ||
          lowerIngredient.includes('tarragon') || lowerIngredient.includes('marjoram') ||
          lowerIngredient.includes('saffron') || lowerIngredient.includes('anise') ||
          lowerIngredient.includes('star anise') || lowerIngredient.includes('garam masala') ||
          lowerIngredient.includes('herbs') || lowerIngredient.includes('dried herb')) {
        return 'spices';
      }
      
      // Pantry Staples - Grains, Canned Goods, Dry Goods (default)
      return 'pantry';
    };
    
    // Helper function to parse ingredient string
    const parseIngredient = (ingredientStr) => {
      // Simple regex to extract quantity and unit
      const match = ingredientStr.match(/^(\d+(?:\.\d+)?|\d+\/\d+)\s*([a-zA-Z]*)\s*(.+)$/);
      
      if (match) {
        const [, quantity, unit, name] = match;
        return {
          quantity: parseFloat(quantity) || 1,
          unit: unit || '',
          name: name.trim()
        };
      } else {
        // If no quantity found, treat as 1 unit
        return {
          quantity: 1,
          unit: '',
          name: ingredientStr.trim()
        };
      }
    };
    
    // Iterate through all days and meal types in the meal plan
    Object.entries(mealPlan).forEach(([day, dayMeals]) => {
      console.log(`Processing day: ${day}`, dayMeals);
      
      // Handle both array structure (from context) and object structure (from storage)
      if (Array.isArray(dayMeals)) {
        // Array structure from context - each meal has recipe data directly
        dayMeals.forEach(meal => {
          console.log('Processing meal (array):', meal);
          if (meal.ingredients && Array.isArray(meal.ingredients)) {
            const servingMultiplier = meal.servings || 1;
            
            meal.ingredients.forEach(ingredient => {
              const parsed = parseIngredient(ingredient);
              const key = parsed.name.toLowerCase();
              
              if (ingredientMap.has(key)) {
                // Aggregate quantities for same ingredient
                const existing = ingredientMap.get(key);
                existing.quantity += parsed.quantity * servingMultiplier;
              } else {
                // Add new ingredient
                ingredientMap.set(key, {
                  id: generateId(),
                  name: parsed.name,
                  quantity: parsed.quantity * servingMultiplier,
                  unit: parsed.unit,
                  category: categorizeIngredient(parsed.name),
                  checked: false
                });
              }
            });
          }
        });
      } else if (typeof dayMeals === 'object' && dayMeals !== null) {
        // Object structure from storage - nested by meal type
        Object.entries(dayMeals).forEach(([mealType, meals]) => {
          console.log(`Processing meal type: ${mealType}`, meals);
          if (Array.isArray(meals)) {
            meals.forEach(meal => {
              console.log('Processing meal (nested):', meal);
              const recipe = recipeService.getRecipeById(meal.recipeId);
              console.log('Found recipe:', recipe);
              if (recipe && recipe.ingredients) {
                const servingMultiplier = meal.servings || 1;
                
                recipe.ingredients.forEach(ingredient => {
                  const parsed = parseIngredient(ingredient);
                  const key = parsed.name.toLowerCase();
                  
                  if (ingredientMap.has(key)) {
                    // Aggregate quantities for same ingredient
                    const existing = ingredientMap.get(key);
                    existing.quantity += parsed.quantity * servingMultiplier;
                  } else {
                    // Add new ingredient
                    ingredientMap.set(key, {
                      id: generateId(),
                      name: parsed.name,
                      quantity: parsed.quantity * servingMultiplier,
                      unit: parsed.unit,
                      category: categorizeIngredient(parsed.name),
                      checked: false
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
    
    // Convert map to array
    const finalShoppingList = Array.from(ingredientMap.values());
    console.log('Generated shopping list:', finalShoppingList);
    
    localStorage.setItem('shoppingList', JSON.stringify(finalShoppingList));
    return finalShoppingList;
  }
};

// Notifications Service
export const notificationsService = {
  getNotifications: () => {
    return JSON.parse(localStorage.getItem('notifications') || '[]');
  },

  addNotification: (notification) => {
    const notifications = notificationsService.getNotifications();
    
    const newNotification = {
      id: generateId(),
      ...notification,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    notifications.unshift(newNotification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    
    return newNotification;
  },

  markAsRead: (notificationId) => {
    const notifications = notificationsService.getNotifications();
    const notification = notifications.find(n => n.id === notificationId);
    
    if (notification) {
      notification.read = true;
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
    
    return notifications;
  },

  deleteNotification: (notificationId) => {
    const notifications = notificationsService.getNotifications();
    const filteredNotifications = notifications.filter(n => n.id !== notificationId);
    localStorage.setItem('notifications', JSON.stringify(filteredNotifications));
    return filteredNotifications;
  },

  markAllAsRead: () => {
    const notifications = notificationsService.getNotifications();
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    return updatedNotifications;
  },

  getUnreadCount: () => {
    const notifications = notificationsService.getNotifications();
    return notifications.filter(n => !n.read).length;
  },

  clearAllNotifications: () => {
    localStorage.setItem('notifications', JSON.stringify([]));
    return [];
  }
};

// Gamification Service
export const gamificationService = {
  getProfile: () => {
    return JSON.parse(localStorage.getItem('gamificationProfile') || JSON.stringify({
      level: 1,
      experience: 0,
      streak: 0,
      lastActivity: new Date().toISOString(),
      totalRecipes: 0,
      totalComments: 0,
      totalFavorites: 0,
      cuisinesExplored: 0,
      dietaryPreferences: 0,
      commentLikes: 0
    }));
  },

  awardPoints: (points, reason) => {
    const profile = gamificationService.getProfile();
    
    profile.experience += points;
    profile.lastActivity = new Date().toISOString();
    
    // Calculate level based on experience
    const newLevel = Math.floor(profile.experience / 100) + 1;
    const leveledUp = newLevel > profile.level;
    profile.level = newLevel;
    
    localStorage.setItem('gamificationProfile', JSON.stringify(profile));
    
    return { profile, leveledUp };
  },

  updateStats: (statType, value) => {
    const profile = gamificationService.getProfile();
    profile[statType] = value;
    localStorage.setItem('gamificationProfile', JSON.stringify(profile));
    return profile;
  }
};

export default {
  authService,
  recipeService,
  favoritesService,
  commentsService,
  ratingsService,
  mealPlanService,
  notificationsService,
  gamificationService
};
