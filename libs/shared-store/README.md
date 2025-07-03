# BrizPickr Global Auth Store

A comprehensive Redux Toolkit-based authentication system that can be used across all apps in the BrizPickr monorepo.

## Features

- 🔐 **Complete Authentication Flow**: Login, register, logout, token refresh
- 🛡️ **Role-Based Access Control**: Permissions and roles management
- 🔄 **Automatic Token Refresh**: Handles expired tokens automatically
- 📱 **Session Management**: Activity tracking and session timeout
- 🎯 **React Hooks**: Easy-to-use hooks for all auth operations
- 🚀 **TypeScript Ready**: Full type support for better development experience
- 🔧 **Middleware Support**: Automatic auth headers and error handling
- 📦 **Monorepo Ready**: Shared across all apps in the workspace

## Quick Start

### 1. Setup in your app

```jsx
// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { authStore } from '@brizpickr/shared-store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={authStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

### 2. Use in components

```jsx
// LoginForm.jsx
import { useLogin, useAuthError, clearError } from '@brizpickr/shared-store';

export default function LoginForm() {
  const { login, isLoading } = useLogin();
  const authError = useAuthError();

  const handleSubmit = async credentials => {
    const result = await login(credentials);
    if (result.meta.requestStatus === 'fulfilled') {
      // Navigate to dashboard
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
      {authError && <div className="error">{authError}</div>}
    </form>
  );
}
```

## API Reference

### Hooks

#### `useAuth()`

Main auth hook that provides all auth state and actions.

```jsx
const {
  user,
  isAuthenticated,
  isLoading,
  error,
  login,
  logout,
  register,
  refreshToken,
  fetchProfile,
  clearError,
  updateProfile,
} = useAuth();
```

#### `useUser()`

Get current user data.

```jsx
const user = useUser();
// Returns: { id, email, firstName, lastName, avatar, etc. }
```

#### `useIsAuthenticated()`

Check if user is authenticated.

```jsx
const isAuthenticated = useIsAuthenticated();
// Returns: boolean
```

#### `useLogin()`

Login-specific hook with loading and error states.

```jsx
const { login, isLoading, error } = useLogin();
```

#### `useLogout()`

Logout-specific hook.

```jsx
const { logout, isLoading } = useLogout();
```

#### `useUserProfile()`

User profile management hook.

```jsx
const { user, fetchProfile, updateProfile, isLoading, error } =
  useUserProfile();
```

### Permission & Role Hooks

#### `useHasPermission(permission)`

Check if user has a specific permission.

```jsx
const canEditProjects = useHasPermission('projects.edit');
```

#### `useHasRole(role)`

Check if user has a specific role.

```jsx
const isAdmin = useHasRole('admin');
```

#### `useIsAdmin()`

Check if user is an admin.

```jsx
const isAdmin = useIsAdmin();
```

#### `useHasAnyPermission(permissions)`

Check if user has any of the specified permissions.

```jsx
const canManageContent = useHasAnyPermission(['posts.edit', 'pages.edit']);
```

#### `useHasAllPermissions(permissions)`

Check if user has all specified permissions.

```jsx
const canManageUsers = useHasAllPermissions(['users.read', 'users.write']);
```

### Provider Components

#### `AuthProvider`

Wrap your app with the auth provider.

```jsx
import { AuthProvider } from '@brizpickr/shared-store';

function App() {
  return (
    <AuthProvider>
      <YourApp />
    </AuthProvider>
  );
}
```

#### `RequireAuth`

Protect routes that require authentication.

```jsx
import { RequireAuth } from '@brizpickr/shared-store';

function ProtectedPage() {
  return (
    <RequireAuth fallback={<LoginPage />}>
      <Dashboard />
    </RequireAuth>
  );
}
```

#### `RequirePermission`

Protect components based on permissions.

```jsx
import { RequirePermission } from '@brizpickr/shared-store';

function AdminPanel() {
  return (
    <RequirePermission permission="admin.access" fallback={<AccessDenied />}>
      <AdminDashboard />
    </RequirePermission>
  );
}
```

#### `RequireRole`

Protect components based on roles.

```jsx
import { RequireRole } from '@brizpickr/shared-store';

function AdminOnly() {
  return (
    <RequireRole role="admin" fallback={<AccessDenied />}>
      <AdminContent />
    </RequireRole>
  );
}
```

### Utility Functions

#### Token Management

```jsx
import { isTokenExpired, getTokenExpiration } from '@brizpickr/shared-store';

const token = 'your-jwt-token';
const isExpired = isTokenExpired(token);
const expiration = getTokenExpiration(token);
```

#### Permission Checks

```jsx
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
} from '@brizpickr/shared-store';

