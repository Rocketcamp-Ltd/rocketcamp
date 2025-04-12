import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressHeader } from '@/app/components/layouts/ProgressHeader';
// import { useProgressStore } from './model/store';
import { useOnboarding } from '@/hooks/useOnboarding';
import { RoutePath, AppRoutes } from '@/app/router/config';
import { useProgressStore } from '../model/store';

interface Props {
  children: React.ReactNode;
}

export const OnboardingLayout: React.FC<Props> = ({ children }) => {
  const { progress } = useProgressStore();
  const { isOnboardingComplete } = useOnboarding();
  const navigate = useNavigate();

  // If onboarding is already complete, redirect to home
  useEffect(() => {
    if (isOnboardingComplete === true) {
      console.log('Onboarding already complete, redirecting to home from layout');
      navigate(RoutePath[AppRoutes.HOME], { replace: true });
    }
  }, [isOnboardingComplete, navigate]);

  const onBack = () => {
    // Если это первый шаг, вернуться можно только на странцу авторизации
    // @todo: доработать навигацию по шагам
  };

  return (
    <div>
      <ProgressHeader
        progress={progress}
        onBack={onBack}
      />

      <main>{children}</main>
    </div>
  );
};
