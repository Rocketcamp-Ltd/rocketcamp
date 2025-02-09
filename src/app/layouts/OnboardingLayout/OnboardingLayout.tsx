import React from 'react';
import { ProgressHeader } from '@/app/components/layouts/ProgressHeader';

interface Props {
  children: React.ReactNode;
}

export const OnboardingLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <ProgressHeader />

      <main>{children}</main>
    </div>
  );
};
