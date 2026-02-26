// Migration utility to backup localStorage data before switching to backend APIs
// Run this in the browser console before migrating to backup existing data

const backupLocalStorage = () => {
  const backup = {};
  const keysToBackup = [
    'currentUser',
    'userRecipes', 
    'favorites',
    'recipeComments',
    'recipeRatings',
    'currentMealPlan',
    'dietaryPreferences',
    'shoppingList',
    'notifications',
    'gamificationProfile'
  ];

  keysToBackup.forEach(key => {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        backup[key] = JSON.parse(data);
      } catch (e) {
        backup[key] = data; // Store as string if not JSON
      }
    }
  });

  // Save backup to downloads
  const dataStr = JSON.stringify(backup, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `recipe-finder-backup-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);

  console.log('localStorage backup completed!');
  console.log('Backed up data:', backup);
  
  return backup;
};

// Function to restore from backup (for rollback)
const restoreLocalStorage = (backupData) => {
  Object.keys(backupData).forEach(key => {
    const value = typeof backupData[key] === 'object' 
      ? JSON.stringify(backupData[key]) 
      : backupData[key];
    localStorage.setItem(key, value);
  });
  console.log('localStorage restored from backup!');
};

// Function to clear localStorage for migration
const clearLocalStorageForMigration = () => {
  const keysToKeep = ['currentUser']; // Keep authentication
  const allKeys = Object.keys(localStorage);
  
  allKeys.forEach(key => {
    if (!keysToKeep.includes(key)) {
      localStorage.removeItem(key);
    }
  });
  
  console.log('localStorage cleared for migration (kept authentication)');
};

// Export functions for use
window.recipeFinderMigration = {
  backup: backupLocalStorage,
  restore: restoreLocalStorage,
  clear: clearLocalStorageForMigration
};

console.log('Recipe Finder Migration Utilities loaded!');
console.log('Run: window.recipeFinderMigration.backup() to backup your data');
console.log('Run: window.recipeFinderMigration.clear() to clear localStorage for migration');
console.log('Run: window.recipeFinderMigration.restore(backupData) to restore from backup');
