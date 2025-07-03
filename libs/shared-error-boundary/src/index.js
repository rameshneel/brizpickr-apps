// Main exports
export {
  ErrorBoundary,
  withErrorBoundary,
  ErrorFallback,
} from './components/index.js';
export { useErrorHandler, useApiErrorHandler } from './hooks/index.js';
export {
  formatErrorMessage,
  isNetworkError,
  isApiError,
  getErrorSeverity,
  createErrorContext,
  sanitizeErrorData,
  groupErrorByType,
  getUserFriendlyMessage,
} from './utils/index.js';

// Default export for convenience
export { default } from './components/ErrorBoundary.jsx';
