# 🚀 BrizPickr NX Monorepo

A modern, scalable monorepo for BrizPickr company applications built with NX, React, Tailwind CSS, and TanStack Query.

## 🎯 Quick Start

### For Developers

```bash
# Install dependencies
npm install

# Start customer dashboard
nx serve customer-dashboard

# Or use npm scripts
npm run start:customer
```

## 📁 Project Structure

```
BrizPickr/
├── apps/                          # Main Applications
│   ├── customer-dashboard/        # React App (Vite) - Customer Portal
│   ├── vendor-portal/            # React App (Future) - Vendor Management
│   ├── crm-system/               # React App (Future) - Internal CRM
│   └── landing-site/             # Next.js App (Future) - Public Website
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

## 🛠️ Tech Stack

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

## 🚀 Available Scripts

### Development

```bash
npm start                    # Start customer dashboard
npm run start:customer       # Start customer dashboard
npm run dev                  # Start all apps
```

### Building

```bash
npm run build               # Build all apps
npm run build:customer      # Build customer dashboard
```

### Code Quality

```bash
npm run lint                # Lint all projects
npm run lint:customer       # Lint customer dashboard
npm run test                # Test all projects
npm run test:customer       # Test customer dashboard
npm run format              # Format code
```

### Utilities

```bash
npm run projects            # List all projects
npm run graph               # Show dependency graph
npm run affected            # Show affected projects
npm run clean               # Clear NX cache
```

## 🎨 Styling

This project uses **Tailwind CSS** for styling. Custom components are defined in `apps/customer-dashboard/src/app/styles/globals.css`.

### Example Usage

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

## 🔌 API Integration

API calls are handled using **TanStack Query** with custom hooks in `libs/api-client/`.

### Example Usage

```jsx
import { useProducts } from 'api-client';

const ProductList = () => {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {products?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

## 📚 Documentation

- **[Junior Developer Setup Guide](./JUNIOR_DEVELOPER_SETUP_GUIDE.md)** - Complete guide for new developers
- **[NX Documentation](https://nx.dev/)** - Monorepo management
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[TanStack Query](https://tanstack.com/query)** - Server state management

## 🏗️ Development Workflow

1. **Start Development**

   ```bash
   npm start
   ```

2. **Create New Features**
   - Put shared logic in `libs/`
   - Put app-specific logic in `apps/`
   - Use Tailwind CSS for styling
   - Use TanStack Query for API calls

3. **Code Organization**
   - Follow feature-based folder structure
   - Use barrel exports (`index.js`) for clean imports
   - Keep components small and focused

## 🔧 Troubleshooting

### Common Issues

1. **Port already in use**

   ```bash
   npx kill-port 4200
   npm start
   ```

2. **Dependencies not found**

   ```bash
   npm run clean
   npm install
   ```

3. **Build errors**
   ```bash
   nx reset
   npm run build:customer
   ```

## 🤝 Contributing

1. Follow the established folder structure
2. Use Tailwind CSS for styling
3. Write clean, readable code
4. Test your changes
5. Follow the linting rules

## 📄 License

This project is proprietary to BrizPickr company.

---

**Happy Coding! 🎉**

For questions or issues, refer to the [ Developer Setup Guide](./DEVELOPER_SETUP_GUIDE.md) or ask your senior developer.
