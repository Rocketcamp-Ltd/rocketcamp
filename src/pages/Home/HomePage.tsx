import { useState } from 'react';
import type { Course } from '@/types/courses';

import { continueCourses as cont, recommended as rec, other } from './mock';
import { RoutePath } from '@/app/router/config';
import { CourseCarousel } from '@/app/components/business/CourseCarousel';

interface CourseMap {
  [key: string]: Course[];
}

const HomePage = () => {
  const [continueCourses, setContinueCourses] = useState<Course[]>(cont);
  const [recommended, setRecommended] = useState<Course[]>(rec);
  const [courses, setCourses] = useState<CourseMap>(other);

  return (
    <div className="container mx-auto py-12">
      <CourseCarousel
        title="Continue learning"
        courses={continueCourses}
        seeAllLink={RoutePath['courses-by-alias'].replace(':alias', 'continue-learning')}
      />

      <CourseCarousel
        title="Recommended for you"
        courses={recommended}
        seeAllLink={RoutePath['courses-by-alias'].replace(':alias', 'recommended')}
      />

      {Object.entries(courses).map(([category, courseList]) => (
        <CourseCarousel
          key={category}
          title={category}
          courses={courseList}
          seeAllLink={RoutePath['courses-by-alias'].replace(':alias', category)}
        />
      ))}
    </div>
  );
};

export default HomePage;
