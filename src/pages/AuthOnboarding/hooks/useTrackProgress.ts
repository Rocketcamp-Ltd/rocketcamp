import { useState } from 'react';
import type { AuthOnboarding } from '@/types/authOnboarding';
import { useProgressStore } from '@/app/layouts/OnboardingLayout';

interface UseTrackProgressProps {
  onboarding: AuthOnboarding[];
}

export const useTrackProgress = ({ onboarding }: UseTrackProgressProps) => {
  const { setProgress } = useProgressStore();

  const [currentStep, setCurrentStep] = useState(0);

  const trackProgress = () => {
    const nextStepIndex = currentStep + 1;
    const totalSteps = onboarding.length;
    const progressPercentage = Math.round((nextStepIndex / totalSteps) * 100);
    setProgress(progressPercentage);
  };

  return {
    trackProgress,
    setCurrentStep,
    currentStep,
  };
};
