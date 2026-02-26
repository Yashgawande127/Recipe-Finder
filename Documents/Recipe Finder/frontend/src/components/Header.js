import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Home, ChefHat, User, LogOut, LogIn, UserPlus, Plus, BookOpen, Calendar, Menu, X, Sparkles, Bell } from 'lucide-react';
import { useRecipe } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';
import { CookingButton, MenuButton, RecipeCardButton } from './AnimatedButton';

const Header = () => {
  const location = useLocation();
  const { favorites, searchQuery, setSearchQuery } = useRecipe();
  const { user, logout, isAuthenticated } = useAuth();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gradient-to-r from-white via-orange-50 to-red-50 shadow-lg border-b border-orange-200/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-2 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <ChefHat className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                FlameFlavors
              </span>
              <span className="text-xs text-orange-500 font-medium -mt-1">Culinary Excellence</span>
            </div>
          </Link>

          {/* Enhanced Search Bar */}
          <div className="flex-1 max-w-lg mx-8 relative">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}> 
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-400" />
              <input
                type="text"
                placeholder="Search for delicious recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-orange-200 rounded-2xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 placeholder-orange-400/60 shadow-lg hover:shadow-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Enhanced Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                location.pathname === '/'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'text-orange-600 hover:text-orange-700 hover:bg-orange-100/50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span className="font-medium">Home</span>
            </Link>
            
            <Link
              to="/seasonal-collections"
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                location.pathname === '/seasonal-collections'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'text-orange-600 hover:text-orange-700 hover:bg-orange-100/50'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span className="font-medium">Seasonal</span>
            </Link>
            
            <Link
              to="/favorites"
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 relative ${
                location.pathname === '/favorites'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'text-orange-600 hover:text-orange-700 hover:bg-orange-100/50'
              }`}
            >
              <Heart className="h-4 w-4" />
              <span className="font-medium">Favorites</span>
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                  {favorites.length}
                </span>
              )}
            </Link>
            
            <Link
              to="/my-recipes"
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                location.pathname === '/my-recipes'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'text-orange-600 hover:text-orange-700 hover:bg-orange-100/50'
              }`}
            >
              <ChefHat className="h-4 w-4" />
              <span className="font-medium">My Recipes</span>
            </Link>
            
            <Link
              to="/create-recipe"
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                location.pathname === '/create-recipe'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'text-orange-600 hover:text-orange-700 hover:bg-orange-100/50'
              }`}
            >
              <Plus className="h-4 w-4" />
              <span className="font-medium">Create</span>
            </Link>
          </nav>

          {/* Enhanced User Menu */}
          <div className="flex items-center space-x-4">
            <NotificationBell />
            
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Profile Link */}
                <Link
                  to="/profile"
                  className="p-2 text-orange-600 hover:text-orange-700 hover:bg-orange-100/50 rounded-xl transition-all duration-300 hover:shadow-md flex items-center justify-center"
                >
                  <User size={20} />
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-6 py-3 text-orange-600 hover:text-orange-700 hover:bg-orange-100/50 rounded-xl transition-all duration-300 font-medium hover:shadow-md flex items-center space-x-2"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 