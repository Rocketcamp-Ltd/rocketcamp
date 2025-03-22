import { useState } from 'react';
import type { LessonDetails } from '@/types/lessons';

export function useLessonState(initialLessonData: LessonDetails) {
  const [lesson, setLesson] = useState<LessonDetails>(initialLessonData);
  const [startedLesson, setStartedLesson] = useState<boolean>(false);

  const startLesson = () => {
    setStartedLesson(true);
  };

  return {
    lesson,
    setLesson,
    startedLesson,
    startLesson
  };
}