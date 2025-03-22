import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressHeader } from '@/app/components/layouts/ProgressHeader';
import { useProgressStore } from './model/store';

interface Props {
  children: React.ReactNode;
}

export const LessonLayout: React.FC<Props> = ({ children }) => {
  const { progress } = useProgressStore();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <ProgressHeader
        hasBack
        onBack={handleBack}
        progress={progress}
        className="fixed top-0 left-0 w-full z-30"
      />

      <main>{children}</main>
    </div>
  );
};
