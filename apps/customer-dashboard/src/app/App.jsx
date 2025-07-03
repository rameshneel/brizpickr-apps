import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { ErrorBoundary } from '@brizpickr/shared-error-boundary';

export default function App() {
  return (
    <ErrorBoundary
      theme="default"
      showDetails={process.env.NODE_ENV === 'development'}
      customMessage="Something went wrong in the customer dashboard. Our team has been notified."
      onError={(error, errorInfo, errorId) => {
        // Log to your error reporting service
        console.error('Customer Dashboard Error:', {
          errorId,
          error: error.message,
          stack: error.stack,
          componentStack: errorInfo?.componentStack,
          url: window.location.href,
          timestamp: new Date().toISOString(),
        });
      }}
    >
      <AppRoutes />
    </ErrorBoundary>
  );
}
