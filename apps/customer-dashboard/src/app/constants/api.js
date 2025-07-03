// Global API Constants
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
  },
  PROJECTS: {
    LIST: '/projects',
    CREATE: '/projects',
    UPDATE: '/projects/:id',
    DELETE: '/projects/:id',
  },
  PRODUCTS: {
    LIST: '/products',
    CREATE: '/products',
    UPDATE: '/products/:id',
    DELETE: '/products/:id',
  },
};

export const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
