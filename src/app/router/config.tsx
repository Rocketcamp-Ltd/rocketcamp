import { RouteObject } from 'react-router-dom';
import { RegisterPage } from '@/pages/Register';
import { AuthOnboardingPage } from '@/pages/AuthOnboarding';
import { CoursesPage } from '@/pages/Courses';
import { LibraryPage } from '@/pages/Library';

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
  COURSES = 'courses',
  LIBRARY = 'library',
}

const HomePageWithLayout = withLayout(HomePage, MainLayout);
const LoginPageWithLayout = withLayout(LoginPage, AuthLayout);
const RegisterPageWithLayout = withLayout(RegisterPage, AuthLayout);
const AuthOnboardingPageWithLayout = withLayout(AuthOnboardingPage, OnboardingLayout);
const CoursesPageWithLayout = withLayout(CoursesPage, MainLayout)
const LibraryPageWithLayout = withLayout(LibraryPage, MainLayout)

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.REGISTER]: '/register',
  [AppRoutes.AUTH_ONBOARDING]: '/auth-onboarding',
  [AppRoutes.COURSES]: '/courses',
  [AppRoutes.LIBRARY]: '/library',
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
  [AppRoutes.COURSES]: {
    path: RoutePath[AppRoutes.COURSES],
    element: <CoursesPageWithLayout />,
  },
  [AppRoutes.LIBRARY]: {
    path: RoutePath[AppRoutes.LIBRARY],
    element: <LibraryPageWithLayout />,
  },
};
