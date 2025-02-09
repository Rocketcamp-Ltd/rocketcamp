import { RouteObject } from 'react-router-dom';
import { RegisterPage } from '@/pages/Register';
import { AuthOnboardingPage } from '@/pages/AuthOnboarding';

import { withLayout } from '../layouts/withLayout';

import { HomePage } from '@/pages/Home';
import { LoginPage } from '@/pages/Login';
import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { OnboardingLayout } from '../layouts/OnboardingLayout';

export enum AppRoutes {
  HOME = 'home',
  LOGIN = 'login',
  REGISTER = 'register',
  AUTH_ONBOARDING = 'auth-onboarding',
};

const HomePageWithLayout = withLayout(HomePage, MainLayout);
const LoginPageWithLayout = withLayout(LoginPage, AuthLayout);
const RegisterPageWithLayout = withLayout(RegisterPage, AuthLayout);
const AuthOnboardingPageWithLayout = withLayout(AuthOnboardingPage, OnboardingLayout);

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.REGISTER]: '/register',
  [AppRoutes.AUTH_ONBOARDING]: '/auth-onboarding',
};

export const routeConfig: Record<AppRoutes, RouteObject> = {
  [AppRoutes.HOME]: {
    path: RoutePath[AppRoutes.HOME],
    element: <HomePageWithLayout />,
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath[AppRoutes.LOGIN],
    element: <LoginPageWithLayout />,
  },
  [AppRoutes.REGISTER]: {
    path: RoutePath[AppRoutes.REGISTER],
    element: <RegisterPageWithLayout />,
  },
  [AppRoutes.AUTH_ONBOARDING]: {
    path: RoutePath[AppRoutes.AUTH_ONBOARDING],
    element: <AuthOnboardingPageWithLayout />,
  },
}
