import { useState, useCallback, useEffect } from 'react';

interface UseLessonNavigationProps {
  totalSteps: number;
  onProgressChange: (progress: number) => void;
  lessonId: string;
}

interface NavigationState {
  currentStepIndex: number;
  visibleSteps: number[];
  stepOpacity: { [key: number]: number };
  isCompleted: boolean;
  lessonId: string;
  lastUpdated: number;
}

export function useLessonNavigation({ totalSteps, onProgressChange, lessonId }: UseLessonNavigationProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [stepOpacity, setStepOpacity] = useState<{ [key: number]: number }>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    const storedNavigation = sessionStorage.getItem(`lesson_navigation_${lessonId}`);

    if (storedNavigation) {
      try {
        const parsedNavigation = JSON.parse(storedNavigation) as NavigationState;

        if (parsedNavigation.lessonId === lessonId) {
          setCurrentStepIndex(parsedNavigation.currentStepIndex);
          setVisibleSteps(parsedNavigation.visibleSteps);
          setStepOpacity(parsedNavigation.stepOpacity);
          setIsCompleted(parsedNavigation.isCompleted);

          if (parsedNavigation.currentStepIndex !== -1) {
            onProgressChange(calculateProgress(parsedNavigation.currentStepIndex));
          }
        }
      } catch (error) {
        console.error('Failed to parse navigation state from sessionStorage:', error);
      }
    }
  }, [lessonId]);

  const saveNavigationState = useCallback(() => {
    const navigationState: NavigationState = {
      currentStepIndex,
      visibleSteps,
      stepOpacity,
      isCompleted,
      lessonId,
      lastUpdated: Date.now()
    };

    sessionStorage.setItem(`lesson_navigation_${lessonId}`, JSON.stringify(navigationState));
  }, [currentStepIndex, visibleSteps, stepOpacity, isCompleted, lessonId]);

  useEffect(() => {
    if (currentStepIndex !== -1) {
      saveNavigationState();
    }
  }, [currentStepIndex, visibleSteps, stepOpacity, isCompleted, saveNavigationState]);

  useEffect(() => {
    if (visibleSteps.length > 0) {
      const updatedOpacity = { ...stepOpacity };
      visibleSteps.forEach((stepIndex) => {
        if (stepIndex < currentStepIndex) {
          updatedOpacity[stepIndex] = 1;
        }
      });

      if (JSON.stringify(updatedOpacity) !== JSON.stringify(stepOpacity)) {
        setStepOpacity(updatedOpacity);
      }
    }
  }, [visibleSteps, currentStepIndex]);

  const calculateProgress = useCallback(
    (index: number) => {
      const totalStepsWithIntro = totalSteps + 1;
      const currentStep = index + 1;

      return Math.round((currentStep / totalStepsWithIntro) * 100);
    },
    [totalSteps],
  );

  const goToNextStep = useCallback(() => {
    if (currentStepIndex === -1) {
      const newIndex = 0;
      setCurrentStepIndex(newIndex);
      setVisibleSteps(prev => [...prev, newIndex]);
      onProgressChange(calculateProgress(newIndex));
      setStepOpacity(prev => ({ ...prev, [newIndex]: 0 }));

      return newIndex;
    } else if (currentStepIndex < totalSteps - 1) {
      const newIndex = currentStepIndex + 1;
      setCurrentStepIndex(newIndex);
      setVisibleSteps(prev => [...prev, newIndex]);
      onProgressChange(calculateProgress(newIndex));
      setStepOpacity(prev => ({ ...prev, [newIndex]: 0 }));

      return newIndex;
    }
    return -1;
  }, [currentStepIndex, totalSteps, onProgressChange, calculateProgress]);

  const setStepVisible = useCallback((stepIndex: number) => {
    setStepOpacity(prev => ({ ...prev, [stepIndex]: 1 }));
  }, []);

  const completeCourse = useCallback(() => {
    onProgressChange(100);
    setIsCompleted(true);

    const navigationState: NavigationState = {
      currentStepIndex,
      visibleSteps,
      stepOpacity,
      isCompleted: true,
      lessonId,
      lastUpdated: Date.now()
    };

    sessionStorage.setItem(`lesson_navigation_${lessonId}`, JSON.stringify(navigationState));
  }, [onProgressChange, currentStepIndex, visibleSteps, stepOpacity, lessonId]);

  const clearLessonState = useCallback(() => {
    sessionStorage.removeItem(`lesson_navigation_${lessonId}`);
    sessionStorage.removeItem(`lesson_state_${lessonId}`);
    onProgressChange(0);
  }, [lessonId, onProgressChange]);

  return {
    currentStepIndex,
    visibleSteps,
    stepOpacity,
    goToNextStep,
    setStepVisible,
    isLastStep: currentStepIndex === totalSteps - 1,
    isCourseCompleted: isCompleted,
    completeCourse,
    clearLessonState,
  };
}