const userPermissions = ['read', 'write'];
hasPermission(userPermissions, 'read'); // true
hasAnyPermission(userPermissions, ['read', 'delete']); // true
hasAllPermissions(userPermissions, ['read', 'write']); // true
```

#### User Display

```jsx
import {
  formatUserDisplayName,
  getUserInitials,
} from '@brizpickr/shared-store';

const user = { firstName: 'John', lastName: 'Doe' };
formatUserDisplayName(user); // "John Doe"
getUserInitials(user); // "JD"
```

#### Session Management

```jsx
import {
  isSessionActive,
  getSessionTimeRemaining,
} from '@brizpickr/shared-store';

const lastActivity = '2024-01-01T10:00:00Z';
isSessionActive(lastActivity); // true/false
getSessionTimeRemaining(lastActivity); // milliseconds remaining
```

## Configuration

### API Endpoints

Update the API endpoints in `authSlice.js` to match your backend:

```jsx
// In authSlice.js
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(credentials),
});
```

### Token Storage

Tokens are automatically stored in localStorage. You can customize this behavior by modifying the slice.

### Session Timeout

Default session timeout is 30 minutes. You can adjust this in `authUtils.js`:

```jsx
const thirtyMinutes = 30 * 60 * 1000; // Adjust this value
```

## Best Practices

### 1. Error Handling

Always handle auth errors gracefully:

```jsx
const { login, isLoading } = useLogin();
const authError = useAuthError();

const handleLogin = async credentials => {
  try {
    const result = await login(credentials);
    if (result.meta.requestStatus === 'rejected') {
      // Handle error
      console.error('Login failed:', result.payload);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
};
```

### 2. Loading States

Show loading indicators during auth operations:

```jsx
const { isLoading } = useAuth();

if (isLoading) {
  return <LoadingSpinner />;
}
```

### 3. Permission Checks

Use permission checks for conditional rendering:

```jsx
const canEdit = useHasPermission('projects.edit');

return (
  <div>
    <ProjectList />
    {canEdit && <CreateProjectButton />}
  </div>
);
```

### 4. Route Protection

Protect routes at the component level:

```jsx
function Dashboard() {
  return (
    <RequireAuth fallback={<Navigate to="/login" />}>
      <RequirePermission
        permission="dashboard.access"
        fallback={<AccessDenied />}
      >
        <DashboardContent />
      </RequirePermission>
    </RequireAuth>
  );
}
```

### 5. Token Refresh

The system automatically handles token refresh, but you can manually trigger it:

```jsx
const { refreshToken } = useAuth();

// Manual refresh
await refreshToken();
```

## Testing

### Mock Auth for Testing

Use the `setTestUser` action for testing:

```jsx
import { setTestUser } from '@brizpickr/shared-store';

// In your test setup
dispatch(
  setTestUser({
    id: 1,
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    permissions: ['read', 'write'],
    roles: ['user'],
  })
);
```

### Test Permissions

```jsx
import { hasPermission, hasRole } from '@brizpickr/shared-store';

const userPermissions = ['read', 'write'];
const userRoles = ['admin'];

hasPermission(userPermissions, 'read'); // true
hasRole(userRoles, 'admin'); // true
```

## Troubleshooting

### Common Issues

1. **Tokens not persisting**: Check localStorage permissions
2. **API calls failing**: Verify API endpoints in authSlice.js
3. **Permission checks not working**: Ensure permissions are properly set in user object
4. **Token refresh not working**: Check refresh token endpoint and logic

### Debug Mode

Enable Redux DevTools for debugging:

```jsx
// In store.js
devTools: process.env.NODE_ENV !== 'production';
```

## Contributing

When adding new features to the auth system:

1. Follow the existing patterns in `authSlice.js`
2. Add corresponding hooks in `useAuth.js`
3. Update utility functions in `authUtils.js` if needed
4. Add tests for new functionality
5. Update this README with new features

## License

This auth system is part of the BrizPickr monorepo and follows the same licensing terms.
