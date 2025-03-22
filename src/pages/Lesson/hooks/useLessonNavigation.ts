import { useState, useCallback } from 'react';

interface UseLessonNavigationProps {
  totalSteps: number;
  onProgressChange: (progress: number) => void;
}

export function useLessonNavigation({ totalSteps, onProgressChange }: UseLessonNavigationProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [stepOpacity, setStepOpacity] = useState<{ [key: number]: number }>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const calculateProgress = useCallback((index: number) => {
    const totalStepsWithIntro = totalSteps + 1;
    const currentStep = index + 1;

    return Math.round((currentStep / totalStepsWithIntro) * 100);
  }, [totalSteps]);

  const goToNextStep = useCallback(() => {
    if (currentStepIndex === -1) {
      const newIndex = 0;
      setCurrentStepIndex(newIndex);
      setVisibleSteps([...visibleSteps, newIndex]);
      onProgressChange(calculateProgress(newIndex));
      setStepOpacity(prev => ({ ...prev, [newIndex]: 0 }));

      return newIndex;
    } else if (currentStepIndex < totalSteps - 1) {
      const newIndex = currentStepIndex + 1;
      setCurrentStepIndex(newIndex);
      setVisibleSteps([...visibleSteps, newIndex]);
      onProgressChange(calculateProgress(newIndex));
      setStepOpacity(prev => ({ ...prev, [newIndex]: 0 }));

      return newIndex;
    }
    return -1;
  }, [currentStepIndex, visibleSteps, totalSteps, onProgressChange, calculateProgress]);

  const setStepVisible = useCallback((stepIndex: number) => {
    setStepOpacity(prev => ({ ...prev, [stepIndex]: 1 }));
  }, []);

  const completeCourse = useCallback(() => {
    onProgressChange(100);
    setIsCompleted(true);
  }, [onProgressChange]);

  return {
    currentStepIndex,
    visibleSteps,
    stepOpacity,
    goToNextStep,
    setStepVisible,
    isLastStep: currentStepIndex === totalSteps - 1,
    isCourseCompleted: isCompleted,
    completeCourse
  };
}