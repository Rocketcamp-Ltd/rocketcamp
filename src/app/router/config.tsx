import { RouteObject } from 'react-router-dom';

import { CoursePage } from '@/pages/Course';
import { LessonPage } from '@/pages/Lesson';
import { CoursesByAliasPage } from '@/pages/CoursesByAlias';
import { RegisterPage } from '@/pages/Register';
import { AuthOnboardingPage } from '@/pages/AuthOnboarding';
import { CoursesPage } from '@/pages/Courses';
import { LibraryPage } from '@/pages/Library';
import { HomePage } from '@/pages/Home';
import { LoginPage } from '@/pages/Login';
import { ProfileSettingsPage } from '@/pages/ProfileSettings';
import { FAQPage } from '@/pages/FAQ';

import { withLayout } from '../layouts/withLayout';

import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { OnboardingLayout } from '../layouts/OnboardingLayout';
import { CourseLayout } from '../layouts/CourseLayout';
import { LessonLayout } from '../layouts/LessonLayout';

export enum AppRoutes {
  HOME = 'home',
  LOGIN = 'login',
  REGISTER = 'register',
  AUTH_ONBOARDING = 'auth-onboarding',
  COURSES = 'courses',
  LIBRARY = 'library',
  FAQ = 'faq',
  PROFILE_SETTINGS = 'profile-settings',
  COURSE = 'course',
  LESSON = 'lesson',
  COURSES_BY_ALIAS = 'courses-by-alias',
}

const HomePageWithLayout = withLayout(HomePage, MainLayout);
const LoginPageWithLayout = withLayout(LoginPage, AuthLayout);
const RegisterPageWithLayout = withLayout(RegisterPage, AuthLayout);
const AuthOnboardingPageWithLayout = withLayout(AuthOnboardingPage, OnboardingLayout);
const CoursesPageWithLayout = withLayout(CoursesPage, MainLayout);
const LibraryPageWithLayout = withLayout(LibraryPage, MainLayout);
const ProfileSettingsPageWithLayout = withLayout(ProfileSettingsPage, MainLayout);
const FAQPageWithLayout = withLayout(FAQPage, MainLayout);
const CourseByAliasWithLayout = withLayout(CoursesByAliasPage, MainLayout);
const CourseWithLayout = withLayout(CoursePage, CourseLayout);
const LessonWithLayout = withLayout(LessonPage, LessonLayout);

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.REGISTER]: '/register',
  [AppRoutes.AUTH_ONBOARDING]: '/auth-onboarding',
  [AppRoutes.COURSES]: '/courses',
  [AppRoutes.LIBRARY]: '/library',
  [AppRoutes.FAQ]: '/faq',
  [AppRoutes.PROFILE_SETTINGS]: '/profile-settings',
  [AppRoutes.COURSE]: '/course/:id',
  [AppRoutes.LESSON]: '/lesson/:id',
  [AppRoutes.COURSES_BY_ALIAS]: '/courses/:alias',
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
  [AppRoutes.PROFILE_SETTINGS]: {
    path: RoutePath[AppRoutes.PROFILE_SETTINGS],
    element: <ProfileSettingsPageWithLayout />,
  },
  [AppRoutes.FAQ]: {
    path: RoutePath[AppRoutes.FAQ],
    element: <FAQPageWithLayout />,
  },
  [AppRoutes.COURSE]: {
    path: RoutePath[AppRoutes.COURSE],
    element: <CourseWithLayout />,
  },
  [AppRoutes.LESSON]: {
    path: RoutePath[AppRoutes.LESSON],
    element: <LessonWithLayout />,
  },
  [AppRoutes.COURSES_BY_ALIAS]: {
    path: RoutePath[AppRoutes.COURSES_BY_ALIAS],
    element: <CourseByAliasWithLayout />,
  },
};
