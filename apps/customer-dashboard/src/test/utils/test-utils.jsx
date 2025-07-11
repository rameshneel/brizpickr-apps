import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { authStore } from '../../store';

// Create a fresh QueryClient for each test
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

// Custom render function that includes all providers
const AllTheProviders = ({
  children,
  queryClient = createTestQueryClient(),
}) => {
  return (
    <Provider store={authStore}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

// Custom render function
const customRender = (ui, options = {}) => {
  const { queryClient, ...renderOptions } = options;

  const Wrapper = ({ children }) => (
    <AllTheProviders queryClient={queryClient}>{children}</AllTheProviders>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Mock API responses
export const mockApiResponse = (data, status = 200) => {
  return Promise.resolve({
    data,
    status,
    ok: status >= 200 && status < 300,
  });
};

// Mock API error
export const mockApiError = (message = 'API Error', status = 500) => {
  return Promise.reject({
    message,
    status,
    response: { data: { message } },
  });
};

// Mock user data
export const mockUser = {
  id: 1,
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  permissions: ['read', 'write'],
  roles: ['user'],
};

// Mock product data
export const mockProducts = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description 1',
    price: 100,
    category: 'electronics',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description 2',
    price: 200,
    category: 'clothing',
  },
];

// Mock project data
export const mockProjects = [
  {
    id: 1,
    name: 'Project 1',
    description: 'Project description 1',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  },
  {
    id: 2,
    name: 'Project 2',
    description: 'Project description 2',
    status: 'completed',
    startDate: '2024-02-01',
    endDate: '2024-11-30',
  },
];

// Wait for loading to complete
export const waitForLoadingToFinish = () => {
  return new Promise(resolve => setTimeout(resolve, 0));
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };
