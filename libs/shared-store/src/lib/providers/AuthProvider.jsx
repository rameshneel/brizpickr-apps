import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import {
  useAuth,
  useHasPermission,
  useHasRole,
  useIsAdmin,
} from '../hooks/useAuth';

// Auth Provider component
export const AuthProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

// Higher-order component for protecting routes
export const withAuth = Component => {
  return function AuthenticatedComponent(props) {
    return (
      <AuthProvider>
        <Component {...props} />
      </AuthProvider>
    );
  };
};

// Component for requiring authentication
export const RequireAuth = ({ children, fallback = null }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return fallback;
  }

  return children;
};

// Component for requiring specific permissions
export const RequirePermission = ({
  permission,
  children,
  fallback = null,
}) => {
  const hasPermission = useHasPermission(permission);

  if (!hasPermission) {
    return fallback;
  }

  return children;
};

// Component for requiring specific roles
export const RequireRole = ({ role, children, fallback = null }) => {
  const hasRole = useHasRole(role);

  if (!hasRole) {
    return fallback;
  }

  return children;
};

// Component for requiring admin access
export const RequireAdmin = ({ children, fallback = null }) => {
  const isAdmin = useIsAdmin();

  if (!isAdmin) {
    return fallback;
  }

  return children;
};
