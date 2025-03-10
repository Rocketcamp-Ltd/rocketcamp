import React from 'react';
import { ProgressHeader } from '@/app/components/layouts/ProgressHeader';
import { useProgressStore } from '../model/store';

interface Props {
  children: React.ReactNode;
}

export const OnboardingLayout: React.FC<Props> = ({ children }) => {
  const { progress } = useProgressStore();

  const onBack = () => {
    // @todo: Ансарыч с query-параметрами поработай тут по брацки и прогресс в минус заведи
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
