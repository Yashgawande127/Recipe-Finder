import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Star, Filter, SortAsc, SortDesc } from 'lucide-react';
import { seasonalRecipes } from '../data/recipes';
import { useRecipe } from '../context/RecipeContext';

const CollectionDetail = () => {
  const { collectionId } = useParams();
  const { addToFavorites, removeFromFavorites, favorites } = useRecipe();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [cookTimeFilter, setCookTimeFilter] = useState('all');
  const [hasDifficultyData, setHasDifficultyData] = useState(false);

  useEffect(() => {
    if (seasonalRecipes[collectionId] && seasonalRecipes[collectionId].recipes) {
      const recipeList = seasonalRecipes[collectionId].recipes;
      setRecipes(recipeList);
      setFilteredRecipes(recipeList);
      
      // Check if recipes have difficulty data
      const hasdifficulty = recipeList.some(recipe => recipe.difficulty);
      setHasDifficultyData(hasdifficulty);
    } else {
      setRecipes([]);
      setFilteredRecipes([]);
      setHasDifficultyData(false);
    }
  }, [collectionId]);

  useEffect(() => {
    let filtered = [...(recipes || [])];

    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(recipe => 
        recipe.difficulty && recipe.difficulty.toLowerCase() === difficultyFilter
      );
    }

    // Apply cook time filter
    if (cookTimeFilter !== 'all') {
      switch (cookTimeFilter) {
        case 'quick':
          filtered = filtered.filter(recipe => recipe.cookTime <= 30);
          break;
        case 'medium':
          filtered = filtered.filter(recipe => recipe.cookTime > 30 && recipe.cookTime <= 60);
          break;
        case 'long':
          filtered = filtered.filter(recipe => recipe.cookTime > 60);
          break;
        default:
          break;
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'cookTime':
          aValue = a.cookTime;
          bValue = b.cookTime;
          break;
        case 'servings':
          aValue = a.servings;
          bValue = b.servings;
          break;
        case 'difficulty':
          const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
          aValue = difficultyOrder[(a.difficulty || '').toLowerCase()] || 0;
          bValue = difficultyOrder[(b.difficulty || '').toLowerCase()] || 0;
          break;
        default:
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredRecipes(filtered);
  }, [recipes, sortBy, sortOrder, difficultyFilter, cookTimeFilter]);

  const getCollectionInfo = () => {
    const collectionNames = {
      thanksgiving: 'Thanksgiving',
      christmas: 'Christmas',
      easter: 'Easter',
      halloween: 'Halloween',
      valentines: "Valentine's Day",
      newyear: 'New Year\'s',
      summer: 'Summer',
      fall: 'Fall',
      winter: 'Winter',
      spring: 'Spring'
    };

    const collectionDescriptions = {
      thanksgiving: 'Traditional Thanksgiving recipes perfect for your holiday feast',
      christmas: 'Festive Christmas recipes to make your celebrations special',
      easter: 'Delightful Easter recipes for spring celebrations',
      halloween: 'Spooky Halloween recipes for frightful fun',
      valentines: 'Romantic Valentine\'s Day recipes for couples',
      newyear: 'Celebratory New Year\'s recipes for good luck and prosperity',
      summer: 'Fresh summer recipes featuring seasonal ingredients',
      fall: 'Cozy fall recipes with autumn flavors',
      winter: 'Warming winter recipes for cold days',
      spring: 'Light spring recipes with fresh seasonal produce'
    };

    const collectionColors = {
      thanksgiving: 'bg-orange-100 text-orange-800',
      christmas: 'bg-red-100 text-red-800',
      easter: 'bg-pink-100 text-pink-800',
      halloween: 'bg-purple-100 text-purple-800',
      valentines: 'bg-red-100 text-red-800',
      newyear: 'bg-yellow-100 text-yellow-800',
      summer: 'bg-yellow-100 text-yellow-800',
      fall: 'bg-orange-100 text-orange-800',
      winter: 'bg-blue-100 text-blue-800',
      spring: 'bg-green-100 text-green-800'
    };

    return {
      name: collectionNames[collectionId] || collectionId,
      description: collectionDescriptions[collectionId] || 'Seasonal recipes',
      color: collectionColors[collectionId] || 'bg-gray-100 text-gray-800'
    };
  };

  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return 'bg-gray-100 text-gray-800';
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleFavorite = (recipe) => {
    const isFavorite = favorites.find(fav => fav.id === recipe.id);
    if (isFavorite) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  const collectionInfo = getCollectionInfo();

  if (!recipes.length) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Collection Not Found</h1>
          <p className="text-gray-600 mb-6">The requested collection could not be found.</p>
          <Link
            to="/seasonal-collections"
            className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Seasonal Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/seasonal-collections"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Seasonal Collections
        </Link>
        
        <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${collectionInfo.color}`}>
          {collectionInfo.name} Collection
        </div>
        
        <h1 className="text-4xl font-bold text-secondary-900 mb-4">
          {collectionInfo.name} Recipes
        </h1>
        <p className="text-xl text-secondary-600 max-w-3xl">
          {collectionInfo.description}
        </p>
      </div>

      {/* Filters and Sorting */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-secondary-600" />
            <span className="font-medium text-secondary-900">Filters:</span>
          </div>

          {/* Difficulty Filter - only show if recipes have difficulty data */}
          {hasDifficultyData && (
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          )}

          {/* Cook Time Filter */}
          <select
            value={cookTimeFilter}
            onChange={(e) => setCookTimeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Cook Times</option>
            <option value="quick">Quick (≤30 min)</option>
            <option value="medium">Medium (31-60 min)</option>
            <option value="long">Long (&gt;60 min)</option>
          </select>

          <div className="flex items-center space-x-2 ml-auto">
            <span className="font-medium text-secondary-900">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="name">Name</option>
              <option value="cookTime">Cook Time</option>
              <option value="servings">Servings</option>
              {hasDifficultyData && <option value="difficulty">Difficulty</option>}
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-secondary-600">
          Showing {filteredRecipes.length} of {recipes.length} recipes
        </p>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => {
          const isFavorite = favorites.find(fav => fav.id === recipe.id);
          
          return (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  loading="lazy"
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => toggleFavorite(recipe)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-colors duration-200 ${
                    isFavorite
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-white text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Star className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary-900 mb-2">
                  {recipe.title}
                </h3>
                
                <div className="flex items-center space-x-4 text-sm text-secondary-600 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {recipe.cookTime}m
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {recipe.servings} servings
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {recipe.difficulty && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                        {recipe.difficulty}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-secondary-600">
                    {recipe.cuisine}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {(recipe.tags || []).slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/recipe/${recipe.id}`}
                  className="block w-full text-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold text-secondary-900 mb-2">
            No recipes found
          </h3>
          <p className="text-secondary-600 mb-6">
            Try adjusting your filters to see more recipes.
          </p>
          <button
            onClick={() => {
              setDifficultyFilter('all');
              setCookTimeFilter('all');
            }}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default CollectionDetail; 