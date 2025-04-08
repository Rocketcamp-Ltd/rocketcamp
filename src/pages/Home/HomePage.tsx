import { useEffect, useState } from 'react';
import type { Course } from '@/types/courses';

import { RoutePath } from '@/app/router/config';
import { CourseCarousel } from '@/app/components/business/CourseCarousel';
import { PageLoader } from '@/app/components/PageLoader';
import { useCourses } from '@/hooks/useCourses';

const HomePage = () => {
  const { courses, isLoading, error } = useCourses();
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [continueLearningCourses, setContinueLearningCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (courses.length > 0) {
      // Фильтруем курсы с прогрессом для "Continue Learning"
      const inProgressCourses = courses.filter(course => course.progress > 0);
      setContinueLearningCourses(inProgressCourses);

      // Для "Recommended for you" можно использовать курсы без прогресса
      // или применить другую логику рекомендаций
      const notStartedCourses = courses.filter(course => course.progress === 0);
      setRecommendedCourses(notStartedCourses);
    }
  }, [courses]);

  return (
    <div className="container mx-auto py-12">
      {isLoading ? (
        <PageLoader />
      ) : error ? (
        <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          <p>{error}</p>
        </div>
      ) : (
        <>
          {continueLearningCourses.length > 0 && (
            <CourseCarousel
              title="Continue Learning"
              courses={continueLearningCourses}
              seeAllLink={RoutePath['courses-by-alias'].replace(':alias', 'continue-learning')}
            />
          )}

          <CourseCarousel
            title="Recommended for you"
            courses={recommendedCourses.length > 0 ? recommendedCourses : courses}
            seeAllLink={RoutePath['courses-by-alias'].replace(':alias', 'recommended')}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
