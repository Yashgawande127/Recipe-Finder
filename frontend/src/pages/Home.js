import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, Heart, ChefHat, Calendar, Sparkles, ArrowRight, TrendingUp, Award, Flame, Sun, Leaf, Snowflake, TreePine } from 'lucide-react';
import { useRecipe } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';
import { CookingButton, MenuButton, ChefHatButton } from '../components/AnimatedButton';

const Home = () => {
  const { filteredRecipes, userRecipes, searchQuery } = useRecipe();
  const { user } = useAuth();
  const [showAllRecipes, setShowAllRecipes] = useState(false);

  // Combine recipes and filter out duplicates based on ID
  const allRecipes = React.useMemo(() => {
    const combined = [...filteredRecipes];
    userRecipes.forEach(userRecipe => {
      if (!combined.some(recipe => recipe.id === userRecipe.id)) {
        combined.push(userRecipe);
      }
    });
    return combined;
  }, [filteredRecipes, userRecipes]);
  
  const featuredRecipes = allRecipes.slice(0, 6);
  const displayedRecipes = showAllRecipes ? allRecipes : featuredRecipes;

  const stats = [
    { icon: ChefHat, label: 'Total Recipes', value: allRecipes.length },
    { icon: Users, label: 'Active Users', value: '1,234' },
    { icon: Star, label: 'Average Rating', value: '4.8' },
    { icon: Heart, label: 'Favorites', value: '5,678' }
  ];

  return (
    <div className="relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50"></div>
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        {/* Rotating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-orange-200/30 rounded-full animate-spin-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-pink-200/30 rotate-45 animate-spin-slow-reverse"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 border-2 border-yellow-200/30 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 border-2 border-red-200/30 rotate-45 animate-spin-slow-reverse"></div>
        {/* Floating Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-red-200/20 rounded-full blur-3xl animate-pulse delay-1000 animate-float-slow-reverse"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full blur-3xl animate-pulse delay-2000 animate-float-slow"></div>
        <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-gradient-to-br from-red-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1500 animate-float-slow-reverse"></div>
        {/* Animated Wave Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent animate-wave"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent animate-wave-delayed"></div>
        {/* Seasonal Icons Floating */}
        <div className="absolute top-1/4 left-1/6 animate-bounce-slow">
          <Sun className="h-8 w-8 text-yellow-400/40" />
        </div>
        <div className="absolute top-1/3 right-1/6 animate-bounce-slow delay-1000">
          <Leaf className="h-8 w-8 text-green-400/40" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-bounce-slow delay-2000">
          <Snowflake className="h-8 w-8 text-blue-400/40" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 animate-bounce-slow delay-1500">
          <TreePine className="h-8 w-8 text-emerald-400/40" />
        </div>
      </div>

      {/* Main Home Content */}
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center py-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl">
          <h1 className="text-4xl font-bold text-white mb-4">
            Discover Amazing Recipes
          </h1>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Explore thousands of delicious recipes from around the world. 
            From quick weeknight dinners to elaborate weekend feasts.
          </p>
          <div className="flex justify-center space-x-4">
            <CookingButton
              onClick={() => window.location.href = '/create-recipe'}
              variant="primary"
              className="bg-white text-primary-600 hover:bg-primary-50"
            >
              Share Your Recipe
            </CookingButton>
            <MenuButton
              onClick={() => window.location.href = '/seasonal-collections'}
              foodIcon="🍂"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600"
            >
              Seasonal Collections
            </MenuButton>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="card p-6 text-center">
              <stat.icon className="h-8 w-8 text-primary-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-secondary-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-secondary-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div>
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">
              Search Results for "{searchQuery}"
            </h2>
            {allRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ChefHat className="h-16 w-16 text-secondary-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-secondary-700 mb-2">
                  No recipes found
                </h3>
                <p className="text-secondary-600">
                  Try adjusting your search terms or browse our featured recipes below.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Enhanced Featured Recipes */}
        {!searchQuery && (
          <div className="relative">
            {/* Featured Recipes Hero Section */}
            <div className="bg-gradient-to-r from-orange-50 via-red-50 to-yellow-50 rounded-3xl p-8 mb-8 relative overflow-hidden">
              {/* Background Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-200/30 to-orange-200/30 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-3 shadow-lg">
                      <Flame className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-secondary-900 flex items-center space-x-2">
                        <span>Featured Recipes</span>
                        <Sparkles className="h-6 w-6 text-orange-500 animate-pulse" />
                      </h2>
                      <p className="text-orange-600 font-medium">Handpicked culinary masterpieces</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="hidden md:flex items-center space-x-2 text-sm text-orange-600 bg-orange-100/50 px-3 py-1 rounded-full">
                      <TrendingUp className="h-4 w-4" />
                      <span>Trending Now</span>
                    </div>
                    <CookingButton
                      onClick={() => setShowAllRecipes(!showAllRecipes)}
                      variant="accent"
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      {showAllRecipes ? 'Show Featured' : 'View All Recipes'}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </CookingButton>
                  </div>
                </div>

                {/* Recipe Count and Stats */}
                <div className="flex items-center space-x-6 text-sm text-orange-700 mb-6">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4" />
                    <span>{displayedRecipes.length} {showAllRecipes ? 'amazing recipes' : 'featured recipes'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>4.8 average rating</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>Loved by thousands</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Recipe Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedRecipes.map((recipe, index) => (
                <div key={recipe.id} className="group relative">
                  {/* Featured Badge for first 3 recipes */}
                  {index < 3 && !showAllRecipes && (
                    <div className="absolute -top-3 -right-3 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center space-x-1">
                      <Sparkles className="h-3 w-3" />
                      <span>FEATURED</span>
                    </div>
                  )}
                  
                  {/* Recipe Card with enhanced hover effects */}
                  <div className="transform group-hover:scale-105 transition-all duration-300 group-hover:shadow-2xl">
                    <RecipeCard recipe={recipe} />
                  </div>
                </div>
              ))}
            </div>

            {/* View More Section */}
            {!showAllRecipes && allRecipes.length > 6 && (
              <div className="text-center mt-12">
                <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-8 max-w-md mx-auto">
                  <h3 className="text-xl font-bold text-secondary-900 mb-3">
                    Hungry for more?
                  </h3>
                  <p className="text-secondary-600 mb-6">
                    Discover {allRecipes.length - 6} more amazing recipes waiting for you!
                  </p>
                  <CookingButton
                    onClick={() => setShowAllRecipes(true)}
                    variant="accent"
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Explore All Recipes
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </CookingButton>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        {!searchQuery && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link
              to="/favorites"
              className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Heart className="h-8 w-8 text-red-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-secondary-900">My Favorites</h3>
                <p className="text-secondary-600">View your saved recipes</p>
              </div>
            </Link>
            
            <Link
              to="/create-recipe"
              className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <ChefHat className="h-8 w-8 text-primary-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-secondary-900">Create Recipe</h3>
                <p className="text-secondary-600">Share your own recipe</p>
              </div>
            </Link>
            
            <Link
              to="/seasonal-collections"
              className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Calendar className="h-8 w-8 text-green-500 mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-secondary-900">Seasonal Recipes</h3>
                <p className="text-secondary-600">Discover seasonal dishes</p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 