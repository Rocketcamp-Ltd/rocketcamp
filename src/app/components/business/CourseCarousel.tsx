import React from 'react';
import { Link } from 'react-router-dom';
import { CircleArrowRight } from 'lucide-react';

import type { Course } from '@/types/courses';

import { Carousel, CarouselPrevious, CarouselContent, CarouselItem, CarouselNext } from '../ui/carousel';
import { Progress } from '../ui/progress';

interface Props {
  title?: string;
  courses: Course[];
  seeAllLink?: string;
}

export const CourseCarousel: React.FC<Props> = ({ title, seeAllLink, courses }) => {
  return (
    <section className="mb-12">
      {title && <h2 className="mb-8 text-3xl font-medium text-black">{title}</h2>}

      <Carousel>
        <CarouselPrevious className="left-[24px] z-50 size-12" />

        <CarouselContent>
          {courses.map(course => (
            <CarouselItem
              className="mr-6 max-h-96 max-w-md rounded-xl border-1 border-[#D9D9D9] p-4 last:mr-0"
              key={course.id}
            >
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

          {Boolean(course.progress) && <div className="mt-4">
                <Progress value={course.progress} />
              </div>}

            </CarouselItem>
          ))}

          {seeAllLink && (
            <CarouselItem className="flex max-w-24 items-center justify-center">
              <Link
                to={seeAllLink}
                className="flex flex-col items-center gap-2"
              >
                <CircleArrowRight className="size-8" />
                <p>See all</p>
              </Link>
            </CarouselItem>
          )}
        </CarouselContent>

        <CarouselNext className="right-[24px] z-50 size-12" />
      </Carousel>
    </section>
  );
};
