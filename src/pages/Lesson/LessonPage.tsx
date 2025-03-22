import React, { useState, useRef } from 'react';
import type { LessonDetails, LessonComponent } from '@/types/lessons';

import { useProgressStore } from '@/app/layouts/LessonLayout';

import { Button } from '@/app/components/ui/button';

import { SelectedButtons } from './components/SelectedButtons';
import { RadioButtons } from './components/RadioButtons';
import { LessonIntro } from './components/LessonIntro';

import { mock } from './mock';

const LessonPage: React.FC = () => {
  const { progress, setProgress } = useProgressStore();
  const [lesson, setLesson] = useState<LessonDetails>(mock);
  const [startedLesson, setStartedLesson] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [stepOpacity, setStepOpacity] = useState<{ [key: number]: number }>({});

  const lessonContentRef = useRef<HTMLDivElement>(null);
  const stepsRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const calculateProgress = (index: number) => {
    const totalSteps = lesson.steps.length + 1;
    const currentStep = index + 1;
    return Math.round((currentStep / totalSteps) * 100);
  };

  const handleContinue = () => {
    if (currentStepIndex === -1) {
      setStartedLesson(true);
      const newIndex = 0;
      setCurrentStepIndex(newIndex);
      setVisibleSteps([...visibleSteps, newIndex]);
      setProgress(calculateProgress(newIndex));

      setStepOpacity(prev => ({ ...prev, [newIndex]: 0 }));

      setTimeout(() => {
        scrollToStep(newIndex);
      }, 100);
    } else if (currentStepIndex < lesson.steps.length - 1) {
      const newIndex = currentStepIndex + 1;
      setCurrentStepIndex(newIndex);
      setVisibleSteps([...visibleSteps, newIndex]);
      setProgress(calculateProgress(newIndex));

      setStepOpacity(prev => ({ ...prev, [newIndex]: 0 }));

      setTimeout(() => {
        scrollToStep(newIndex);
      }, 100);
    }
  };

  const scrollToStep = (stepIndex: number) => {
    if (stepsRefs.current[stepIndex] && lessonContentRef.current) {
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
            setStepOpacity(prev => ({ ...prev, [stepIndex]: 1 }));
          }, 200);
        }
      }

      requestAnimationFrame(animation);
    }
  };

  const registerStepRef = (index: number, ref: HTMLDivElement | null) => {
    stepsRefs.current[index] = ref;
  };

  const handleOptionSelect = () => {
    handleContinue();
  };

  const renderActionComponent = (component: LessonComponent | null) => {
    if (!component) return null;

    switch (component.type) {
      case 'selectedButtons':
        return (
          <SelectedButtons
            items={component.items}
            onSelect={handleOptionSelect}
          />
        );
      case 'radioButtons':
        return (
          <RadioButtons
            items={component.items}
            onSelect={handleOptionSelect}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="mx-auto max-w-[640px] pt-24 pb-24"
      ref={lessonContentRef}
    >
      <LessonIntro
        lesson={lesson}
        startedLesson={startedLesson}
        handleContinue={handleContinue}
      />

      {startedLesson &&
        visibleSteps.map(stepIndex => (
          <div
            key={`step-${stepIndex}`}
            ref={ref => registerStepRef(stepIndex, ref)}
            className="mb-16 transition-opacity duration-700"
            style={{ opacity: stepOpacity[stepIndex] || 0 }}
          >
            <img
              src={lesson.steps[stepIndex].cover}
              alt=""
              className="mb-2 h-[384px] w-full object-cover"
            />

            {lesson.steps[stepIndex].coverAnnotation && (
              <div className="mb-8 text-center text-sm text-gray-500">{lesson.steps[stepIndex].coverAnnotation}</div>
            )}

            <div
              className="mb-8"
              dangerouslySetInnerHTML={{ __html: lesson.steps[stepIndex].text }}
            ></div>

            {lesson.steps[stepIndex].component && (
              <div className="mb-8">{renderActionComponent(lesson.steps[stepIndex].component)}</div>
            )}

            {stepIndex === currentStepIndex &&
              stepIndex < lesson.steps.length - 1 &&
              !lesson.steps[stepIndex].component && <Button onClick={handleContinue}>Continue</Button>}
          </div>
        ))}
    </div>
  );
};

export default LessonPage;
