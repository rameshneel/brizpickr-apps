# Customer Dashboard - Folder Structure Guide

## 📁 Global Structure (App Level)

```
src/app/
├── App.jsx                    # Main app component with routing
├── components/                # 🆕 Global UI components
│   ├── Header.jsx            # App header (moved from features/ui)
│   ├── Sidebar.jsx           # App sidebar (moved from features/ui)
│   └── index.js              # Barrel export
├── hooks/                     # 🆕 Global custom hooks
│   ├── useLocalStorage.js    # Local storage hook
│   └── index.js              # Barrel export
├── utils/                     # 🆕 Global utilities
│   ├── formatters.js         # Date, currency, phone formatters
│   ├── validators.js         # Email, password validators
│   └── index.js              # Barrel export
├── constants/                 # 🆕 Global constants
│   ├── routes.js             # Route definitions
│   ├── api.js                # API endpoints
│   └── index.js              # Barrel export
├── types/                     # 🆕 Global TypeScript types
│   └── index.js              # Barrel export
├── services/                  # 🆕 Global API services
│   ├── apiClient.js          # HTTP client
│   └── index.js              # Barrel export
├── providers/                 # 🆕 Global context providers
│   └── index.js              # Barrel export
├── layouts/                   # App-wide layouts
│   ├── AuthLayout.jsx        # Authentication layout
│   ├── MainLayout.jsx        # Main app layout
│   └── index.js              # Barrel export
├── pages/                     # Route pages
│   ├── DashboardPage.jsx     # Dashboard page
│   ├── LoginPage.jsx         # Login page
│   └── index.js              # Barrel export
├── store/                     # Root Redux store
│   ├── index.js              # Store configuration
│   ├── rootReducer.js        # Root reducer
│   └── middleware.js         # Store middleware
├── styles/                    # Global styles
│   └── globals.css           # Global CSS
└── features/                  # Feature modules
    ├── auth/                 # Authentication feature
    ├── products/             # Products feature
    ├── projects/             # Projects feature
    ├── user/                 # User management feature
    └── notifications/        # Notifications feature
```

## 🎯 What Goes Where - Decision Matrix

| Component/Code  | Global | Feature | Reason                        |
| --------------- | ------ | ------- | ----------------------------- |
| Header, Sidebar | ✅     | ❌      | Used across entire app        |
| LoginForm       | ❌     | ✅      | Only used in auth feature     |
| ProductCard     | ❌     | ✅      | Only used in products feature |
| Loading spinner | ✅     | ❌      | Used everywhere               |
| Error boundary  | ✅     | ❌      | App-wide error handling       |
| API client      | ✅     | ❌      | Shared across features        |
| Auth validation | ❌     | ✅      | Auth-specific logic           |
| Date formatter  | ✅     | ❌      | Used everywhere               |
| User profile    | ❌     | ✅      | User feature specific         |

## 📋 Feature Structure (Feature-Specific)

Each feature follows this structure:

```
features/auth/
├── components/                # Auth-specific components
│   ├── LoginForm/
│   │   ├── LoginForm.jsx
│   │   ├── LoginForm.module.css
│   │   └── index.js
│   └── index.js
├── hooks/                     # Auth-specific hooks
│   ├── useAuth.js
│   ├── useLogin.js
│   └── index.js
├── store/                     # Auth-specific Redux
│   ├── authSlice.js
│   ├── authApi.js
│   └── index.js
├── services/                  # Auth-specific API calls
│   ├── authService.js
│   └── index.js
├── utils/                     # Auth-specific utilities
│   ├── authValidators.js
│   ├── authHelpers.js
│   └── index.js
├── types/                     # Auth-specific types
│   ├── auth.types.ts
│   └── index.ts
├── constants/                 # Auth-specific constants
│   ├── authConstants.js
│   └── index.js
└── index.js                   # Barrel export
```

## 🚀 Import Examples

### Global Imports

```javascript
// Import global components
import { Header, Sidebar } from './components';

// Import global utilities
import { formatDate, validateEmail } from './utils';

// Import global constants
import { ROUTES, API_ENDPOINTS } from './constants';

// Import global services
import { apiClient } from './services';

// Import global hooks
import { useLocalStorage } from './hooks';
```

### Feature Imports

```javascript
// Import feature components
import { LoginForm } from './features/auth/components';

// Import feature hooks
import { useAuth } from './features/auth/hooks';

// Import feature store
import { authSlice } from './features/auth/store';
```

## ✅ Benefits of This Structure

1. **Separation of Concerns** - Clear distinction between global and feature-specific code
2. **Scalability** - Easy to add new features without confusion
3. **Maintainability** - Clear organization makes code easier to find
4. **Team Collaboration** - Multiple developers can work without conflicts
5. **Testing** - Easy to test each layer independently
6. **Reusability** - Global components and utilities can be easily shared
7. **Barrel Exports** - Clean imports with index.js files

## 🔄 Recent Changes Made

1. ✅ **Moved UI components** from `features/ui/` to global `components/`
2. ✅ **Created global folders** for hooks, utils, constants, types, services, providers
3. ✅ **Added barrel exports** for clean imports
4. ✅ **Created example utilities** (formatters, validators, API client)
5. ✅ **Updated App.jsx** to use new global imports
6. ✅ **Removed empty UI feature** folder
7. ✅ **Added comprehensive documentation**

## 🎯 Next Steps

1. **Populate feature folders** with actual implementation
2. **Add more global utilities** as needed
3. **Create global providers** (Theme, Auth, etc.)
4. **Add TypeScript types** for better type safety
5. **Set up testing structure** for each layer
