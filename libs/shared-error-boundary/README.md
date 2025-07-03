# @brizpickr/shared-error-boundary

A production-grade error boundary and error handling library for BrizPickr applications.

## Features

- 🛡️ **Production-Ready Error Boundary** - Catches and handles React errors gracefully
- 🎨 **Customizable Error UI** - Multiple themes and customizable fallback components
- 📊 **Error Reporting** - Built-in error logging and reporting capabilities
- 🔧 **Custom Hooks** - Easy-to-use hooks for error handling in functional components
- 🛠️ **Utility Functions** - Helper functions for error formatting and categorization
- 📱 **Responsive Design** - Works across all device sizes
- 🎯 **TypeScript Ready** - Full TypeScript support

## Installation

This library is part of the BrizPickr monorepo and is automatically available to all apps.

## Usage

### Basic Error Boundary

```jsx
import { ErrorBoundary } from '@brizpickr/shared-error-boundary';

function App() {
  return (
    <ErrorBoundary>
      <YourApp />
    </ErrorBoundary>
  );
}
```

### Custom Error Fallback

```jsx
import { ErrorBoundary, ErrorFallback } from '@brizpickr/shared-error-boundary';

function App() {
  return (
    <ErrorBoundary
      fallback={({ error, errorId, resetError }) => (
        <ErrorFallback
          error={error}
          errorId={errorId}
          onReset={resetError}
          theme="dark"
          customMessage="Something went wrong in our app!"
        />
      )}
    >
      <YourApp />
    </ErrorBoundary>
  );
}
```

### Using HOC

```jsx
import { withErrorBoundary } from '@brizpickr/shared-error-boundary';

const SafeComponent = withErrorBoundary(YourComponent, {
  theme: 'danger',
  showDetails: true,
});
```

### Custom Hooks

```jsx
import {
  useErrorHandler,
  useApiErrorHandler,
} from '@brizpickr/shared-error-boundary';

function MyComponent() {
  const { reportError, handleAsyncError } = useErrorHandler();
  const { handleApiError } = useApiErrorHandler();

  const handleClick = async () => {
    try {
      await handleAsyncError(
        async () => {
          // Your async operation
          const result = await apiCall();
          return result;
        },
        { context: 'button-click' }
      );
    } catch (error) {
      // Error is already reported by handleAsyncError
      console.log('Operation failed');
    }
  };

  const handleApiCall = async () => {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) throw new Error('API Error');
      return response.json();
    } catch (error) {
      handleApiError(error, {
        endpoint: '/api/data',
        method: 'GET',
      });
    }
  };
}
```

### Utility Functions

```jsx
import {
  formatErrorMessage,
  isNetworkError,
  getUserFriendlyMessage,
} from '@brizpickr/shared-error-boundary';

function handleError(error) {
  if (isNetworkError(error)) {
    console.log('Network error detected');
  }

  const userMessage = getUserFriendlyMessage(error);
  const formattedError = formatErrorMessage(error);

  // Show user-friendly message to user
  showNotification(userMessage);
}
```

## API Reference

### ErrorBoundary Props

| Prop                 | Type     | Default   | Description                            |
| -------------------- | -------- | --------- | -------------------------------------- |
| `fallback`           | Function | -         | Custom fallback component              |
| `theme`              | string   | 'default' | UI theme ('default', 'dark', 'danger') |
| `showDetails`        | boolean  | false     | Show error details by default          |
| `showErrorId`        | boolean  | true      | Show error ID to user                  |
| `showContactSupport` | boolean  | true      | Show contact support button            |
| `reloadOnRetry`      | boolean  | false     | Reload page on retry                   |
| `onError`            | Function | -         | Custom error handler                   |
| `customMessage`      | string   | -         | Custom error message                   |

### ErrorFallback Props

| Prop            | Type     | Default   | Description             |
| --------------- | -------- | --------- | ----------------------- |
| `error`         | Error    | -         | The caught error        |
| `errorInfo`     | Object   | -         | Error info from React   |
| `errorId`       | string   | -         | Unique error identifier |
| `onReset`       | Function | -         | Reset error state       |
| `onRetry`       | Function | -         | Retry operation         |
| `theme`         | string   | 'default' | UI theme                |
| `customMessage` | string   | -         | Custom error message    |

### Hooks

#### useErrorHandler()

Returns:

- `reportError(error, context)` - Report an error
- `handleAsyncError(asyncFunction, context)` - Handle async errors
- `createErrorBoundary(fallback, options)` - Create error boundary config

#### useApiErrorHandler()

Returns:

- `handleApiError(error, apiContext)` - Handle API errors
- `handleNetworkError(error)` - Handle network errors

### Utility Functions

- `formatErrorMessage(error)` - Format error for display
- `isNetworkError(error)` - Check if error is network-related
- `isApiError(error)` - Check if error is API-related
- `getErrorSeverity(error)` - Get error severity level
- `getUserFriendlyMessage(error)` - Get user-friendly error message
- `createErrorContext(error, context)` - Create error context
- `sanitizeErrorData(errorData)` - Remove sensitive data
- `groupErrorByType(error)` - Categorize error type

## Themes

### Default Theme

- Light background
- Blue accent colors
- Professional appearance

### Dark Theme

- Dark background
- Blue accent colors
- Modern appearance

### Danger Theme

- Red accent colors
- Warning appearance
- For critical errors

## Production Setup

### Error Reporting Services

To integrate with error reporting services like Sentry:

```jsx
// In your app initialization
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: process.env.NODE_ENV,
});

// The ErrorBoundary will automatically use Sentry if available
```

### Custom Error Handler

```jsx
<ErrorBoundary
  onError={(error, errorInfo, errorId) => {
    // Send to your error reporting service
    yourErrorService.capture(error, {
      errorInfo,
      errorId,
      user: currentUser,
      session: sessionId,
    });
  }}
>
  <YourApp />
</ErrorBoundary>
```

## Best Practices

1. **Wrap your entire app** with ErrorBoundary
2. **Use specific error boundaries** for different sections
3. **Provide meaningful error messages** to users
4. **Log errors appropriately** for debugging
5. **Handle different error types** differently
6. **Test error scenarios** in development

## Contributing

This library is part of the BrizPickr monorepo. Please follow the monorepo contribution guidelines.
