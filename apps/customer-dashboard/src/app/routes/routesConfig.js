import { lazy } from 'react';

// Lazy load components for better performance
const LoginPage = lazy(() => import('../pages/LoginPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));

// Route configurations
export const publicRoutes = [
  {
    path: '/login',
    element: LoginPage,
    title: 'Login',
    description: 'User authentication page',
  },
];

export const protectedRoutes = [
  {
    path: '/dashboard',
    element: DashboardPage,
    title: 'Dashboard',
    description: 'Main dashboard page',
    icon: 'Home', // For sidebar navigation
  },
  // Add more protected routes here
  // {
  //   path: '/projects',
  //   element: lazy(() => import('../pages/ProjectsPage')),
  //   title: 'Projects',
  //   description: 'Manage projects',
  //   icon: 'Folder'
  // },
  // {
  //   path: '/profile',
  //   element: lazy(() => import('../pages/ProfilePage')),
  //   title: 'Profile',
  //   description: 'User profile settings',
  //   icon: 'User'
  // }
];

// Navigation menu items (for sidebar)
export const navigationItems = protectedRoutes.map(route => ({
  path: route.path,
  title: route.title,
  icon: route.icon,
  description: route.description,
}));

// Route guards configuration
export const routeGuards = {
  requireAuth: true,
  redirectTo: '/login',
  publicPaths: ['/login', '/register', '/forgot-password'],
};
