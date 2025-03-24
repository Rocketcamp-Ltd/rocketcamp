import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath, AppRoutes } from '@/app/router/config';
import { isAuthenticated } from '@/app/utils/auth';

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('Authorization');
    setIsAuth(false);
    navigate(RoutePath[AppRoutes.LOGIN]);
  }, [navigate]);

  const login = useCallback((token: string) => {
    localStorage.setItem('Authorization', token);
    setIsAuth(true);
  }, []);

  return {
    isAuthenticated: isAuth,
    login,
    logout,
  };
}; 