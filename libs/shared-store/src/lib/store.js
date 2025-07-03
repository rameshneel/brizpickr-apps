import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

// Configure the store
const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other slices here as needed
    // products: productsReducer,
    // projects: projectsReducer,
    // notifications: notificationsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.lastActivity'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Export store for use in apps
export { store };
