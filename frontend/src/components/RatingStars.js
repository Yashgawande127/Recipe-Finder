import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useRecipe } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';

const RatingStars = ({ recipeId, showAverage = true, showCount = true, size = 'md', interactive = true }) => {
  const { getUserRating, getAverageRating, getRatingCount, addRating, updateRating } = useRecipe();
  const { user } = useAuth();
  
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [averageRating, setAverageRating] = useState(null);
  const [ratingCount, setRatingCount] = useState(0);
  const [userRating, setUserRating] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load rating data when component mounts or recipeId changes
  useEffect(() => {
    const loadRatingData = async () => {
      setIsLoading(true);
      try {
        const [avgRating, count, userRate] = await Promise.all([
          getAverageRating(recipeId),
          getRatingCount(recipeId),
          getUserRating(recipeId)
        ]);
        
        setAverageRating(avgRating);
        setRatingCount(count);
        setUserRating(userRate);
      } catch (error) {
        console.error('Error loading rating data:', error);
        // Set defaults if backend is not available
        setAverageRating(null);
        setRatingCount(0);
        setUserRating(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRatingData();
  }, [recipeId, getAverageRating, getRatingCount, getUserRating]);
  
  // Use user rating if available, otherwise use average rating, fallback to 0
  const displayRating = userRating || averageRating || 0;
  const currentRating = hoverRating || displayRating;
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };
  
  const handleStarClick = async (rating) => {
    if (!user || !interactive) return;
    
    setIsSubmitting(true);
    try {
      if (userRating) {
        // Update existing rating
        await updateRating(recipeId, rating);
        setUserRating(rating);
      } else {
        // Add new rating
        await addRating(recipeId, rating);
        setUserRating(rating);
      }
      
      // Reload rating data after rating
      const [avgRating, count] = await Promise.all([
        getAverageRating(recipeId),
        getRatingCount(recipeId)
      ]);
      setAverageRating(avgRating);
      setRatingCount(count);
    } catch (error) {
      console.error('Error rating recipe:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleStarHover = (rating) => {
    if (!interactive) return;
    setHoverRating(rating);
  };
  
  const handleMouseLeave = () => {
    if (!interactive) return;
    setHoverRating(0);
  };
  
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= currentRating;
      const isUserRating = userRating && i <= userRating;
      
      stars.push(
        <button
          key={i}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={handleMouseLeave}
          disabled={!user || !interactive || isSubmitting || isLoading}
          className={`
            transition-all duration-200 transform hover:scale-110
            ${interactive && user ? 'cursor-pointer' : 'cursor-default'}
            ${isSubmitting || isLoading ? 'opacity-50' : ''}
          `}
        >
          <Star
            className={`
              ${sizeClasses[size]}
              ${isFilled 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300 hover:text-yellow-300'
              }
              ${isUserRating ? 'animate-pulse' : ''}
              transition-colors duration-200
            `}
          />
        </button>
      );
    }
    return stars;
  };
  
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        {renderStars()}
      </div>
      
      {showAverage && (
        <div className="flex items-center space-x-1">
          <span className="font-semibold text-secondary-900">
            {isLoading ? 'Loading...' : 
             averageRating !== null ? averageRating.toFixed(1) : 'No ratings'}
          </span>
          {userRating && (
            <span className="text-xs text-orange-600 font-medium">
              (Your rating: {userRating})
            </span>
          )}
        </div>
      )}
      
      {showCount && ratingCount > 0 && (
        <span className="text-sm text-secondary-500">
          ({ratingCount} {ratingCount === 1 ? 'rating' : 'ratings'})
        </span>
      )}
      
      {!user && interactive && (
        <span className="text-xs text-secondary-500 italic">
          Login to rate
        </span>
      )}
    </div>
  );
};

export default RatingStars; 