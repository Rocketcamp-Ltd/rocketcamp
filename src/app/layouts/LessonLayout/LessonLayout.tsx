import React from 'react';
import { ProgressHeader } from '@/app/components/layouts/ProgressHeader';
import { useProgressStore } from './model/store';

interface Props {
  children: React.ReactNode;
}

export const LessonLayout: React.FC<Props> = ({ children }) => {
  const { progress } = useProgressStore();

  return (
    <div>
      <ProgressHeader progress={progress} />

      <main>{children}</main>
    </div>
  );
};
