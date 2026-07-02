export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'employee' | 'manager' | 'hr' | 'finance' | 'super-admin';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}
