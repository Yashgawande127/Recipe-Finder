// API Service for Recipe Finder - Backend Integration
// Handles all HTTP requests to the Node.js/Express backend

import APP_CONFIG from '../config';

class APIService {
  constructor() {
    this.baseURL = APP_CONFIG.apiBaseUrl;
    this.token = localStorage.getItem('token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  // Get authentication headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Get headers for file uploads
  getFileHeaders() {
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // File upload request
  async uploadRequest(endpoint, formData) {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getFileHeaders(),
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      return data;
    } catch (error) {
      console.error('File Upload Error:', error);
      throw error;
    }
  }

  // Authentication methods
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async logout() {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.setToken(null);
    }
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Recipe methods
  async getRecipes(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/recipes?${queryString}` : '/recipes';
    return this.request(endpoint);
  }

  async getRecipe(id) {
    return this.request(`/recipes/${id}`);
  }

  async createRecipe(recipeData, images = []) {
    const formData = new FormData();
    
    // Add recipe data
    Object.keys(recipeData).forEach(key => {
      if (key === 'ingredients' || key === 'instructions' || key === 'dietaryInfo' || key === 'tags') {
        formData.append(key, JSON.stringify(recipeData[key]));
      } else {
        formData.append(key, recipeData[key]);
      }
    });

    // Add images
    images.forEach((image, index) => {
      formData.append('images', image);
    });

    return this.uploadRequest('/recipes', formData);
  }

  async updateRecipe(id, recipeData, newImages = []) {
    const formData = new FormData();
    
    // Add recipe data
    Object.keys(recipeData).forEach(key => {
      if (key === 'ingredients' || key === 'instructions' || key === 'dietaryInfo' || key === 'tags') {
        formData.append(key, JSON.stringify(recipeData[key]));
      } else {
        formData.append(key, recipeData[key]);
      }
    });

    // Add new images
    newImages.forEach((image) => {
      formData.append('images', image);
    });

    const url = `${this.baseURL}/recipes/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: this.getFileHeaders(),
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Update failed');
    }

    return data;
  }

  async deleteRecipe(id) {
    return this.request(`/recipes/${id}`, {
      method: 'DELETE',
    });
  }

  async rateRecipe(id, rating, review = '') {
    return this.request(`/recipes/${id}/rate`, {
      method: 'POST',
      body: JSON.stringify({ rating, review }),
    });
  }

  // User methods
  async getUserProfile() {
    return this.request('/users/profile');
  }

  async updateUserProfile(profileData, avatar = null) {
    if (avatar) {
      const formData = new FormData();
      Object.keys(profileData).forEach(key => {
        if (Array.isArray(profileData[key])) {
          formData.append(key, JSON.stringify(profileData[key]));
        } else {
          formData.append(key, profileData[key]);
        }
      });
      formData.append('avatar', avatar);

      const url = `${this.baseURL}/users/profile`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: this.getFileHeaders(),
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Profile update failed');
      }

      return data;
    } else {
      return this.request('/users/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      });
    }
  }

  async getFavorites(page = 1, limit = 12) {
    return this.request(`/users/favorites?page=${page}&limit=${limit}`);
  }

  async addToFavorites(recipeId) {
    return this.request(`/users/favorites/${recipeId}`, {
      method: 'POST',
    });
  }

  async removeFromFavorites(recipeId) {
    return this.request(`/users/favorites/${recipeId}`, {
      method: 'DELETE',
    });
  }

  // Comments methods
  async getRecipeComments(recipeId, page = 1, limit = 10) {
    return this.request(`/comments/recipe/${recipeId}?page=${page}&limit=${limit}`);
  }

  async createComment(commentData) {
    return this.request('/comments', {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  }

  async updateComment(id, content) {
    return this.request(`/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    });
  }

  async deleteComment(id) {
    return this.request(`/comments/${id}`, {
      method: 'DELETE',
    });
  }

  async toggleCommentLike(id) {
    return this.request(`/comments/${id}/like`, {
      method: 'POST',
    });
  }
}

// Create and export a single instance
const apiService = new APIService();

// Initialize with stored token
const initializeAuth = () => {
  const token = localStorage.getItem('token');
  if (token) {
    apiService.setToken(token);
  }
};

initializeAuth();

export default apiService;