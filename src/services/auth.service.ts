import axiosInstance from '@/lib/axios';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export const authService = {
  login: async (payload: LoginPayload) => {
    const response = await axiosInstance.post('/auth/login', payload);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  logout: async () => {
    await axiosInstance.post('/auth/logout');
    localStorage.removeItem('token');
  },

  getProfile: async () => {
    const response = await axiosInstance.get('/auth/profile');
    return response.data;
  },
};
