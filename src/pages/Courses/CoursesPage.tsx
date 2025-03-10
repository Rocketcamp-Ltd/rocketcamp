import React, { useState } from 'react';
import type { CourseCategory } from '@/types/courses';
import { categoriesMock } from './mock';
import { CourseFilters } from './ui/CourseFilters';

const CoursesPage: React.FC = () => {
  const [categories, setCategories] = useState<CourseCategory[]>([...categoriesMock]);
  const [filters, setFilters] = useState<CourseCategory[]>([]);

  const changeFilters = (category: CourseCategory) => {
    const existingFilter = filters.find(item => item.id === category.id);

    if (existingFilter) {
      setFilters(filters.filter(item => item.id !== category.id));
    } else {
      setFilters([...filters, category]);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-medium text-black">Browse all courses</h1>
      <div className="mt-3 mb-2 h-px w-full bg-[#CAC4D0]"></div>

      <CourseFilters
        categories={categories}
        filters={filters}
        changeFilters={changeFilters}
      />
    </div>
  );
};

export default CoursesPage;
