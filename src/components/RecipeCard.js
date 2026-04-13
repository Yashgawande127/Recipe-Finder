import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, Heart, ChefHat, TrendingUp } from 'lucide-react';
import { useRecipe } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import RatingStars from './RatingStars';

const RecipeCard = ({ recipe }) => {
  const { toggleFavorite, favorites, addComment } = useRecipe();
  const { user } = useAuth();
  const recipeId = recipe._id || recipe.id;
  const isFavorite = favorites.some(fav => {
    const favId = fav._id || fav.id;
    return favId === recipeId || 
           favId === parseInt(recipeId) || 
           parseInt(favId) === parseInt(recipeId);
  });
  const isUserRecipe = recipe.authorId && recipe.authorId === user?.id;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      toggleFavorite(recipe);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Link to={`/recipe/${recipe.id}`} className="block">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 group overflow-hidden border border-gray-100 hover:border-primary-200 transform hover:-translate-y-1">
        {/* Recipe Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* User Recipe Badge */}
          {isUserRecipe && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg">
              <ChefHat className="h-3 w-3" />
              <span>My Recipe</span>
            </div>
          )}
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm ${
              isFavorite
                ? 'bg-red-500 text-white hover:bg-red-600 hover:scale-110'
                : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white hover:scale-110'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          
          {/* Recipe Rating */}
          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full shadow-lg">
            <RatingStars 
              recipeId={recipe.id} 
              showAverage={true} 
              showCount={false} 
              size="sm" 
              interactive={false}
            />
          </div>

          {/* Difficulty Badge */}
          <div className={`absolute bottom-3 right-3 px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(recipe.difficulty)} shadow-lg backdrop-blur-sm`}>
            {recipe.difficulty || 'Easy'}
          </div>
        </div>

        {/* Recipe Content */}
        <div className="p-6">
          <h3 className="font-bold text-lg text-secondary-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200 leading-tight">
            {recipe.title}
          </h3>
          
          <p className="text-secondary-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>

          {/* Recipe Meta */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5 text-secondary-600">
                <Clock className="h-4 w-4 text-primary-500" />
                <span className="font-medium">{recipe.cookTime} min</span>
              </div>
              <div className="flex items-center space-x-1.5 text-secondary-600">
                <Users className="h-4 w-4 text-primary-500" />
                <span className="font-medium">{recipe.servings} servings</span>
              </div>
            </div>
            
            {/* Cuisine Badge */}
            <span className="px-3 py-1.5 bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-800 rounded-full text-xs font-semibold border border-secondary-200">
              {recipe.cuisine}
            </span>
          </div>

          {/* Dietary Tags */}
          {recipe.diet && (
            <div className="flex flex-wrap gap-2">
              {recipe.diet.split(',').map((diet, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 rounded-full text-xs font-medium border border-primary-200"
                >
                  {diet.trim()}
                </span>
              ))}
            </div>
          )}

          {/* View Recipe Button */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-500 font-medium">View Recipe</span>
              <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-200">
                <TrendingUp className="h-3 w-3 text-primary-600 group-hover:text-white transition-colors duration-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard; 