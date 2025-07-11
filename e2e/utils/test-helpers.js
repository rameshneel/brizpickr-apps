const { expect } = require('@playwright/test');

/**
 * Test data for different user roles and scenarios
 */
const TEST_USERS = {
  admin: {
    email: 'admin@brizpickr.com',
    password: 'AdminPass123!',
    name: 'Admin User',
    role: 'admin',
  },
  manager: {
    email: 'manager@brizpickr.com',
    password: 'ManagerPass123!',
    name: 'Manager User',
    role: 'manager',
  },
  user: {
    email: 'user@brizpickr.com',
    password: 'UserPass123!',
    name: 'Regular User',
    role: 'user',
  },
  locked: {
    email: 'locked@brizpickr.com',
    password: 'LockedPass123!',
    name: 'Locked User',
    role: 'user',
  },
};

/**
 * Test data for projects
 */
const TEST_PROJECTS = {
  active: {
    name: 'Active Test Project',
    description: 'This is an active test project',
    status: 'active',
    priority: 'high',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  },
  completed: {
    name: 'Completed Test Project',
    description: 'This is a completed test project',
    status: 'completed',
    priority: 'medium',
    startDate: '2024-01-01',
    endDate: '2024-06-30',
  },
  pending: {
    name: 'Pending Test Project',
    description: 'This is a pending test project',
    status: 'pending',
    priority: 'low',
    startDate: '2024-07-01',
    endDate: '2024-12-31',
  },
};

/**
 * Test data for products
 */
const TEST_PRODUCTS = {
  electronics: {
    name: 'Test Electronics Product',
    description: 'A test electronics product',
    price: 299.99,
    category: 'electronics',
    stock: 50,
  },
  clothing: {
    name: 'Test Clothing Product',
    description: 'A test clothing product',
    price: 49.99,
    category: 'clothing',
    stock: 100,
  },
};

/**
 * Login helper function
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} userType - Type of user (admin, manager, user, locked)
 * @param {Object} options - Additional options
 */
async function login(page, userType = 'user', options = {}) {
  const user = TEST_USERS[userType];

  // Navigate to login page
  await page.goto('/login');

  // Wait for page to load
  await page.waitForLoadState('networkidle');

  // Fill login form
  await page.fill('[data-testid="email-input"]', user.email);
  await page.fill('[data-testid="password-input"]', user.password);

  // Handle remember me option
  if (options.rememberMe) {
    await page.check('[data-testid="remember-me"]');
  }

  // Submit form
  await page.click('[data-testid="login-button"]');

  // Wait for navigation or error
  if (options.expectError) {
    await expect(page.locator('[data-testid="login-error"]')).toBeVisible();
  } else {
    await expect(page).toHaveURL(/.*dashboard/);
    await page.waitForLoadState('networkidle');
  }
}

/**
 * Logout helper function
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function logout(page) {
  // Open user menu
  await page.click('[data-testid="user-menu"]');

  // Click logout
  await page.click('[data-testid="logout-button"]');

  // Handle confirmation dialog if present
  const confirmationDialog = page.locator(
    '[data-testid="logout-confirmation"]'
  );
  if (await confirmationDialog.isVisible()) {
    await page.click('[data-testid="confirm-logout"]');
  }

  // Verify redirect to login
  await expect(page).toHaveURL(/.*login/);
}

/**
 * Navigate to a specific page
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} pageName - Name of the page to navigate to
 */
async function navigateTo(page, pageName) {
  const navigationMap = {
    dashboard: '/dashboard',
    projects: '/projects',
    products: '/products',
    settings: '/settings',
    profile: '/profile',
    help: '/help',
  };

  const path = navigationMap[pageName];
  if (!path) {
    throw new Error(`Unknown page: ${pageName}`);
  }

  await page.goto(path);
  await page.waitForLoadState('networkidle');
}

/**
 * Create a new project
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {Object} projectData - Project data
 */
