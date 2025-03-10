import React, { useState } from 'react';
import type { Course } from '@/types/courses';

import { RoutePath } from '@/app/router/config';
import { CourseCarousel } from '@/app/components/business/CourseCarousel';

import { bookmarked, completed } from './mock';

const LibraryPage: React.FC = () => {
  const [bookmarkedCourses, setBookmarkedCourses] = useState<Course[]>(bookmarked);
  const [completedCourses, setCompletedCourses] = useState<Course[]>(completed);

  return (
    <div className="container mx-auto py-12">
      <CourseCarousel
        title="Bookmarked courses"
        courses={bookmarkedCourses}
        seeAllLink={RoutePath['courses-by-alias'].replace(':alias', 'bookmarked-courses')}
      />

      <CourseCarousel
        title="Completed courses"
        courses={completedCourses}
        seeAllLink={RoutePath['courses-by-alias'].replace(':alias', 'completed-courses')}
      />
    </div>
  );
};

export default LibraryPage;
