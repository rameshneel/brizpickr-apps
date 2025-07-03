# 🚀 BrizPickr NX Monorepo - Junior Developer Setup Guide

## 📋 Prerequisites

- **Node.js** (version 18 or higher)
- **npm** (version 9 or higher)
- **Git**

## 🛠️ Initial Setup

### 1. Clone & Install

```bash
# Clone the repository
git clone <repository-url>
cd BrizPickr

# Install NX CLI globally
npm install -g nx

# Install all dependencies
npm install
```

### 2. Verify Installation

```bash
# Check if NX is working
nx --version

# List all projects
nx show projects
```

## 🏃‍♂️ Running Applications

### Customer Dashboard (React + Vite)

```bash
# Start development server
nx serve customer-dashboard

# Build for production
nx build customer-dashboard

# Preview production build
nx preview customer-dashboard
```

### Other Apps (when created)

```bash
# Vendor Portal
nx serve vendor-portal

# CRM System
nx serve crm-system

# Landing Site (Next.js)
nx serve landing-site
```

## 📁 Project Structure

```
BrizPickr/
├── apps/                          # Main Applications
│   ├── customer-dashboard/        # React App (Vite)
│   ├── vendor-portal/            # React App (Future)
│   ├── crm-system/               # React App (Future)
│   └── landing-site/             # Next.js App (Future)
│
├── libs/                         # Shared Libraries
│   ├── ui-kit/                   # Design System Components
│   ├── shared-store/             # Redux Store (if needed)
│   ├── api-client/               # API Logic (TanStack Query)
│   ├── shared-hooks/             # Common React Hooks
│   ├── shared-utils/             # Utilities & Helpers
│   └── shared-types/             # TypeScript Types
│
└── tools/                        # Development Tools
    ├── eslint-rules/             # Custom ESLint Rules
    ├── generators/               # Custom NX Generators
    └── scripts/                  # Build & Deploy Scripts
```

## 🎨 Tech Stack

### Frontend

- **React 18** - UI Library
- **Vite** - Fast Build Tool
- **Tailwind CSS** - Utility-First CSS Framework
- **React Router** - Client-side Routing

### State Management & API

- **TanStack Query (React Query)** - Server State Management
- **Axios** - HTTP Client
- **Redux Toolkit** - Client State (if needed)

### Development Tools

- **NX** - Monorepo Management
- **ESLint** - Code Linting
- **Prettier** - Code Formatting
- **TypeScript** - Type Safety

## 🛠️ Development Workflow

### 1. Starting Work

```bash
# Start the app you're working on
nx serve customer-dashboard

# Open browser to http://localhost:4200
```

### 2. Creating New Features

#### A. New Component in App

```bash
# Create component in customer-dashboard
nx generate @nx/react:component ProductCard --project=customer-dashboard --directory=src/app/features/products/components
```

#### B. New Shared Component (UI Kit)

```bash
# Create component in ui-kit library
nx generate @nx/react:component Button --project=ui-kit --directory=src/lib/components
```

#### C. New API Hook

```bash
# Create in api-client library
# File: libs/api-client/src/lib/endpoints/products.js
```

### 3. Code Organization Rules

#### ✅ DO's

- Put **shared logic** in `libs/`
- Put **app-specific logic** in `apps/`
- Use **Tailwind CSS** for styling
- Use **TanStack Query** for API calls
- Follow **feature-based folder structure**

#### ❌ DON'Ts

- Don't duplicate code across apps
- Don't put business logic in UI components
- Don't use inline styles (use Tailwind)
- Don't create circular dependencies

## 📝 Common Commands

### Development

```bash
# Start development server
nx serve <app-name>

# Run tests
nx test <app-name>

# Lint code
nx lint <app-name>

# Format code
npm run format
```

### Building

```bash
# Build single app
nx build <app-name>

# Build all apps
nx run-many --target=build

# Build affected apps only
nx affected:build
```

### Code Quality

```bash
# Lint all projects
nx run-many --target=lint

# Test all projects
nx run-many --target=test

# Check affected files
nx affected:graph
```

## 🎯 Working with Features

### Example: Adding Product List Feature

1. **Create API Hook** (in `libs/api-client/`)

```javascript
// libs/api-client/src/lib/endpoints/products.js
import { useQuery } from '@tanstack/react-query';
import apiClient from '../base/apiClient';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await apiClient.get('/products');
      return response.data;
    },
  });
};
```

2. **Create Component** (in `apps/customer-dashboard/`)

```javascript
// apps/customer-dashboard/src/app/features/products/components/ProductList.jsx
import React from 'react';
import { useProducts } from 'api-client';

export const ProductList = () => {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-600">Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

3. **Use in Page**

```javascript
// apps/customer-dashboard/src/app/pages/ProductsPage.jsx
import React from 'react';
import { ProductList } from '../features/products/components/ProductList';

export const ProductsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <ProductList />
    </div>
  );
};
```

## 🎨 Styling with Tailwind CSS

### Basic Classes

```jsx
// Buttons
<button className="btn-primary">Primary Button</button>
<button className="btn-secondary">Secondary Button</button>

// Forms
<input className="input-field" placeholder="Enter text" />

// Layout
<div className="card p-6">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
</div>
```

### Custom Components (in globals.css)

```css
@layer components {
  .btn-primary {
    @apply bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200;
  }

  .input-field {
    @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500;
  }
}
```

## 🔧 Troubleshooting

### Common Issues

1. **Port already in use**

```bash
# Kill process on port 4200
npx kill-port 4200
# Then run again
nx serve customer-dashboard
```

2. **Dependencies not found**

```bash
# Clear cache and reinstall
npm run clean
npm install
```

3. **Build errors**

```bash
# Clear NX cache
nx reset
# Rebuild
nx build customer-dashboard
```

### Getting Help

- Check **NX documentation**: https://nx.dev/
- Check **Tailwind CSS docs**: https://tailwindcss.com/
- Check **TanStack Query docs**: https://tanstack.com/query

## 📚 Learning Resources

### NX Monorepo

- [NX Documentation](https://nx.dev/)
- [NX YouTube Channel](https://www.youtube.com/c/NxDevtools)

### React & Modern Tools

- [React Documentation](https://react.dev/)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com/)

### Best Practices

- [React Best Practices](https://react.dev/learn)
- [Monorepo Best Practices](https://nx.dev/concepts/more-concepts/why-monorepos)

## 🚀 Next Steps

1. **Start with customer-dashboard**
2. **Learn the folder structure**
3. **Practice with Tailwind CSS**
4. **Understand TanStack Query**
5. **Create your first feature**

---

**Happy Coding! 🎉**

For any questions, ask your senior developer or check the documentation links above.
