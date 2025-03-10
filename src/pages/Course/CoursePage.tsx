import React, { useState } from 'react';
import { Lock, CircleCheck } from 'lucide-react';

import { Button } from '@/app/components/ui/button';
import { Progress } from '@/app/components/ui/progress';

import { mock } from './mock';

const CoursePage: React.FC = () => {
  const [course, setCourse] = useState(mock);

  return (
    <div className="mx-auto max-w-[1200px] py-5">
      <h1 className="mb-6 text-3xl font-medium text-black">{course.title}</h1>

      <div className="flex items-start gap-8">
        <div className="max-w-[484px]">
          <img
            src={course.cover}
            alt=""
          />
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-semibold text-[#1E1E1E]">About the course</h2>
          <div
            className="text-base text-[#1E1E1E]"
            dangerouslySetInnerHTML={{ __html: course.description }}
          ></div>

          <Button className="mt-2">Start Learning</Button>
        </div>
      </div>

      <div className="my-7 h-px w-full bg-[#CAC4D0]"></div>

      <section className="flex flex-col gap-4">
        {course.lessons.map(lesson => {
          return (
            <div
              className="relative w-full rounded-[8px] border border-[#D9D9D9] p-5 shadow-md"
              key={lesson.id}
            >
              <div className='flex items-start'>
                <div className="max-w-[308px] mr-8">
                  <img
                    className="object-cover"
                    src={lesson.cover}
                    alt=""
                  />
                </div>
                <div>
                  <h3 className="mb-3 text-2xl font-medium text-[#1E1E1E]">{lesson.title}</h3>
                  <p className="text-sm text-[#757575]">{lesson.description}</p>
                </div>

              </div>

              {lesson.isBlocked && (
                <div className="absolute top-5 right-5">
                  <Lock />
                </div>
              )}

              {(lesson.isDone || !lesson.isBlocked) && (
                <div className="absolute top-5 right-5">
                  <CircleCheck />
                </div>
              )}

              {(!lesson.isDone && !lesson.isBlocked) && <div className='mt-4'>
                <Progress className='bg-[#E8DEF8]' value={lesson.progress} />
              </div>}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default CoursePage;
