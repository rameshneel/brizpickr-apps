/**
 * Utility functions for error handling and formatting
 */

/**
 * Formats error message for display
 */
export function formatErrorMessage(error) {
  if (typeof error === 'string') {
    return error;
  }

  if (error?.message) {
    return error.message;
  }

  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  return 'An unexpected error occurred';
}

/**
 * Determines if error is a network error
 */
export function isNetworkError(error) {
  return (
    error?.message?.includes('Network Error') ||
    error?.message?.includes('Failed to fetch') ||
    error?.code === 'NETWORK_ERROR' ||
    !navigator.onLine
  );
}

/**
 * Determines if error is an API error
 */
export function isApiError(error) {
  return error?.response?.status !== undefined;
}

/**
 * Gets error severity level
 */
export function getErrorSeverity(error) {
  if (isNetworkError(error)) {
    return 'warning';
  }

  if (isApiError(error)) {
    const status = error.response.status;
    if (status >= 500) return 'error';
    if (status >= 400) return 'warning';
    return 'info';
  }

  return 'error';
}

/**
 * Creates error context for reporting
 */
export function createErrorContext(error, additionalContext = {}) {
  return {
    errorType: isNetworkError(error)
      ? 'network'
      : isApiError(error)
        ? 'api'
        : 'application',
    severity: getErrorSeverity(error),
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    ...additionalContext,
  };
}

/**
 * Sanitizes error data for logging (removes sensitive info)
 */
export function sanitizeErrorData(errorData) {
  const sanitized = { ...errorData };

  // Remove sensitive fields
  delete sanitized.password;
  delete sanitized.token;
  delete sanitized.apiKey;
  delete sanitized.secret;

  // Sanitize URLs that might contain tokens
  if (sanitized.url) {
    sanitized.url = sanitized.url.replace(/[?&](token|key|secret)=[^&]*/g, '');
  }

  return sanitized;
}

/**
 * Groups errors by type for analytics
 */
export function groupErrorByType(error) {
  if (isNetworkError(error)) {
    return 'network';
  }

  if (isApiError(error)) {
    const status = error.response.status;
    if (status >= 500) return 'server_error';
    if (status === 404) return 'not_found';
    if (status === 401) return 'unauthorized';
    if (status === 403) return 'forbidden';
    return 'client_error';
  }

  return 'application';
}

/**
 * Creates user-friendly error messages
 */
export function getUserFriendlyMessage(error) {
  const errorType = groupErrorByType(error);

  const messages = {
    network: 'Please check your internet connection and try again.',
    server_error:
      'Our servers are experiencing issues. Please try again later.',
    not_found: 'The requested resource was not found.',
    unauthorized: 'Please log in to access this resource.',
    forbidden: 'You do not have permission to access this resource.',
    client_error:
      'There was an issue with your request. Please check your input and try again.',
    application:
      'Something went wrong. Please try again or contact support if the problem persists.',
  };

  return messages[errorType] || messages.application;
}
