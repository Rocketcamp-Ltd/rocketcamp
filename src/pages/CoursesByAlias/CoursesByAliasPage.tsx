import React, { useState } from 'react';
import type { Course, CourseCategory } from '@/types/courses';
import { CourseCard } from '@/app/components/business/CourseCard';
import { coursesMock } from './mock';

const CoursesByAliasPage: React.FC = () => {
  // @ts-ignore
  const [courses, setCourses] = useState<Course[]>(coursesMock);
  // @ts-ignore
  const [category, setCategory] = useState<CourseCategory>({
    id: 1,
    name: 'Name',
    alias: 'title1',
  });

  return (
    <div className="container mx-auto py-12">
      <h1 className="mb-4 text-3xl font-medium text-black">{category.name}</h1>

      <div className="grid grid-cols-3 gap-x-5 gap-y-3">
        {courses.map(item => {
          return (
            <div
              key={item.id}
              className="max-h-96 rounded-xl border-1 border-[#D9D9D9] p-4"
            >
              <CourseCard course={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoursesByAliasPage;
