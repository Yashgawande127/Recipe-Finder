import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { mealPlanService, shoppingListService } from '../services/dataService';

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

  // Load meal plan from API
  const loadMealPlan = useCallback(() => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      
      const currentMealPlan = mealPlanService.getCurrentMealPlan();
      
      // Convert nested structure to flat arrays for each day
      const convertDayMeals = (dayData) => {
        if (!dayData || typeof dayData !== 'object') return [];
        
        const meals = [];
        Object.entries(dayData).forEach(([mealType, mealArray]) => {
          if (Array.isArray(mealArray)) {
            mealArray.forEach(meal => {
              // Get full recipe data for display
              const recipeData = recipeService.getRecipeById(meal.recipeId);
              if (recipeData) {
                meals.push({
                  ...recipeData,
                  mealType,
                  servings: meal.servings || 1,
                  recipeId: meal.recipeId
                });
              }
            });
          }
        });
        return meals;
      };
      
      // Set meal plan - ensure all days are present with proper structure
      const convertedMealPlan = {
        monday: convertDayMeals(currentMealPlan.monday),
        tuesday: convertDayMeals(currentMealPlan.tuesday),
        wednesday: convertDayMeals(currentMealPlan.wednesday),
        thursday: convertDayMeals(currentMealPlan.thursday),
        friday: convertDayMeals(currentMealPlan.friday),
        saturday: convertDayMeals(currentMealPlan.saturday),
        sunday: convertDayMeals(currentMealPlan.sunday)
      };
      
      setMealPlan(convertedMealPlan);
    } catch (error) {
      console.error('Error loading meal plan:', error);
      setError('Failed to load meal plan');
    } finally {
      setLoading(false);
    }
  }, [user]);

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
      
      // Use the current meal plan state instead of localStorage
      const ingredientMap = new Map();
      
      // Helper function to categorize ingredients
      const categorizeIngredient = (ingredient) => {
        const lowerIngredient = ingredient.toLowerCase();
        
        // Produce - Fruits and Vegetables
        if (lowerIngredient.includes('tomato') || lowerIngredient.includes('onion') || 
            lowerIngredient.includes('garlic') || lowerIngredient.includes('basil') ||
            lowerIngredient.includes('lettuce') || lowerIngredient.includes('carrot') ||
            lowerIngredient.includes('bell pepper') || lowerIngredient.includes('mushroom') ||
            lowerIngredient.includes('spinach') || lowerIngredient.includes('broccoli') ||
            lowerIngredient.includes('cucumber') || lowerIngredient.includes('avocado') ||
            lowerIngredient.includes('lemon') || lowerIngredient.includes('lime') ||
            lowerIngredient.includes('apple') || lowerIngredient.includes('banana') ||
            lowerIngredient.includes('potato') || lowerIngredient.includes('cilantro') ||
            lowerIngredient.includes('parsley') || lowerIngredient.includes('ginger') ||
            lowerIngredient.includes('celery') || lowerIngredient.includes('green') ||
            lowerIngredient.includes('eggplant') || lowerIngredient.includes('zucchini') ||
            lowerIngredient.includes('cabbage') || lowerIngredient.includes('kale') ||
            lowerIngredient.includes('radish') || lowerIngredient.includes('beet') ||
            lowerIngredient.includes('turnip') || lowerIngredient.includes('squash') ||
            lowerIngredient.includes('pumpkin') || lowerIngredient.includes('corn') ||
            lowerIngredient.includes('peas') || lowerIngredient.includes('berry') ||
            lowerIngredient.includes('strawberr') || lowerIngredient.includes('blueber') ||
            lowerIngredient.includes('orange') || lowerIngredient.includes('grape') ||
            lowerIngredient.includes('scallion') || lowerIngredient.includes('chive') ||
            (lowerIngredient.includes('fresh') && (lowerIngredient.includes('herb') || lowerIngredient.includes('mint')))) {
          return 'produce';
        }
        
        // Meat & Seafood
        if (lowerIngredient.includes('chicken') || lowerIngredient.includes('beef') ||
            lowerIngredient.includes('pork') || lowerIngredient.includes('fish') ||
            lowerIngredient.includes('salmon') || lowerIngredient.includes('shrimp') ||
            lowerIngredient.includes('pancetta') || lowerIngredient.includes('bacon') ||
            lowerIngredient.includes('ground') || lowerIngredient.includes('turkey') ||
            lowerIngredient.includes('ham') || lowerIngredient.includes('sausage') ||
            lowerIngredient.includes('meat') || lowerIngredient.includes('steak') ||
            lowerIngredient.includes('lamb') || lowerIngredient.includes('duck') ||
            lowerIngredient.includes('crab') || lowerIngredient.includes('lobster') ||
            lowerIngredient.includes('tuna') || lowerIngredient.includes('cod') ||
            lowerIngredient.includes('tilapia') || lowerIngredient.includes('halibut') ||
            lowerIngredient.includes('scallops') || lowerIngredient.includes('mussels') ||
            lowerIngredient.includes('oyster') || lowerIngredient.includes('clam')) {
          return 'meat';
        }
        
        // Dairy & Eggs
        if (lowerIngredient.includes('cheese') || lowerIngredient.includes('milk') ||
            lowerIngredient.includes('butter') || lowerIngredient.includes('cream') ||
            lowerIngredient.includes('yogurt') || lowerIngredient.includes('mozzarella') ||
            lowerIngredient.includes('parmesan') || lowerIngredient.includes('cheddar') ||
            lowerIngredient.includes('ricotta') || lowerIngredient.includes('eggs') ||
            lowerIngredient.includes('pecorino') || lowerIngredient.includes('dairy') ||
            lowerIngredient.includes('feta') || lowerIngredient.includes('goat') ||
            lowerIngredient.includes('brie') || lowerIngredient.includes('swiss') ||
            lowerIngredient.includes('sour cream') || lowerIngredient.includes('heavy cream') ||
            lowerIngredient.includes('half and half') || lowerIngredient.includes('buttermilk')) {
          return 'dairy';
        }
        
        // Pantry Staples - Grains, Canned Goods, Dry Goods
        if (lowerIngredient.includes('flour') || lowerIngredient.includes('rice') ||
            lowerIngredient.includes('pasta') || lowerIngredient.includes('spaghetti') ||
            lowerIngredient.includes('bread') || lowerIngredient.includes('oil') ||
            lowerIngredient.includes('vinegar') || lowerIngredient.includes('sugar') ||
            lowerIngredient.includes('honey') || lowerIngredient.includes('stock') ||
            lowerIngredient.includes('broth') || lowerIngredient.includes('sauce') ||
            lowerIngredient.includes('can') || lowerIngredient.includes('dried') ||
            lowerIngredient.includes('beans') || lowerIngredient.includes('lentils') ||
            lowerIngredient.includes('quinoa') || lowerIngredient.includes('oats') ||
            lowerIngredient.includes('barley') || lowerIngredient.includes('bulgur') ||
            lowerIngredient.includes('coconut') || lowerIngredient.includes('nuts') ||
            lowerIngredient.includes('almond') || lowerIngredient.includes('walnut') ||
            lowerIngredient.includes('pecan') || lowerIngredient.includes('cashew') ||
            lowerIngredient.includes('peanut') || lowerIngredient.includes('olive oil') ||
            lowerIngredient.includes('vegetable oil') || lowerIngredient.includes('canola') ||
            lowerIngredient.includes('sesame') || lowerIngredient.includes('maple') ||
            lowerIngredient.includes('molasses') || lowerIngredient.includes('corn starch') ||
            lowerIngredient.includes('baking') || lowerIngredient.includes('yeast') ||
            lowerIngredient.includes('noodle') || lowerIngredient.includes('cereal') ||
            lowerIngredient.includes('crackers') || lowerIngredient.includes('tortilla')) {
          return 'pantry';
        }
        
        // Spices & Seasonings
        if (lowerIngredient.includes('salt') || lowerIngredient.includes('pepper') ||
            lowerIngredient.includes('oregano') || lowerIngredient.includes('thyme') ||
            lowerIngredient.includes('rosemary') || lowerIngredient.includes('cumin') ||
            lowerIngredient.includes('paprika') || lowerIngredient.includes('cinnamon') ||
            lowerIngredient.includes('nutmeg') || lowerIngredient.includes('bay') ||
            lowerIngredient.includes('spice') || lowerIngredient.includes('seasoning') ||
            lowerIngredient.includes('vanilla') || lowerIngredient.includes('extract') ||
            lowerIngredient.includes('clove') || lowerIngredient.includes('cardamom') ||
            lowerIngredient.includes('allspice') || lowerIngredient.includes('turmeric') ||
            lowerIngredient.includes('curry') || lowerIngredient.includes('chili') ||
            lowerIngredient.includes('cayenne') || lowerIngredient.includes('mustard seed') ||
            lowerIngredient.includes('coriander') || lowerIngredient.includes('fennel') ||
            lowerIngredient.includes('dill') || lowerIngredient.includes('sage') ||
            lowerIngredient.includes('tarragon') || lowerIngredient.includes('marjoram') ||
            lowerIngredient.includes('saffron') || lowerIngredient.includes('anise') ||
            lowerIngredient.includes('star anise') || lowerIngredient.includes('garam masala') ||
            lowerIngredient.includes('herbs') || lowerIngredient.includes('dried herb')) {
          return 'spices';
        }
        
        // Default to other
        return 'other';
      };
      
      // Helper function to parse ingredient string
      const parseIngredient = (ingredientStr) => {
        // Enhanced regex to better extract quantity, unit, and name
        const patterns = [
          // Pattern 1: "400g spaghetti" or "2 tbsp olive oil"
          /^(\d+(?:\.\d+)?|\d+\/\d+)\s*([a-zA-Z]+)?\s+(.+)$/,
          // Pattern 2: "4 large eggs" or "2 cloves garlic, minced"
          /^(\d+(?:\.\d+)?|\d+\/\d+)\s+(.+)$/,
          // Pattern 3: "Salt to taste" (no quantity)
          /^(.+)$/
        ];
        
        for (const pattern of patterns) {
          const match = ingredientStr.trim().match(pattern);
          if (match) {
            if (pattern === patterns[0]) {
              // Has quantity and unit
              const [, quantity, unit, name] = match;
              return {
                quantity: parseFloat(quantity) || 1,
                unit: unit || '',
                name: name.trim()
              };
            } else if (pattern === patterns[1]) {
              // Has quantity but unit might be part of name
              const [, quantity, nameWithUnit] = match;
              // Check if the first word after quantity is a unit
              const words = nameWithUnit.trim().split(' ');
              const possibleUnit = words[0];
              const units = ['cups', 'cup', 'tbsp', 'tsp', 'oz', 'lbs', 'lb', 'kg', 'g', 'ml', 'l', 'cloves', 'clove', 'pieces', 'piece', 'slices', 'slice'];
              
              if (units.includes(possibleUnit.toLowerCase())) {
                return {
                  quantity: parseFloat(quantity) || 1,
                  unit: possibleUnit,
                  name: words.slice(1).join(' ').trim()
                };
              } else {
                return {
                  quantity: parseFloat(quantity) || 1,
                  unit: '',
                  name: nameWithUnit.trim()
                };
              }
            } else {
              // No quantity found, treat as 1 unit
              return {
                quantity: 1,
                unit: '',
                name: ingredientStr.trim()
              };
            }
          }
        }
        
        // Fallback
        return {
          quantity: 1,
          unit: '',
          name: ingredientStr.trim()
        };
      };
      
      // Generate unique ID
      const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);
      
      console.log('Current meal plan state:', mealPlan);
      
      let totalRecipesProcessed = 0;
      let totalIngredientsProcessed = 0;
      
      // Iterate through the current meal plan state (array structure)
      Object.entries(mealPlan).forEach(([day, dayMeals]) => {
        console.log(`Processing day: ${day}`, dayMeals);
        
        if (Array.isArray(dayMeals)) {
          dayMeals.forEach(meal => {
            console.log('Processing meal:', meal);
            totalRecipesProcessed++;
            
            if (meal.ingredients && Array.isArray(meal.ingredients)) {
              const servingMultiplier = meal.servings || 1;
              console.log(`Recipe: ${meal.title}, Servings: ${servingMultiplier}, Ingredients:`, meal.ingredients);
              
              meal.ingredients.forEach(ingredient => {
                totalIngredientsProcessed++;
                const parsed = parseIngredient(ingredient);
                console.log(`Parsed ingredient: ${ingredient} -> Quantity: ${parsed.quantity}, Unit: ${parsed.unit}, Name: ${parsed.name}`);
                
                // Clean the ingredient name by removing common descriptors
                const cleanName = parsed.name
                  .replace(/,\s*(diced|chopped|minced|sliced|grated|fresh|dried|large|small|medium).*$/i, '')
                  .replace(/\s+(diced|chopped|minced|sliced|grated|fresh|dried|large|small|medium).*$/i, '')
                  .trim();
                
                const key = cleanName.toLowerCase();
                
                if (ingredientMap.has(key)) {
                  // Aggregate quantities for same ingredient
                  const existing = ingredientMap.get(key);
                  existing.quantity += parsed.quantity * servingMultiplier;
                  console.log(`Aggregated ${cleanName}: ${existing.quantity} ${existing.unit}`);
                } else {
                  // Add new ingredient
                  const newItem = {
                    id: generateId(),
                    name: cleanName,
                    quantity: parsed.quantity * servingMultiplier,
                    unit: parsed.unit,
                    category: categorizeIngredient(cleanName),
                    checked: false
                  };
                  ingredientMap.set(key, newItem);
                  console.log(`Added new ingredient: ${cleanName} - ${newItem.quantity} ${newItem.unit} (${newItem.category})`);
                }
              });
            } else {
              console.warn(`Meal "${meal.title || 'Unknown'}" has no ingredients array:`, meal);
            }
          });
        }
      });
      
      console.log(`Processed ${totalRecipesProcessed} recipes with ${totalIngredientsProcessed} total ingredients`);
      
      // Convert map to array
      const shoppingListItems = Array.from(ingredientMap.values());
      console.log('Generated shopping list:', shoppingListItems);
      
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

  // Get total number of planned meals
  const getTotalPlannedMeals = () => {
    let totalMeals = 0;
    Object.values(mealPlan).forEach(dayMeals => {
      totalMeals += dayMeals.length;
    });
    return totalMeals;
  };

  // Get shopping list statistics
  const getShoppingListStats = () => {
    const totalItems = shoppingList.length;
    const checkedItems = shoppingList.filter(item => item.checked).length;
    const uncheckedItems = totalItems - checkedItems;
    const completionPercentage = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

    return {
      totalItems,
      checkedItems,
      uncheckedItems,
      completionPercentage
    };
  };

  // Get organized shopping list by category
  const getOrganizedShoppingList = () => {
    const categoryNames = {
      produce: '🥕 Produce',
      dairy: '🥛 Dairy & Eggs',
      meat: '🥩 Meat & Seafood',
      pantry: '🥫 Pantry Staples',
      spices: '🌶️ Spices & Seasonings',
      other: '📦 Other Items'
    };

    const organized = {
      produce: [],
      dairy: [],
      meat: [],
      pantry: [],
      spices: [],
      other: []
    };

    shoppingList.forEach(item => {
      const category = item.category || 'other';
      if (organized[category]) {
        organized[category].push(item);
      } else {
        organized.other.push(item);
      }
    });

    // Filter out empty categories and return with display names
    const result = {};
    Object.entries(organized).forEach(([key, items]) => {
      if (items.length > 0) {
        result[categoryNames[key] || key] = items;
      }
    });

    return result;
  };

  // Toggle shopping list item checked status
  const toggleShoppingItem = (itemId) => {
    setShoppingList(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, checked: !item.checked }
          : item
      )
    );
  };

  // Remove item from shopping list
  const removeShoppingItem = (itemId) => {
    setShoppingList(prev => prev.filter(item => item.id !== itemId));
  };

  // Clear shopping list
  const clearShoppingList = () => {
    setShoppingList([]);
  };

  // Add to meal plan function - simplified interface
  const addToMealPlan = (day, recipe, mealType = 'main', servings = 1) => {
    if (!user || !recipe) return;

    try {
      const updatedMealPlan = { ...mealPlan };
      
      // Ensure day exists and is an array
      if (!updatedMealPlan[day]) {
        updatedMealPlan[day] = [];
      }
      
      // Add the complete recipe object to the day
      const mealEntry = {
        ...recipe,
        mealType,
        servings,
        recipeId: recipe.id || recipe.recipeId
      };
      
      updatedMealPlan[day].push(mealEntry);
      
      // Update local state
      setMealPlan(updatedMealPlan);
      
      // Save to storage (if needed for persistence)
      if (recipe.id || recipe.recipeId) {
        mealPlanService.addRecipeToMealPlan(recipe.id || recipe.recipeId, day, mealType, servings);
      }
    } catch (error) {
      console.error('Error adding recipe to meal plan:', error);
      setError('Failed to add recipe to meal plan');
    }
  };

  // Remove from meal plan function - simplified interface
  const removeFromMealPlan = (day, index) => {
    if (!user) return;

    try {
      const updatedMealPlan = { ...mealPlan };
      
      if (updatedMealPlan[day] && Array.isArray(updatedMealPlan[day]) && index >= 0 && index < updatedMealPlan[day].length) {
        // Remove the meal at the specified index
        const removedMeal = updatedMealPlan[day][index];
        updatedMealPlan[day].splice(index, 1);
        
        // Update local state
        setMealPlan(updatedMealPlan);
        
        // Remove from storage if it has an ID
        if (removedMeal.recipeId || removedMeal.id) {
          mealPlanService.removeRecipeFromMealPlan(removedMeal.recipeId || removedMeal.id, day, removedMeal.mealType || 'main');
        }
      }
    } catch (error) {
      console.error('Error removing recipe from meal plan:', error);
      setError('Failed to remove recipe from meal plan');
    }
  };

  // Delete meal plan function (alias for clearMealPlan)
  const deleteMealPlan = clearMealPlan;

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
    getTotalPlannedMeals,
    getShoppingListStats,
    getOrganizedShoppingList,
    toggleShoppingItem,
    removeShoppingItem,
    clearShoppingList,
    addToMealPlan,
    removeFromMealPlan,
    deleteMealPlan
  };

  return (
    <MealPlanContext.Provider value={value}>
      {children}
    </MealPlanContext.Provider>
  );
};
