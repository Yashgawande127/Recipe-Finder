import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipe } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { 
  ChefHat, 
  Clock, 
  Users, 
  Camera, 
  Plus, 
  Trash2, 
  Save, 
  ArrowLeft,
  Sparkles,
  Star,
  Heart,
  Globe,
  Leaf,
  Zap
} from 'lucide-react';
import { CookingButton } from '../components/AnimatedButton';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const { createUserRecipe } = useRecipe();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cuisine: '',
    diet: '',
    cookTime: '',
    servings: '',
    image: '',
    ingredients: [''],
    instructions: ['']
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [imagePreview, setImagePreview] = useState('');

  const cuisineOptions = [
    'Italian', 'Mexican', 'Spanish', 'Korean', 'Thai', 'Chinese', 'Japanese', 
    'Indian', 'French', 'Mediterranean', 'American', 'Other'
  ];

  const dietOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo', 'Other'
  ];

  const cuisineIcons = {
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

  const dietIcons = {
    'Vegetarian': '🥬',
    'Vegan': '🌱',
    'Gluten-Free': '🌾',
    'Dairy-Free': '🥛',
    'Keto': '🥑',
    'Paleo': '🥩',
    'Other': '🍽️'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleArrayChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const handleImageChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, image: url }));
    setImagePreview(url);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.cuisine) {
      newErrors.cuisine = 'Cuisine is required';
    }
    if (!formData.cookTime || formData.cookTime <= 0) {
      newErrors.cookTime = 'Valid cook time is required';
    }
    if (!formData.servings || formData.servings <= 0) {
      newErrors.servings = 'Valid number of servings is required';
    }
    if (!formData.ingredients[0]?.trim()) {
      newErrors.ingredients = 'At least one ingredient is required';
    }
    if (!formData.instructions[0]?.trim()) {
      newErrors.instructions = 'At least one instruction step is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const recipeData = {
        ...formData,
        cookTime: parseInt(formData.cookTime),
        servings: parseInt(formData.servings),
        ingredients: formData.ingredients.filter(ingredient => ingredient.trim()),
        instructions: formData.instructions.filter(instruction => instruction.trim()),
        updatedAt: new Date().toISOString()
      };
      
      // Use the context to create the recipe
      const newRecipe = createUserRecipe(recipeData);
      
      if (newRecipe) {
        // Redirect to My Recipes page after creation
        navigate('/my-recipes');
      } else {
        setErrors({ submit: 'Failed to create recipe. Please try again.' });
      }
    } catch (error) {
      console.error('Error creating recipe:', error);
      setErrors({ submit: 'Failed to create recipe. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Authentication check
  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 text-center border border-red-200">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ChefHat className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-red-800 mb-4">Login Required</h2>
          <p className="text-red-600 mb-6">You need to be logged in to create recipes.</p>
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

  // Remove user authentication check - make it frontend-only
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
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
              <h1 className="text-3xl font-bold mb-2">Create Your Recipe</h1>
              <p className="text-primary-100 text-lg">Share your culinary masterpiece with the world! 🌟</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span>Earn 20 points</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Get featured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Inspire others</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-secondary-900">Recipe Creation Progress</h2>
          <div className="text-sm text-secondary-600">
            Step {activeStep} of 4
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            { step: 1, title: 'Basic Info', icon: '📝' },
            { step: 2, title: 'Details', icon: '⚙️' },
            { step: 3, title: 'Ingredients', icon: '🥕' },
            { step: 4, title: 'Instructions', icon: '👨‍🍳' }
          ].map((item) => (
            <div
              key={item.step}
              className={`text-center p-4 rounded-xl transition-all duration-300 ${
                activeStep >= item.step
                  ? 'bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200'
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <div className={`text-2xl mb-2 ${activeStep >= item.step ? 'animate-bounce' : ''}`}>
                {item.icon}
              </div>
              <div className={`font-medium text-sm ${
                activeStep >= item.step ? 'text-primary-700' : 'text-gray-500'
              }`}>
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-primary-500 to-secondary-600 rounded-full"></div>
              <h3 className="text-xl font-semibold text-secondary-900">Basic Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-secondary-700">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  onFocus={() => setActiveStep(1)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.title ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="e.g., Creamy Mushroom Risotto"
                />
                {errors.title && <p className="text-red-500 text-sm flex items-center"><span className="mr-1">⚠️</span>{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-secondary-700">
                  Cuisine Type *
                </label>
                <select
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleInputChange}
                  onFocus={() => setActiveStep(1)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.cuisine ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <option value="">Select cuisine</option>
                  {cuisineOptions.map(cuisine => (
                    <option key={cuisine} value={cuisine}>
                      {cuisineIcons[cuisine]} {cuisine}
                    </option>
                  ))}
                </select>
                {errors.cuisine && <p className="text-red-500 text-sm flex items-center"><span className="mr-1">⚠️</span>{errors.cuisine}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-secondary-700">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                onFocus={() => setActiveStep(1)}
                rows="3"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none ${
                  errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                placeholder="Describe your recipe, what makes it special, and any tips for cooking..."
              />
              {errors.description && <p className="text-red-500 text-sm flex items-center"><span className="mr-1">⚠️</span>{errors.description}</p>}
            </div>
          </div>

          {/* Recipe Details */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
              <h3 className="text-xl font-semibold text-secondary-900">Recipe Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-secondary-700 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Cook Time (minutes) *
                </label>
                <input
                  type="number"
                  name="cookTime"
                  value={formData.cookTime}
                  onChange={handleInputChange}
                  onFocus={() => setActiveStep(2)}
                  min="1"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.cookTime ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="30"
                />
                {errors.cookTime && <p className="text-red-500 text-sm flex items-center"><span className="mr-1">⚠️</span>{errors.cookTime}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-secondary-700 flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Servings *
                </label>
                <input
                  type="number"
                  name="servings"
                  value={formData.servings}
                  onChange={handleInputChange}
                  onFocus={() => setActiveStep(2)}
                  min="1"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.servings ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  placeholder="4"
                />
                {errors.servings && <p className="text-red-500 text-sm flex items-center"><span className="mr-1">⚠️</span>{errors.servings}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-secondary-700 flex items-center">
                  <Leaf className="h-4 w-4 mr-2" />
                  Dietary Preference
                </label>
                <select
                  name="diet"
                  value={formData.diet}
                  onChange={handleInputChange}
                  onFocus={() => setActiveStep(2)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                >
                  <option value="">No specific diet</option>
                  {dietOptions.map(diet => (
                    <option key={diet} value={diet}>
                      {dietIcons[diet]} {diet}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-secondary-700 flex items-center">
                <Camera className="h-4 w-4 mr-2" />
                Recipe Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleImageChange}
                onFocus={() => setActiveStep(2)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                placeholder="https://example.com/your-recipe-image.jpg"
              />
              {imagePreview && (
                <div className="mt-3">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    loading="lazy"
                    className="w-32 h-32 rounded-xl object-cover border-2 border-gray-200"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
              <h3 className="text-xl font-semibold text-secondary-900">Ingredients</h3>
            </div>
            
            <div className="space-y-4">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-3">
                    {index + 1}
                  </div>
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleArrayChange(index, 'ingredients', e.target.value)}
                    onFocus={() => setActiveStep(3)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                    placeholder={`Ingredient ${index + 1} (e.g., 2 cups all-purpose flour)`}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('ingredients', index)}
                    className="flex-shrink-0 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={formData.ingredients.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <CookingButton
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addArrayItem('ingredients');
                }}
                variant="secondary"
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Ingredient
              </CookingButton>
            </div>
            {errors.ingredients && <p className="text-red-500 text-sm flex items-center"><span className="mr-1">⚠️</span>{errors.ingredients}</p>}
          </div>

          {/* Instructions */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full"></div>
              <h3 className="text-xl font-semibold text-secondary-900">Cooking Instructions</h3>
            </div>
            
            <div className="space-y-6">
              {formData.instructions.map((instruction, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <textarea
                      value={instruction}
                      onChange={(e) => handleArrayChange(index, 'instructions', e.target.value)}
                      onFocus={() => setActiveStep(4)}
                      rows="3"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none hover:border-gray-300"
                      placeholder={`Step ${index + 1}: Describe this cooking step in detail...`}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('instructions', index)}
                      className="flex-shrink-0 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={formData.instructions.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              <CookingButton
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addArrayItem('instructions');
                }}
                variant="secondary"
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Step
              </CookingButton>
            </div>
            {errors.instructions && <p className="text-red-500 text-sm flex items-center"><span className="mr-1">⚠️</span>{errors.instructions}</p>}
          </div>

          {/* Error Display */}
          {errors.submit && (
            <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-4">
              <p className="text-red-600 flex items-center">
                <span className="mr-2">⚠️</span>
                {errors.submit}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-8 border-t border-gray-200">
            <CookingButton
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              className="flex-1 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Recipe...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Create Recipe
                </>
              )}
            </CookingButton>
            <CookingButton
              type="button"
              onClick={() => navigate('/')}
              variant="secondary"
              className="flex items-center"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Cancel
            </CookingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;