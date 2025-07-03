// Global Route Constants
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROJECTS: '/projects',
  PRODUCTS: '/products',
  PROFILE: '/profile',
  SETTINGS: '/settings',
};

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.PROJECTS,
  ROUTES.PRODUCTS,
  ROUTES.PROFILE,
  ROUTES.SETTINGS,
];
