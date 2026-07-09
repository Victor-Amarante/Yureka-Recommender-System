import axios from 'axios';
import { configureAuth } from 'react-query-auth';
import { Navigate, useLocation } from 'react-router';

import { paths } from '@/config/paths';
import { User } from '@/types/api';

import { api } from './api-client';

const getUser = async (): Promise<User | null> => {
  const token = localStorage.getItem('access_token');
  if (!token) return null;
  try {
    const response = await api.get('/auth/me');
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && [401, 403, 404].includes(error.response?.status ?? 0)) {
      return null;
    }
    throw error;
  }
};

// loginFn recebe o Google credential token como string
const loginFn = async (credential: string): Promise<User> => {
  const response = await api.post('/auth/google/', { credential });
  const { access, refresh, user } = response.data.data;
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
  return user;
};

const logoutFn = async (): Promise<void> => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

const registerFn = async (_data: unknown): Promise<User> => {
  throw new Error('Registro direto não suportado. Use o login com Google.');
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } = configureAuth({
  userFn: getUser,
  loginFn,
  logoutFn,
  registerFn,
});

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data) {
    return <Navigate to={paths.landing.getHref()} replace state={{ from: location }} />;
  }

  return children;
};
