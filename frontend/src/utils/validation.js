// Validation utility for frontend forms
class Validation {
  static required(value, fieldName = 'This field') {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return `${fieldName} is required`;
    }
    return null;
  }

  static email(email) {
    if (!email) return 'Email is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return null;
  }

  static password(password) {
    if (!password) return 'Password is required';
    
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(password)) {
      return 'Password must contain at least one lowercase letter, one uppercase letter, and one number';
    }
    
    return null;
  }

  static confirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  }

  static username(username) {
    if (!username) return 'Username is required';
    
    if (username.length < 3) {
      return 'Username must be at least 3 characters long';
    }
    
    if (username.length > 30) {
      return 'Username cannot exceed 30 characters';
    }
    
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      return 'Username can only contain letters, numbers, and underscores';
    }
    
    return null;
  }

  static minLength(value, min, fieldName = 'This field') {
    if (value && value.length < min) {
      return `${fieldName} must be at least ${min} characters long`;
    }
    return null;
  }

  static maxLength(value, max, fieldName = 'This field') {
    if (value && value.length > max) {
      return `${fieldName} cannot exceed ${max} characters`;
    }
    return null;
  }

  static number(value, fieldName = 'This field') {
    if (value && isNaN(Number(value))) {
      return `${fieldName} must be a number`;
    }
    return null;
  }

  static positiveNumber(value, fieldName = 'This field') {
    const num = Number(value);
    if (value && (isNaN(num) || num <= 0)) {
      return `${fieldName} must be a positive number`;
    }
    return null;
  }

  static url(url, fieldName = 'URL') {
    if (!url) return null; // URL is optional
    
    try {
      new URL(url);
      return null;
    } catch {
      return `${fieldName} must be a valid URL`;
    }
  }

  static fileSize(file, maxSizeMB = 10) {
    if (!file) return null;
    
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size must be less than ${maxSizeMB}MB`;
    }
    return null;
  }

  static fileType(file, allowedTypes = ['image/jpeg', 'image/png', 'image/webp']) {
    if (!file) return null;
    
    if (!allowedTypes.includes(file.type)) {
      return `File type must be one of: ${allowedTypes.join(', ')}`;
    }
    return null;
  }

  // Validate recipe data
  static recipe(recipeData) {
    const errors = {};

    // Required fields
    errors.title = this.required(recipeData.title, 'Recipe title');
    errors.description = this.required(recipeData.description, 'Recipe description');
    errors.prepTime = this.positiveNumber(recipeData.prepTime, 'Prep time');
    errors.cookTime = this.positiveNumber(recipeData.cookTime, 'Cook time');
    errors.servings = this.positiveNumber(recipeData.servings, 'Servings');
    errors.cuisine = this.required(recipeData.cuisine, 'Cuisine');
    errors.category = this.required(recipeData.category, 'Category');

    // Optional validations
    if (recipeData.title) {
      errors.title = this.maxLength(recipeData.title, 100, 'Recipe title') || errors.title;
    }
    if (recipeData.description) {
      errors.description = this.maxLength(recipeData.description, 500, 'Recipe description') || errors.description;
    }

    // Remove null values
    Object.keys(errors).forEach(key => {
      if (errors[key] === null) {
        delete errors[key];
      }
    });

    return errors;
  }

  // Validate user profile data
  static userProfile(profileData) {
    const errors = {};

    if (profileData.firstName) {
      errors.firstName = this.maxLength(profileData.firstName, 50, 'First name');
    }
    if (profileData.lastName) {
      errors.lastName = this.maxLength(profileData.lastName, 50, 'Last name');
    }
    if (profileData.bio) {
      errors.bio = this.maxLength(profileData.bio, 500, 'Bio');
    }

    // Remove null values
    Object.keys(errors).forEach(key => {
      if (errors[key] === null) {
        delete errors[key];
      }
    });

    return errors;
  }
}

export default Validation; 