import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/app/hooks/useAuth';
import { useOnboarding } from '@/hooks/useOnboarding';
import { RoutePath, AppRoutes } from './config';
import { PageLoader } from '@/app/components/PageLoader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireOnboarding = true }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { isOnboardingComplete, isLoading, redirectToOnboarding } = useOnboarding();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate
        to={RoutePath[AppRoutes.LOGIN]}
        state={{ from: location }}
        replace
      />
    );
  }

  // Используем ref для отслеживания, было ли уже выполнено перенаправление
  const redirectedRef = React.useRef(false);

  useEffect(() => {
    // Проверяем, не было ли уже перенаправление, чтобы избежать повторных перенаправлений
    if (redirectedRef.current) return;

    // Only check if authenticated and not already on the onboarding page
    if (
      isAuthenticated &&
      requireOnboarding &&
      !isLoading &&
      location.pathname !== RoutePath[AppRoutes.AUTH_ONBOARDING]
    ) {
      // Only redirect if we're sure onboarding is not complete
      if (isOnboardingComplete === false) {
        redirectedRef.current = true;
        redirectToOnboarding();
      }
    }

    // Сбрасываем флаг, если изменился маршрут
    return () => {
      redirectedRef.current = false;
    };
  }, [isAuthenticated, isOnboardingComplete, isLoading, requireOnboarding, location.pathname, redirectToOnboarding]);

  // Show loader while checking onboarding status
  if (isLoading) {
    return <PageLoader />;
  }

  // Special case: if we're on a page that requires onboarding and onboarding is not complete
  if (
    requireOnboarding &&
    isOnboardingComplete === false &&
    !isLoading &&
    location.pathname !== RoutePath[AppRoutes.AUTH_ONBOARDING]
  ) {
    console.log('Redirecting to onboarding from protected route');
    return (
      <Navigate
        to={RoutePath[AppRoutes.AUTH_ONBOARDING]}
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
};
