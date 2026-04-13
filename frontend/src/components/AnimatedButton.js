import React from 'react';
import { motion } from 'framer-motion';

// Cooking-themed animated button with steam effect
export const CookingButton = ({ children, onClick, className = '', disabled = false, variant = 'primary', type = 'button', preventDefaultBehavior = true }) => {
  const handleClick = (e) => {
    if (!disabled) {
      if (onClick) {
        onClick(e);
      }
      // For submit buttons, don't prevent default - let the form handle submission
      // Also don't prevent default if explicitly disabled (for Link navigation)
      if (type !== 'submit' && preventDefaultBehavior) {
        e.preventDefault();
        e.stopPropagation();
      }
    } else {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const variants = {
    primary: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600',
    secondary: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
    accent: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
  };

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`relative px-6 py-3 rounded-lg text-white font-semibold shadow-lg overflow-hidden ${variants[variant]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      whileHover={{ 
        scale: disabled ? 1 : 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: disabled ? 1 : 0.95,
        transition: { duration: 0.1 }
      }}
    >
      {/* Steam effect */}
      <motion.div
        className="absolute -top-2 left-1/4 w-1 h-2 bg-white/30 rounded-full"
        animate={{
          y: [0, -10, -20],
          opacity: [0.3, 0.6, 0],
          scale: [1, 1.2, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
      <motion.div
        className="absolute -top-2 left-1/2 w-1 h-2 bg-white/30 rounded-full"
        animate={{
          y: [0, -8, -16],
          opacity: [0.3, 0.6, 0],
          scale: [1, 1.1, 0.9]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.5
        }}
      />
      <motion.div
        className="absolute -top-2 left-3/4 w-1 h-2 bg-white/30 rounded-full"
        animate={{
          y: [0, -12, -24],
          opacity: [0.3, 0.6, 0],
          scale: [1, 1.3, 0.7]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
          delay: 1
        }}
      />
      
      {/* Button content */}
      <span className="relative z-10">{children}</span>
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  );
};

// Recipe card button with flip animation
export const RecipeCardButton = ({ children, onClick, className = '', icon: Icon }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-4 py-2 bg-white border-2 border-primary-500 rounded-lg text-primary-600 font-medium shadow-md ${className}`}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
    >
      <motion.div
        className="flex items-center justify-center space-x-2"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        {Icon && <Icon className="w-4 h-4" />}
        <span>{children}</span>
      </motion.div>
      
      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0 border-2 border-primary-500 rounded-lg"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.button>
  );
};

// Floating action button with bounce
export const FloatingActionButton = ({ children, onClick, className = '', icon: Icon }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg flex items-center justify-center ${className}`}
      whileHover={{ 
        scale: 1.1,
        rotate: 360,
        transition: { duration: 0.3 }
      }}
      whileTap={{ 
        scale: 0.9,
        transition: { duration: 0.1 }
      }}
      animate={{
        y: [0, -5, 0],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      {Icon ? <Icon className="w-6 h-6" /> : children}
    </motion.button>
  );
};

// Ingredient-style button with sprinkle effect
export const IngredientButton = ({ children, onClick, className = '', active = false }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-4 py-2 rounded-full border-2 font-medium ${className} ${
        active 
          ? 'bg-green-500 border-green-600 text-white' 
          : 'bg-white border-gray-300 text-gray-700'
      }`}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Sprinkle effect when active */}
      {active && (
        <>
          <motion.div
            className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full"
            animate={{
              y: [0, -3, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"
            animate={{
              y: [0, -2, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          />
          <motion.div
            className="absolute -bottom-1 left-1/2 w-2 h-2 bg-blue-400 rounded-full"
            animate={{
              y: [0, -4, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6
            }}
          />
        </>
      )}
    </motion.button>
  );
};

// Chef hat button with cooking animation
export const ChefHatButton = ({ children, onClick, className = '', loading = false }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={loading}
      className={`relative px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold rounded-lg shadow-lg overflow-hidden ${className} ${
        loading ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
      whileHover={{ 
        scale: loading ? 1 : 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: loading ? 1 : 0.95,
        transition: { duration: 0.1 }
      }}
    >
      {/* Chef hat icon animation */}
      <motion.div
        className="absolute top-2 right-2 text-white/80"
        animate={loading ? {
          rotate: [0, 360],
          transition: { duration: 2, repeat: Infinity, ease: "linear" }
        } : {}}
      >
        👨‍🍳
      </motion.div>
      
      <span className="relative z-10">{children}</span>
      
      {/* Cooking bubbles effect */}
      {loading && (
        <>
          <motion.div
            className="absolute bottom-2 left-4 w-2 h-2 bg-white/60 rounded-full"
            animate={{
              y: [0, -10, -20],
              opacity: [0.6, 0.3, 0],
              scale: [1, 1.2, 0.8]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          <motion.div
            className="absolute bottom-2 right-4 w-2 h-2 bg-white/60 rounded-full"
            animate={{
              y: [0, -8, -16],
              opacity: [0.6, 0.3, 0],
              scale: [1, 1.1, 0.9]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.5
            }}
          />
        </>
      )}
    </motion.button>
  );
};

// Menu-style button with food icons
export const MenuButton = ({ children, onClick, className = '', foodIcon = '🍽️' }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg shadow-lg overflow-hidden ${className}`}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
    >
      {/* Food icon */}
      <motion.span
        className="absolute left-3 text-lg"
        animate={{
          rotate: [0, 10, -10, 0],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {foodIcon}
      </motion.span>
      
      <span className="ml-8 relative z-10">{children}</span>
      
      {/* Plate effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.8 }}
      />
    </motion.button>
  );
};

// Spice-themed button with particle effect
export const SpiceButton = ({ children, onClick, className = '', spiceColor = 'red' }) => {
  const colors = {
    red: 'from-red-500 to-pink-500',
    yellow: 'from-yellow-500 to-orange-500',
    green: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-indigo-500'
  };

  return (
    <motion.button
      onClick={onClick}
      className={`relative px-4 py-2 bg-gradient-to-r ${colors[spiceColor]} text-white font-medium rounded-full shadow-md overflow-hidden ${className}`}
      whileHover={{ 
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.9,
        transition: { duration: 0.1 }
      }}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Spice particle effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/60 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`
            }}
            animate={{
              y: [0, -20, -40],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.1
            }}
          />
        ))}
      </motion.div>
    </motion.button>
  );
};

export default {
  CookingButton,
  RecipeCardButton,
  FloatingActionButton,
  IngredientButton,
  ChefHatButton,
  MenuButton,
  SpiceButton
}; 