// Auth utility functions

// Check if token is expired
export const isTokenExpired = token => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Error parsing token:', error);
    return true;
  }
};

// Get token expiration time
export const getTokenExpiration = token => {
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return new Date(payload.exp * 1000);
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
};

// Check if user has permission
export const hasPermission = (userPermissions, requiredPermission) => {
  if (!userPermissions || !Array.isArray(userPermissions)) return false;
  return userPermissions.includes(requiredPermission);
};

// Check if user has any of the required permissions
export const hasAnyPermission = (userPermissions, requiredPermissions) => {
  if (!userPermissions || !Array.isArray(userPermissions)) return false;
  if (!requiredPermissions || !Array.isArray(requiredPermissions)) return false;

  return requiredPermissions.some(permission =>
    userPermissions.includes(permission)
  );
};

// Check if user has all required permissions
export const hasAllPermissions = (userPermissions, requiredPermissions) => {
  if (!userPermissions || !Array.isArray(userPermissions)) return false;
  if (!requiredPermissions || !Array.isArray(requiredPermissions)) return false;

  return requiredPermissions.every(permission =>
    userPermissions.includes(permission)
  );
};

// Check if user has role
export const hasRole = (userRoles, requiredRole) => {
  if (!userRoles || !Array.isArray(userRoles)) return false;
  return userRoles.includes(requiredRole);
};

// Check if user has any of the required roles
export const hasAnyRole = (userRoles, requiredRoles) => {
  if (!userRoles || !Array.isArray(userRoles)) return false;
  if (!requiredRoles || !Array.isArray(requiredRoles)) return false;

  return requiredRoles.some(role => userRoles.includes(role));
};

// Check if user is admin
export const isAdmin = userRoles => {
  return hasRole(userRoles, 'admin');
};

// Check if user is super admin
export const isSuperAdmin = userRoles => {
  return hasRole(userRoles, 'super_admin');
};

// Format user display name
export const formatUserDisplayName = user => {
  if (!user) return 'Unknown User';

  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }

  if (user.firstName) {
    return user.firstName;
  }

  if (user.email) {
    return user.email.split('@')[0];
  }

  return user.username || 'Unknown User';
};

// Get user initials for avatar
export const getUserInitials = user => {
  if (!user) return 'U';

  if (user.firstName && user.lastName) {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  }

  if (user.firstName) {
    return user.firstName[0].toUpperCase();
  }

  if (user.email) {
    return user.email[0].toUpperCase();
  }

  return 'U';
};

// Check if session is active (within last 30 minutes)
export const isSessionActive = lastActivity => {
  if (!lastActivity) return false;

  const lastActivityTime = new Date(lastActivity).getTime();
  const currentTime = new Date().getTime();
  const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds

  return currentTime - lastActivityTime < thirtyMinutes;
};

// Get session time remaining
export const getSessionTimeRemaining = lastActivity => {
  if (!lastActivity) return 0;

  const lastActivityTime = new Date(lastActivity).getTime();
  const currentTime = new Date().getTime();
  const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds

  const timeElapsed = currentTime - lastActivityTime;
  const timeRemaining = thirtyMinutes - timeElapsed;

  return Math.max(0, timeRemaining);
};

// Format session time remaining
export const formatSessionTimeRemaining = lastActivity => {
  const timeRemaining = getSessionTimeRemaining(lastActivity);

  if (timeRemaining === 0) return 'Session expired';

  const minutes = Math.floor(timeRemaining / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Validate email format
export const isValidEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const validatePasswordStrength = password => {
  const errors = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors,
    score: Math.max(0, 5 - errors.length), // 0-5 score
  };
};

// Generate random password
export const generateRandomPassword = (length = 12) => {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';

  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return password;
};
