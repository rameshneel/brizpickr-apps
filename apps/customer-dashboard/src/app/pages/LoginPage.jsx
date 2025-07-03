import React from 'react';
import AuthLayout from '../layouts/AuthLayout';
import LoginForm from '../features/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
