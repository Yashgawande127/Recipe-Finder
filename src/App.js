import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RecipeProvider } from './context/RecipeContext';
import { MealPlanProvider } from './context/MealPlanContext';
import { GamificationProvider } from './context/GamificationContext';
import { NotificationProvider } from './context/NotificationContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CreateRecipe from './pages/CreateRecipe';
import EditRecipe from './pages/EditRecipe';
import MyRecipes from './pages/MyRecipes';
import SeasonalCollections from './pages/SeasonalCollections';
import CollectionDetail from './pages/CollectionDetail';
import MealPlanning from './pages/MealPlanning';
import './index.css';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <NotificationProvider>
          <GamificationProvider>
            <RecipeProvider>
              <MealPlanProvider>
                <Router>
                  <div className="min-h-screen bg-gray-50 transition-colors duration-200 flex flex-col">
                    <Header />
                    <main className="container mx-auto px-4 py-8 flex-grow">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/recipe/:id" element={<RecipeDetail />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
                        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                        <Route path="/create-recipe" element={<PrivateRoute><CreateRecipe /></PrivateRoute>} />
                        <Route path="/edit-recipe/:id" element={<PrivateRoute><EditRecipe /></PrivateRoute>} />
                        <Route path="/my-recipes" element={<PrivateRoute><MyRecipes /></PrivateRoute>} />
                        <Route path="/meal-planning" element={<PrivateRoute><MealPlanning /></PrivateRoute>} />
                        <Route path="/seasonal-collections" element={<SeasonalCollections />} />
                        <Route path="/collection/:collectionId" element={<CollectionDetail />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                </Router>
              </MealPlanProvider>
            </RecipeProvider>
          </GamificationProvider>
        </NotificationProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App; 