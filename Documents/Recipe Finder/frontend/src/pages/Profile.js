import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRecipe } from '../context/RecipeContext';
import { useMealPlan } from '../context/MealPlanContext';
import { useGamification } from '../context/GamificationContext';
import { 
  User, 
  Heart, 
  Clock, 
  Calendar, 
  ShoppingCart, 
  Settings, 
  ChefHat, 
  TrendingUp,
  Plus,
  Trash2,
  Edit,
  Star,
  Camera,
  Smile,
  Save,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  CookingButton, 
  RecipeCardButton, 
  IngredientButton, 
  ChefHatButton, 
  MenuButton, 
  SpiceButton 
} from '../components/AnimatedButton';

const Profile = () => {
  const { user, logout } = useAuth();
  const { favorites, getCommentsForRecipe } = useRecipe();
  const {
    mealPlan,
    shoppingList,
    dietaryPreferences,
    addToMealPlan,
    removeFromMealPlan,
    deleteMealPlan,
    generateShoppingList,
    toggleShoppingItem,
    removeShoppingItem,
    updateDietaryPreferences,
    getTotalPlannedMeals,
    getShoppingListStats,
    getOrganizedShoppingList,
    clearMealPlan,
    clearShoppingList
  } = useMealPlan();
  const {
    userStats,
    earnedBadges,
    earnedAchievements,
    BADGES,
    ACHIEVEMENTS,
    getProgressForBadge,
    getProgressForAchievement
  } = useGamification();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showBioModal, setShowBioModal] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(user?.avatar || '👨‍🍳');
  const [bio, setBio] = useState(user?.bio || '');
  const [tempBio, setTempBio] = useState(bio);

  // Popular emojis for food lovers
  const foodEmojis = [
    '👨‍🍳', '👩‍🍳', '🍕', '🍔', '🍜', '🍣', '🥗', '🍰', '☕', '🍷',
    '🥕', '🍅', '🥑', '🥩', '🐟', '🍳', '🥖', '🧀', '🍫', '🍓',
    '🌶️', '🧄', '🧅', '🥬', '🥦', '🍎', '🍌', '🍇', '🥭', '🍍',
    '🥥', '🥝', '🍊', '🍋', '🍉', '🍈', '🍒', '🍑', '🥭', '🍍'
  ];

  // Calculate cooking history (recipes with comments)
  const cookingHistory = (favorites || []).filter(recipe => 
    getCommentsForRecipe(recipe.id).length > 0
  );

  const handleDietaryPreferenceChange = (preference) => {
    updateDietaryPreferences({
      [preference]: !dietaryPreferences[preference]
    });
  };

  const handleAvatarSave = () => {
    // In a real app, you would save this to the user's profile
    // For now, we'll just update the local state
    setSelectedEmoji(selectedEmoji);
    setShowAvatarModal(false);
  };

  const handleBioSave = () => {
    setBio(tempBio);
    setShowBioModal(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCurrentAvatar = () => {
    if (user?.profileImage) {
      return (
        <img 
          src={user.profileImage} 
          alt="Profile" 
          loading="lazy"
          className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
        />
      );
    }
    return (
      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-2xl shadow-lg border-4 border-white">
        {selectedEmoji}
      </div>
    );
  };

  const DashboardTab = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-700 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            {getCurrentAvatar()}
            <div>
              <h2 className="text-3xl font-bold mb-1">
                Welcome back, {user.name || user.username || 'Chef'}! 👋
              </h2>
              <p className="text-primary-100 text-lg">Ready to create something delicious today?</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-6">
            <Link to="/create-recipe">
              <CookingButton
                variant="secondary"
                className="bg-white text-primary-600 hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
                preventDefaultBehavior={false}
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Recipe
              </CookingButton>
            </Link>
            <Link to="/seasonal-collections">
              <MenuButton
                foodIcon="🍂"
                className="bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-all duration-200 transform hover:scale-105"
              >
                <span>Explore Seasonal</span>
              </MenuButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl border border-red-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-red-700">{favorites.length}</p>
              <p className="text-red-600 font-medium">Saved Recipes</p>
            </div>
          </div>
          <div className="flex items-center text-sm text-red-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>Your collection is growing!</span>
          </div>
        </div>
        
        <div className="group bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-orange-700">{cookingHistory.length}</p>
              <p className="text-orange-600 font-medium">Cooked Recipes</p>
            </div>
          </div>
          <div className="flex items-center text-sm text-orange-600">
            <Star className="h-4 w-4 mr-1" />
            <span>Keep up the great cooking!</span>
          </div>
        </div>
        
        <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-700">{getTotalPlannedMeals()}</p>
              <p className="text-blue-600 font-medium">Planned Meals</p>
            </div>
          </div>
          <div className="flex items-center text-sm text-blue-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>Your week is organized!</span>
          </div>
        </div>
        
        <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl border border-yellow-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-yellow-700">{userStats.totalPoints || 0}</p>
              <p className="text-yellow-600 font-medium">Total Points</p>
            </div>
          </div>
          <div className="flex items-center text-sm text-yellow-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>You're on fire! 🔥</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-secondary-900 mb-6 flex items-center">
          <div className="w-2 h-8 bg-gradient-to-b from-primary-500 to-secondary-600 rounded-full mr-3"></div>
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/favorites">
            <div className="group p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 hover:shadow-md transition-all duration-200 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-500 rounded-lg group-hover:scale-110 transition-transform duration-200">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-red-700">My Favorites</p>
                  <p className="text-sm text-red-600">{favorites.length} recipes saved</p>
                </div>
              </div>
            </div>
          </Link>
          
          <Link to="/my-recipes">
            <div className="group p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-md transition-all duration-200 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500 rounded-lg group-hover:scale-110 transition-transform duration-200">
                  <ChefHat className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-green-700">My Recipes</p>
                  <p className="text-sm text-green-600">Manage your creations</p>
                </div>
              </div>
            </div>
          </Link>
          
          <Link to="/seasonal-collections">
            <div className="group p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-200 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-200">
                  <span className="text-white text-lg">🍂</span>
                </div>
                <div>
                  <p className="font-semibold text-purple-700">Seasonal Collections</p>
                  <p className="text-sm text-purple-600">Discover fresh recipes</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Enhanced Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-secondary-900 flex items-center">
            <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-3"></div>
            Recent Activity
          </h3>
          <Link to="/favorites" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            View All →
          </Link>
        </div>
        
        {cookingHistory.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="h-10 w-10 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-secondary-900 mb-2">No recent activity</h4>
            <p className="text-secondary-600 mb-6">Start by saving some recipes and cooking them!</p>
            <Link to="/">
              <CookingButton
                variant="primary"
                className="flex items-center mx-auto"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Browse Recipes
              </CookingButton>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cookingHistory.slice(0, 5).map((recipe, index) => (
              <div 
                key={recipe.id} 
                className="group flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="w-16 h-16 rounded-xl object-cover group-hover:scale-105 transition-transform duration-200" 
                  />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <p className="font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors duration-200">
                    {recipe.title}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-secondary-600 mt-1">
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                      {recipe.cuisine}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {recipe.cookTime}m
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl mb-1">👨‍🍳</div>
                  <p className="text-xs text-secondary-500">Cooked</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cooking Streak & Motivation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-green-800">Cooking Streak</h3>
            <div className="text-3xl">🔥</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-700 mb-2">7</div>
            <p className="text-green-600 font-medium">Days in a row!</p>
            <p className="text-sm text-green-500 mt-2">Keep the momentum going</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-800">This Week's Goal</h3>
            <div className="text-3xl">🎯</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-700 mb-2">3/5</div>
            <p className="text-blue-600 font-medium">Recipes cooked</p>
            <div className="w-full bg-blue-200 rounded-full h-2 mt-3">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="text-sm text-blue-500 mt-2">2 more to go!</p>
          </div>
        </div>
      </div>
    </div>
  );

  const GamificationTab = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-secondary-900 mb-4">Your Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{userStats.recipesCreated || 0}</div>
            <div className="text-sm text-secondary-600">Recipes Created</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{userStats.commentsPosted || 0}</div>
            <div className="text-sm text-secondary-600">Comments Posted</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{userStats.recipesFavorited || 0}</div>
            <div className="text-sm text-secondary-600">Recipes Favorited</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{userStats.totalPoints || 0}</div>
            <div className="text-sm text-secondary-600">Total Points</div>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-secondary-900 mb-4">Badges</h3>
        {earnedBadges.length === 0 ? (
          <p className="text-secondary-600">No badges yet. Keep cooking to earn badges!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {earnedBadges.map(badge => (
              <div key={badge.id} className="flex flex-col items-center bg-primary-50 rounded-lg p-4 shadow-sm">
                <div className="text-3xl mb-2">{badge.icon}</div>
                <div className="font-semibold text-primary-700 mb-1 text-center text-sm">{badge.name}</div>
                <div className="text-xs text-gray-500 mb-1 text-center">{badge.description}</div>
                <div className="text-xs text-gray-400">+{badge.points} pts</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Achievements Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-secondary-900 mb-4">Achievements</h3>
        {earnedAchievements.length === 0 ? (
          <p className="text-secondary-600">No achievements yet. Keep earning points to unlock achievements!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {earnedAchievements.map(ach => (
              <div key={ach.id} className="flex flex-col items-center bg-yellow-50 rounded-lg p-4 shadow-sm">
                <div className="text-3xl mb-2">{ach.icon}</div>
                <div className="font-semibold text-yellow-700 mb-1 text-center text-sm">{ach.name}</div>
                <div className="text-xs text-gray-500 mb-1 text-center">{ach.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Progress Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-secondary-900 mb-4">Progress</h3>
        <div className="space-y-4">
          {Object.values(BADGES).map(badge => {
            const progress = getProgressForBadge(badge.id);
            const isEarned = earnedBadges.find(earned => earned.id === badge.id);
            return (
              <div key={badge.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl mr-3">{badge.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-secondary-900">{badge.name}</span>
                    <span className="text-sm text-secondary-600">
                      {progress}/{badge.requirement}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${isEarned ? 'bg-green-500' : 'bg-primary-500'}`}
                      style={{ width: `${Math.min((progress / badge.requirement) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const DietaryPreferencesTab = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-secondary-900 mb-6">Dietary Preferences</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(dietaryPreferences).map(([preference, isEnabled]) => (
          <IngredientButton
            key={preference}
            onClick={() => handleDietaryPreferenceChange(preference)}
            active={isEnabled}
            className="w-full"
          >
            {preference.replace(/([A-Z])/g, ' $1').trim()}
          </IngredientButton>
        ))}
      </div>
    </div>
  );

  const MealPlanningTab = () => {
    const stats = getShoppingListStats();
    const organizedShoppingList = getOrganizedShoppingList();
    const [selectedDay, setSelectedDay] = useState('monday');
    const [showRecipeBrowser, setShowRecipeBrowser] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCuisine, setFilterCuisine] = useState('all');
    
    // Get all recipes for browsing
    const allRecipes = (favorites || []).concat([
      // Add some sample recipes for demonstration
      {
        id: 'sample1',
        title: 'Grilled Chicken Salad',
        cuisine: 'American',
        cookTime: 25,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        ingredients: ['2 chicken breasts', 'mixed greens', 'cherry tomatoes', 'cucumber', 'olive oil', 'balsamic vinegar']
      },
      {
        id: 'sample2',
        title: 'Pasta Carbonara',
        cuisine: 'Italian',
        cookTime: 20,
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400',
        ingredients: ['spaghetti', 'eggs', 'bacon', 'parmesan cheese', 'black pepper', 'salt']
      },
      {
        id: 'sample3',
        title: 'Vegetable Stir Fry',
        cuisine: 'Asian',
        cookTime: 15,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
        ingredients: ['broccoli', 'carrots', 'bell peppers', 'soy sauce', 'ginger', 'garlic', 'vegetable oil']
      }
    ]);

    // Filter recipes
    const filteredRecipes = allRecipes.filter(recipe => 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterCuisine === 'all' || recipe.cuisine === filterCuisine)
    );

    const handleAddToMealPlan = (recipe) => {
      addToMealPlan(selectedDay, recipe);
      setShowRecipeBrowser(false);
      setSearchQuery('');
    };

    const handleRemoveFromMealPlan = (day, index) => {
      removeFromMealPlan(day, index);
    };

    const handleDeleteMealPlan = () => {
      if (window.confirm('Are you sure you want to delete your entire meal plan? This action cannot be undone.')) {
        deleteMealPlan();
      }
    };

    return (
      <div className="space-y-6">
        {/* Meal Planning Header */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-semibold text-secondary-900">Weekly Meal Planning</h3>
              <p className="text-secondary-600">Plan your meals for the week and generate shopping lists</p>
            </div>
            <div className="flex space-x-2">
              <CookingButton
                onClick={() => setShowRecipeBrowser(true)}
                variant="primary"
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Recipe
              </CookingButton>
              <CookingButton
                onClick={generateShoppingList}
                variant="secondary"
                className="flex items-center"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Generate Shopping List
              </CookingButton>
              <CookingButton
                onClick={handleDeleteMealPlan}
                variant="danger"
                className="flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Plan
              </CookingButton>
            </div>
          </div>

          {/* Day Selection */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(mealPlan).map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedDay === day
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 text-secondary-700 hover:bg-gray-200'
                }`}
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Recipe Browser Modal */}
        {showRecipeBrowser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-secondary-900">
                    Add Recipe to {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}
                  </h3>
                  <button
                    onClick={() => setShowRecipeBrowser(false)}
                    className="text-secondary-400 hover:text-secondary-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search recipes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <select
                    value={filterCuisine}
                    onChange={(e) => setFilterCuisine(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Cuisines</option>
                    <option value="American">American</option>
                    <option value="Italian">Italian</option>
                    <option value="Asian">Asian</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Indian">Indian</option>
                  </select>
                </div>

                {/* Recipe Grid */}
                <div className="overflow-y-auto max-h-96">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                    {filteredRecipes.map(recipe => (
                      <div key={recipe.id} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-start space-x-3">
                          <img 
                            src={recipe.image} 
                            alt={recipe.title} 
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-secondary-900 truncate">{recipe.title}</h4>
                            <p className="text-sm text-secondary-600">{recipe.cuisine} • {recipe.cookTime}m</p>
                            <CookingButton
                              onClick={() => handleAddToMealPlan(recipe)}
                              variant="primary"
                              className="mt-2 text-xs"
                            >
                              Add to {selectedDay}
                            </CookingButton>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Weekly Meal Plan */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-secondary-900 mb-6">Your Weekly Meal Plan</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {Object.entries(mealPlan).map(([day, meals]) => {
              // Ensure meals is always an array
              const mealsArray = Array.isArray(meals) ? meals : [];
              
              return (
              <div key={day} className={`border-2 rounded-lg p-4 transition-all duration-200 ${
                selectedDay === day 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <h4 className="font-semibold text-secondary-900 mb-3 capitalize flex items-center justify-between">
                  {day}
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                    {mealsArray.length} meals
                  </span>
                </h4>
                <div className="space-y-2">
                  {mealsArray.length === 0 ? (
                    <div className="text-center py-6">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Plus className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-sm text-secondary-500">No meals planned</p>
                      <CookingButton
                        onClick={() => {
                          setSelectedDay(day);
                          setShowRecipeBrowser(true);
                        }}
                        variant="secondary"
                        className="mt-2 text-xs"
                      >
                        Add Recipe
                      </CookingButton>
                    </div>
                  ) : (
                    mealsArray.map((meal, index) => (
                      <div key={index} className="p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow duration-200">
                        <div className="flex items-start space-x-2">
                          <img 
                            src={meal.image} 
                            alt={meal.title} 
                            className="w-10 h-10 rounded object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-secondary-900 truncate">{meal.title}</p>
                            <p className="text-xs text-secondary-600">{meal.cookTime}m</p>
                          </div>
                          <button
                            onClick={() => handleRemoveFromMealPlan(day, index)}
                            className="text-red-400 hover:text-red-600 transition-colors duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              );
            })}
          </div>
        </div>

        {/* Shopping List */}
        {shoppingList.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-secondary-900">Shopping List</h3>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-secondary-600">
                  {stats.checked} of {stats.total} items
                </div>
                <SpiceButton
                  onClick={clearShoppingList}
                  spiceColor="red"
                  className="text-sm"
                >
                  Clear List
                </SpiceButton>
              </div>
            </div>
            
            <div className="space-y-4">
              {Object.entries(organizedShoppingList).map(([category, items]) => (
                <div key={category} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-secondary-900 mb-3 flex items-center">
                    <span className="w-3 h-3 bg-primary-500 rounded-full mr-2"></span>
                    {category}
                  </h4>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleShoppingItem(item.id)}
                          className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className={`ml-3 flex-1 ${item.checked ? 'line-through text-gray-500' : 'text-secondary-900'}`}>
                          {item.quantity} {item.unit} {item.name}
                        </span>
                        <SpiceButton
                          onClick={() => removeShoppingItem(item.id)}
                          spiceColor="red"
                          className="ml-2 p-1"
                        >
                          <Trash2 className="h-3 w-3" />
                        </SpiceButton>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Meal Planning Tips */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
            <ChefHat className="h-5 w-5 mr-2" />
            Meal Planning Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <p className="font-medium mb-1">• Plan meals that use similar ingredients</p>
              <p className="font-medium mb-1">• Consider prep time and cooking time</p>
              <p className="font-medium mb-1">• Include variety in your weekly plan</p>
            </div>
            <div>
              <p className="font-medium mb-1">• Plan for leftovers to save time</p>
              <p className="font-medium mb-1">• Check your pantry before shopping</p>
              <p className="font-medium mb-1">• Consider dietary preferences and restrictions</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative group">
              {getCurrentAvatar()}
              <button
                onClick={() => setShowAvatarModal(true)}
                className="absolute -bottom-1 -right-1 bg-primary-500 text-white p-2 rounded-full shadow-lg hover:bg-primary-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-secondary-900 mb-1">
                {user.name || user.username || 'Chef'}
              </h1>
              <div className="flex items-center space-x-3">
                <p className="text-secondary-600">
                  {bio || "Add a bio to tell others about your cooking journey!"}
                </p>
                <button
                  onClick={() => setShowBioModal(true)}
                  className="text-primary-500 hover:text-primary-600 transition-colors duration-200"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <CookingButton
            onClick={logout}
            variant="secondary"
            className="px-4 py-2"
          >
            Logout
          </CookingButton>
        </div>
      </div>

      {/* Avatar Selection Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-secondary-900">Choose Your Avatar</h3>
                <button
                  onClick={() => setShowAvatarModal(false)}
                  className="text-secondary-400 hover:text-secondary-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {/* Current Avatar Preview */}
              <div className="text-center mb-6">
                <div className="inline-block">
                  {user?.profileImage && (
                    <img 
                      src={user.profileImage} 
                      alt="Current Avatar" 
                      loading="lazy"
                      className="w-20 h-20 rounded-full object-cover border-4 border-primary-200"
                    />
                  )}
                </div>
                <p className="text-sm text-secondary-600 mt-2">Current Avatar</p>
              </div>

              {/* Upload Image Option */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Upload Profile Picture
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary-400 transition-colors duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="profile-image-upload"
                  />
                  <label htmlFor="profile-image-upload" className="cursor-pointer">
                    <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload an image</p>
                    <p className="text-xs text-gray-500">JPG, PNG up to 5MB</p>
                  </label>
                </div>
              </div>

              {/* Emoji Selection */}
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-3">
                  Or Choose an Emoji
                </label>
                <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto">
                  {foodEmojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedEmoji(emoji);
                      }}
                      className={`w-10 h-10 rounded-lg text-xl hover:bg-gray-100 transition-colors duration-200 ${
                        selectedEmoji === emoji ? 'bg-primary-100 border-2 border-primary-500' : ''
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 flex space-x-3">
              <CookingButton
                onClick={() => setShowAvatarModal(false)}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </CookingButton>
              <CookingButton
                onClick={handleAvatarSave}
                variant="primary"
                className="flex-1"
              >
                Save Avatar
              </CookingButton>
            </div>
          </div>
        </div>
      )}

      {/* Bio Editing Modal */}
      {showBioModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-secondary-900">Edit Your Bio</h3>
                <button
                  onClick={() => setShowBioModal(false)}
                  className="text-secondary-400 hover:text-secondary-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Tell us about your cooking journey
                </label>
                <textarea
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  placeholder="e.g., Veggie lover 🥕 | Baking enthusiast 🎂 | Italian food fan 🍝"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  rows="4"
                  maxLength="150"
                />
                <p className="text-xs text-secondary-500 mt-1">
                  {tempBio.length}/150 characters
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-secondary-600 mb-2">Bio Examples:</p>
                <div className="space-y-1 text-xs text-secondary-500">
                  <p>• "Veggie lover 🥕 | Baking enthusiast 🎂"</p>
                  <p>• "Italian food fan 🍝 | Coffee addict ☕"</p>
                  <p>• "Home chef 👨‍🍳 | Spice collector 🌶️"</p>
                  <p>• "Healthy eating advocate 🥗 | Dessert lover 🍰"</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 flex space-x-3">
              <CookingButton
                onClick={() => {
                  setTempBio(bio);
                  setShowBioModal(false);
                }}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </CookingButton>
              <CookingButton
                onClick={handleBioSave}
                variant="primary"
                className="flex-1"
              >
                Save Bio
              </CookingButton>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b border-gray-200">
          <RecipeCardButton
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'dashboard'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-secondary-600 hover:text-secondary-900'
            }`}
          >
            Dashboard
          </RecipeCardButton>
          <RecipeCardButton
            onClick={() => setActiveTab('gamification')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'gamification'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-secondary-600 hover:text-secondary-900'
            }`}
          >
            Badges & Points
          </RecipeCardButton>
          <RecipeCardButton
            onClick={() => setActiveTab('meal-planning')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'meal-planning'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-secondary-600 hover:text-secondary-900'
            }`}
          >
            Meal Planning
          </RecipeCardButton>
          <RecipeCardButton
            onClick={() => setActiveTab('dietary-preferences')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'dietary-preferences'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-secondary-600 hover:text-secondary-900'
            }`}
          >
            Dietary Preferences
          </RecipeCardButton>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && <DashboardTab />}
      {activeTab === 'gamification' && <GamificationTab />}
      {activeTab === 'meal-planning' && <MealPlanningTab />}
      {activeTab === 'dietary-preferences' && <DietaryPreferencesTab />}
    </div>
  );
};

export default Profile; 