import React, { useRef, useCallback, useState, useEffect } from 'react';
import type { LessonComponent } from '@/types/lessons';
import { useLocation } from 'react-router-dom';

import { useProgressStore } from '@/app/layouts/LessonLayout';
import { Button } from '@/app/components/ui/button';

import { SelectedButtons } from './components/SelectedButtons';
import { RadioButtons } from './components/RadioButtons';
import { LessonIntro } from './components/LessonIntro';
import { CompleteCourseFlow } from './components/CompleteCourseFlow';

import { useLessonState } from './hooks/useLessonState';
import { useLessonNavigation } from './hooks/useLessonNavigation';
import { useScrollAnimation } from './hooks/useScrollAnimation';

import { mock } from './mock';

const LessonPage: React.FC = () => {
  const { setProgress } = useProgressStore();

  const { lesson, startedLesson, startLesson } = useLessonState(mock);

  const [courseAlias, setCourseAlias] = useState<string | null>(null);

  const lessonContentRef = useRef<HTMLDivElement>(null);
  const stepsRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const location = useLocation();

  const {
    currentStepIndex,
    visibleSteps,
    stepOpacity,
    goToNextStep,
    setStepVisible,
    isLastStep,
    isCourseCompleted,
    completeCourse,
  } = useLessonNavigation({
    totalSteps: lesson.steps.length,
    onProgressChange: setProgress,
  });

  const { scrollToStep, registerStepRef } = useScrollAnimation({
    stepsRefs,
    containerRef: lessonContentRef,
    onScrollComplete: setStepVisible,
  });

  const handleContinue = useCallback(() => {
    if (currentStepIndex === -1) {
      startLesson();
    }

    if (isLastStep) {
      completeCourse();
      return;
    }

    const newIndex = goToNextStep();
    if (newIndex !== -1) {
      setTimeout(() => {
        scrollToStep(newIndex);
      }, 100);
    }
  }, [currentStepIndex, goToNextStep, scrollToStep, startLesson, isLastStep, completeCourse]);

  const handleOptionSelect = useCallback(() => {
    handleContinue();
  }, [handleContinue]);

  const renderActionComponent = useCallback(
    (component: LessonComponent | null) => {
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
    },
    [handleOptionSelect],
  );

  useEffect(() => {
    const alias = location.pathname.split('/')[2];

    if (alias) {
      setCourseAlias(alias);
    }
  }, [location.pathname, completeCourse]);

  return (
    <div
      className="mx-auto max-w-[640px] pt-24 pb-24"
      ref={lessonContentRef}
    >
      {isCourseCompleted ? (
        <CompleteCourseFlow lessonId={lesson.id} courseAlias={courseAlias} />
      ) : (
        <>
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
                  <div className="mb-8 text-center text-sm text-gray-500">
                    {lesson.steps[stepIndex].coverAnnotation}
                  </div>
                )}

                <div
                  className="mb-8"
                  dangerouslySetInnerHTML={{ __html: lesson.steps[stepIndex].text }}
                ></div>

                {lesson.steps[stepIndex].component && (
                  <div className="mb-8">{renderActionComponent(lesson.steps[stepIndex].component)}</div>
                )}

                {stepIndex === currentStepIndex && !lesson.steps[stepIndex].component && (
                  <Button onClick={handleContinue}>Continue</Button>
                )}
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default LessonPage;
