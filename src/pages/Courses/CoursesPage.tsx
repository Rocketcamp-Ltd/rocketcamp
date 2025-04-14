import React from 'react';
import { useFilteredCourses } from '@/hooks/useFilteredCourses';
import { CourseCarousel } from '@/app/components/business/CourseCarousel';
import { CourseFilters } from './ui/CourseFilters';
import { RoutePath } from '@/app/router/config';
import { PageLoader } from '@/app/components/PageLoader';
import { Button } from '@/app/components/ui/button';
import type { CourseCategory } from '@/types/courses';

const CoursesPage: React.FC = () => {
  const {
    courses,
    categories,
    selectedCategories,
    setSelectedCategories,
    isLoading,
    error,
    totalCount,
    hasMore,
    loadMore,
  } = useFilteredCourses({ limit: 10 });

  const handleFilterChange = (category: CourseCategory) => {
    if (selectedCategories.find(cat => cat.id === category.id)) {
      // Remove the category if it's already selected
      setSelectedCategories(selectedCategories.filter(cat => cat.id !== category.id));
    } else {
      // Add the category if it's not selected
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
  };

  if (isLoading && Object.keys(courses).length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-medium text-black">Browse all courses</h1>
      <div className="mt-3 mb-4 h-px w-full bg-[#CAC4D0]"></div>

      <div className="mb-6 flex items-center justify-between">
        <CourseFilters
          categories={categories}
          filters={selectedCategories}
          changeFilters={handleFilterChange}
        />

        {selectedCategories.length > 0 && (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="ml-4"
          >
            Clear filters
          </Button>
        )}
      </div>

      {error && (
        <div className="mb-6 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          <p>{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="py-8">
          <PageLoader />
        </div>
      ) : (
        <>
          {Object.keys(courses).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="mb-4 text-lg text-gray-500">No courses found with the selected filters.</p>
              <Button onClick={clearFilters}>Clear filters</Button>
            </div>
          ) : (
            <div className="mt-4">
              {Object.entries(courses).map(([letter, courseList]) => (
                <CourseCarousel
                  key={letter}
                  title={'Courses'}
                  courses={courseList}
                  seeAllLink={RoutePath['courses-by-alias'].replace(':alias', letter.toLowerCase())}
                />
              ))}

              {hasMore && (
                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={loadMore}
                    className="px-8"
                  >
                    Load more courses ({totalCount - Object.values(courses).flat().length} more)
                  </Button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CoursesPage;
