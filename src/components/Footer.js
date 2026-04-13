import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChefHat, Users, Star, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-secondary-900 to-secondary-800 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg mr-3">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">FlameFlavors</h3>
            </div>
            <p className="text-secondary-200 mb-6 leading-relaxed">
              Discover, create, and share amazing recipes. Your culinary journey starts here with our curated collection of delicious dishes from around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-secondary-700 hover:bg-secondary-600 rounded-lg transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-secondary-700 hover:bg-secondary-600 rounded-lg transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-secondary-700 hover:bg-secondary-600 rounded-lg transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-secondary-700 hover:bg-secondary-600 rounded-lg transition-colors duration-200">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-secondary-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/seasonal" className="text-secondary-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Seasonal Recipes
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-secondary-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  My Favorites
                </Link>
              </li>
              <li>
                <Link to="/my-recipes" className="text-secondary-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  My Recipes
                </Link>
              </li>
              <li>
                <Link to="/create-recipe" className="text-secondary-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Create Recipe
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Popular Categories
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-secondary-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  Italian Cuisine
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                  Asian Delights
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Healthy Options
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Quick & Easy
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-200 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  Desserts
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-red-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-secondary-200">Email</p>
                  <p className="text-white">hello@recipefinder.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-secondary-200">Phone</p>
                  <p className="text-white">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-secondary-200">Address</p>
                  <p className="text-white">123 Culinary Street<br />Foodie City, FC 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-secondary-700">
          <div className="text-center">
            <h4 className="text-xl font-semibold mb-2">Stay Updated</h4>
            <p className="text-secondary-200 mb-6">Get the latest recipes and cooking tips delivered to your inbox</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-secondary-700 border border-secondary-600 text-white placeholder-secondary-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-secondary-950 border-t border-secondary-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Heart className="h-4 w-4 text-red-400 mr-2" />
              <p className="text-secondary-300">
                © {currentYear} FlameFlavors. Made with love for food lovers.
              </p>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-secondary-300 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-secondary-300 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-secondary-300 hover:text-white transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 