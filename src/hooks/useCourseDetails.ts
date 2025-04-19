import { useEffect, useState } from 'react';
import { useClient } from '@/lib/useClient';
import type { CourseDetails, CourseCategory } from '@/types/courses';
import type { Lesson } from '@/types/lessons';

export function useCourseDetails(courseId: string | number) {
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = useClient();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseId) return;
      
      setIsLoading(true);
      try {
        // Получаем информацию о курсе
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select('*')
          .eq('id', courseId)
          .single();

        if (courseError) throw courseError;
        
        // Получаем уроки курса
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons')
          .select('*')
          .eq('course_id', courseId)
          .order('order_index', { ascending: true });
          
        if (lessonsError) throw lessonsError;
        
        // Получаем категории курса
        const { data: categoriesRelation, error: categoriesRelationError } = await supabase
          .from('course_categories_relation')
          .select('category_id')
          .eq('course_id', courseId);
          
        if (categoriesRelationError) throw categoriesRelationError;
        
        let categories: CourseCategory[] = [];
        
        if (categoriesRelation.length > 0) {
          const categoryIds = categoriesRelation.map(rel => rel.category_id);
          
          const { data: categoriesData, error: categoriesError } = await supabase
            .from('course_categories')
            .select('*')
            .in('id', categoryIds);
            
          if (categoriesError) throw categoriesError;
          
          categories = categoriesData.map(cat => ({
            id: cat.id,
            name: cat.name,
            alias: cat.alias
          }));
        }
        
        // Получаем прогресс пользователя, если он авторизован
        const { data: { user } } = await supabase.auth.getUser();
        let progress = 0;
        
        if (user) {
          const { data: progressData, error: progressError } = await supabase
            .from('user_course_progress')
            .select('progress')
            .eq('user_id', user.id)
            .eq('course_id', courseId)
            .single();
            
          if (!progressError && progressData) {
            progress = progressData.progress;
          }
          
          // Получаем статус уроков
          const { data: lessonProgressData, error: lessonProgressError } = await supabase
            .from('user_lesson_progress')
            .select('*')
            .eq('user_id', user.id)
            .in('lesson_id', lessonsData.map(lesson => lesson.id));
          
          if (!lessonProgressError && lessonProgressData) {
            // Обновляем статус уроков
            lessonsData.forEach(lesson => {
              const lessonProgress = lessonProgressData.find(
                progress => progress.lesson_id === lesson.id
              );
              
              if (lessonProgress) {
                lesson.progress = lessonProgress.progress;
                lesson.isDone = lessonProgress.is_done;
              }
            });
          }
        }
        
        // Форматируем уроки для фронтенда
        const formattedLessons: Lesson[] = lessonsData.map((lesson, index) => ({
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          cover: lesson.cover,
          isDone: lesson.isDone || false,
          isBlocked: index > 0 && !lessonsData[index - 1]?.isDone, // Блокируем урок, если предыдущий не завершен
          progress: lesson.progress || 0,
          card_description: lesson.card_description
        }));
        
        // Собираем все данные в CourseDetails
        const courseDetails: CourseDetails = {
          id: courseData.id,
          title: courseData.title,
          subtitle: courseData.subtitle,
          description: courseData.description,
          cover: courseData.cover,
          progress: progress,
          category: categories,
          lessons: formattedLessons
        };
        
        setCourseDetails(courseDetails);
      } catch (err) {
        console.error('Ошибка при получении деталей курса:', err);
        setError(err instanceof Error ? err.message : 'Произошла ошибка при загрузке курса');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId, supabase]);

  return { courseDetails, isLoading, error };
}