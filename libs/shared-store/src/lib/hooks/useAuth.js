import { useSelector, useDispatch } from 'react-redux';
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshToken,
  fetchUserProfile,
  clearError,
  updateUserProfile,
  setLastActivity,
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
} from '../slices/authSlice';

// Main auth hook
export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  return {
    ...auth,
    login: credentials => dispatch(loginUser(credentials)),
    register: userData => dispatch(registerUser(userData)),
    logout: () => dispatch(logoutUser()),
    refreshToken: () => dispatch(refreshToken()),
    fetchProfile: () => dispatch(fetchUserProfile()),
    clearError: () => dispatch(clearError()),
    updateProfile: updates => dispatch(updateUserProfile(updates)),
    setLastActivity: () => dispatch(setLastActivity()),
  };
};

// Individual selectors for specific use cases
export const useUser = () => useSelector(selectUser);
export const useIsAuthenticated = () => useSelector(selectIsAuthenticated);
export const useIsLoading = () => useSelector(selectIsLoading);
export const useAuthError = () => useSelector(selectError);
export const useAccessToken = () => useSelector(selectAccessToken);
export const usePermissions = () => useSelector(selectPermissions);
export const useRoles = () => useSelector(selectRoles);

// Permission and role checking hooks
export const useHasPermission = permission =>
  useSelector(state => selectHasPermission(state, permission));
export const useHasRole = role =>
  useSelector(state => selectHasRole(state, role));
export const useIsAdmin = () => useSelector(selectIsAdmin);

// Custom hooks for specific functionality
export const useLogin = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(selectAuth);

  return {
    login: credentials => dispatch(loginUser(credentials)),
    isLoading,
    error,
  };
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectAuth);

  return {
    logout: () => dispatch(logoutUser()),
    isLoading,
  };
};

export const useUserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { isLoading, error } = useSelector(selectAuth);

  return {
    user,
    fetchProfile: () => dispatch(fetchUserProfile()),
    updateProfile: updates => dispatch(updateUserProfile(updates)),
    isLoading,
    error,
  };
};

// Hook for checking multiple permissions
export const useHasAnyPermission = permissions => {
  const userPermissions = useSelector(selectPermissions);

  if (!userPermissions || !Array.isArray(userPermissions)) return false;
  if (!permissions || !Array.isArray(permissions)) return false;

  return permissions.some(permission => userPermissions.includes(permission));
};

// Hook for checking all permissions
export const useHasAllPermissions = permissions => {
  const userPermissions = useSelector(selectPermissions);

  if (!userPermissions || !Array.isArray(userPermissions)) return false;
  if (!permissions || !Array.isArray(permissions)) return false;

  return permissions.every(permission => userPermissions.includes(permission));
};

// Hook for checking multiple roles
export const useHasAnyRole = roles => {
  const userRoles = useSelector(selectRoles);

  if (!userRoles || !Array.isArray(userRoles)) return false;
  if (!roles || !Array.isArray(roles)) return false;

  return roles.some(role => userRoles.includes(role));
};

// Hook for checking if user is super admin
export const useIsSuperAdmin = () => {
  const userRoles = useSelector(selectRoles);
  return userRoles && userRoles.includes('super_admin');
};

// Hook for user display information
export const useUserDisplay = () => {
  const user = useSelector(selectUser);

  if (!user) {
    return {
      displayName: 'Unknown User',
      initials: 'U',
      avatar: null,
    };
  }

  const displayName =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.firstName ||
        user.email?.split('@')[0] ||
        user.username ||
        'Unknown User';

  const initials =
    user.firstName && user.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
      : user.firstName?.[0]?.toUpperCase() ||
        user.email?.[0]?.toUpperCase() ||
        'U';

  return {
    displayName,
    initials,
    avatar: user.avatar || null,
    email: user.email,
    username: user.username,
  };
};
