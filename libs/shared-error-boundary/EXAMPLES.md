# Error Boundary Usage Examples

## 1. Basic App-Level Error Boundary

```jsx
// apps/customer-dashboard/src/app/App.jsx
import { ErrorBoundary } from '@brizpickr/shared-error-boundary';

export default function App() {
  return (
    <ErrorBoundary
      theme="default"
      showDetails={process.env.NODE_ENV === 'development'}
      customMessage="Something went wrong in the customer dashboard."
    >
      <YourApp />
    </ErrorBoundary>
  );
}
```

## 2. Feature-Level Error Boundary

```jsx
// apps/customer-dashboard/src/app/features/projects/components/ProjectsDashboard.jsx
import { ErrorBoundary } from '@brizpickr/shared-error-boundary';

export function ProjectsDashboard() {
  return (
    <ErrorBoundary
      theme="danger"
      customMessage="Failed to load projects. Please try again."
      onError={(error, errorInfo, errorId) => {
        // Log to analytics
        analytics.track('project_dashboard_error', {
          errorId,
          error: error.message,
          component: 'ProjectsDashboard',
        });
      }}
    >
      <ProjectsList />
    </ErrorBoundary>
  );
}
```

## 3. Component-Level Error Boundary

```jsx
// apps/customer-dashboard/src/app/features/products/components/ProductCard.jsx
import { withErrorBoundary } from '@brizpickr/shared-error-boundary';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
    </div>
  );
}

// Wrap with error boundary
export default withErrorBoundary(ProductCard, {
  theme: 'default',
  customMessage: 'Failed to load product information.',
  showDetails: false,
});
```

## 4. API Error Handling

```jsx
// apps/customer-dashboard/src/app/features/auth/hooks/useAuth.js
import { useApiErrorHandler } from '@brizpickr/shared-error-boundary';

export function useAuth() {
  const { handleApiError } = useApiErrorHandler();

  const login = async credentials => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      handleApiError(error, {
        endpoint: '/auth/login',
        method: 'POST',
        context: 'user_login',
      });
      throw error;
    }
  };

  return { login };
}
```

## 5. Async Error Handling

```jsx
// apps/customer-dashboard/src/app/features/projects/hooks/useProjects.js
import { useErrorHandler } from '@brizpickr/shared-error-boundary';

export function useProjects() {
  const { handleAsyncError } = useErrorHandler();

  const fetchProjects = async () => {
    return await handleAsyncError(
      async () => {
        const response = await api.get('/projects');
        return response.data;
      },
      { context: 'fetch_projects' }
    );
  };

  return { fetchProjects };
}
```

## 6. Custom Error Fallback

```jsx
// apps/customer-dashboard/src/app/features/analytics/components/AnalyticsDashboard.jsx
import { ErrorBoundary, ErrorFallback } from '@brizpickr/shared-error-boundary';

function CustomAnalyticsFallback({ error, errorId, resetError }) {
  return (
    <div className="analytics-error">
      <h2>Analytics Unavailable</h2>
      <p>We're having trouble loading your analytics data.</p>
      <button onClick={resetError}>Retry</button>
      <p className="error-id">Error ID: {errorId}</p>
    </div>
  );
}

export function AnalyticsDashboard() {
  return (
    <ErrorBoundary
      fallback={CustomAnalyticsFallback}
      onError={(error, errorInfo, errorId) => {
        // Send to analytics service
        analytics.captureException(error, {
          tags: { component: 'AnalyticsDashboard' },
          extra: { errorId },
        });
      }}
    >
      <AnalyticsCharts />
    </ErrorBoundary>
  );
}
```

## 7. Different Themes for Different Contexts

```jsx
// apps/customer-dashboard/src/app/features/notifications/components/NotificationCenter.jsx
import { ErrorBoundary } from '@brizpickr/shared-error-boundary';

export function NotificationCenter() {
  return (
    <ErrorBoundary
      theme="dark"
      customMessage="Unable to load notifications."
      showContactSupport={false}
    >
      <NotificationsList />
    </ErrorBoundary>
  );
}

// apps/customer-dashboard/src/app/features/payments/components/PaymentForm.jsx
export function PaymentForm() {
  return (
    <ErrorBoundary
      theme="danger"
      customMessage="Payment processing error. Please try again."
      reloadOnRetry={true}
    >
      <PaymentFormContent />
    </ErrorBoundary>
  );
}
```

