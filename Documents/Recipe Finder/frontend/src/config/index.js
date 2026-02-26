// Configuration for Recipe Finder app - Local Storage Only
// All data is stored locally in browser localStorage

const APP_CONFIG = {
  name: 'Recipe Finder',
  version: '1.0.0',
  description: 'A frontend-only React app for finding and sharing recipes. All data stored locally - no backend required!',
  useLocalStorage: true,
  features: {
    offline: true,
    localStorage: true,
    backend: false
  }
};

export default APP_CONFIG;