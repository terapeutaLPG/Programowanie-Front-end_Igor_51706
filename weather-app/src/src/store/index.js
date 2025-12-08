import { configureStore } from '@reduxjs/toolkit'; 
import settingsReducer from './slices/settingsSlice'; 
import favoritesReducer from './slices/favoritesSlice';  // ← NOWE 
 
const store = configureStore({ 
  reducer: { 
    settings: settingsReducer, 
    favorites: favoritesReducer,  // ← NOWE 
  }, 
});

export default store;