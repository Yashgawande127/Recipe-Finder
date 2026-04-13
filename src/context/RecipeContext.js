import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useGamification } from './GamificationContext';
import { useNotifications } from './NotificationContext';
import { recipeService, favoritesService, commentsService, ratingsService } from '../services/dataService';

const RecipeContext = createContext();

export const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  return context;
};

export const RecipeProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [comments, setComments] = useState({});
  const [userRecipes, setUserRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const { 
    awardPoints, 
    updateRecipesCreated, 
    updateCommentsPosted, 
    updateFavoritesCount,
    updateCuisinesExplored,
    updateDietaryPreferences,
    updateCommentLikes
  } = useGamification();
  const { addCommentReply, addFavoriteRecipe, removeFavoriteRecipe } = useNotifications();

  // Load favorites when user changes
  useEffect(() => {
    const loadUserData = () => {
      if (user) {
        try {
          const userFavorites = favoritesService.getFavorites();
          const userRecipesList = recipeService.getUserRecipes();
          setFavorites(userFavorites);
          setUserRecipes(userRecipesList);
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      } else {
        setFavorites([]);
        setUserRecipes([]);
      }
    };
    
    loadUserData();
  }, [user]);

  // Update gamification stats when user recipes change
  useEffect(() => {
    if (user) {
      const userRecipesList = userRecipes.filter(recipe => recipe.author?.id === user.id);
      updateRecipesCreated(userRecipesList.length);
      
      // Update cuisines explored
      const cuisines = new Set(userRecipesList.map(recipe => recipe.cuisine));
      updateCuisinesExplored(cuisines.size);
      
      // Update dietary preferences
      const diets = new Set(userRecipesList.filter(recipe => recipe.diet).map(recipe => recipe.diet));
      updateDietaryPreferences(diets.size);
    }
  }, [userRecipes, user, updateRecipesCreated, updateCuisinesExplored, updateDietaryPreferences]);

  // Update gamification stats when favorites change
  useEffect(() => {
    if (user) {
      updateFavoritesCount(favorites.length);
    }
  }, [favorites, user, updateFavoritesCount]);

  // Rating Functions
  const addRating = async (recipeId, rating) => {
    if (!user) return;
    
    try {
      ratingsService.addRating(recipeId, rating);
      awardPoints(3, 'Rated a recipe');
    } catch (error) {
      console.error('Error adding rating:', error);
      throw error;
    }
  };

  const getUserRating = async (recipeId) => {
    if (!user) return null;
    
    try {
      return ratingsService.getUserRating(recipeId);
    } catch (error) {
      console.error('Error getting user rating:', error);
      return null;
    }
  };

  const updateRating = async (recipeId, rating) => {
    return addRating(recipeId, rating);
  };

  const getAverageRating = async (recipeId) => {
    try {
      return ratingsService.getAverageRating(recipeId);
    } catch (error) {
      console.error('Error getting average rating:', error);
      return 0;
    }
  };

  const getRatingCount = async (recipeId) => {
    try {
      return ratingsService.getRatingCount(recipeId);
    } catch (error) {
      console.error('Error getting rating count:', error);
      return 0;
    }
  };

  // Favorites Functions
  const addToFavorites = (recipe) => {
    if (!user) return;
    
    try {
      const updatedFavorites = favoritesService.addToFavorites(recipe);
      setFavorites(updatedFavorites);
      awardPoints(1, 'Added to favorites');
      
      // Add notification
      addFavoriteRecipe(recipe.title);
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  };

  const removeFromFavorites = (recipeId) => {
    if (!user) return;
    
    try {
      // Find the recipe in favorites to get its title for the notification
      const recipeToRemove = favorites.find(fav => {
        const favId = fav._id || fav.id;
        return favId == recipeId || 
               favId == parseInt(recipeId) || 
               parseInt(favId) == parseInt(recipeId);
      });
      
      const updatedFavorites = favoritesService.removeFromFavorites(recipeId);
      setFavorites(updatedFavorites);
      
      // Add notification if we found the recipe
      if (recipeToRemove && recipeToRemove.title) {
        removeFavoriteRecipe(recipeToRemove.title);
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  };

  const toggleFavorite = (recipe) => {
    const recipeId = recipe._id || recipe.id;
    const isFavorited = favorites.some(fav => {
      const favId = fav._id || fav.id;
      return favId === recipeId || 
             favId === parseInt(recipeId) || 
             parseInt(favId) === parseInt(recipeId);
    });
    
    if (isFavorited) {
      removeFromFavorites(recipeId);
    } else {
      addToFavorites(recipe);
    }
  };

  const isFavorite = (recipeId) => {
    return favorites.some(fav => {
      const favId = fav._id || fav.id;
      return favId === recipeId || 
             favId === parseInt(recipeId) || 
             parseInt(favId) === parseInt(recipeId);
    });
  };

  // Recipe Functions
  const getAllRecipes = () => {
    try {
      return recipeService.getAllRecipes();
    } catch (error) {
      console.error('Error getting all recipes:', error);
      return [];
    }
  };

  const getRecipeById = (id) => {
    try {
      return recipeService.getRecipeById(id);
    } catch (error) {
      console.error('Error getting recipe by id:', error);
      return null;
    }
  };

  const createUserRecipe = (recipeData) => {
    if (!user) return null;
    
    try {
      const newRecipe = recipeService.createRecipe(recipeData);
      const updatedUserRecipes = recipeService.getUserRecipes();
      setUserRecipes(updatedUserRecipes);
      awardPoints(10, 'Created a recipe');
      return newRecipe;
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw error;
    }
  };

  const updateUserRecipe = (recipeId, updatedData) => {
    if (!user) return;
    
    try {
      const updatedRecipe = recipeService.updateRecipe(recipeId, updatedData);
      const updatedUserRecipes = recipeService.getUserRecipes();
      setUserRecipes(updatedUserRecipes);
      return updatedRecipe;
    } catch (error) {
      console.error('Error updating recipe:', error);
      throw error;
    }
  };

  const deleteUserRecipe = (recipeId) => {
    if (!user) return;
    
    try {
      recipeService.deleteRecipe(recipeId);
      const updatedUserRecipes = recipeService.getUserRecipes();
      setUserRecipes(updatedUserRecipes);
      // Also remove from favorites if it's there
      removeFromFavorites(recipeId);
    } catch (error) {
      console.error('Error deleting recipe:', error);
      throw error;
    }
  };

  const getUserRecipes = (userId = null) => {
    try {
      return recipeService.getUserRecipes(userId);
    } catch (error) {
      console.error('Error getting user recipes:', error);
      return [];
    }
  };

  const getUserRecipeById = (recipeId) => {
    return userRecipes.find(recipe => recipe.id?.toString() === recipeId.toString());
  };

  // Comment Functions
  const addComment = (recipeId, commentText) => {
    if (!user) return;
    
    try {
      const newComment = commentsService.addComment(recipeId, commentText);
      
      // Update local comments state
      setComments(prev => ({
        ...prev,
        [recipeId]: [...(prev[recipeId] || []), newComment]
      }));
      
      awardPoints(2, 'Posted a comment');
      updateCommentsPosted(1);
      return newComment;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  const getCommentsForRecipe = (recipeId) => {
    try {
      // If comments are already loaded, return them
      if (comments[recipeId]) {
        return comments[recipeId];
      }
      
      // Otherwise, load comments from service without updating state
      const recipeComments = commentsService.getCommentsForRecipe(recipeId);
      return recipeComments;
    } catch (error) {
      console.error('Error getting comments:', error);
      return [];
    }
  };

  // Function to load comments and update state (for use in useEffect)
  const loadCommentsForRecipe = (recipeId) => {
    try {
      if (!comments[recipeId]) {
        const recipeComments = commentsService.getCommentsForRecipe(recipeId);
        setComments(prev => ({
          ...prev,
          [recipeId]: recipeComments
        }));
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const deleteComment = (recipeId, commentId) => {
    if (!user) return;
    
    try {
      commentsService.deleteComment(commentId);
      
      // Update local comments state
      setComments(prev => ({
        ...prev,
        [recipeId]: prev[recipeId]?.filter(c => c.id !== commentId) || []
      }));
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  };

  const editComment = (recipeId, commentId, newContent) => {
    if (!user) return;
    
    try {
      commentsService.editComment(commentId, newContent);
      
      // Update local comments state
      setComments(prev => ({
        ...prev,
        [recipeId]: prev[recipeId]?.map(c => 
          c.id === commentId 
            ? { ...c, content: newContent, updatedAt: new Date().toISOString(), edited: true }
            : c
        ) || []
      }));
    } catch (error) {
      console.error('Error editing comment:', error);
      throw error;
    }
  };

  const likeComment = (recipeId, commentId) => {
    if (!user) return;
    
    try {
      commentsService.likeComment(commentId);
      
      // Update local comments state
      setComments(prev => ({
        ...prev,
        [recipeId]: prev[recipeId]?.map(c => {
          if (c.id === commentId) {
            const likedBy = c.likedBy || [];
            const isLiked = likedBy.includes(user.id);
            return {
              ...c,
              likes: isLiked ? c.likes - 1 : c.likes + 1,
              likedBy: isLiked 
                ? likedBy.filter(id => id !== user.id)
                : [...likedBy, user.id]
            };
          }
          return c;
        }) || []
      }));
    } catch (error) {
      console.error('Error liking comment:', error);
      throw error;
    }
  };

  const addReply = (recipeId, parentCommentId, replyText) => {
    if (!user) return;
    
    try {
      const newReply = commentsService.addReply(recipeId, parentCommentId, replyText);
      
      // Update local comments state
      setComments(prev => ({
        ...prev,
        [recipeId]: prev[recipeId]?.map(c => 
          c.id === parentCommentId 
            ? { ...c, replies: [...(c.replies || []), newReply] }
            : c
        ) || []
      }));
      
      awardPoints(1, 'Added a reply');
      return newReply;
    } catch (error) {
      console.error('Error adding reply:', error);
      throw error;
    }
  };

  // Search and Filter Functions
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCuisine('');
    setSelectedDiet('');
  };

  // Filter recipes based on search query and filters
  const filteredRecipes = React.useMemo(() => {
    // Get all recipes from the service
    let allRecipes = getAllRecipes();
    let filtered = [...allRecipes];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(recipe =>
        (recipe.title && recipe.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (recipe.description && recipe.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (recipe.cuisine && recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by cuisine
    if (selectedCuisine) {
      filtered = filtered.filter(recipe => recipe.cuisine === selectedCuisine);
    }

    // Filter by diet
    if (selectedDiet) {
      filtered = filtered.filter(recipe => recipe.diet === selectedDiet);
    }

    return filtered;
  }, [searchQuery, selectedCuisine, selectedDiet, userRecipes]); // Include userRecipes in deps to trigger updates

  const value = {
    // State
    searchQuery,
    setSearchQuery,
    selectedCuisine,
    setSelectedCuisine,
    selectedDiet,
    setSelectedDiet,
    favorites,
    comments,
    userRecipes,
    loading,
    filteredRecipes,

    // Recipe functions
    getAllRecipes,
    getRecipeById,
    createUserRecipe,
    updateUserRecipe,
    deleteUserRecipe,
    getUserRecipes,
    getUserRecipeById,

    // Favorites functions
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,

    // Rating functions
    addRating,
    getUserRating,
    updateRating,
    getAverageRating,
    getRatingCount,

    // Comment functions
    addComment,
    getCommentsForRecipe,
    loadCommentsForRecipe,
    deleteComment,
    editComment,
    likeComment,
    addReply,

    // Filter functions
    clearFilters,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};
