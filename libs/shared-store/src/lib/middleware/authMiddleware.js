import { refreshToken } from '../slices/authSlice';

// Auth middleware for automatic token handling
export const authMiddleware = store => next => action => {
  // Check if action is an API call that might need authentication
  if (action.type && action.type.includes('/fulfilled')) {
    // Update last activity on successful API calls
    store.dispatch({ type: 'auth/setLastActivity' });
  }

  // Handle 401 errors and attempt token refresh
  if (action.type && action.type.includes('/rejected')) {
    const error = action.payload || action.error;

    if (error && (error.status === 401 || error.message?.includes('401'))) {
      const state = store.getState();
      const { refreshToken: currentRefreshToken } = state.auth;

      if (currentRefreshToken) {
        // Attempt to refresh the token
        store.dispatch(refreshToken());
      }
    }
  }

  return next(action);
};

// API middleware for adding auth headers
export const apiMiddleware = store => next => action => {
  // If this is an async thunk with a request, add auth headers
  if (action.meta && action.meta.requestId) {
    const state = store.getState();
    const { accessToken } = state.auth;

    if (accessToken && action.meta.arg && typeof action.meta.arg === 'object') {
      // Add authorization header if not already present
      if (!action.meta.arg.headers) {
        action.meta.arg.headers = {};
      }

      if (!action.meta.arg.headers.Authorization) {
        action.meta.arg.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
  }

  return next(action);
};
