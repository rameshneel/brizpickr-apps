import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { publicRoutes, protectedRoutes, routeGuards } from './routesConfig';

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useSelector(state => state.auth);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to={routeGuards.redirectTo} replace />;
  }

  return children;
}

// Public Route Component
function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useSelector(state => state.auth);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

// Route Renderer Component
function RouteRenderer({ route, isProtected = false }) {
  const RouteComponent = route.element;

  if (isProtected) {
    return (
      <ProtectedRoute>
        <RouteComponent />
      </ProtectedRoute>
    );
  }

  return (
    <PublicRoute>
      <RouteComponent />
    </PublicRoute>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={<RouteRenderer route={route} isProtected={false} />}
          />
        ))}

        {/* Protected Routes */}
        {protectedRoutes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={<RouteRenderer route={route} isProtected={true} />}
          />
        ))}

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}
