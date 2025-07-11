const { test, expect } = require('@playwright/test');
const { login } = require('../../utils/test-helpers');

test.describe('Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login before performance tests
    await login(page, 'user');
  });

  test('dashboard should load within performance budget', async ({ page }) => {
    // Start performance measurement
    const startTime = Date.now();

    // Navigate to dashboard
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Calculate load time
    const loadTime = Date.now() - startTime;

    // Performance budget: 3 seconds
    expect(loadTime).toBeLessThan(3000);

    // Log performance metrics
    console.log(`Dashboard load time: ${loadTime}ms`);
  });

  test('login should complete within performance budget', async ({ page }) => {
    // Navigate to login page
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    // Start performance measurement
    const startTime = Date.now();

    // Perform login
    await page.fill('[data-testid="email-input"]', 'test@brizpickr.com');
    await page.fill('[data-testid="password-input"]', 'TestPassword123!');
    await page.click('[data-testid="login-button"]');

    // Wait for successful login
    await expect(page).toHaveURL(/.*dashboard/);
    await page.waitForLoadState('networkidle');

    // Calculate login time
    const loginTime = Date.now() - startTime;

    // Performance budget: 2 seconds
    expect(loginTime).toBeLessThan(2000);

    console.log(`Login time: ${loginTime}ms`);
  });

  test('project creation should complete within performance budget', async ({
    page,
  }) => {
    // Navigate to create project page
    await page.goto('/projects/create');
    await page.waitForLoadState('networkidle');

    // Start performance measurement
    const startTime = Date.now();

    // Fill project form
    await page.fill('[data-testid="project-name"]', 'Performance Test Project');
    await page.fill('[data-testid="project-description"]', 'Test description');
    await page.selectOption('[data-testid="project-status"]', 'active');
    await page.selectOption('[data-testid="project-priority"]', 'medium');
    await page.fill('[data-testid="project-start-date"]', '2024-01-01');
    await page.fill('[data-testid="project-end-date"]', '2024-12-31');

    // Submit form
    await page.click('[data-testid="save-project-button"]');

    // Wait for success
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();

    // Calculate creation time
    const creationTime = Date.now() - startTime;

    // Performance budget: 3 seconds
    expect(creationTime).toBeLessThan(3000);

    console.log(`Project creation time: ${creationTime}ms`);
  });

  test('search functionality should respond within performance budget', async ({
    page,
  }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Start performance measurement
    const startTime = Date.now();

    // Perform search
    await page.fill('[data-testid="search-input"]', 'test');
    await page.press('[data-testid="search-input"]', 'Enter');

    // Wait for search results
    await expect(page.locator('[data-testid="search-results"]')).toBeVisible();

    // Calculate search time
    const searchTime = Date.now() - startTime;

    // Performance budget: 1 second
    expect(searchTime).toBeLessThan(1000);

    console.log(`Search response time: ${searchTime}ms`);
  });

  test('navigation between pages should be fast', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const pages = ['projects', 'products', 'settings'];

    for (const pageName of pages) {
      // Start performance measurement
      const startTime = Date.now();

      // Navigate to page
      await page.click(`[data-testid="nav-${pageName}"]`);
      await page.waitForLoadState('networkidle');

      // Calculate navigation time
      const navigationTime = Date.now() - startTime;

      // Performance budget: 2 seconds per page
      expect(navigationTime).toBeLessThan(2000);

      console.log(`${pageName} navigation time: ${navigationTime}ms`);
    }
  });

  test('large data sets should load within performance budget', async ({
    page,
  }) => {
    // Mock large dataset
    await page.route('**/api/projects', route => {
      const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        name: `Project ${i + 1}`,
        status: 'active',
        progress: Math.floor(Math.random() * 100),
      }));

      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ projects: largeDataset }),
      });
    });

    // Start performance measurement
    const startTime = Date.now();

    // Navigate to projects page
    await page.goto('/projects');
    await page.waitForLoadState('networkidle');

    // Wait for projects to be displayed
    await expect(page.locator('[data-testid="project-card"]')).toBeVisible();

    // Calculate load time
    const loadTime = Date.now() - startTime;

    // Performance budget: 5 seconds for large datasets
    expect(loadTime).toBeLessThan(5000);

    console.log(`Large dataset load time: ${loadTime}ms`);
  });

  test('memory usage should remain stable during extended use', async ({
    page,
  }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Get initial memory usage
    const initialMemory = await page.evaluate(
      () => performance.memory?.usedJSHeapSize || 0
    );

    // Perform multiple operations
    for (let i = 0; i < 10; i++) {
      // Navigate between pages
      await page.click('[data-testid="nav-projects"]');
      await page.waitForLoadState('networkidle');

      await page.click('[data-testid="nav-products"]');
      await page.waitForLoadState('networkidle');

      await page.click('[data-testid="nav-dashboard"]');
      await page.waitForLoadState('networkidle');

      // Refresh data
      await page.click('[data-testid="refresh-button"]');
      await page.waitForLoadState('networkidle');
    }

    // Get final memory usage
    const finalMemory = await page.evaluate(
      () => performance.memory?.usedJSHeapSize || 0
    );

    // Memory increase should be reasonable (less than 50MB)
    const memoryIncrease = finalMemory - initialMemory;
    expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024); // 50MB

    console.log(
      `Memory increase: ${(memoryIncrease / 1024 / 1024).toFixed(2)}MB`
    );
  });

  test('API response times should be within budget', async ({ page }) => {
    const apiEndpoints = [
      '/api/dashboard',
      '/api/projects',
      '/api/products',
      '/api/notifications',
    ];

    for (const endpoint of apiEndpoints) {
      // Start performance measurement
      const startTime = Date.now();

      // Mock API call
      await page.route(`**${endpoint}`, route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ data: 'test' }),
        });
      });

      // Trigger API call
      await page.goto('/dashboard');
      await page.waitForLoadState('networkidle');

      // Calculate response time
      const responseTime = Date.now() - startTime;

      // Performance budget: 1 second per API call
      expect(responseTime).toBeLessThan(1000);

      console.log(`${endpoint} response time: ${responseTime}ms`);
    }
  });

  test('image loading should be optimized', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Get all images on the page
    const images = page.locator('img');
    const imageCount = await images.count();

    // Check if images have proper loading attributes
    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i);
      const loading = await image.getAttribute('loading');

      // Images should use lazy loading
      expect(loading).toBe('lazy');
    }

    console.log(`Checked ${imageCount} images for lazy loading`);
  });

  test('bundle size should be reasonable', async ({ page }) => {
    await page.goto('/dashboard');

    // Get resource timing data
    const resourceSizes = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource');
      return resources
        .filter(
          resource =>
            resource.name.includes('.js') || resource.name.includes('.css')
        )
        .map(resource => ({
          name: resource.name,
          size: resource.transferSize || 0,
        }));
    });

    // Calculate total bundle size
    const totalSize = resourceSizes.reduce(
      (sum, resource) => sum + resource.size,
      0
    );

    // Bundle size should be less than 2MB
    expect(totalSize).toBeLessThan(2 * 1024 * 1024); // 2MB

    console.log(`Total bundle size: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);

    // Log individual resource sizes
    resourceSizes.forEach(resource => {
      console.log(`${resource.name}: ${(resource.size / 1024).toFixed(2)}KB`);
    });
  });
});
