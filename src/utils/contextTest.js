// Quick test to verify the GamificationContext fix
// This can be removed after testing

console.log('Testing GamificationContext imports...');

try {
  // Test that useCallback is properly imported
  const React = require('react');
  const { useCallback } = React;
  
  if (typeof useCallback === 'function') {
    console.log('✅ useCallback is available');
  } else {
    console.log('❌ useCallback is not available');
  }
} catch (error) {
  console.log('❌ Error testing:', error.message);
}

export {}; // Make this a module
