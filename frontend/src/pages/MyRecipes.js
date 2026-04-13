import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipe } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { 
  ChefHat, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Clock, 
  Users, 
  Globe,
  Calendar,
  TrendingUp,
  Star,
  Heart,
  Search,
  Filter,
  Grid,
  List,
  Award,
  Sparkles
} from 'lucide-react';
import { CookingButton, MenuButton } from '../components/AnimatedButton';

const MyRecipes = () => {
  const navigate = useNavigate();
  const { getUserRecipes, deleteUserRecipe } = useRecipe();
  const { user } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCuisine, setFilterCuisine] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');

  const userRecipes = getUserRecipes(user?.id);

  // Filter and sort recipes
  const filteredRecipes = userRecipes
    .filter(recipe => 
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
        case 'recent':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  // Get unique cuisines for filter
  const cuisines = ['all', ...new Set(userRecipes.map(recipe => recipe.cuisine))];

  // Calculate statistics
  const stats = {
    total: userRecipes.length,
    totalTime: userRecipes.reduce((sum, recipe) => sum + recipe.cookTime, 0),
    avgRating: userRecipes.length > 0 
      ? (userRecipes.reduce((sum, recipe) => sum + (recipe.rating || 0), 0) / userRecipes.length).toFixed(1)
      : 0,
    topCuisine: userRecipes.length > 0 
      ? Object.entries(
          userRecipes.reduce((acc, recipe) => {
            acc[recipe.cuisine] = (acc[recipe.cuisine] || 0) + 1;
            return acc;
          }, {})
        ).sort(([,a], [,b]) => b - a)[0][0]
      : 'None'
  };

  const handleEdit = (recipeId) => {
    navigate(`/edit-recipe/${recipeId}`);
  };

  const handleDelete = (recipeId) => {
    setShowDeleteConfirm(recipeId);
  };

  const confirmDelete = () => {
    if (showDeleteConfirm) {
      deleteUserRecipe(showDeleteConfirm);
      setShowDeleteConfirm(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCuisineIcon = (cuisine) => {
    const icons = {
      'Italian': '🍝',
      'Mexican': '🌮',
      'Spanish': '🥘',
      'Korean': '🍜',
      'Thai': '🍛',
      'Chinese': '🥡',
      'Japanese': '🍱',
      'Indian': '🍛',
      'French': '🥖',
      'Mediterranean': '🥙',
      'American': '🍔',
      'Other': '🍽️'
    };
    return icons[cuisine] || '🍽️';
  };

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 text-center border border-red-200">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ChefHat className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-red-800 mb-4">Login Required</h2>
          <p className="text-red-600 mb-6">You need to be logged in to view and manage your recipes.</p>
          <CookingButton
            onClick={() => navigate('/login')}
            variant="primary"
            className="bg-red-500 hover:bg-red-600"
          >
            Go to Login
          </CookingButton>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-700 rounded-2xl p-8 text-white relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-xl">
              <ChefHat className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">My Recipe Collection</h1>
              <p className="text-primary-100 text-lg">Manage and showcase your culinary creations! 👨‍🍳</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span>{userRecipes.length} recipes created</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Average rating: {stats.avgRating}</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Total cook time: {stats.totalTime}m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      {userRecipes.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
                <p className="text-blue-600 font-medium">Total Recipes</p>
              </div>
              <ChefHat className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-700">{stats.totalTime}</p>
                <p className="text-green-600 font-medium">Total Cook Time</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
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
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-700">{stats.topCuisine}</p>
                <p className="text-purple-600 font-medium">Top Cuisine</p>
              </div>
              <Globe className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter Section */}
      {userRecipes.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
              <input
                type="text"
                placeholder="Search your recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <span className="text-secondary-600 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="recent">Recently Created</option>
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
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {cuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine === 'all' ? 'All Cuisines' : cuisine}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Recipe Button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-secondary-900">Your Recipes</h2>
          <p className="text-secondary-600">
            {filteredRecipes.length} of {userRecipes.length} recipes
          </p>
        </div>
        <CookingButton
          onClick={() => navigate('/create-recipe')}
          variant="primary"
          className="flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Recipe
        </CookingButton>
      </div>

      {/* Recipes Grid/List */}
      {userRecipes.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ChefHat className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-secondary-900 mb-4">No recipes yet</h3>
          <p className="text-secondary-600 mb-8 max-w-md mx-auto">
            Start creating your own recipes to build your personal collection and share your culinary expertise with the world!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CookingButton
              onClick={() => navigate('/create-recipe')}
              variant="primary"
              className="flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Recipe
            </CookingButton>
            <MenuButton
              foodIcon="🍂"
              onClick={() => navigate('/seasonal-collections')}
              className="flex items-center"
            >
              <span>Get Inspired</span>
            </MenuButton>
          </div>
        </div>
      ) : filteredRecipes.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
          <Search className="h-16 w-16 text-secondary-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-secondary-900 mb-2">No recipes found</h3>
          <p className="text-secondary-600 mb-6">Try adjusting your search terms or filters.</p>
          <CookingButton
            onClick={() => {
              setSearchQuery('');
              setFilterCuisine('all');
              setSortBy('recent');
            }}
            variant="secondary"
            className="flex items-center mx-auto"
          >
            <Filter className="h-4 w-4 mr-2" />
            Clear Filters
          </CookingButton>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredRecipes.map((recipe) => (
            <div 
              key={recipe.id} 
              className={`bg-white border-2 border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {recipe.image && (
                <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    loading="lazy"
                    className={`${viewMode === 'list' ? 'w-full h-32' : 'w-full h-48'} object-cover rounded-t-2xl`}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';
                    }}
                  />
                </div>
              )}
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">{recipe.title}</h3>
                  <div className="flex items-center space-x-1 text-sm text-secondary-500">
                    <span>{getCuisineIcon(recipe.cuisine)}</span>
                    <span>{recipe.cuisine}</span>
                  </div>
                </div>
                
                <p className="text-secondary-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-secondary-500 mb-4">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {recipe.cookTime} min
                  </span>
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {recipe.servings} servings
                  </span>
                  {recipe.rating > 0 && (
                    <span className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      {recipe.rating}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-secondary-400 mb-4">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Created: {formatDate(recipe.createdAt)}
                  </span>
                  {recipe.updatedAt !== recipe.createdAt && (
                    <span>Updated: {formatDate(recipe.updatedAt)}</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <CookingButton
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                    variant="secondary"
                    className="flex-1 flex items-center justify-center"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </CookingButton>
                  <CookingButton
                    onClick={() => handleEdit(recipe.id)}
                    variant="secondary"
                    className="flex-1 flex items-center justify-center"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </CookingButton>
                  <button
                    onClick={() => handleDelete(recipe.id)}
                    className="flex-1 bg-red-500 text-white py-2 px-3 rounded-xl text-sm hover:bg-red-600 transition-all duration-200 flex items-center justify-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">Delete Recipe</h3>
              <p className="text-secondary-600">
                Are you sure you want to delete this recipe? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <CookingButton
                onClick={confirmDelete}
                variant="danger"
                className="flex-1"
              >
                Delete Recipe
              </CookingButton>
              <CookingButton
                onClick={cancelDelete}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </CookingButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecipes; 