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
  const [ratings, setRatings] = useState({});
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
  const { addCommentReply } = useNotifications();

  // Load favorites when user changes
  useEffect(() => {
    if (user) {
      setFavorites(favoritesService.getFavorites());
      setUserRecipes(recipeService.getUserRecipes());
    } else {
      setFavorites([]);
      setUserRecipes([]);
    }
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
  const addRating = (recipeId, rating) => {
    if (!user) return;
    
    try {
      ratingsService.addRating(recipeId, rating);
      awardPoints(3, 'Rated a recipe');
      
      // Update local ratings state
      setRatings(prev => ({
        ...prev,
        [recipeId]: {
          ...prev[recipeId],
          [user.id]: rating
        }
      }));
    } catch (error) {
      console.error('Error adding rating:', error);
    }
  };

  const getRating = (recipeId) => {
    const recipeRatings = ratingsService.getRatings(recipeId);
    return user ? recipeRatings[user.id] || 0 : 0;
  };

  const getAverageRating = (recipeId) => {
    return ratingsService.getAverageRating(recipeId);
  };

  // Favorites Functions
  const addToFavorites = (recipe) => {
    if (!user) return;
    
    try {
      const updatedFavorites = favoritesService.addToFavorites(recipe);
      setFavorites(updatedFavorites);
      awardPoints(1, 'Added to favorites');
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeFromFavorites = (recipeId) => {
    if (!user) return;
    
    try {
      const updatedFavorites = favoritesService.removeFromFavorites(recipeId);
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error removing from favorites:', error);
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
    return recipeService.getAllRecipes();
  };

  const getRecipeById = (id) => {
    return recipeService.getRecipeById(id);
  };

  const createUserRecipe = (recipeData) => {
    if (!user) return null;
    
    try {
      const newRecipe = recipeService.createRecipe(recipeData);
      setUserRecipes(recipeService.getUserRecipes());
      awardPoints(10, 'Created a recipe');
      return newRecipe;
    } catch (error) {
      console.error('Error creating recipe:', error);
      return null;
    }
  };

  const updateUserRecipe = (recipeId, updatedData) => {
    if (!user) return;
    
    try {
      recipeService.updateRecipe(recipeId, updatedData);
      setUserRecipes(recipeService.getUserRecipes());
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const deleteUserRecipe = (recipeId) => {
    if (!user) return;
    
    try {
      recipeService.deleteRecipe(recipeId);
      setUserRecipes(recipeService.getUserRecipes());
      // Also remove from favorites if it's there
      removeFromFavorites(recipeId);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const getUserRecipes = (userId = null) => {
    return recipeService.getUserRecipes(userId);
  };

  const getUserRecipeById = (recipeId) => {
    return userRecipes.find(recipe => recipe.id === recipeId);
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
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const getCommentsForRecipe = (recipeId) => {
    if (!comments[recipeId]) {
      const recipeComments = commentsService.getCommentsForRecipe(recipeId);
      setComments(prev => ({
        ...prev,
        [recipeId]: recipeComments
      }));
      return recipeComments;
    }
    return comments[recipeId];
  };

  const deleteComment = (commentId, recipeId) => {
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
    let filtered = getAllRecipes();

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
  }, [searchQuery, selectedCuisine, selectedDiet]);

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
    ratings,
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
    getRating,
    getAverageRating,

    // Comment functions
    addComment,
    getCommentsForRecipe,
    deleteComment,

    // Filter functions
    clearFilters,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};
