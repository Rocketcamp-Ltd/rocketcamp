import React, { useState } from 'react';
import type { Course } from '@/types/courses';
import { CourseCard } from '@/app/components/business/CourseCard';
import { coursesMock } from './mock';

const CoursesByAliasPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(coursesMock);

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-3 gap-y-3 gap-x-5">
        {courses.map(item => {
          return (
            <div key={item.id} className='max-h-96 rounded-xl border-1 border-[#D9D9D9] p-4'>
              <CourseCard course={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoursesByAliasPage;
