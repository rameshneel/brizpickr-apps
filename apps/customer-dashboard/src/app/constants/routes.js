// Global Route Constants
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROJECTS: '/projects',
  PRODUCTS: '/products',
  PROFILE: '/profile',
  // CREATEPROJECT:'/createProject',
  // EDITPROJECT:'/editProject',
  SETTINGS: '/settings',
};

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.PROJECTS,
  // ROUTES.CREATEPROJECT,
  // ROUTES.EDITPROJECT,
  ROUTES.PRODUCTS,
  ROUTES.PROFILE,
  ROUTES.SETTINGS,
];
