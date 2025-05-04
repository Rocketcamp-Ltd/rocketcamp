import React from 'react';
import { cn } from '@/lib/utils';
import type { LessonDetails } from '@/types/lessons';
import { Button } from '@/app/components/ui/button';
import { TextContentRenderer } from './TextContentRenderer';

interface LessonIntroProps {
  lesson: LessonDetails;
  startedLesson: boolean;
  handleContinue: () => void;
}

export const LessonIntro: React.FC<LessonIntroProps> = ({ lesson, startedLesson, handleContinue }) => {
  return (
    <div
      className={cn(`transition-opacity duration-500`, {
        'mb-8 sm:mb-12 md:mb-16': startedLesson,
      })}
    >
      <img
        src={lesson.cover}
        alt={lesson.title}
        className="mb-4 h-auto max-h-[250px] w-full rounded-lg object-cover sm:mb-6 sm:max-h-[300px] md:mb-9 md:max-h-[384px]"
      />

      <h1 className="mb-3 text-2xl font-medium text-black sm:mb-4 sm:text-3xl md:mb-6 md:text-4xl">{lesson.title}</h1>

      <div className="mb-6 sm:mb-6 md:mb-8">
        <TextContentRenderer
          content={lesson.description}
          allowHtml={true}
        />
      </div>

      {!startedLesson && (
        <Button
          onClick={handleContinue}
          className="w-full sm:w-auto"
        >
          {lesson.progress > 0 ? 'Continue Learning' : 'Start Learning'}
        </Button>
      )}
    </div>
  );
};
