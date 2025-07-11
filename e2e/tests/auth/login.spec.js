const { test, expect } = require('@playwright/test');

// Test data for different scenarios
const testUsers = {
  valid: {
    email: 'test@brizpickr.com',
    password: 'TestPassword123!',
    name: 'Test User',
  },
  invalid: {
    email: 'invalid@example.com',
    password: 'wrongpassword',
  },
  locked: {
    email: 'locked@brizpickr.com',
    password: 'TestPassword123!',
  },
};

test.describe('Authentication - Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page before each test
    await page.goto('/login');

    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
  });

  test('should display login page with all required elements', async ({
    page,
  }) => {
    // Verify page title
    await expect(page).toHaveTitle(/Login|Sign In/);

    // Verify login form elements
    await expect(page.locator('[data-testid="login-form"]')).toBeVisible();
    await expect(page.locator('[data-testid="email-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="password-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="login-button"]')).toBeVisible();

    // Verify form labels
    await expect(page.locator('label[for="email"]')).toContainText('Email');
    await expect(page.locator('label[for="password"]')).toContainText(
      'Password'
    );

    // Verify "Remember me" checkbox
    await expect(page.locator('[data-testid="remember-me"]')).toBeVisible();

    // Verify "Forgot Password" link
    await expect(
      page.locator('[data-testid="forgot-password-link"]')
    ).toBeVisible();
  });

  test('should show validation errors for empty form submission', async ({
    page,
  }) => {
    // Try to submit empty form
    await page.click('[data-testid="login-button"]');

    // Wait for validation errors to appear
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="password-error"]')).toBeVisible();

    // Verify error messages
    await expect(page.locator('[data-testid="email-error"]')).toContainText(
      'Email is required'
    );
    await expect(page.locator('[data-testid="password-error"]')).toContainText(
      'Password is required'
    );
  });

  test('should show validation error for invalid email format', async ({
    page,
  }) => {
    // Enter invalid email format
    await page.fill('[data-testid="email-input"]', 'invalid-email');
    await page.fill('[data-testid="password-input"]', 'password123');

    // Submit form
    await page.click('[data-testid="login-button"]');

    // Verify email validation error
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="email-error"]')).toContainText(
      'Please enter a valid email'
    );
  });

  test('should show validation error for short password', async ({ page }) => {
    // Enter valid email but short password
    await page.fill('[data-testid="email-input"]', testUsers.valid.email);
    await page.fill('[data-testid="password-input"]', '123');

    // Submit form
    await page.click('[data-testid="login-button"]');

    // Verify password validation error
    await expect(page.locator('[data-testid="password-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="password-error"]')).toContainText(
      'Password must be at least 8 characters'
    );
  });

  test('should handle successful login with valid credentials', async ({
    page,
  }) => {
    // Fill in valid credentials
    await page.fill('[data-testid="email-input"]', testUsers.valid.email);
    await page.fill('[data-testid="password-input"]', testUsers.valid.password);

    // Check "Remember me" option
    await page.check('[data-testid="remember-me"]');

    // Submit form
    await page.click('[data-testid="login-button"]');

    // Wait for successful login redirect
    await expect(page).toHaveURL(/.*dashboard/);

    // Verify user is logged in
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
    await expect(page.locator('[data-testid="user-name"]')).toContainText(
      testUsers.valid.name
    );

    // Verify welcome message
    await expect(page.locator('[data-testid="welcome-message"]')).toContainText(
      'Welcome back'
    );
  });

  test('should show error for invalid credentials', async ({ page }) => {
    // Fill in invalid credentials
    await page.fill('[data-testid="email-input"]', testUsers.invalid.email);
    await page.fill(
      '[data-testid="password-input"]',
      testUsers.invalid.password
    );

    // Submit form
    await page.click('[data-testid="login-button"]');

    // Wait for error message
    await expect(page.locator('[data-testid="login-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="login-error"]')).toContainText(
      'Invalid email or password'
    );

    // Verify form is still visible (not redirected)
    await expect(page.locator('[data-testid="login-form"]')).toBeVisible();
  });

  test('should handle account locked scenario', async ({ page }) => {
    // Fill in locked account credentials
    await page.fill('[data-testid="email-input"]', testUsers.locked.email);
    await page.fill(
      '[data-testid="password-input"]',
      testUsers.locked.password
    );

    // Submit form
    await page.click('[data-testid="login-button"]');

    // Wait for account locked message
    await expect(page.locator('[data-testid="login-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="login-error"]')).toContainText(
      'Account is locked'
    );

    // Verify contact support link is present
    await expect(
      page.locator('[data-testid="contact-support-link"]')
    ).toBeVisible();
  });

  test('should handle network error gracefully', async ({ page }) => {
    // Mock network failure
    await page.route('**/api/auth/login', route => {
      route.abort('failed');
    });

    // Fill in valid credentials
    await page.fill('[data-testid="email-input"]', testUsers.valid.email);
    await page.fill('[data-testid="password-input"]', testUsers.valid.password);

    // Submit form
    await page.click('[data-testid="login-button"]');

    // Wait for network error message
    await expect(page.locator('[data-testid="network-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="network-error"]')).toContainText(
      'Network error. Please try again.'
    );
  });

  test('should navigate to forgot password page', async ({ page }) => {
    // Click forgot password link
    await page.click('[data-testid="forgot-password-link"]');

    // Verify navigation to forgot password page
    await expect(page).toHaveURL(/.*forgot-password/);
    await expect(
      page.locator('[data-testid="forgot-password-form"]')
    ).toBeVisible();
  });

  test('should navigate to registration page', async ({ page }) => {
    // Click sign up link
    await page.click('[data-testid="signup-link"]');

    // Verify navigation to registration page
    await expect(page).toHaveURL(/.*register/);
    await expect(
      page.locator('[data-testid="registration-form"]')
    ).toBeVisible();
  });

  test('should maintain form state on validation errors', async ({ page }) => {
    // Fill in form with invalid data
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', '123');

    // Submit form
    await page.click('[data-testid="login-button"]');

    // Verify form data is preserved
    await expect(page.locator('[data-testid="email-input"]')).toHaveValue(
      'test@example.com'
    );
    await expect(page.locator('[data-testid="password-input"]')).toHaveValue(
      '123'
    );
  });

  test('should handle rapid form submissions', async ({ page }) => {
    // Fill in valid credentials
    await page.fill('[data-testid="email-input"]', testUsers.valid.email);
    await page.fill('[data-testid="password-input"]', testUsers.valid.password);

    // Rapidly click login button multiple times
    await page.click('[data-testid="login-button"]');
    await page.click('[data-testid="login-button"]');
    await page.click('[data-testid="login-button"]');

    // Verify only one request is made (button should be disabled)
    await expect(page.locator('[data-testid="login-button"]')).toBeDisabled();

    // Wait for successful login
    await expect(page).toHaveURL(/.*dashboard/);
  });
});
