import React, { useState, useRef } from 'react';
import type { LessonDetails, LessonComponent } from '@/types/lessons';

import { useProgressStore } from '@/app/layouts/LessonLayout';

import { Button } from '@/app/components/ui/button';

import { cn } from '@/lib/utils';

import { mock } from './mock';

interface SelectedButtonsProps {
  items: {
    id: number;
    label: string;
  }[];
  onSelect: () => void;
}

const SelectedButtons: React.FC<SelectedButtonsProps> = ({ items, onSelect }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setSelectedId(id);
    setTimeout(() => {
      onSelect();
    }, 300);
  };

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={cn(`cursor-pointer rounded-lg border-2 p-3 text-base text-[#1E1E1E] transition-all duration-300`, {
            'border-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-white': selectedId === null,
            'border-black': selectedId === item.id,
            'opacity-50': selectedId !== item.id && selectedId !== null,
          })}
          disabled={!!selectedId}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

interface RadioButtonsProps {
  items: {
    id: number;
    label: string;
  }[];
  onSelect: () => void;
}

const RadioButtons: React.FC<RadioButtonsProps> = ({ items, onSelect }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleChange = (id: number) => {
    setSelectedId(id);
    setTimeout(() => {
      onSelect();
    }, 300);
  };

  return (
    <div className="mt-4 rounded-lg bg-gray-100 p-4">
      <div className="flex flex-col space-y-3">
        {items.map(item => (
          <label
            key={item.id}
            className={cn(
              "flex cursor-pointer items-center rounded-md p-2 transition-all duration-300",
              {
                'hover:bg-gray-200': selectedId !== item.id,
              }
            )}
          >
            <div className="relative mr-3 flex h-5 w-5 items-center justify-center">
              <input
                type="radio"
                className="peer absolute opacity-0"
                name="radio-options"
                value={item.id}
                checked={selectedId === item.id}
                onChange={() => handleChange(item.id)}
                disabled={selectedId !== null}
              />
              <div className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 transition-all peer-checked:border-2 peer-checked:border-black"></div>
              <div className="absolute h-2.5 w-2.5 scale-0 rounded-full bg-black transition-transform peer-checked:scale-100"></div>
            </div>
            <span className={cn("text-base", { "font-medium": selectedId === item.id  })}>
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

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
      <div className={cn(`transition-opacity duration-500`, {
        'mb-16': startedLesson,
      })}>
        <img
          src={lesson.cover}
          alt=""
          className="mb-9 h-[384px] w-full object-cover"
        />

        <h1 className="mb-6 text-4xl font-medium text-black">{lesson.title}</h1>

        <div
          className="mb-8"
          dangerouslySetInnerHTML={{ __html: lesson.description }}
        ></div>

        {!startedLesson && <Button onClick={handleContinue}>Continue</Button>}
      </div>

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