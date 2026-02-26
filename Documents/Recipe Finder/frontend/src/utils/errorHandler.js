// Error handling utility for frontend
class ErrorHandler {
  static handle(error, context = '') {
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`Error in ${context}:`, error);
    }

    // Return user-friendly error message
    if (error.message) {
      return error.message;
    }

    if (error.response?.data?.message) {
      return error.response.data.message;
    }

    if (error.response?.status === 404) {
      return 'Resource not found';
    }

    if (error.response?.status === 401) {
      return 'Please log in to continue';
    }

    if (error.response?.status === 403) {
      return 'You do not have permission to perform this action';
    }

    if (error.response?.status >= 500) {
      return 'Server error. Please try again later';
    }

    return 'An unexpected error occurred. Please try again';
  }

  static isNetworkError(error) {
    return !error.response && error.request;
  }

  static isAuthError(error) {
    return error.response?.status === 401 || error.response?.status === 403;
  }

  static isValidationError(error) {
    return error.response?.status === 400 && error.response?.data?.errors;
  }

  static getValidationErrors(error) {
    if (this.isValidationError(error)) {
      return error.response.data.errors.map(err => err.msg);
    }
    return [];
  }
}

export default ErrorHandler; 