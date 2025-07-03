import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

// Import the global auth store
export { store as authStore } from '@brizpickr/shared-store';

// Re-export auth-related exports for convenience
export {
  // Auth slice
  loginUser,
  registerUser,
  logoutUser,
  refreshToken,
  fetchUserProfile,
  clearError,
  updateUserProfile,
  setLastActivity,
  setPermissions,
  setRoles,
  setTestUser,

  // Selectors
  selectAuth,
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectError,
  selectAccessToken,
  selectPermissions,
  selectRoles,
  selectHasPermission,
  selectHasRole,
  selectIsAdmin,

  // Hooks
  useAuth,
  useUser,
  useIsAuthenticated,
  useIsLoading,
  useAuthError,
  useAccessToken,
  usePermissions,
  useRoles,
  useHasPermission,
  useHasRole,
  useIsAdmin,
  useLogin,
  useLogout,
  useUserProfile,
  useHasAnyPermission,
  useHasAllPermissions,
  useHasAnyRole,
  useIsSuperAdmin,
  useUserDisplay,

  // Providers
  AuthProvider,
  withAuth,
  RequireAuth,
  RequirePermission,
  RequireRole,
  RequireAdmin,

  // Utils
  isTokenExpired,
  getTokenExpiration,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  hasRole,
  hasAnyRole,
  isAdmin,
  isSuperAdmin,
  formatUserDisplayName,
  getUserInitials,
  isSessionActive,
  getSessionTimeRemaining,
  formatSessionTimeRemaining,
  isValidEmail,
  validatePasswordStrength,
  generateRandomPassword,
} from '@brizpickr/shared-store';
