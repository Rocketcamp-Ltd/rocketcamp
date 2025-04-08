import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/app/components/ui/button';
import { CircleProgress } from '@/app/components/ui/circle-progress';
import { PageLoader } from '@/app/components/PageLoader';

import { LessonCard } from './components/LessonCard';

import { RoutePath } from '@/app/router/config';
import { useCourseDetails } from '@/hooks/useCourseDetails';

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { courseDetails, isLoading, error } = useCourseDetails(id || '');
  const navigate = useNavigate();

  const handleStartLearning = () => {
    if (!courseDetails) return;

    const firstNotDoneLesson = courseDetails.lessons.find(lesson => !lesson.isDone);

    if (firstNotDoneLesson) {
      navigate(
        RoutePath.lesson
          .replace(':courseId', courseDetails.id.toString())
          .replace(':lessonId', firstNotDoneLesson.id.toString()),
      );
    }
  };

  const handleGetNotified = () => {
    // Функционал для уведомлений
    console.log('Запрос на уведомление отправлен');
  };

  const renderAction = () => {
    if (!courseDetails) return null;

    if (courseDetails.progress === 0) {
      return (
        <Button
          onClick={handleStartLearning}
          className="mt-2 cursor-pointer"
        >
          Start Learning
        </Button>
      );
    }

    if (courseDetails.progress === 100) {
      return (
        <Button
          onClick={handleStartLearning}
          className="mt-2 cursor-pointer"
        >
          Review Course
        </Button>
      );
    }

    return (
      <div className="flex space-x-4">
        <Button
          onClick={handleStartLearning}
          className="mt-2 cursor-pointer"
        >
          Continue Learning
        </Button>
        <button
          onClick={handleGetNotified}
          className="mt-2 text-base text-[#050038]"
        >
          Get notified when updates are available
        </button>
      </div>
    );
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (error || !courseDetails) {
    return (
      <div className="mx-auto max-w-[1200px] py-5">
        <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          <p>{error || 'Курс не найден'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] py-5">
      <h1 className="mb-6 text-3xl font-medium text-black">{courseDetails.title}</h1>

      <div className="flex items-start gap-8">
        <div className="relative max-w-[484px]">
          <img
            src={courseDetails.cover}
            alt={courseDetails.title}
            className="rounded-lg object-cover"
          />

          <CircleProgress
            value={courseDetails.progress}
            className="absolute top-2 right-2"
          />
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-semibold text-[#1E1E1E]">About the course</h2>
          <div
            className="text-base text-[#1E1E1E]"
            dangerouslySetInnerHTML={{ __html: courseDetails.description }}
          ></div>

          {renderAction()}
        </div>
      </div>

      <div className="my-7 h-px w-full bg-[#CAC4D0]"></div>

      <section className="flex flex-col gap-4">
        {courseDetails.lessons.map(lesson => {
          if (lesson.isBlocked) {
            return (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
              />
            );
          } else {
            return (
              <Link
                key={lesson.id}
                to={RoutePath.lesson
                  .replace(':courseId', courseDetails.id.toString())
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
