import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Leaf, 
  Snowflake, 
  Sun, 
  Star, 
  Clock, 
  Users, 
  ChefHat,
  ArrowRight,
  Heart,
  Search
} from 'lucide-react';
import { seasonalRecipes } from '../data/recipes';
import { useRecipe } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';

const SeasonalCollections = () => {
  const { favorites, addToFavorites, removeFromFavorites } = useRecipe();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  // Get current season for highlighting
  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  };

  const currentSeason = getCurrentSeason();

  // Category icons and colors
  const categoryConfig = {
    thanksgiving: { icon: '🦃', color: 'from-orange-500 to-red-600', bgColor: 'bg-orange-50' },
    christmas: { icon: '🎄', color: 'from-green-500 to-red-600', bgColor: 'bg-green-50' },
    valentinesDay: { icon: '💕', color: 'from-pink-400 to-red-500', bgColor: 'bg-pink-50' },
    easter: { icon: '🐰', color: 'from-yellow-400 to-green-500', bgColor: 'bg-yellow-50' },
    summerBerries: { icon: '🫐', color: 'from-blue-400 to-purple-500', bgColor: 'bg-blue-50' },
    autumnHarvest: { icon: '🍂', color: 'from-orange-400 to-yellow-500', bgColor: 'bg-orange-50' },
    springFresh: { icon: '🌸', color: 'from-pink-300 to-green-400', bgColor: 'bg-green-50' },
    winterComfort: { icon: '❄️', color: 'from-blue-300 to-gray-500', bgColor: 'bg-gray-50' }
  };

  // Define tab categories
  const tabCategories = {
    all: {
      title: 'All Collections',
      icon: '📚',
      collections: Object.keys(seasonalRecipes)
    },
    specialOccasions: {
      title: 'Special Occasions',
      icon: '🎉',
      collections: ['thanksgiving', 'christmas', 'valentinesDay', 'easter']
    },
    seasonalIngredients: {
      title: 'Seasonal Ingredients',
      icon: '🌱',
      collections: ['summerBerries', 'autumnHarvest', 'springFresh', 'winterComfort']
    }
  };

  // Filter collections based on active tab, search, and category
  const getFilteredCollections = () => {
    const tabCollections = tabCategories[activeTab].collections;
    
    return Object.entries(seasonalRecipes)
      .filter(([key, collection]) => {
        // Filter by active tab
        const matchesTab = tabCollections.includes(key);
        
        // Filter by search query
        const matchesSearch = collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             collection.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Filter by category dropdown
        const matchesCategory = selectedCategory === 'all' || key === selectedCategory;
        
        return matchesTab && matchesSearch && matchesCategory;
      });
  };

  const filteredCollections = getFilteredCollections();

  const handleFavoriteToggle = (recipe) => {
    const isFavorite = favorites.some(fav => fav.id === recipe.id);
    if (isFavorite) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  const RecipeCard = ({ recipe, collectionKey }) => {
    const isFavorite = favorites.some(fav => fav.id === recipe.id);
    const config = categoryConfig[collectionKey];

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden group">
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=Recipe+Image';
            }}
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${config.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
          <button
            onClick={() => handleFavoriteToggle(recipe)}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
              isFavorite
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white/80 text-gray-400 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{recipe.title}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{recipe.description}</p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {recipe.cookTime} min
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {recipe.servings} servings
            </div>
            <div className="flex items-center">
              <ChefHat className="h-4 w-4 mr-1" />
              {recipe.cuisine}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span className="text-sm font-medium">{recipe.rating}</span>
            </div>
            <Link
              to={`/recipe/${recipe.id}`}
              className="flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
            >
              View Recipe
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Seasonal & Special Occasion Collections
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover recipes perfect for holidays, celebrations, and seasonal ingredients. 
          From Thanksgiving feasts to summer berry delights, find inspiration for every occasion.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {Object.entries(tabCategories).map(([tabKey, tab]) => (
            <button
              key={tabKey}
              onClick={() => {
                setActiveTab(tabKey);
                setSelectedCategory('all');
              }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                activeTab === tabKey
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200 hover:border-orange-200'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.title}</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                {tab.collections.length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={`Search ${tabCategories[activeTab].title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All {tabCategories[activeTab].title}</option>
            {tabCategories[activeTab].collections.map(key => (
              <option key={key} value={key}>
                {seasonalRecipes[key].title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="space-y-12">
        {filteredCollections.map(([key, collection]) => {
          const config = categoryConfig[key];
          const isCurrentSeason = (key === 'summerBerries' && currentSeason === 'summer') ||
                                 (key === 'autumnHarvest' && currentSeason === 'autumn');

          return (
            <div key={key} className={`rounded-2xl p-8 ${config.bgColor} border border-gray-200`}>
              {/* Collection Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className={`text-4xl mr-4 ${
                    key === 'summerBerries' 
                      ? 'animate-summer-berries-bounce animate-summer-berries-glow animate-spin-slow' 
                      : isCurrentSeason 
                        ? 'animate-bounce' 
                        : ''
                  }`}>
                    {config.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{collection.title}</h2>
                    <p className="text-gray-600 text-lg">{collection.description}</p>
                    {(isCurrentSeason || key === 'summerBerries') && (
                      <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium animate-pulse">
                        🎯 In Season Now
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right flex flex-col items-end space-y-3">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{collection.recipes.length}</div>
                    <div className="text-gray-600">Recipes</div>
                  </div>
                  <Link
                    to={`/collection/${key}`}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    <span>View Collection</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Recipes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collection.recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} collectionKey={key} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredCollections.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">No recipes found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search terms, selecting a different category, or switching tabs.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Seasonal Tips */}
      <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Seasonal Cooking Tips</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">🍓 Summer Berries</h4>
            <p className="text-gray-600 text-sm">
              Look for plump, brightly colored berries. Store in the refrigerator and wash just before using. 
              Perfect for desserts, salads, and smoothies.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">🎃 Autumn Harvest</h4>
            <p className="text-gray-600 text-sm">
              Root vegetables are at their peak. Store in a cool, dark place. 
              Perfect for roasting, soups, and hearty stews.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">🦃 Holiday Cooking</h4>
            <p className="text-gray-600 text-sm">
              Plan ahead and prep ingredients the day before. Use a meat thermometer for perfect turkey. 
              Don't forget to let meat rest before carving.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">🎄 Christmas Baking</h4>
            <p className="text-gray-600 text-sm">
              Bake cookies in batches and freeze extras. Use room temperature ingredients for best results. 
              Decorate with family for a fun tradition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonalCollections; 