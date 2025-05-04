import React, { useRef, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useProgressStore } from '@/app/layouts/LessonLayout';
import { Button } from '@/app/components/ui/button';
import { PageLoader } from '@/app/components/PageLoader';

import { SelectedButtons } from './components/SelectedButtons';
import { RadioButtons } from './components/RadioButtons';
import { LessonIntro } from './components/LessonIntro';
import { CompleteCourseFlow } from './components/CompleteCourseFlow';
import { Slider } from './components/Slider';
import { TextContentRenderer } from './components/TextContentRenderer';

import { useLessonDetails } from '@/hooks/useLessonDetails';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { useIsMobile } from '@/hooks/useIsMobile';

const LessonPage: React.FC = () => {
  const { lessonId, courseId } = useParams<{ lessonId: string; courseId: string }>();
  const { setProgress } = useProgressStore();
  const lessonContentRef = useRef<HTMLDivElement>(null);
  const stepsRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const isMobile = useIsMobile();

  // Fetch lesson details from Supabase
  const { lessonDetails, isLoading, error, updateLessonProgress } = useLessonDetails(lessonId || '', courseId || '');

  const [startedLesson, setStartedLesson] = React.useState(false);

  const { scrollToStep, registerStepRef } = useScrollAnimation({
    stepsRefs,
    containerRef: lessonContentRef,
    onScrollComplete: stepIndex => {
      if (lessonDetails) {
        setStepVisible(stepIndex);
      }
    },
  });

  // Check if lesson is started based on currentStepIndex
  useEffect(() => {
    if (lessonDetails && lessonDetails.currentStepIndex !== undefined && lessonDetails.currentStepIndex >= 0) {
      setStartedLesson(true);
    }
  }, [lessonDetails]);

  // Update progress in the UI
  useEffect(() => {
    if (lessonDetails) {
      setProgress(lessonDetails.progress);
    }
  }, [lessonDetails, setProgress]);

  // Scroll to current step when first loading
  useEffect(() => {
    if (
      lessonDetails &&
      startedLesson &&
      lessonDetails.currentStepIndex !== undefined &&
      lessonDetails.currentStepIndex > 0 &&
      lessonDetails.visibleSteps.length > 0
    ) {
      setTimeout(() => {
        scrollToStep(lessonDetails.currentStepIndex);
      }, 300);
    }
  }, [lessonDetails, scrollToStep, startedLesson]);

  const setStepVisible = useCallback(
    (stepIndex: number) => {
      if (!lessonDetails) return;

      // Add step to visible steps if not already there
      if (!lessonDetails.visibleSteps.includes(stepIndex)) {
        const updatedVisibleSteps = [...lessonDetails.visibleSteps, stepIndex];

        updateLessonProgress({
          visibleSteps: updatedVisibleSteps,
        });
      }
    },
    [lessonDetails, updateLessonProgress],
  );

  const startLesson = useCallback(() => {
    setStartedLesson(true);

    // Update lesson progress in database
    updateLessonProgress({
      currentStepIndex: 0,
      visibleSteps: [0],
      progress: lessonDetails?.steps ? Math.round((1 / (lessonDetails.steps.length + 1)) * 100) : 0,
    });
  }, [updateLessonProgress, lessonDetails]);

  const goToNextStep = useCallback(() => {
    if (!lessonDetails || lessonDetails.currentStepIndex === undefined) return -1;

    if (lessonDetails.currentStepIndex === -1) {
      // Starting the lesson
      const newIndex = 0;
      updateLessonProgress({
        currentStepIndex: newIndex,
        visibleSteps: [...(lessonDetails.visibleSteps || []), newIndex],
        progress: lessonDetails.steps ? Math.round(((newIndex + 1) / (lessonDetails.steps.length + 1)) * 100) : 0,
      });
      return newIndex;
    } else if (lessonDetails.currentStepIndex < lessonDetails.steps.length - 1) {
      // Going to next step
      const newIndex = lessonDetails.currentStepIndex + 1;
      updateLessonProgress({
        currentStepIndex: newIndex,
        visibleSteps: [...(lessonDetails.visibleSteps || []), newIndex],
        progress: Math.round(((newIndex + 1) / (lessonDetails.steps.length + 1)) * 100),
      });
      return newIndex;
    }
    return -1;
  }, [lessonDetails, updateLessonProgress]);

  const completeCourse = useCallback(() => {
    if (!lessonDetails) return;

    updateLessonProgress({
      progress: 100,
      isDone: true,
    });
  }, [updateLessonProgress, lessonDetails]);

  const handleContinue = useCallback(() => {
    if (!lessonDetails || lessonDetails.currentStepIndex === undefined) return;

    if (lessonDetails.currentStepIndex === -1) {
      startLesson();
    }

    if (lessonDetails.currentStepIndex === lessonDetails.steps.length - 1) {
      completeCourse();
      return;
    }

    const newIndex = goToNextStep();
    if (newIndex !== -1) {
      setTimeout(() => {
        scrollToStep(newIndex);
      }, 100);
    }
  }, [lessonDetails, goToNextStep, scrollToStep, startLesson, completeCourse]);

  const handleOptionSelect = useCallback(() => {
    handleContinue();
  }, [handleContinue]);

  const renderActionComponent = useCallback(
    (component: any) => {
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
        case 'slider':
          return <Slider items={component.items} />;
        default:
          return null;
      }
    },
    [handleOptionSelect],
  );

  if (isLoading) {
    return <PageLoader />;
  }

  if (error || !lessonDetails) {
    return (
      <div className="mx-auto w-full max-w-[640px] px-4 py-6 sm:py-12 md:pt-24 md:pb-24">
        <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          <p>{error || 'Lesson not found'}</p>
        </div>
      </div>
    );
  }

  const isCourseCompleted = lessonDetails.isDone;
  const isLastStep =
    lessonDetails.currentStepIndex !== undefined && lessonDetails.currentStepIndex === lessonDetails.steps.length - 1;

  return (
    <div
      className="mx-auto w-full max-w-[640px] px-4 py-6 sm:py-12 md:pt-24 md:pb-24"
      ref={lessonContentRef}
    >
      {isCourseCompleted ? (
        <div>
          <CompleteCourseFlow
            lessonId={lessonDetails.id}
            courseId={courseId || null}
          />
          <div className="mt-6 flex justify-center sm:mt-8">
            <Button
              onClick={() => updateLessonProgress({ isDone: false })}
              className="w-full sm:w-auto"
            >
              Просмотреть содержимое урока
            </Button>
          </div>
        </div>
      ) : (
        <>
          <LessonIntro
            lesson={lessonDetails}
            startedLesson={startedLesson}
            handleContinue={handleContinue}
          />

          {startedLesson &&
            lessonDetails.visibleSteps.map(stepIndex => {
              if (stepIndex >= lessonDetails.steps.length) return null;
              const step = lessonDetails.steps[stepIndex];

              return (
                <div
                  key={`step-${stepIndex}`}
                  ref={ref => registerStepRef(stepIndex, ref)}
                  className="mb-8 transition-opacity duration-700 sm:mb-12 md:mb-16"
                  style={{ opacity: lessonDetails.visibleSteps.includes(stepIndex) ? 1 : 0 }}
                >
                  <img
                    src={step.cover}
                    alt=""
                    className="mb-2 h-auto max-h-[250px] w-full object-cover sm:max-h-[300px] md:max-h-[384px]"
                  />

                  {step.coverAnnotation && (
                    <div className="mb-4 text-center text-xs text-gray-500 sm:mb-6 sm:text-sm md:mb-8">
                      {step.coverAnnotation}
                    </div>
                  )}

                  <div className="mb-6 sm:mb-6 md:mb-8">
                    <TextContentRenderer
                      content={step.text}
                      allowHtml={true}
                    />
                  </div>

                  {step.component && (
                    <div className="mb-6 sm:mb-6 md:mb-8">{renderActionComponent(step.component)}</div>
                  )}

                  {stepIndex === lessonDetails.currentStepIndex &&
                    (!step.component || step.component?.type === 'slider') && (
                      <div className="mt-6 sm:mt-8">
                        <Button
                          onClick={handleContinue}
                          className="w-full cursor-pointer sm:w-auto"
                        >
                          {isLastStep ? 'Complete lesson' : 'Continue'}
                        </Button>
                      </div>
                    )}
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default LessonPage;
