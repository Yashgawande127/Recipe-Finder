import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { useRecipe } from '../context/RecipeContext';
import { Heart, Clock, Users, Star, Filter, Search, ChefHat, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CookingButton, MenuButton } from '../components/AnimatedButton';

const Favorites = () => {
  const { favorites } = useRecipe();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterCuisine, setFilterCuisine] = useState('all');

  // Filter and sort favorites
  const filteredFavorites = favorites
    .filter(recipe => 
      recipe && 
      recipe.title && 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterCuisine === 'all' || recipe.cuisine === filterCuisine)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'time':
          return a.cookTime - b.cookTime;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0; // Keep original order for 'recent'
      }
    });

  // Get unique cuisines for filter
  const cuisines = ['all', ...new Set((favorites || []).filter(recipe => recipe && recipe.cuisine).map(recipe => recipe.cuisine))];

  // Calculate statistics
  const validFavorites = (favorites || []).filter(recipe => recipe && recipe.title);
  const stats = {
    total: validFavorites.length,
    totalTime: validFavorites.reduce((sum, recipe) => sum + (recipe.cookTime || 0), 0),
    avgRating: validFavorites.length > 0 
      ? (validFavorites.reduce((sum, recipe) => sum + (recipe.rating || 0), 0) / validFavorites.length).toFixed(1)
      : 0,
    topCuisine: validFavorites.length > 0 
      ? Object.entries(
          validFavorites.reduce((acc, recipe) => {
            const cuisine = recipe.cuisine || 'Unknown';
            acc[cuisine] = (acc[cuisine] || 0) + 1;
            return acc;
          }, {})
        ).sort(([,a], [,b]) => b - a)[0][0]
      : 'None'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl mr-4">
            <Heart className="h-12 w-12 text-red-500" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-secondary-900 mb-2">My Favorite Recipes</h1>
            <p className="text-xl text-secondary-600">Your personal collection of beloved dishes</p>
          </div>
        </div>

        {/* Statistics Cards */}
        {validFavorites.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-red-700">{stats.total}</p>
                  <p className="text-red-600 font-medium">Total Favorites</p>
                </div>
                <Heart className="h-8 w-8 text-red-500" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-700">{stats.totalTime}</p>
                  <p className="text-blue-600 font-medium">Total Cook Time</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-yellow-700">{stats.avgRating}</p>
                  <p className="text-yellow-600 font-medium">Avg Rating</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-700">{stats.topCuisine}</p>
                  <p className="text-green-600 font-medium">Top Cuisine</p>
                </div>
                <ChefHat className="h-8 w-8 text-green-500" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search and Filter Section */}
      {validFavorites.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
              <input
                type="text"
                placeholder="Search your favorites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <span className="text-secondary-600 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="recent">Recently Added</option>
                <option value="name">Name</option>
                <option value="time">Cook Time</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-secondary-600 font-medium">Cuisine:</span>
              <select
                value={filterCuisine}
                onChange={(e) => setFilterCuisine(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {cuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine === 'all' ? 'All Cuisines' : cuisine}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      {validFavorites.length > 0 && (
        <div className="flex items-center justify-between mb-6">
          <p className="text-secondary-600">
            Showing {filteredFavorites.length} of {validFavorites.length} favorites
          </p>
          {filteredFavorites.length !== validFavorites.length && (
            <CookingButton
              onClick={() => {
                setSearchQuery('');
                setFilterCuisine('all');
                setSortBy('recent');
              }}
              variant="secondary"
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Clear Filters</span>
            </CookingButton>
          )}
        </div>
      )}

      {/* Favorites Grid */}
      {validFavorites.length > 0 ? (
        filteredFavorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFavorites.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
            <Search className="h-16 w-16 text-secondary-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">
              No recipes found
            </h3>
            <p className="text-secondary-600 mb-6">
              Try adjusting your search terms or filters.
            </p>
            <CookingButton
              onClick={() => {
                setSearchQuery('');
                setFilterCuisine('all');
                setSortBy('recent');
              }}
              variant="primary"
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Clear Filters</span>
            </CookingButton>
          </div>
        )
      ) : (
        <div className="text-center py-16 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border border-red-200">
          <div className="p-6 bg-white rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-lg">
            <Heart className="h-12 w-12 text-red-400" />
          </div>
          <h3 className="text-2xl font-bold text-secondary-900 mb-4">
            No favorite recipes yet
          </h3>
          <p className="text-secondary-600 mb-8 max-w-md mx-auto">
            Start building your personal recipe collection by browsing our delicious recipes and adding your favorites.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <CookingButton
                variant="primary"
                className="flex items-center space-x-2 px-6 py-3"
              >
                <TrendingUp className="h-5 w-5" />
                <span>Browse Recipes</span>
              </CookingButton>
            </Link>
            <Link to="/seasonal-collections">
              <MenuButton
                foodIcon="🍂"
                className="flex items-center space-x-2 px-6 py-3"
              >
                <span>Seasonal Collections</span>
              </MenuButton>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites; 