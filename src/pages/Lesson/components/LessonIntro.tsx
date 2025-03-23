import React from 'react';
import { cn } from '@/lib/utils';
import type { LessonDetails } from '@/types/lessons';
import { Button } from '@/app/components/ui/button';

interface LessonIntroProps {
  lesson: LessonDetails;
  startedLesson: boolean;
  handleContinue: () => void;
}

export const LessonIntro: React.FC<LessonIntroProps> = ({ lesson, startedLesson, handleContinue }) => {
  return (
    <div
      className={cn(`transition-opacity duration-500`, {
        'mb-16': startedLesson,
      })}
    >
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
  );
};
