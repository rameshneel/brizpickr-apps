const { test, expect } = require('@playwright/test');

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display login page', async ({ page }) => {
    // Navigate to login page
    await page.click('text=Login');

    // Check if login form is visible
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show validation errors for invalid credentials', async ({
    page,
  }) => {
    // Navigate to login page
    await page.click('text=Login');

    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Check for validation errors
    await expect(page.locator('.error-message')).toBeVisible();
  });

  test('should handle successful login', async ({ page }) => {
    // Navigate to login page
    await page.click('text=Login');

    // Fill in valid credentials
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');

    // Submit form
    await page.click('button[type="submit"]');

    // Check if redirected to dashboard
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should handle logout', async ({ page }) => {
    // First login
    await page.click('text=Login');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Wait for dashboard to load
    await expect(page).toHaveURL(/.*dashboard/);

    // Click logout
    await page.click('text=Logout');

    // Check if redirected to home page
    await expect(page).toHaveURL('/');
  });
});
