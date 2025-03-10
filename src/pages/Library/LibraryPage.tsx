import React, { useState } from 'react';
import type { Course } from '@/types/courses';

import { RoutePath } from '@/app/router/config';
import { CourseCarousel } from '@/app/components/business/CourseCarousel';

import { other } from './mock';

interface CourseMap {
  [key: string]: Course[];
}

const LibraryPage: React.FC = () => {
  const [courses, setCourses] = useState<CourseMap>(other);

  return <div className="container mx-auto py-12">
      {Object.entries(courses).map(([category, courseList]) => (
        <CourseCarousel
          key={category}
          title={category}
          courses={courseList}
          seeAllLink={RoutePath['courses-by-alias'].replace(':alias', category)}
        />
      ))}
  </div>;
};

export default LibraryPage;
