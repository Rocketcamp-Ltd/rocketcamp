import { useState, useEffect } from 'react';
import type { LessonDetails } from '@/types/lessons';

interface LessonStateStorage {
  startedLesson: boolean;
  lessonId: string;
}

export function useLessonState(initialLessonData: LessonDetails) {
  const [lesson, setLesson] = useState<LessonDetails>(initialLessonData);
  const [startedLesson, setStartedLesson] = useState<boolean>(false);

  useEffect(() => {
    const storedState = sessionStorage.getItem(`lesson_state_${initialLessonData.id}`);

    if (storedState) {
      try {
        const parsedState = JSON.parse(storedState) as LessonStateStorage;

        if (parsedState.lessonId === initialLessonData.id.toString()) {
          setStartedLesson(parsedState.startedLesson);
        }
      } catch (error) {
        console.error('Failed to parse lesson state from sessionStorage:', error);
      }
    }
  }, [initialLessonData.id]);

  const startLesson = () => {
    setStartedLesson(true);

    const stateToStore: LessonStateStorage = {
      startedLesson: true,
      lessonId: lesson.id.toString()
    };

    sessionStorage.setItem(`lesson_state_${lesson.id.toString()}`, JSON.stringify(stateToStore));
  };

  const resetLessonState = () => {
    sessionStorage.removeItem(`lesson_state_${initialLessonData.id.toString()}`);
    setStartedLesson(false);
  };

  return {
    lesson,
    setLesson,
    startedLesson,
    startLesson,
    resetLessonState,
  };
}