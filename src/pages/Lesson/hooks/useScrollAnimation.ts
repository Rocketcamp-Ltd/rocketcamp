import { useCallback } from 'react';

interface UseScrollAnimationProps {
  stepsRefs: React.MutableRefObject<{ [key: number]: HTMLDivElement | null }>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onScrollComplete?: (stepIndex: number) => void;
}

export function useScrollAnimation({
  stepsRefs,
  containerRef,
  onScrollComplete
}: UseScrollAnimationProps) {

  const scrollToStep = useCallback((stepIndex: number) => {
    if (stepsRefs.current[stepIndex] && containerRef?.current) {
      const targetElement = stepsRefs.current[stepIndex];
      const headerHeight = 80;
      const yOffset = targetElement.offsetTop;

      const targetPosition = yOffset - headerHeight;

      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 800;
      let startTime: number | null = null;

      function animation(currentTime: number) {
        if (startTime === null) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        const easeInOut = (t: number) => {
          return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };

        window.scrollTo(0, startPosition + distance * easeInOut(progress));

        if (elapsedTime < duration) {
          requestAnimationFrame(animation);
        } else {
          setTimeout(() => {
            if (onScrollComplete) {
              onScrollComplete(stepIndex);
            }
          }, 200);
        }
      }

      requestAnimationFrame(animation);
    }
  }, [stepsRefs, containerRef, onScrollComplete]);

  const registerStepRef = useCallback((index: number, ref: HTMLDivElement | null) => {
    stepsRefs.current[index] = ref;
  }, [stepsRefs]);

  return {
    scrollToStep,
    registerStepRef
  };
}