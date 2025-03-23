import { useCallback } from 'react';

interface UseLessonProgressProps {
  totalSteps: number;
}

export function useLessonProgress({ totalSteps }: UseLessonProgressProps) {
  const calculateProgress = useCallback(
    (index: number) => {
      const totalStepsWithIntro = totalSteps + 1;
      const currentStep = index + 1;
      return Math.round((currentStep / totalStepsWithIntro) * 100);
    },
    [totalSteps],
  );

  return {
    calculateProgress,
  };
}
