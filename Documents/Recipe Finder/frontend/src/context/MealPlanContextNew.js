import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { mealPlanService } from '../services/dataService';

const MealPlanContext = createContext();

export const useMealPlan = () => {
  const context = useContext(MealPlanContext);
  if (!context) {
    throw new Error('useMealPlan must be used within a MealPlanProvider');
  }
  return context;
};

export const MealPlanProvider = ({ children }) => {
  const { user } = useAuth();
  const [mealPlan, setMealPlan] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  });
  const [shoppingList, setShoppingList] = useState([]);
  const [dietaryPreferences, setDietaryPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    nutFree: false,
    lowCarb: false,
    keto: false,
    paleo: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load meal plan from local storage
  const loadMealPlan = () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      
      const currentMealPlan = mealPlanService.getCurrentMealPlan();
      
      // Set meal plan - ensure all days are present
      const convertedMealPlan = {
        monday: currentMealPlan.monday || [],
        tuesday: currentMealPlan.tuesday || [],
        wednesday: currentMealPlan.wednesday || [],
        thursday: currentMealPlan.thursday || [],
        friday: currentMealPlan.friday || [],
        saturday: currentMealPlan.saturday || [],
        sunday: currentMealPlan.sunday || []
      };
      
      setMealPlan(convertedMealPlan);
    } catch (error) {
      console.error('Error loading meal plan:', error);
      setError('Failed to load meal plan');
    } finally {
      setLoading(false);
    }
  };

  // Save meal plan to local storage
  const saveMealPlan = (updatedMealPlan) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      
      // Save each day's meals
      Object.entries(updatedMealPlan).forEach(([day, meals]) => {
        meals.forEach(meal => {
          if (meal.recipeId && meal.mealType) {
            mealPlanService.addRecipeToMealPlan(meal.recipeId, day, meal.mealType, meal.servings || 1);
          }
        });
      });
      
      setMealPlan(updatedMealPlan);
    } catch (error) {
      console.error('Error saving meal plan:', error);
      setError('Failed to save meal plan');
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount and when user changes
  useEffect(() => {
    if (user) {
      loadMealPlan();
    } else {
      setMealPlan({
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      });
      setShoppingList([]);
    }
  }, [user]);

  // Add recipe to meal plan
  const addRecipeToMealPlan = (recipeId, day, mealType, servings = 1) => {
    if (!user) return;

    try {
      const updatedMealPlan = mealPlanService.addRecipeToMealPlan(recipeId, day, mealType, servings);
      setMealPlan(updatedMealPlan);
    } catch (error) {
      console.error('Error adding recipe to meal plan:', error);
      setError('Failed to add recipe to meal plan');
    }
  };

  // Remove recipe from meal plan
  const removeRecipeFromMealPlan = (recipeId, day, mealType) => {
    if (!user) return;

    try {
      const updatedMealPlan = mealPlanService.removeRecipeFromMealPlan(recipeId, day, mealType);
      setMealPlan(updatedMealPlan);
    } catch (error) {
      console.error('Error removing recipe from meal plan:', error);
      setError('Failed to remove recipe from meal plan');
    }
  };

  // Clear entire meal plan
  const clearMealPlan = () => {
    if (!user) return;

    try {
      const emptyPlan = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      };
      
      localStorage.removeItem('currentMealPlan');
      setMealPlan(emptyPlan);
    } catch (error) {
      console.error('Error clearing meal plan:', error);
      setError('Failed to clear meal plan');
    }
  };

  // Generate shopping list from meal plan
  const generateShoppingList = () => {
    if (!user) return;

    try {
      setLoading(true);
      const shoppingListItems = mealPlanService.generateShoppingList();
      setShoppingList(shoppingListItems);
    } catch (error) {
      console.error('Error generating shopping list:', error);
      setError('Failed to generate shopping list');
    } finally {
      setLoading(false);
    }
  };

  // Update dietary preferences
  const updateDietaryPreferences = (preferences) => {
    setDietaryPreferences(prev => ({
      ...prev,
      ...preferences
    }));
    
    // Save to localStorage
    localStorage.setItem('dietaryPreferences', JSON.stringify({
      ...dietaryPreferences,
      ...preferences
    }));
  };

  // Get recipes for a specific day
  const getRecipesForDay = (day) => {
    return mealPlan[day] || [];
  };

  // Get all recipes in the meal plan
  const getAllMealPlanRecipes = () => {
    const allRecipes = [];
    Object.values(mealPlan).forEach(dayMeals => {
      allRecipes.push(...dayMeals);
    });
    return allRecipes;
  };

  const value = {
    mealPlan,
    shoppingList,
    dietaryPreferences,
    loading,
    error,
    loadMealPlan,
    saveMealPlan,
    addRecipeToMealPlan,
    removeRecipeFromMealPlan,
    clearMealPlan,
    generateShoppingList,
    updateDietaryPreferences,
    getRecipesForDay,
    getAllMealPlanRecipes,
  };

  return (
    <MealPlanContext.Provider value={value}>
      {children}
    </MealPlanContext.Provider>
  );
};
