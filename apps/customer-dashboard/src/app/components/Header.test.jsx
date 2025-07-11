import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { authStore } from '../../store';
import Header from './Header';
import { jest, describe, test, expect } from '@jest/globals';
// Mock the user hook
jest.mock('../../hooks/useLocalStorage', () => ({
  useLocalStorage: () => [null, jest.fn()],
}));

const renderWithProviders = component => {
  return render(
    <Provider store={authStore}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe('Header Component', () => {
  test('renders header with logo', () => {
    renderWithProviders(<Header />);

    const logo = screen.getByText(/brizpickr/i);
    expect(logo).toBeInTheDocument();
  });

  test('renders navigation menu', () => {
    renderWithProviders(<Header />);

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  test('renders user menu when logged in', () => {
    // Mock authenticated user
    const mockUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    };

    renderWithProviders(<Header user={mockUser} />);

    const userMenu = screen.getByText(/john doe/i);
    expect(userMenu).toBeInTheDocument();
  });

  test('renders login button when not logged in', () => {
    renderWithProviders(<Header user={null} />);

    const loginButton = screen.getByRole('link', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });
});
