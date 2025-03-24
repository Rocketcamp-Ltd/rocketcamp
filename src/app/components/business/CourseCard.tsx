import React from 'react';
import type { Course } from '@/types/courses';
import { Progress } from '@radix-ui/react-progress';
import { Link } from 'react-router-dom';
import { RoutePath } from '@/app/router/config';

interface Props {
  course: Course;
}

export const CourseCard: React.FC<Props> = ({ course }) => {
  return (
    // @ts-ignore
    <Link to={RoutePath.course.replace(':id', course.id)}>
      <div>
        <img
          src={course.cover}
          alt={course.title}
          className="object-cover"
        />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <p className="text-xl font-medium text-[#1E1E1E]">{course.title}</p>
        <p className="text-base text-[#757575]">{course.subtitle}</p>
      </div>

      {Boolean(course.progress) && (
        <div className="mt-4">
          <Progress value={course.progress} />
        </div>
      )}
    </Link>
  );
};
