import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Badge } from '@brizpickr/ui-kit';
import { Eye, EyeOff } from 'lucide-react';
import {
  useLogin,
  useAuthError,
  clearError,
} from '../../../../app/store/index';
export default function LoginForm() {
  const navigate = useNavigate();
  const { login, isLoading } = useLogin();
  const authError = useAuthError();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setLocalError('');
    // Clear auth error when user starts typing
    if (authError) {
      clearError();
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setLocalError('Email and password are required');
      return;
    }

    try {
      const result = await login({
        email: form.email,
        password: form.password,
      });

      // If login is successful, navigate to dashboard
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/dashboard');
      }
    } catch (error) {
      throw new Error('Login error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-soft w-full max-w-md space-y-6"
      >
        <div className="text-center mb-4">
          <img
            src="/logo192.png"
            alt="BizPickr"
            className="mx-auto h-12 mb-2"
          />
          <h2 className="text-2xl font-bold text-gray-900">
            Sign in to BizPickr
          </h2>
        </div>
        {(localError || authError) && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-2 text-sm text-center">
            {localError || authError}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <Button type="submit" className="w-full mt-2" disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
}
