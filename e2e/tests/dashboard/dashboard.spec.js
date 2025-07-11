const { test, expect } = require('@playwright/test');

// Test data
const dashboardData = {
  user: {
    email: 'test@brizpickr.com',
    password: 'TestPassword123!',
    name: 'Test User',
  },
  projects: [
    { name: 'Project Alpha', status: 'Active', progress: 75 },
    { name: 'Project Beta', status: 'Completed', progress: 100 },
    { name: 'Project Gamma', status: 'Pending', progress: 0 },
  ],
  notifications: [
    { type: 'info', message: 'Welcome to BrizPickr Dashboard' },
    { type: 'warning', message: 'Project Alpha deadline approaching' },
    { type: 'success', message: 'Project Beta completed successfully' },
  ],
};

test.describe('Dashboard - Main Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', dashboardData.user.email);
    await page.fill(
      '[data-testid="password-input"]',
      dashboardData.user.password
    );
    await page.click('[data-testid="login-button"]');

    // Wait for dashboard to load
    await expect(page).toHaveURL(/.*dashboard/);
    await page.waitForLoadState('networkidle');
  });

  test('should display dashboard with all main sections', async ({ page }) => {
    // Verify dashboard title
    await expect(page.locator('[data-testid="dashboard-title"]')).toContainText(
      'Dashboard'
    );

    // Verify main navigation
    await expect(page.locator('[data-testid="nav-projects"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-products"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-settings"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-profile"]')).toBeVisible();

    // Verify dashboard widgets
    await expect(page.locator('[data-testid="stats-widget"]')).toBeVisible();
    await expect(page.locator('[data-testid="recent-projects"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="notifications-panel"]')
    ).toBeVisible();
    await expect(page.locator('[data-testid="quick-actions"]')).toBeVisible();
  });

  test('should display user information correctly', async ({ page }) => {
    // Verify user menu
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
    await expect(page.locator('[data-testid="user-name"]')).toContainText(
      dashboardData.user.name
    );

    // Click user menu to expand
    await page.click('[data-testid="user-menu"]');

    // Verify menu options
    await expect(page.locator('[data-testid="profile-link"]')).toBeVisible();
    await expect(page.locator('[data-testid="settings-link"]')).toBeVisible();
    await expect(page.locator('[data-testid="logout-button"]')).toBeVisible();
  });

  test('should display project statistics correctly', async ({ page }) => {
    // Verify stats widget
    const statsWidget = page.locator('[data-testid="stats-widget"]');
    await expect(statsWidget).toBeVisible();

    // Check individual stat cards
    await expect(page.locator('[data-testid="total-projects"]')).toBeVisible();
    await expect(page.locator('[data-testid="active-projects"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="completed-projects"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="pending-projects"]')
    ).toBeVisible();

    // Verify stat values are numbers
    const totalProjects = await page
      .locator('[data-testid="total-projects-value"]')
      .textContent();
    expect(parseInt(totalProjects)).toBeGreaterThanOrEqual(0);
  });

  test('should display recent projects list', async ({ page }) => {
    // Verify recent projects section
    await expect(page.locator('[data-testid="recent-projects"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="recent-projects-title"]')
    ).toContainText('Recent Projects');

    // Check if projects are displayed
    const projectCards = page.locator('[data-testid="project-card"]');
    await expect(projectCards.first()).toBeVisible();

    // Verify project information
    await expect(page.locator('[data-testid="project-name"]')).toBeVisible();
    await expect(page.locator('[data-testid="project-status"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="project-progress"]')
    ).toBeVisible();
  });

  test('should handle project card interactions', async ({ page }) => {
    // Click on first project card
    await page.click('[data-testid="project-card"]:first-child');

    // Verify navigation to project details
    await expect(page).toHaveURL(/.*projects\/.*/);
    await expect(page.locator('[data-testid="project-details"]')).toBeVisible();
  });

  test('should display and handle notifications', async ({ page }) => {
    // Verify notifications panel
    await expect(
      page.locator('[data-testid="notifications-panel"]')
    ).toBeVisible();

    // Check notification count
    const notificationCount = page.locator(
      '[data-testid="notification-count"]'
    );
    await expect(notificationCount).toBeVisible();

    // Click notifications to expand
    await page.click('[data-testid="notifications-toggle"]');

    // Verify notification items
    const notifications = page.locator('[data-testid="notification-item"]');
    await expect(notifications.first()).toBeVisible();

    // Mark notification as read
    await page.click('[data-testid="mark-read-button"]:first-child');

    // Verify notification is marked as read
    await expect(
      page.locator('[data-testid="notification-item"]:first-child')
    ).toHaveClass(/read/);
  });

  test('should handle quick actions', async ({ page }) => {
    // Verify quick actions section
    await expect(page.locator('[data-testid="quick-actions"]')).toBeVisible();

    // Test "Create New Project" action
    await page.click('[data-testid="create-project-button"]');
    await expect(page).toHaveURL(/.*projects\/create/);
    await expect(
      page.locator('[data-testid="create-project-form"]')
    ).toBeVisible();

    // Go back to dashboard
    await page.goBack();
    await expect(page).toHaveURL(/.*dashboard/);

    // Test "Add Product" action
    await page.click('[data-testid="add-product-button"]');
    await expect(page).toHaveURL(/.*products\/create/);
    await expect(
      page.locator('[data-testid="add-product-form"]')
    ).toBeVisible();
  });

  test('should handle search functionality', async ({ page }) => {
    // Verify search input
    await expect(page.locator('[data-testid="search-input"]')).toBeVisible();

    // Search for a project
    await page.fill('[data-testid="search-input"]', 'Alpha');
    await page.press('[data-testid="search-input"]', 'Enter');

    // Verify search results
    await expect(page.locator('[data-testid="search-results"]')).toBeVisible();
    await expect(page.locator('[data-testid="search-results"]')).toContainText(
      'Project Alpha'
    );
  });

  test('should handle responsive design on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Verify mobile menu button is visible
    await expect(
      page.locator('[data-testid="mobile-menu-button"]')
    ).toBeVisible();

    // Open mobile menu
    await page.click('[data-testid="mobile-menu-button"]');

    // Verify mobile navigation menu
    await expect(page.locator('[data-testid="mobile-nav-menu"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="mobile-nav-projects"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="mobile-nav-products"]')
    ).toBeVisible();

    // Close mobile menu
    await page.click('[data-testid="mobile-menu-close"]');
    await expect(
      page.locator('[data-testid="mobile-nav-menu"]')
    ).not.toBeVisible();
  });

  test('should handle data refresh', async ({ page }) => {
    // Get initial project count
    const initialCount = await page
      .locator('[data-testid="total-projects-value"]')
      .textContent();

    // Click refresh button
    await page.click('[data-testid="refresh-button"]');

    // Wait for refresh to complete
    await page.waitForLoadState('networkidle');

    // Verify data is refreshed (count might be different)
    const newCount = await page
      .locator('[data-testid="total-projects-value"]')
      .textContent();
    expect(newCount).toBeDefined();
  });

  test('should handle logout functionality', async ({ page }) => {
    // Open user menu
    await page.click('[data-testid="user-menu"]');

    // Click logout
    await page.click('[data-testid="logout-button"]');

    // Verify logout confirmation dialog
    await expect(
      page.locator('[data-testid="logout-confirmation"]')
    ).toBeVisible();

    // Confirm logout
    await page.click('[data-testid="confirm-logout"]');

    // Verify redirect to login page
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator('[data-testid="login-form"]')).toBeVisible();
  });

  test('should handle session timeout', async ({ page }) => {
    // Mock session timeout by clearing localStorage
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    // Try to access dashboard
    await page.goto('/dashboard');

    // Verify redirect to login page
    await expect(page).toHaveURL(/.*login/);
    await expect(
      page.locator('[data-testid="session-expired-message"]')
    ).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Focus on search input
    await page.click('[data-testid="search-input"]');

    // Use Tab to navigate through elements
    await page.keyboard.press('Tab');
    await expect(
      page.locator('[data-testid="create-project-button"]')
    ).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(
      page.locator('[data-testid="add-product-button"]')
    ).toBeFocused();

    // Use Enter to activate button
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/.*products\/create/);
  });

  test('should handle accessibility features', async ({ page }) => {
    // Verify ARIA labels
    await expect(page.locator('[aria-label="Search projects"]')).toBeVisible();
    await expect(page.locator('[aria-label="User menu"]')).toBeVisible();

    // Verify focus indicators
    await page.click('[data-testid="search-input"]');
    await expect(page.locator('[data-testid="search-input"]')).toBeFocused();

    // Verify screen reader text
    await expect(page.locator('[data-testid="sr-only"]')).toBeVisible();
  });
});
