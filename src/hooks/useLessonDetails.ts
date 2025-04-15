import { useEffect, useState } from 'react';
import { useClient } from '@/lib/useClient';
import type { LessonDetails } from '@/types/lessons';
import { normalizeNewlines } from '@/pages/Lesson/services/lessonContentsUtils';
// import { normalizeNewlines } from '../pages/Lesson/utils/lessonContentUtils';

export function useLessonDetails(lessonId: string | number, courseId: string | number) {
  const [lessonDetails, setLessonDetails] = useState<LessonDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = useClient();

  useEffect(() => {
    const fetchLessonDetails = async () => {
      if (!lessonId || !courseId) return;
      
      setIsLoading(true);
      try {
        // Get lesson data
        const { data: lessonData, error: lessonError } = await supabase
          .from('lessons')
          .select('*')
          .eq('id', lessonId)
          .eq('course_id', courseId)
          .single();

        if (lessonError) throw lessonError;
        
        // Get user progress if authenticated
        const { data: { user } } = await supabase.auth.getUser();
        
        let progress = 0;
        let isDone = false;
        let currentStepIndex = -1;
        let visibleSteps: number[] = [];
        let completedSteps: number[] = [];
        
        if (user) {
          const { data: progressData, error: progressError } = await supabase
            .from('user_lesson_progress')
            .select('*')
            .eq('user_id', user.id)
            .eq('lesson_id', lessonId)
            .single();
            
          if (!progressError && progressData) {
            progress = progressData.progress;
            isDone = progressData.is_done;
            currentStepIndex = progressData.current_step;
            visibleSteps = progressData.visible_steps || [];
            completedSteps = progressData.completed_steps || [];
          }
        }
        
        // Parse steps from JSON
        let steps = [];
        try {
          // If steps is a string, try to parse it as JSON
          if (typeof lessonData.steps === 'string') {
            steps = JSON.parse(lessonData.steps);
          } else {
            // Otherwise, assume it's already an array or object
            steps = lessonData.steps || [];
          }
          
          // Process text content to handle newlines properly
          if (Array.isArray(steps)) {
            steps = steps.map(step => ({
              ...step,
              text: step.text ? normalizeNewlines(step.text) : '',
            }));
          }
        } catch (e) {
          console.error('Error parsing lesson steps:', e);
          steps = [];
        }
        
        // Format lesson details
        const formattedLessonDetails: LessonDetails = {
          id: lessonData.id,
          title: lessonData.title,
          description: lessonData.description ? normalizeNewlines(lessonData.description) : '',
          cover: lessonData.cover,
          isDone: isDone,
          isBlocked: false, // This would be determined based on course progression
          progress: progress,
          steps: Array.isArray(steps) ? steps : [],
          currentStepIndex: currentStepIndex,
          visibleSteps: visibleSteps,
          completedSteps: completedSteps
        };
        
        setLessonDetails(formattedLessonDetails);
      } catch (err) {
        console.error('Error fetching lesson details:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while loading the lesson');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessonDetails();
  }, [lessonId, courseId, supabase]);
  
  const updateLessonProgress = async (updatedData: {
    progress?: number;
    isDone?: boolean;
    currentStepIndex?: number;
    visibleSteps?: number[];
    completedSteps?: number[];
  }) => {
    if (!lessonDetails) return null;
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      console.log('Updating lesson progress with:', {
        lessonId,
        userId: user.id,
        currentData: {
          progress: lessonDetails.progress,
          isDone: lessonDetails.isDone,
          currentStepIndex: lessonDetails.currentStepIndex,
          visibleSteps: lessonDetails.visibleSteps,
        },
        updatedData
      });
      const { data, error } = await supabase
        .from('user_lesson_progress')
        .upsert({
          user_id: user.id,
          lesson_id: Number(lessonId), // Преобразуем в число, если это строка
          progress: updatedData.progress !== undefined ? updatedData.progress : lessonDetails.progress,
          is_done: updatedData.isDone !== undefined ? updatedData.isDone : lessonDetails.isDone,
          current_step: updatedData.currentStepIndex !== undefined ? updatedData.currentStepIndex : lessonDetails.currentStepIndex,
          visible_steps: updatedData.visibleSteps || lessonDetails.visibleSteps,
          completed_steps: updatedData.completedSteps || (lessonDetails.completedSteps || []),
          last_accessed: new Date().toISOString()
        }, {
          onConflict: 'user_id,lesson_id'
        })
        .select()
        .single();
        
      if (error) throw error;
      
      console.log('Progress updated successfully:', data);
      
      // Обновляем локальное состояние
      setLessonDetails(prev => {
        if (!prev) return null;
        
        // Создаем новый объект с обновленными данными
        return {
          ...prev,
          progress: updatedData.progress !== undefined ? updatedData.progress : prev.progress,
          isDone: updatedData.isDone !== undefined ? updatedData.isDone : prev.isDone,
          currentStepIndex: updatedData.currentStepIndex !== undefined ? updatedData.currentStepIndex : prev.currentStepIndex,
          visibleSteps: updatedData.visibleSteps || prev.visibleSteps,
          completedSteps: updatedData.completedSteps || prev.completedSteps || []
        };
      });

      if (updatedData.isDone) {
        try {
          // Get all lessons for this course
          const { data: courseLessons, error: courseLessonsError } = await supabase
            .from('lessons')
            .select('id')
            .eq('course_id', courseId);
            
          if (courseLessonsError) throw courseLessonsError;
          
          // Get completed lessons
          const { data: completedLessons, error: completedLessonsError } = await supabase
            .from('user_lesson_progress')
            .select('lesson_id')
            .eq('user_id', user.id)
            .eq('is_done', true)
            .in('lesson_id', courseLessons.map(lesson => lesson.id));
            
          if (completedLessonsError) throw completedLessonsError;
          
          // Calculate course progress
          const courseProgress = Math.round((completedLessons.length / courseLessons.length) * 100);
          const isCompletedCourse = courseProgress === 100;
          
          // Update course progress
          const { error: updateCourseError } = await supabase
            .from('user_course_progress')
            .upsert({
              user_id: user.id,
              course_id: courseId,
              progress: courseProgress,
              is_completed: isCompletedCourse,
              last_accessed: new Date().toISOString()
            });
            
          if (updateCourseError) throw updateCourseError;
          return data;
        } catch (err) {
          console.error('Error updating course progress:', err);
          // Continue execution even if course progress update fails
        }
      }
      
      return data;
    } catch (err) {
      console.error('Error updating lesson progress:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while updating lesson progress');
      return null;
    }
  };

  return { lessonDetails, isLoading, error, updateLessonProgress };
}