# 🌐 BrizPickr E2E Testing Guide

Production-level End-to-End testing strategy using Playwright with industry best practices.

## 🎯 Testing Strategy

### 1. **Functional Testing**

- User workflows and critical paths
- Authentication flows
- CRUD operations
- Form validations
- Navigation and routing

### 2. **Visual Regression Testing**

- UI consistency across changes
- Responsive design validation
- Theme switching (light/dark mode)
- Loading, error, and empty states

### 3. **Performance Testing**

- Page load times
- API response times
- Memory usage monitoring
- Bundle size validation

### 4. **Cross-Browser Testing**

- Chrome, Firefox, Safari
- Mobile and tablet viewports
- Accessibility compliance

## 🚀 Quick Start

### Install Dependencies

```bash
npm run test:e2e:install
```

### Run All E2E Tests

```bash
npm run test:e2e
```

### Run Specific Test Categories

```bash
# Authentication tests
npm run test:e2e:auth

# Dashboard functionality
npm run test:e2e:dashboard

# Visual regression tests
npm run test:e2e:visual

# Performance tests
npm run test:e2e:performance
```

### Debug Mode

```bash
# Run with UI for debugging
npm run test:e2e:ui

# Run in headed mode
npm run test:e2e:headed

# Debug specific test
npm run test:e2e:debug
```

## 📁 Test Structure

```
e2e/
├── tests/
│   ├── auth/
│   │   ├── login.spec.js          # Login flow tests
│   │   ├── registration.spec.js   # Registration tests
│   │   └── password-reset.spec.js # Password reset tests
│   ├── dashboard/
│   │   ├── dashboard.spec.js      # Main dashboard tests
│   │   ├── navigation.spec.js     # Navigation tests
│   │   └── widgets.spec.js        # Dashboard widget tests
│   ├── projects/
│   │   ├── project-crud.spec.js   # Project CRUD operations
│   │   ├── project-list.spec.js   # Project listing tests
│   │   └── project-details.spec.js # Project detail tests
│   ├── products/
│   │   ├── product-crud.spec.js   # Product CRUD operations
│   │   └── product-catalog.spec.js # Product catalog tests
│   ├── visual/
│   │   └── visual-regression.spec.js # Visual regression tests
│   └── performance/
│       └── performance.spec.js    # Performance tests
├── utils/
│   └── test-helpers.js            # Common test utilities
└── playwright.config.js           # Playwright configuration
```

## 🧪 Writing E2E Tests

### Basic Test Structure

```javascript
const { test, expect } = require('@playwright/test');
const { login, TEST_USERS } = require('../../utils/test-helpers');

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await login(page, 'user');
  });

  test('should perform specific action', async ({ page }) => {
    // Arrange: Set up test conditions
    await page.goto('/dashboard');

    // Act: Perform the action
    await page.click('[data-testid="action-button"]');

    // Assert: Verify the result
    await expect(page.locator('[data-testid="result"]')).toBeVisible();
  });
});
```

### Test Data Management

```javascript
// Use centralized test data
const testData = {
  user: {
    email: 'test@brizpickr.com',
    password: 'TestPassword123!',
    name: 'Test User',
  },
  project: {
    name: 'Test Project',
    description: 'Test Description',
    status: 'active',
  },
};

test('should create project with valid data', async ({ page }) => {
  await page.goto('/projects/create');

  // Fill form using test data
  await page.fill('[data-testid="project-name"]', testData.project.name);
  await page.fill(
    '[data-testid="project-description"]',
    testData.project.description
  );

  await page.click('[data-testid="save-project-button"]');

  // Verify success
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
});
```

### API Mocking

```javascript
test('should handle API errors gracefully', async ({ page }) => {
  // Mock API error
  await page.route('**/api/projects', route => {
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Server error' }),
    });
  });

  await page.goto('/projects');

  // Verify error handling
  await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
  await expect(page.locator('[data-testid="error-message"]')).toContainText(
    'Server error'
  );
});
```

### Visual Regression Testing

```javascript
test('dashboard should match visual baseline', async ({ page }) => {
  await page.goto('/dashboard');
  await page.waitForLoadState('networkidle');

  // Take screenshot and compare with baseline
  await expect(page).toHaveScreenshot('dashboard-full.png', {
    fullPage: true,
    animations: 'disabled',
  });
});
```

### Performance Testing

```javascript
test('dashboard should load within performance budget', async ({ page }) => {
  const startTime = Date.now();

  await page.goto('/dashboard');
  await page.waitForLoadState('networkidle');

  const loadTime = Date.now() - startTime;

  // Performance budget: 3 seconds
  expect(loadTime).toBeLessThan(3000);

  console.log(`Dashboard load time: ${loadTime}ms`);
});
```

## 🎯 Best Practices

### 1. **Test Organization**

- Group related tests in describe blocks
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

### 2. **Element Selection**

