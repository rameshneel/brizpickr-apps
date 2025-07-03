import { useCallback } from 'react';

/**
 * Custom hook for handling errors in functional components
 * Provides error reporting and handling utilities
 */
export function useErrorHandler() {
  const reportError = useCallback((error, context = {}) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      context,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error reported:', errorData);
    }

    // Send to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: context });
      console.error('Production Error Report:', errorData);
    }

    return errorData.errorId;
  }, []);

  const handleAsyncError = useCallback(
    async (asyncFunction, context = {}) => {
      try {
        return await asyncFunction();
      } catch (error) {
        reportError(error, context);
        throw error;
      }
    },
    [reportError]
  );

  const createErrorBoundary = useCallback(
    (fallback, options = {}) => {
      return {
        fallback,
        onError: (error, errorInfo) => {
          reportError(error, { errorInfo, ...options });
        },
        ...options,
      };
    },
    [reportError]
  );

  return {
    reportError,
    handleAsyncError,
    createErrorBoundary,
  };
}

/**
 * Hook for handling API errors specifically
 */
export function useApiErrorHandler() {
  const { reportError } = useErrorHandler();

  const handleApiError = useCallback(
    (error, apiContext = {}) => {
      const context = {
        type: 'API_ERROR',
        endpoint: apiContext.endpoint,
        method: apiContext.method,
        status: error.response?.status,
        statusText: error.response?.statusText,
        ...apiContext,
      };

      return reportError(error, context);
    },
    [reportError]
  );

  const handleNetworkError = useCallback(
    error => {
      const context = {
        type: 'NETWORK_ERROR',
        isOnline: navigator.onLine,
      };

      return reportError(error, context);
    },
    [reportError]
  );

  return {
    handleApiError,
    handleNetworkError,
  };
}