async function createProject(page, projectData = TEST_PROJECTS.active) {
  // Navigate to create project page
  await page.goto('/projects/create');

  // Fill project form
  await page.fill('[data-testid="project-name"]', projectData.name);
  await page.fill(
    '[data-testid="project-description"]',
    projectData.description
  );
  await page.selectOption('[data-testid="project-status"]', projectData.status);
  await page.selectOption(
    '[data-testid="project-priority"]',
    projectData.priority
  );
  await page.fill('[data-testid="project-start-date"]', projectData.startDate);
  await page.fill('[data-testid="project-end-date"]', projectData.endDate);

  // Submit form
  await page.click('[data-testid="save-project-button"]');

  // Wait for success
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
}

/**
 * Create a new product
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {Object} productData - Product data
 */
async function createProduct(page, productData = TEST_PRODUCTS.electronics) {
  // Navigate to create product page
  await page.goto('/products/create');

  // Fill product form
  await page.fill('[data-testid="product-name"]', productData.name);
  await page.fill(
    '[data-testid="product-description"]',
    productData.description
  );
  await page.fill(
    '[data-testid="product-price"]',
    productData.price.toString()
  );
  await page.selectOption(
    '[data-testid="product-category"]',
    productData.category
  );
  await page.fill(
    '[data-testid="product-stock"]',
    productData.stock.toString()
  );

  // Submit form
  await page.click('[data-testid="save-product-button"]');

  // Wait for success
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
}

/**
 * Wait for API response
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} urlPattern - URL pattern to wait for
 * @param {number} timeout - Timeout in milliseconds
 */
async function waitForApiResponse(page, urlPattern, timeout = 10000) {
  await page.waitForResponse(
    response =>
      response.url().includes(urlPattern) && response.status() === 200,
    { timeout }
  );
}

/**
 * Take screenshot with timestamp
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} name - Screenshot name
 */
async function takeScreenshot(page, name) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({
    path: `./test-results/screenshots/${name}-${timestamp}.png`,
    fullPage: true,
  });
}

/**
 * Mock API response
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} urlPattern - URL pattern to mock
 * @param {Object} responseData - Response data
 * @param {number} status - HTTP status code
 */
async function mockApiResponse(page, urlPattern, responseData, status = 200) {
  await page.route(urlPattern, route => {
    route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(responseData),
    });
  });
}

/**
 * Mock API error
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} urlPattern - URL pattern to mock
 * @param {string} errorMessage - Error message
 * @param {number} status - HTTP status code
 */
async function mockApiError(
  page,
  urlPattern,
  errorMessage = 'API Error',
  status = 500
) {
  await page.route(urlPattern, route => {
    route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify({ error: errorMessage }),
    });
  });
}

/**
 * Clear browser data
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function clearBrowserData(page) {
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
    indexedDB.deleteDatabase('brizpickr-db');
  });
}

/**
 * Check if element is visible and enabled
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} selector - Element selector
 */
async function expectElementVisibleAndEnabled(page, selector) {
  const element = page.locator(selector);
  await expect(element).toBeVisible();
  await expect(element).toBeEnabled();
}

/**
 * Fill form with validation
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {Object} formData - Form data object
 */
async function fillFormWithValidation(page, formData) {
  for (const [field, value] of Object.entries(formData)) {
    const selector = `[data-testid="${field}"]`;
    await page.fill(selector, value);

    // Wait for validation to complete
    await page.waitForTimeout(100);
  }
}

/**
 * Verify form validation errors
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {Array} expectedErrors - Array of expected error messages
 */
async function verifyFormErrors(page, expectedErrors) {
  for (const error of expectedErrors) {
    await expect(
      page.locator(`[data-testid="error-message"]:has-text("${error}")`)
    ).toBeVisible();
  }
}

module.exports = {
  TEST_USERS,
  TEST_PROJECTS,
  TEST_PRODUCTS,
  login,
  logout,
  navigateTo,
  createProject,
  createProduct,
  waitForApiResponse,
  takeScreenshot,
  mockApiResponse,
  mockApiError,
  clearBrowserData,
  expectElementVisibleAndEnabled,
  fillFormWithValidation,
  verifyFormErrors,
};
