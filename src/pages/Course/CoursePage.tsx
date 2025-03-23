import React, { useState } from 'react';
import { Lock, CircleCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/app/components/ui/button';
import { Progress } from '@/app/components/ui/progress';
import { CircleProgress } from '@/app/components/ui/circle-progress';

import { RoutePath } from '@/app/router/config';

import { mock } from './mock';

const CoursePage: React.FC = () => {
  const [course, setCourse] = useState(mock);

  const navigate = useNavigate();

  const handleStartLearning = () => {
    const firstNotDoneLesson = course.lessons.find(lesson => !lesson.isDone);

    if (firstNotDoneLesson) {
      navigate(
        RoutePath.lesson
          .replace(':courseId', course.id.toString())
          .replace(':lessonId', firstNotDoneLesson.id.toString()),
      );
    }
  };

  const handleGetNotified = () => {};

  const renderAction = () => {
    if (course.progress === 0) {
      return (
        <Button
          onClick={handleStartLearning}
          className="mt-2 cursor-pointer"
        >
          Start Learning
        </Button>
      );
    }

    if (course.progress === 100) {
      return (
        <Button
          onClick={handleStartLearning}
          className="mt-2 cursor-pointer"
        >
          Start Learning
        </Button>
      );
    }

    return (
      <button
        onClick={handleGetNotified}
        className="text-base text-[#050038]"
      >
        Get notified when course is available
      </button>
    );
  };

  return (
    <div className="mx-auto max-w-[1200px] py-5">
      <h1 className="mb-6 text-3xl font-medium text-black">{course.title}</h1>

      <div className="flex items-start gap-8">
        <div className="relative max-w-[484px]">
          <img
            src={course.cover}
            alt=""
          />

          <CircleProgress
            value={course.progress}
            className="absolute top-2 right-2"
          />
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-semibold text-[#1E1E1E]">About the course</h2>
          <div
            className="text-base text-[#1E1E1E]"
            dangerouslySetInnerHTML={{ __html: course.description }}
          ></div>

          {renderAction()}
        </div>
      </div>

      <div className="my-7 h-px w-full bg-[#CAC4D0]"></div>

      <section className="flex flex-col gap-4">
        {course.lessons.map(lesson => {
          return (
            <Link
              to={RoutePath.lesson
                .replace(':courseId', course.id.toString())
                .replace(':lessonId', lesson.id.toString())}
            >
              <div
                className="relative w-full rounded-[8px] border border-[#D9D9D9] p-5 shadow-md"
                key={lesson.id}
              >
                <div className="flex items-start">
                  <div className="mr-8 max-w-[308px]">
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

                {!lesson.isDone && !lesson.isBlocked && (
                  <div className="mt-4">
                    <Progress
                      className="bg-[#E8DEF8]"
                      value={lesson.progress}
                    />
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default CoursePage;
