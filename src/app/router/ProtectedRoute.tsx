import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/app/hooks/useAuth';
import { RoutePath, AppRoutes } from './config';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={RoutePath[AppRoutes.LOGIN]}
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
};
