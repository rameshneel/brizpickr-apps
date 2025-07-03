import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../base/apiClient';

// Auth API functions
export const authApi = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },
  
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
  
  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },
  
  refreshToken: async () => {
    const response = await apiClient.post('/auth/refresh');
    return response.data;
  },
};

// Auth hooks
export const useLogin = () => {
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      localStorage.removeItem('token');
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: authApi.getProfile,
    enabled: !!localStorage.getItem('token'),
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: authApi.refreshToken,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
    },
  });
}; 