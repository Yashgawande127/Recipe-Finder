import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Clock, Users, Star, ChefHat, Utensils, Edit, Trash2, CheckCircle, Minus, Plus } from 'lucide-react';
import { useRecipe } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { useGamification } from '../context/GamificationContext';
import CommentSection from '../components/CommentSection';
import RatingStars from '../components/RatingStars';
import recipes, { seasonalRecipes } from '../data/recipes';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, favorites, getUserRecipeById, deleteUserRecipe } = useRecipe();
  const { user } = useAuth();
  const { awardPoints, updateSharesCount } = useGamification();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [servings, setServings] = useState(4); // Default servings

  useEffect(() => {
    const loadRecipe = () => {
      // First check if it's a user recipe
      let foundRecipe = getUserRecipeById(id);
      
      // If not found in user recipes, check seasonal recipes
      if (!foundRecipe) {
        for (const collection of Object.values(seasonalRecipes)) {
          if (collection.recipes && Array.isArray(collection.recipes)) {
            foundRecipe = collection.recipes.find(r => r.id === id);
            if (foundRecipe) break;
          }
        }
      }
      
      // If not found in seasonal recipes, check default recipes
      if (!foundRecipe) {
        foundRecipe = recipes.find(r => r.id === parseInt(id));
      }
      
      setRecipe(foundRecipe);
      // Set initial servings to recipe's default servings
      if (foundRecipe) {
        setServings(foundRecipe.servings || 4);
      }
      setLoading(false);
    };

    loadRecipe();
  }, [id, getUserRecipeById]);

  // Function to parse ingredient quantities and units
  const parseIngredient = (ingredient) => {
    const regex = /^([\d.]+)\s*([a-zA-Z]+)\s+(.+)$/;
    const match = ingredient.match(regex);
    
    if (match) {
      return {
        quantity: parseFloat(match[1]),
        unit: match[2],
        item: match[3].trim()
      };
    }
    
    // Handle cases without units (e.g., "2 eggs")
    const numberRegex = /^([\d.]+)\s+(.+)$/;
    const numberMatch = ingredient.match(numberRegex);
    
    if (numberMatch) {
      return {
        quantity: parseFloat(numberMatch[1]),
        unit: '',
        item: numberMatch[2].trim()
      };
    }
    
    // Handle cases with no quantity (e.g., "salt to taste")
    return {
      quantity: null,
      unit: '',
      item: ingredient.trim()
    };
  };

  // Function to format ingredient with adjusted quantity
  const formatIngredient = (ingredient, multiplier) => {
    const parsed = parseIngredient(ingredient);
    
    if (parsed.quantity === null) {
      return parsed.item; // Return as-is for ingredients like "salt to taste"
    }
    
    const adjustedQuantity = parsed.quantity * multiplier;
    
    // Round to 2 decimal places for better readability
    let displayQuantity = Math.round(adjustedQuantity * 100) / 100;
    
    // Convert to fractions for common values
    const fractions = {
      0.25: '¼',
      0.33: '⅓',
      0.5: '½',
      0.67: '⅔',
      0.75: '¾'
    };
    
    if (fractions[displayQuantity]) {
      displayQuantity = fractions[displayQuantity];
    } else if (displayQuantity === Math.floor(displayQuantity)) {
      displayQuantity = Math.floor(displayQuantity);
    }
    
    if (parsed.unit) {
      return `${displayQuantity} ${parsed.unit} ${parsed.item}`;
    } else {
      return `${displayQuantity} ${parsed.item}`;
    }
  };

  // Calculate multiplier based on current servings vs original servings
  const getMultiplier = () => {
    if (!recipe) return 1;
    return servings / (recipe.servings || 4);
  };

  // Get adjusted ingredients
  const getAdjustedIngredients = () => {
    if (!recipe) return [];
    const multiplier = getMultiplier();
    return recipe.ingredients.map(ingredient => formatIngredient(ingredient, multiplier));
  };

  // Get adjusted cook time
  const getAdjustedCookTime = () => {
    if (!recipe) return 0;
    const multiplier = getMultiplier();
    const baseTime = recipe.cookTime || 30;
    
    // Cook time doesn't scale linearly, so we use a more realistic formula
    if (multiplier <= 1) {
      return Math.round(baseTime * (0.8 + multiplier * 0.2)); // Minimum 80% of original time
    } else {
      return Math.round(baseTime * (1 + (multiplier - 1) * 0.3)); // Scale more slowly for larger servings
    }
  };

  // Calculate if recipe is favorite (moved here to avoid reference error)
  const isFavorite = recipe ? favorites.some(fav => fav.id === recipe.id) : false;

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-recipe/${recipe.id}`);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    deleteUserRecipe(recipe.id);
    navigate('/my-recipes');
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  // Mark as cooked logic
  const handleComplete = () => {
    if (hasCompleted) return;
    setHasCompleted(true);
    awardPoints(15, 'Marked recipe as cooked');
  };

  const handleServingsChange = (newServings) => {
    if (newServings >= 1 && newServings <= 20) {
      setServings(newServings);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-900 mb-4">Recipe Not Found</h1>
          <p className="text-secondary-600 mb-6">The recipe you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isUserRecipe = recipe.isUserRecipe;
  const isOwner = isUserRecipe && recipe.authorId === user?.id;
  const adjustedIngredients = getAdjustedIngredients();
  const adjustedCookTime = getAdjustedCookTime();
  const multiplier = getMultiplier();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center text-secondary-600 hover:text-secondary-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Recipes
      </Link>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={handleComplete}
          disabled={hasCompleted}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors ${hasCompleted ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
          title="Mark as Cooked"
        >
          <CheckCircle className="h-4 w-4" />
          {hasCompleted ? 'Completed!' : 'Mark as Cooked'}
        </button>
      </div>

      {/* Main Recipe Card */}
      <div>
        {/* Recipe Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-secondary-900">{recipe.title}</h1>
                {isUserRecipe && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    User Recipe
                  </span>
                )}
              </div>
              <p className="text-lg text-secondary-600 mb-4">{recipe.description}</p>
              {isUserRecipe && (
                <p className="text-sm text-secondary-500 mb-2">
                  Created by {recipe.author}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {isOwner && (
                <>
                  <button
                    onClick={handleEdit}
                    className="p-3 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                    title="Edit Recipe"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                    title="Delete Recipe"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </>
              )}
              <button
                onClick={handleFavoriteToggle}
                className={`p-3 rounded-full transition-colors ${
                  isFavorite
                    ? 'bg-red-100 text-red-500 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
              >
                <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Recipe Meta */}
          <div className="flex flex-wrap gap-6 text-sm text-secondary-600">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {adjustedCookTime} minutes
              {multiplier !== 1 && (
                <span className="ml-1 text-xs text-orange-600">
                  (adjusted for {servings} servings)
                </span>
              )}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              {servings} servings
            </div>
            <div className="flex items-center">
              <ChefHat className="h-4 w-4 mr-2" />
              {recipe.cuisine}
            </div>
            {recipe.diet && (
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                {recipe.diet}
              </span>
            )}
          </div>
        </div>

        {/* Recipe Image */}
        <div className="mb-8">
          <img
            src={recipe.image}
            alt={recipe.title}
            loading="lazy"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x400?text=Recipe+Image';
            }}
          />
        </div>

        {/* Serving Adjustment Section */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-secondary-900">Adjust Servings</h2>
            <div className="text-sm text-secondary-600">
              Original: {recipe.servings || 4} servings
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => handleServingsChange(servings - 1)}
              disabled={servings <= 1}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="h-4 w-4 text-secondary-600" />
            </button>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                max="20"
                value={servings}
                onChange={(e) => handleServingsChange(parseInt(e.target.value) || 1)}
                className="w-16 text-center text-lg font-bold text-secondary-900 bg-white rounded-lg border border-blue-200 px-2 py-1"
              />
              <span className="text-secondary-600 font-medium">servings</span>
            </div>
            <button
              onClick={() => handleServingsChange(servings + 1)}
              disabled={servings >= 20}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="h-4 w-4 text-secondary-600" />
            </button>
          </div>
          {multiplier !== 1 && (
            <div className="mt-4 text-center">
              <div className="text-sm text-secondary-600">
                <span className="font-medium">Adjustment:</span> {multiplier > 1 ? 'Increase' : 'Decrease'} by {Math.abs(multiplier - 1).toFixed(1)}x
              </div>
              <div className="text-xs text-secondary-500 mt-1">
                Ingredient quantities and cook time have been adjusted accordingly
              </div>
            </div>
          )}
        </div>

        {/* Rating Section */}
        <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-secondary-900">Rate this Recipe</h2>
            <div className="text-sm text-secondary-600">
              Share your experience with this recipe
            </div>
          </div>
          <div className="flex items-center justify-center py-4">
            <RatingStars 
              recipeId={recipe.id} 
              showAverage={true} 
              showCount={true} 
              size="xl" 
              interactive={true}
            />
          </div>
          {!user && (
            <div className="text-center text-sm text-secondary-600 mt-2">
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Login to rate this recipe
              </Link>
            </div>
          )}
        </div>

        {/* Recipe Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Ingredients */}
          <div>
            <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
              Ingredients
              {multiplier !== 1 && (
                <span className="ml-2 text-sm font-normal text-orange-600">
                  (adjusted for {servings} servings)
                </span>
              )}
            </h2>
            <ul className="space-y-2">
              {adjustedIngredients.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  <span className="text-secondary-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
              Instructions
              {multiplier !== 1 && (
                <span className="ml-2 text-sm font-normal text-orange-600">
                  (adjusted timing)
                </span>
              )}
            </h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                    {index + 1}
                  </span>
                  <span className="text-secondary-700 leading-relaxed">{instruction}</span>
                </li>
              ))}
            </ol>
            
            {multiplier !== 1 && (
              <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">Cooking Tips for {servings} Servings:</h3>
                <ul className="text-sm text-orange-700 space-y-1">
                  {multiplier > 1 && (
                    <>
                      <li>• Use larger pots and pans to accommodate increased quantities</li>
                      <li>• Consider cooking in batches if your equipment is too small</li>
                      <li>• Monitor cooking times carefully as they may vary</li>
                      <li>• Taste and adjust seasonings as you go</li>
                    </>
                  )}
                  {multiplier < 1 && (
                    <>
                      <li>• Use smaller pots and pans for better heat distribution</li>
                      <li>• Reduce cooking times slightly to avoid overcooking</li>
                      <li>• Be careful with seasonings - start with less and add more if needed</li>
                      <li>• Consider using smaller cooking vessels for better results</li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <CommentSection recipeId={recipe.id} />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Delete Recipe</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{recipe.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail; 