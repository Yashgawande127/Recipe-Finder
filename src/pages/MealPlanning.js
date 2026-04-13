import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  ShoppingCart, 
  Plus, 
  Trash2, 
  ArrowLeft,
  Filter,
  Search,
  List,
  Settings
} from 'lucide-react';
import { useMealPlan } from '../context/MealPlanContext';
import { useRecipe } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';

const MealPlanning = () => {
  // Check if contexts are available
  let mealPlanContext, recipeContext;
  
  try {
    mealPlanContext = useMealPlan();
  } catch (error) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> Failed to load MealPlan context. Please refresh the page.
        </div>
      </div>
    );
  }

  try {
    recipeContext = useRecipe();
  } catch (error) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> Failed to load Recipe context. Please refresh the page.
        </div>
      </div>
    );
  }

  const {
    mealPlan,
    shoppingList,
    dietaryPreferences,
    addToMealPlan,
    removeFromMealPlan,
    clearMealPlan,
    deleteMealPlan,
    generateShoppingList,
    toggleShoppingItem,
    removeShoppingItem,
    clearShoppingList,
    updateDietaryPreferences,
    getShoppingListStats,
    getOrganizedShoppingList
  } = mealPlanContext;

  const { filteredRecipes, getRecipesByDietaryPreferences } = recipeContext;

  // State for UI
  const [selectedDay, setSelectedDay] = useState('monday');
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showShoppingModal, setShowShoppingModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [availableRecipes, setAvailableRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load available recipes based on dietary preferences
  useEffect(() => {
    const loadAvailableRecipes = async () => {
      try {
        setLoading(true);
        const recipes = getRecipesByDietaryPreferences(dietaryPreferences);
        setAvailableRecipes(recipes);
      } catch (error) {
        setError('Failed to load recipes');
      } finally {
        setLoading(false);
      }
    };

    loadAvailableRecipes();
  }, [dietaryPreferences, getRecipesByDietaryPreferences]);

  // Error boundary for debugging
  if (!mealPlan || !shoppingList || !dietaryPreferences) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> Meal planning context not properly initialized. Please refresh the page.
        </div>
      </div>
    );
  }

  const stats = getShoppingListStats();
  const organizedShoppingList = getOrganizedShoppingList();
  
  const [activeTab, setActiveTab] = useState('meal-plan');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');

  // Filter recipes for recipe selection
  const filteredAvailableRecipes = availableRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = !selectedCuisine || recipe.cuisine === selectedCuisine;
    const matchesDiet = !selectedDiet || recipe.diet === selectedDiet;
    
    return matchesSearch && matchesCuisine && matchesDiet;
  });

  const handleDeleteMealPlan = () => {
    if (window.confirm('Are you sure you want to delete your entire meal plan? This action cannot be undone.')) {
      deleteMealPlan();
    }
  };

  const handleDietaryPreferenceChange = (preference) => {
    updateDietaryPreferences({
      [preference]: !dietaryPreferences[preference]
    });
  };

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  // Fallback recipes if none are available
  const fallbackRecipes = [
    {
      id: 'fallback-1',
      title: 'Sample Recipe 1',
      description: 'A sample recipe for testing',
      cookTime: 30,
      cuisine: 'Italian',
      diet: 'Vegetarian',
      ingredients: ['2 cups pasta', '1 cup tomato sauce', '1/2 cup cheese']
    },
    {
      id: 'fallback-2',
      title: 'Sample Recipe 2',
      description: 'Another sample recipe',
      cookTime: 45,
      cuisine: 'Mexican',
      diet: 'Vegan',
      ingredients: ['1 cup rice', '1 can beans', '1 onion']
    }
  ];

  const recipesToShow = filteredAvailableRecipes.length > 0 ? filteredAvailableRecipes : fallbackRecipes;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="flex items-center text-secondary-600 hover:text-secondary-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-secondary-900">Meal Planning</h1>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('meal-plan')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'meal-plan'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 text-secondary-700 hover:bg-gray-300'
            }`}
          >
            <Calendar className="h-4 w-4 inline mr-2" />
            Meal Plan
          </button>
          <button
            onClick={() => setActiveTab('shopping-list')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'shopping-list'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 text-secondary-700 hover:bg-gray-300'
            }`}
          >
            <ShoppingCart className="h-4 w-4 inline mr-2" />
            Shopping List
          </button>
        </div>
      </div>

      {/* Dietary Preferences */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-secondary-900 mb-4">Dietary Preferences</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(dietaryPreferences).map(([preference, isEnabled]) => (
            <label key={preference} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={isEnabled}
                onChange={() => handleDietaryPreferenceChange(preference)}
                className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-3 text-secondary-900 capitalize">
                {preference.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Meal Plan Tab */}
      {activeTab === 'meal-plan' && (
        <div className="space-y-6">
          {/* Weekly Meal Plan */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">Weekly Meal Plan</h2>
              <div className="flex space-x-2">
                <button
                  onClick={generateShoppingList}
                  className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Generate Shopping List
                </button>
                <button
                  onClick={handleDeleteMealPlan}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Plan
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {daysOfWeek.map(day => (
                <div key={day} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-secondary-900 mb-3 capitalize">{day}</h3>
                  <div className="space-y-2">
                    {mealPlan[day].map((recipe, index) => (
                      <div key={`${day}-${index}-${recipe.id || recipe.title}`} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-secondary-900 truncate">{recipe.title}</p>
                          <p className="text-xs text-secondary-600">{recipe.cookTime}m</p>
                        </div>
                        <button
                          onClick={() => removeFromMealPlan(day, recipe.id || index)}
                          className="ml-2 p-1 text-red-500 hover:bg-red-100 rounded"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setSelectedDay(day);
                        setActiveTab('add-meal');
                      }}
                      className="w-full p-2 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:border-primary-500 hover:text-primary-500 transition-colors"
                    >
                      <Plus className="h-4 w-4 mx-auto" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Shopping List Tab */}
      {activeTab === 'shopping-list' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-secondary-900">Shopping List</h2>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-secondary-600">
                {stats.checked} of {stats.total} items
              </div>
              <button
                onClick={clearShoppingList}
                className="text-sm text-red-500 hover:text-red-700 transition-colors"
              >
                Clear List
              </button>
            </div>
          </div>
          
          {shoppingList.length > 0 ? (
            <div className="space-y-6">
              {Object.entries(organizedShoppingList).map(([categoryName, items]) => (
                <div key={categoryName} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-4 py-3 border-b border-gray-200">
                    <h3 className="font-semibold text-secondary-900 text-lg flex items-center">
                      {categoryName}
                      <span className="ml-2 text-xs bg-primary-200 text-primary-800 px-2 py-1 rounded-full">
                        {items.length} {items.length === 1 ? 'item' : 'items'}
                      </span>
                    </h3>
                  </div>
                  <div className="p-4 space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleShoppingItem(item.id)}
                          className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className={`ml-3 flex-1 ${item.checked ? 'line-through text-gray-500' : 'text-secondary-900'}`}>
                          <span className="font-medium">{item.quantity} {item.unit}</span> {item.name}
                        </span>
                        <button
                          onClick={() => removeShoppingItem(item.id)}
                          className="ml-2 p-1 text-red-500 hover:bg-red-100 rounded transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 text-secondary-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary-700 mb-2">
                No shopping list yet
              </h3>
              <p className="text-secondary-600">
                Add meals to your plan and generate a shopping list to get started.
              </p>
              <button
                onClick={() => setActiveTab('meal-plan')}
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
              >
                Go to Meal Plan
              </button>
            </div>
          )}
        </div>
      )}

      {/* Add Meal Tab */}
      {activeTab === 'add-meal' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-secondary-900">
                Add Meal to {selectedDay ? selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1) : 'Plan'}
              </h2>
              <button
                onClick={() => setActiveTab('meal-plan')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Back to Meal Plan
              </button>
            </div>

            {/* Recipe Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search recipes..."
                    className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Cuisine</label>
                <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Cuisines</option>
                  <option value="Italian">Italian</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Indian">Indian</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Thai">Thai</option>
                  <option value="French">French</option>
                  <option value="Mediterranean">Mediterranean</option>
                  <option value="American">American</option>
                  <option value="Greek">Greek</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Korean">Korean</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Diet</label>
                <select
                  value={selectedDiet}
                  onChange={(e) => setSelectedDiet(e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Diets</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Gluten-Free">Gluten-Free</option>
                  <option value="Dairy-Free">Dairy-Free</option>
                  <option value="Low-Carb">Low-Carb</option>
                  <option value="Keto">Keto</option>
                  <option value="Paleo">Paleo</option>
                  <option value="Pescatarian">Pescatarian</option>
                </select>
              </div>
            </div>

            {/* Recipe Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipesToShow.map(recipe => (
                <div key={recipe.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-secondary-900 truncate">{recipe.title}</h3>
                    <button
                      onClick={() => {
                        addToMealPlan(selectedDay, recipe);
                        setActiveTab('meal-plan');
                      }}
                      className="flex items-center px-3 py-1 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors text-sm"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </button>
                  </div>
                  <p className="text-sm text-secondary-600 mb-2">{recipe.description}</p>
                  <div className="flex items-center justify-between text-xs text-secondary-500">
                    <span>{recipe.cookTime}m</span>
                    <span>{recipe.cuisine}</span>
                    {recipe.diet && <span className="text-primary-600">{recipe.diet}</span>}
                  </div>
                </div>
              ))}
            </div>

            {recipesToShow.length === 0 && (
              <div className="text-center py-12">
                <Filter className="h-16 w-16 text-secondary-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-secondary-700 mb-2">
                  No recipes found
                </h3>
                <p className="text-secondary-600">
                  Try adjusting your search terms or dietary preferences.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanning; 