```javascript
// ✅ Good: Use data-testid attributes
await page.click('[data-testid="login-button"]');

// ❌ Bad: Use text content or CSS classes
await page.click('text=Login');
await page.click('.btn-primary');
```

### 3. **Waiting Strategies**

```javascript
// ✅ Good: Wait for specific conditions
await page.waitForLoadState('networkidle');
await expect(page.locator('[data-testid="result"]')).toBeVisible();

// ❌ Bad: Use arbitrary timeouts
await page.waitForTimeout(2000);
```

### 4. **Error Handling**

```javascript
test('should handle network errors', async ({ page }) => {
  // Mock network failure
  await page.route('**/api/data', route => {
    route.abort('failed');
  });

  await page.goto('/dashboard');

  // Verify error state
  await expect(page.locator('[data-testid="network-error"]')).toBeVisible();
});
```

### 5. **Test Isolation**

```javascript
test.beforeEach(async ({ page }) => {
  // Clear browser data before each test
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  // Login fresh for each test
  await login(page, 'user');
});
```

## 🔧 Configuration

### Playwright Config Features

```javascript
// playwright.config.js
module.exports = {
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],

  webServer: {
    command: 'npm run start:customer',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
};
```

## 📊 Test Reports

### Generate Reports

```bash
# Run tests with HTML report
npm run test:e2e

# View HTML report
npm run test:e2e:report
```

### Report Features

- **HTML Report**: Interactive test results
- **Screenshots**: Failed test screenshots
- **Videos**: Test execution recordings
- **Traces**: Detailed test execution traces
- **Performance Metrics**: Load times and memory usage

## 🚀 CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests
on: [push, pull_request]

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - run: npm ci
      - run: npm run test:e2e:install

      # Run E2E tests
      - run: npm run test:e2e

      # Upload test results
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

### Parallel Execution

```bash
# Run tests in parallel across browsers
npm run test:e2e -- --workers=4

# Run specific browsers
npm run test:e2e -- --project=chromium
npm run test:e2e -- --project=firefox
```

## 🐛 Debugging

### Debug Mode

```bash
# Run with debugger
npm run test:e2e:debug

# Run specific test in debug mode
npx playwright test login.spec.js --debug
```

### Common Debugging Techniques

```javascript
// Add debugging statements
console.log('Current URL:', page.url());

// Take screenshots during test
await page.screenshot({ path: 'debug-screenshot.png' });

// Pause execution
await page.pause();

// Log element state
const element = page.locator('[data-testid="button"]');
console.log('Element visible:', await element.isVisible());
console.log('Element text:', await element.textContent());
```

## 📈 Performance Monitoring

### Performance Budgets

- **Page Load**: < 3 seconds
- **Login**: < 2 seconds
- **API Response**: < 1 second
- **Navigation**: < 2 seconds
- **Bundle Size**: < 2MB
- **Memory Increase**: < 50MB

### Performance Metrics

```javascript
// Monitor Core Web Vitals
const metrics = await page.evaluate(() => {
  return {
    FCP: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
    LCP: performance.getEntriesByName('largest-contentful-paint')[0]?.startTime,
    CLS: performance.getEntriesByName('layout-shift')[0]?.value,
  };
});

console.log('Performance metrics:', metrics);
```

## 🎨 Visual Testing

### Visual Regression Workflow

1. **Baseline Creation**: Run tests to create baseline screenshots
2. **Change Detection**: Compare new screenshots with baselines
3. **Review Process**: Manually review visual differences
4. **Baseline Updates**: Update baselines for intentional changes

### Visual Test Best Practices

```javascript
// Disable animations for consistent screenshots
await expect(page).toHaveScreenshot('dashboard.png', {
  animations: 'disabled',
});

// Test responsive design
await page.setViewportSize({ width: 375, height: 667 });
await expect(page).toHaveScreenshot('dashboard-mobile.png');

// Test different themes
await page.click('[data-testid="theme-toggle"]');
await expect(page).toHaveScreenshot('dashboard-dark.png');
```

## 🔒 Security Testing

### Authentication Testing

```javascript
test('should prevent unauthorized access', async ({ page }) => {
  // Try to access protected page without login
  await page.goto('/dashboard');

  // Should redirect to login
  await expect(page).toHaveURL(/.*login/);
});

test('should handle session timeout', async ({ page }) => {
  await login(page, 'user');

  // Clear session data
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  // Try to access protected page
  await page.goto('/dashboard');

  // Should redirect to login
  await expect(page).toHaveURL(/.*login/);
});
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [E2E Testing Best Practices](https://playwright.dev/docs/best-practices)
- [Visual Regression Testing](https://playwright.dev/docs/test-screenshots)
- [Performance Testing](https://playwright.dev/docs/test-api-testing)
- [CI/CD Integration](https://playwright.dev/docs/ci)

---

**Happy E2E Testing! 🎉**
