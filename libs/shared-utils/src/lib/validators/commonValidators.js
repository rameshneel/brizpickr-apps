// Common validation utilities

// Required field validation
export const isRequired = value => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

// String length validation
export const validateStringLength = (value, min = 0, max = Infinity) => {
  if (!value || typeof value !== 'string') return false;
  const length = value.trim().length;
  return length >= min && length <= max;
};

// Number validation
export const validateNumber = (value, min = -Infinity, max = Infinity) => {
  const num = Number(value);
  if (isNaN(num)) return false;
  return num >= min && num <= max;
};

// Integer validation
export const validateInteger = (value, min = -Infinity, max = Infinity) => {
  const num = Number(value);
  if (isNaN(num) || !Number.isInteger(num)) return false;
  return num >= min && num <= max;
};

// Date validation
export const validateDate = date => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

// Future date validation
export const validateFutureDate = date => {
  const d = new Date(date);
  const now = new Date();
  return d instanceof Date && !isNaN(d) && d > now;
};

// Past date validation
export const validatePastDate = date => {
  const d = new Date(date);
  const now = new Date();
  return d instanceof Date && !isNaN(d) && d < now;
};

// File size validation (in bytes)
export const validateFileSize = (file, maxSize) => {
  return file && file.size <= maxSize;
};

// File type validation
export const validateFileType = (file, allowedTypes) => {
  if (!file || !allowedTypes) return false;
  return allowedTypes.includes(file.type);
};

// Image file validation
export const validateImageFile = file => {
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
  ];
  return validateFileType(file, allowedTypes);
};

// Document file validation
export const validateDocumentFile = file => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ];
  return validateFileType(file, allowedTypes);
};

// Credit card validation (Luhn algorithm)
export const validateCreditCard = cardNumber => {
  const cleaned = cardNumber.replace(/\s/g, '');
  if (!/^\d+$/.test(cleaned)) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

// Currency validation
export const validateCurrency = amount => {
  const regex = /^\d+(\.\d{1,2})?$/;
  return regex.test(amount) && parseFloat(amount) >= 0;
};

// Percentage validation
export const validatePercentage = value => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0 && num <= 100;
};

// Color hex validation
export const validateHexColor = color => {
  const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return regex.test(color);
};

// Username validation
export const validateUsername = username => {
  const regex = /^[a-zA-Z0-9_]{3,20}$/;
  return regex.test(username);
};

// Strong password validation
export const validateStrongPassword = password => {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    isValid:
      minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
    criteria: {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
    },
  };
};

// URL validation (more comprehensive)
export const validateUrl = url => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

// Social media handle validation
export const validateSocialHandle = handle => {
  const regex = /^@?[a-zA-Z0-9_]{1,15}$/;
  return regex.test(handle);
};

// Postal code validation (US format)
export const validateUSPostalCode = code => {
  const regex = /^\d{5}(-\d{4})?$/;
  return regex.test(code);
};

// Phone number validation (international)
export const validateInternationalPhone = phone => {
  const regex = /^[\+]?[1-9][\d]{0,15}$/;
  return regex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

// IP address validation
export const validateIPAddress = ip => {
  const regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return regex.test(ip);
};

// MAC address validation
export const validateMACAddress = mac => {
  const regex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  return regex.test(mac);
};

// UUID validation
export const validateUUID = uuid => {
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regex.test(uuid);
};

// Time validation (HH:MM format)
export const validateTime = time => {
  const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(time);
};

// Date range validation
export const validateDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (!validateDate(start) || !validateDate(end)) return false;

  return start <= end;
};

// Array validation
export const validateArray = (array, minLength = 0, maxLength = Infinity) => {
  if (!Array.isArray(array)) return false;
  return array.length >= minLength && array.length <= maxLength;
};

// Object validation
export const validateObject = (obj, requiredKeys = []) => {
  if (!obj || typeof obj !== 'object') return false;

  for (const key of requiredKeys) {
    if (!(key in obj)) return false;
  }

  return true;
};

// Email domain validation
export const validateEmailDomain = (email, allowedDomains = []) => {
  if (!email || !email.includes('@')) return false;

  const domain = email.split('@')[1];

  if (allowedDomains.length === 0) return true;

  return allowedDomains.includes(domain);
};

// Custom validation helper
export const createCustomValidator = (validationFn, errorMessage) => {
  return value => {
    const isValid = validationFn(value);
    return {
      isValid,
      error: isValid ? null : errorMessage,
    };
  };
};
