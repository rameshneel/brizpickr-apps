const { test, expect } = require('@playwright/test');
const { login, TEST_USERS } = require('../../utils/test-helpers');

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login before visual tests
    await login(page, 'user');
  });

  test('dashboard should match visual baseline', async ({ page }) => {
    // Navigate to dashboard
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Take screenshot of entire dashboard
    await expect(page).toHaveScreenshot('dashboard-full.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('dashboard header should match baseline', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Take screenshot of header section
    const header = page.locator('[data-testid="dashboard-header"]');
    await expect(header).toHaveScreenshot('dashboard-header.png');
  });

  test('navigation sidebar should match baseline', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Take screenshot of sidebar
    const sidebar = page.locator('[data-testid="sidebar"]');
    await expect(sidebar).toHaveScreenshot('sidebar.png');
  });

  test('project cards should match baseline', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Take screenshot of project cards
    const projectCards = page.locator('[data-testid="project-card"]');
    await expect(projectCards.first()).toHaveScreenshot('project-card.png');
  });

  test('login page should match baseline', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    // Take screenshot of login form
    const loginForm = page.locator('[data-testid="login-form"]');
    await expect(loginForm).toHaveScreenshot('login-form.png');
  });

  test('mobile responsive design should match baseline', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Take screenshot of mobile dashboard
    await expect(page).toHaveScreenshot('dashboard-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('tablet responsive design should match baseline', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Take screenshot of tablet dashboard
    await expect(page).toHaveScreenshot('dashboard-tablet.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('dark mode should match baseline', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Toggle dark mode
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(500); // Wait for theme transition

    // Take screenshot of dark mode dashboard
    await expect(page).toHaveScreenshot('dashboard-dark-mode.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('loading states should match baseline', async ({ page }) => {
    await page.goto('/dashboard');

    // Mock slow API response to show loading state
    await page.route('**/api/dashboard', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
        delay: 2000,
      });
    });

    // Refresh page to trigger loading
    await page.reload();

    // Take screenshot of loading state
    await expect(page).toHaveScreenshot('dashboard-loading.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('error states should match baseline', async ({ page }) => {
    await page.goto('/dashboard');

    // Mock API error
    await page.route('**/api/dashboard', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' }),
      });
    });

    // Refresh page to trigger error
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Take screenshot of error state
    await expect(page).toHaveScreenshot('dashboard-error.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('empty states should match baseline', async ({ page }) => {
    // Mock empty data
    await page.route('**/api/dashboard', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          projects: [],
          products: [],
          notifications: [],
        }),
      });
    });

    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Take screenshot of empty state
    await expect(page).toHaveScreenshot('dashboard-empty.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('modal dialogs should match baseline', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Open create project modal
    await page.click('[data-testid="create-project-button"]');
    await page.waitForSelector('[data-testid="create-project-modal"]');

    // Take screenshot of modal
    const modal = page.locator('[data-testid="create-project-modal"]');
    await expect(modal).toHaveScreenshot('create-project-modal.png');
  });

  test('form validation states should match baseline', async ({ page }) => {
    await page.goto('/projects/create');
    await page.waitForLoadState('networkidle');

    // Submit empty form to trigger validation
    await page.click('[data-testid="save-project-button"]');

    // Wait for validation errors
    await page.waitForSelector('[data-testid="error-message"]');

    // Take screenshot of validation state
    await expect(page).toHaveScreenshot('form-validation-errors.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('success states should match baseline', async ({ page }) => {
    await page.goto('/projects/create');
    await page.waitForLoadState('networkidle');

    // Fill form with valid data
    await page.fill('[data-testid="project-name"]', 'Test Project');
    await page.fill('[data-testid="project-description"]', 'Test Description');
    await page.selectOption('[data-testid="project-status"]', 'active');

    // Submit form
    await page.click('[data-testid="save-project-button"]');

    // Wait for success message
    await page.waitForSelector('[data-testid="success-message"]');

    // Take screenshot of success state
    await expect(page).toHaveScreenshot('form-success.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});
