import * as yup from 'yup';

// Email validation
export const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation with detailed feedback
export const validatePassword = password => {
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

// Password strength indicator
export const getPasswordStrength = password => {
  if (!password) return { level: 'none', label: 'No password', color: 'gray' };

  const validation = validatePassword(password);
  const score = validation.score;

  if (score <= 1) return { level: 'weak', label: 'Weak', color: 'red' };
  if (score <= 2) return { level: 'fair', label: 'Fair', color: 'orange' };
  if (score <= 3) return { level: 'good', label: 'Good', color: 'yellow' };
  if (score <= 4) return { level: 'strong', label: 'Strong', color: 'blue' };
  return { level: 'very-strong', label: 'Very Strong', color: 'green' };
};

// Name validation
export const validateName = name => {
  if (!name || name.trim().length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }

  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return {
      isValid: false,
      error: 'Name can only contain letters and spaces',
    };
  }

  return { isValid: true };
};

// Phone number validation
export const validatePhone = phone => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

// URL validation
export const validateUrl = url => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Yup Schemas for form validation

// Login Schema
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

// Register Schema
export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces')
    .required('Last name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  phone: yup
    .string()
    .test('phone', 'Please enter a valid phone number', validatePhone)
    .optional(),
  agreeToTerms: yup
    .boolean()
    .oneOf([true], 'You must agree to the terms and conditions')
    .required('You must agree to the terms and conditions'),
});

// Profile Update Schema
export const profileUpdateSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces')
    .required('Last name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  phone: yup
    .string()
    .test('phone', 'Please enter a valid phone number', validatePhone)
    .optional(),
  bio: yup.string().max(500, 'Bio must be less than 500 characters').optional(),
  website: yup
    .string()
    .test('url', 'Please enter a valid URL', validateUrl)
    .optional(),
});

// Password Change Schema
export const passwordChangeSchema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('New password is required'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm new password is required'),
});

// Forgot Password Schema
export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});

// Reset Password Schema
export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

// Generic form validation helper
export const validateForm = async (schema, data) => {
  try {
    await schema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    const errors = {};
    error.inner.forEach(err => {
      errors[err.path] = err.message;
    });
    return { isValid: false, errors };
  }
};

// Real-time validation helper
export const validateField = async (schema, fieldName, value) => {
  try {
    await schema.validateAt(fieldName, { [fieldName]: value });
    return { isValid: true, error: null };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
};
