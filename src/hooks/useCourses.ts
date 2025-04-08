import { useEffect, useState } from 'react';
import { useClient } from '@/lib/useClient';
import type { Course } from '@/types/courses';

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = useClient();

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        // Получаем все курсы
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select('*');

        if (coursesError) throw coursesError;

        // Получаем прогресс пользователя, если он авторизован
        const { data: { user } } = await supabase.auth.getUser();
        
        let formattedCourses: Course[] = [];
        
        if (user) {
          // Если пользователь авторизован, получаем его прогресс
          const { data: progressData, error: progressError } = await supabase
            .from('user_course_progress')
            .select('*')
            .eq('user_id', user.id);
            
          if (progressError) throw progressError;
          
          // Объединяем данные о курсах с прогрессом
          formattedCourses = coursesData.map(course => {
            const userProgress = progressData?.find(p => p.course_id === course.id);
            return {
              id: course.id,
              title: course.title,
              subtitle: course.subtitle,
              cover: course.cover,
              progress: userProgress?.progress || 0
            };
          });
        } else {
          // Если пользователь не авторизован, просто возвращаем курсы
          formattedCourses = coursesData.map(course => ({
            id: course.id,
            title: course.title,
            subtitle: course.subtitle,
            cover: course.cover,
            progress: 0
          }));
        }
        
        setCourses(formattedCourses);
      } catch (err) {
        console.error('Ошибка при получении курсов:', err);
        setError(err instanceof Error ? err.message : 'Произошла ошибка при загрузке курсов');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [supabase]);

  return { courses, isLoading, error };
}