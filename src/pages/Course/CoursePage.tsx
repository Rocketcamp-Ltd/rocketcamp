import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/app/components/ui/button';
import { CircleProgress } from '@/app/components/ui/circle-progress';

import { LessonCard } from './components/LessonCard';

import { RoutePath } from '@/app/router/config';

import { mock } from './mock';

const CoursePage: React.FC = () => {
  // @ts-ignore
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
          if (lesson.isBlocked) {
            return <LessonCard lesson={lesson} />;
          } else {
            return (
              <Link
                to={RoutePath.lesson
                  .replace(':courseId', course.id.toString())
                  .replace(':lessonId', lesson.id.toString())}
              >
                <LessonCard lesson={lesson} />
              </Link>
            );
          }
        })}
      </section>
    </div>
  );
};

export default CoursePage;
