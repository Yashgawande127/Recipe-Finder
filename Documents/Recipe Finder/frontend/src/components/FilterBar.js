import React from 'react';
import { Filter, X } from 'lucide-react';
import { useRecipe } from '../context/RecipeContext';

const FilterBar = () => {
  const {
    selectedCuisine,
    selectedDiet,
    setSelectedCuisine,
    setSelectedDiet,
    clearFilters,
  } = useRecipe();

  const cuisines = [
    'Italian',
    'Mexican',
    'Chinese',
    'Indian',
    'Japanese',
    'Thai',
    'French',
    'Mediterranean',
    'American',
    'Greek',
    'Spanish',
    'Korean',
  ];

  const diets = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Low-Carb',
    'Keto',
    'Paleo',
    'Pescatarian',
  ];

  const hasActiveFilters = selectedCuisine || selectedDiet;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-secondary-600" />
          <h3 className="font-semibold text-secondary-900">Filters</h3>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 text-sm text-secondary-600 hover:text-secondary-900 transition-colors duration-200"
          >
            <X className="h-4 w-4" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cuisine Filter */}
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Cuisine
          </label>
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
          >
            <option value="">All Cuisines</option>
            {cuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>

        {/* Diet Filter */}
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Diet
          </label>
          <select
            value={selectedDiet}
            onChange={(e) => setSelectedDiet(e.target.value)}
            className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
          >
            <option value="">All Diets</option>
            {diets.map((diet) => (
              <option key={diet} value={diet}>
                {diet}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-secondary-200">
          <div className="flex flex-wrap gap-2">
            {selectedCuisine && (
              <span className="inline-flex items-center space-x-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                <span>{selectedCuisine}</span>
                <button
                  onClick={() => setSelectedCuisine('')}
                  className="ml-1 hover:text-primary-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedDiet && (
              <span className="inline-flex items-center space-x-1 bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm">
                <span>{selectedDiet}</span>
                <button
                  onClick={() => setSelectedDiet('')}
                  className="ml-1 hover:text-secondary-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar; 