# 🧪 BrizPickr Testing Guide

Comprehensive testing strategy for BrizPickr SaaS application with industry best practices.

## 📋 Testing Strategy

### 1. Unit Testing (Jest + React Testing Library)

- **Coverage**: 80% minimum
- **Focus**: Individual components, hooks, utilities
- **Tools**: Jest, React Testing Library, @testing-library/user-event

### 2. Integration Testing

- **Focus**: Component interactions, API integration
- **Tools**: React Testing Library, MSW (Mock Service Worker)

### 3. E2E Testing (Playwright)

- **Focus**: User workflows, critical paths
- **Tools**: Playwright
- **Browsers**: Chrome, Firefox, Safari, Mobile

### 4. Visual Regression Testing

- **Focus**: UI consistency across changes
- **Tools**: Playwright + Screenshot comparison

## 🚀 Quick Start

### Run All Tests

```bash
# Unit tests
npm run test:unit

# E2E tests
npm run test:e2e

# All tests
npm run test:all

# With coverage
npm run test:coverage
```

### Run Specific Tests

```bash
# Customer dashboard tests
npm run test:customer

# Customer dashboard with coverage
npm run test:customer:coverage

# E2E tests with UI
npm run test:e2e:ui

# E2E tests in headed mode
npm run test:e2e:headed
```

## 📁 Test Structure

```
apps/customer-dashboard/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   └── Header.test.jsx          # Unit tests
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   │   ├── LoginForm.jsx
│   │   │   │   │   └── LoginForm.test.jsx
│   │   │   │   └── hooks/
│   │   │   │       └── useAuth.test.js
│   │   │   └── products/
│   │   │       ├── components/
│   │   │       │   ├── ProductCard.jsx
│   │   │       │   └── ProductCard.test.jsx
│   │   │       └── hooks/
│   │   │           └── useProducts.test.js
│   │   └── utils/
│   │       ├── formatters.js
│   │       └── formatters.test.js
│   └── test/
│       ├── setup.js                     # Test setup
│       └── utils/
│           └── test-utils.jsx           # Test utilities
└── e2e/                                 # E2E tests
    ├── auth.spec.js
    ├── dashboard.spec.js
    └── products.spec.js
```

## 🧪 Writing Unit Tests

### Component Testing

```jsx
import React from 'react';
import { render, screen, fireEvent } from '../test/utils/test-utils';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  test('renders login form', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in/i })
    ).toBeInTheDocument();
  });

  test('shows validation errors for invalid input', async () => {
    render(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    await screen.findByText(/email is required/i);
    await screen.findByText(/password is required/i);
  });

  test('handles successful login', async () => {
    const mockLogin = jest.fn();
    render(<LoginForm onLogin={mockLogin} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
```

### Hook Testing

```jsx
import { renderHook, act } from '@testing-library/react';
import { useAuth } from './useAuth';
import { mockUser } from '../test/utils/test-utils';

describe('useAuth', () => {
  test('returns user when authenticated', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.setUser(mockUser);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
  });

  test('returns null when not authenticated', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});
```

### Utility Testing

```jsx
import { formatCurrency, formatDate } from './formatters';

describe('formatters', () => {
  describe('formatCurrency', () => {
    test('formats USD correctly', () => {
      expect(formatCurrency(100, 'USD')).toBe('$100.00');
      expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
    });

    test('handles zero and negative values', () => {
      expect(formatCurrency(0, 'USD')).toBe('$0.00');
      expect(formatCurrency(-100, 'USD')).toBe('-$100.00');
    });
  });

  describe('formatDate', () => {
    test('formats date correctly', () => {
      const date = new Date('2024-01-15');
      expect(formatDate(date)).toBe('Jan 15, 2024');
    });
  });
});
```

## 🌐 Writing E2E Tests

### Authentication Flow

```jsx
const { test, expect } = require('@playwright/test');

test.describe('Authentication', () => {
  test('user can login and access dashboard', async ({ page }) => {
    // Navigate to login
    await page.goto('/login');

    // Fill login form
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');

    // Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="dashboard-title"]')).toBeVisible();
  });

  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[data-testid="email-input"]', 'invalid@example.com');
    await page.fill('[data-testid="password-input"]', 'wrongpassword');
    await page.click('[data-testid="login-button"]');

    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toContainText(
      'Invalid credentials'
    );
  });
});
```

### Product Management

```jsx
test.describe('Product Management', () => {
  test('user can view product list', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');

    // Navigate to products
    await page.click('[data-testid="nav-products"]');

    // Verify product list
    await expect(page.locator('[data-testid="product-list"]')).toBeVisible();
    await expect(page.locator('[data-testid="product-item"]')).toHaveCount(2);
  });

  test('user can add new product', async ({ page }) => {
    // Login and navigate to products
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    await page.click('[data-testid="nav-products"]');

    // Click add product button
    await page.click('[data-testid="add-product-button"]');

    // Fill product form
    await page.fill('[data-testid="product-name"]', 'New Product');
    await page.fill(
      '[data-testid="product-description"]',
      'Product description'
    );
    await page.fill('[data-testid="product-price"]', '99.99');
    await page.selectOption('[data-testid="product-category"]', 'electronics');

    // Submit form
    await page.click('[data-testid="save-product-button"]');

    // Verify product was added
    await expect(page.locator('text=New Product')).toBeVisible();
  });
});
```

## 🎯 Testing Best Practices

### 1. Test Organization

- **Arrange**: Set up test data and conditions
- **Act**: Perform the action being tested
- **Assert**: Verify the expected outcome

### 2. Naming Conventions

```jsx
describe('ComponentName', () => {
  test('should do something when condition', () => {
    // test implementation
  });
});
```

### 3. Data Attributes

Use `data-testid` for reliable element selection:

```jsx
// In component
<button data-testid="login-button">Sign In</button>;

// In test
await page.click('[data-testid="login-button"]');
```

### 4. Mocking

```jsx
// Mock API calls
jest.mock('../api/auth', () => ({
  login: jest.fn(),
  logout: jest.fn(),
}));

// Mock external libraries
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));
```

### 5. Async Testing

```jsx
test('async operation', async () => {
  render(<AsyncComponent />);

  // Wait for loading to finish
  await screen.findByText('Loaded content');

  // Or wait for element to disappear
  await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
});
```

## 📊 Coverage Requirements

### Unit Tests: 80% minimum

- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

### E2E Tests: Critical Paths

- Authentication flow
- User registration
- Dashboard access
- Product management
- Project management
- Profile updates

## 🔧 CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:ci
      - run: npm run test:e2e
```

## 🐛 Debugging Tests

### Unit Tests

```bash
# Run specific test file
npm test -- Header.test.jsx

# Run with coverage
npm test -- --coverage --watchAll=false

# Debug mode
npm test -- --detectOpenHandles --forceExit
```

### E2E Tests

```bash
# Run with UI
npm run test:e2e:ui

# Run in headed mode
npm run test:e2e:headed

# Run specific test
npx playwright test auth.spec.js

# Debug mode
npx playwright test --debug
```

## 📚 Resources

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Happy Testing! 🎉**