## 8. Error Boundary with Redux Integration

```jsx
// apps/customer-dashboard/src/app/features/user/components/UserProfile.jsx
import { ErrorBoundary } from '@brizpickr/shared-error-boundary';
import { useDispatch } from 'react-redux';
import { setError } from '../store/userSlice';

export function UserProfile() {
  const dispatch = useDispatch();

  return (
    <ErrorBoundary
      onError={(error, errorInfo, errorId) => {
        // Dispatch to Redux store
        dispatch(
          setError({
            message: error.message,
            errorId,
            timestamp: new Date().toISOString(),
          })
        );
      }}
    >
      <ProfileContent />
    </ErrorBoundary>
  );
}
```

## 9. Error Boundary with React Query

```jsx
// apps/customer-dashboard/src/app/features/products/components/ProductList.jsx
import { ErrorBoundary } from '@brizpickr/shared-error-boundary';
import { useQuery } from '@tanstack/react-query';

function ProductListContent() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (error) {
    throw error; // This will be caught by ErrorBoundary
  }

  return <div>{/* render products */}</div>;
}

export function ProductList() {
  return (
    <ErrorBoundary
      customMessage="Failed to load products. Please refresh the page."
      onError={(error, errorInfo, errorId) => {
        // Invalidate React Query cache
        queryClient.invalidateQueries(['products']);
      }}
    >
      <ProductListContent />
    </ErrorBoundary>
  );
}
```

## 10. Error Boundary for Different Environments

```jsx
// apps/customer-dashboard/src/app/App.jsx
import { ErrorBoundary } from '@brizpickr/shared-error-boundary';

export default function App() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <ErrorBoundary
      theme={isProduction ? 'default' : 'danger'}
      showDetails={isDevelopment}
      showErrorId={isDevelopment}
      showContactSupport={isProduction}
      customMessage={
        isProduction
          ? 'Something went wrong. Our team has been notified.'
          : 'Development Error - Check console for details.'
      }
      onError={(error, errorInfo, errorId) => {
        if (isProduction) {
          // Send to production error service
          sentry.captureException(error, {
            extra: { errorInfo, errorId },
          });
        } else {
          // Log to console in development
          console.error('Development Error:', { error, errorInfo, errorId });
        }
      }}
    >
      <YourApp />
    </ErrorBoundary>
  );
}
```

## 11. Error Boundary with Internationalization

```jsx
// apps/customer-dashboard/src/app/features/i18n/components/LocalizedErrorBoundary.jsx
import { ErrorBoundary } from '@brizpickr/shared-error-boundary';
import { useTranslation } from 'react-i18next';

export function LocalizedErrorBoundary({ children }) {
  const { t } = useTranslation();

  return (
    <ErrorBoundary
      customMessage={t('errors.general.message')}
      fallback={({ error, errorId, resetError }) => (
        <div className="localized-error">
          <h2>{t('errors.general.title')}</h2>
          <p>{t('errors.general.description')}</p>
          <button onClick={resetError}>{t('errors.general.retry')}</button>
          <p>{t('errors.general.errorId', { id: errorId })}</p>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
```

## 12. Error Boundary with Performance Monitoring

```jsx
// apps/customer-dashboard/src/app/features/performance/components/PerformanceErrorBoundary.jsx
import { ErrorBoundary } from '@brizpickr/shared-error-boundary';

export function PerformanceErrorBoundary({ children, componentName }) {
  return (
    <ErrorBoundary
      onError={(error, errorInfo, errorId) => {
        // Track performance impact
        performance.mark(`error-${errorId}-start`);

        // Log to performance monitoring service
        performanceMonitor.trackError({
          componentName,
          errorId,
          error: error.message,
          timestamp: performance.now(),
          userAgent: navigator.userAgent,
        });
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
```

These examples show how to use the shared error boundary library effectively across different scenarios and applications in your monorepo.
