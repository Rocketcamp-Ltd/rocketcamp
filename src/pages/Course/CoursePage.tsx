import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/app/components/ui/button';
import { CircleProgress } from '@/app/components/ui/circle-progress';
import { PageLoader } from '@/app/components/PageLoader';

import { LessonCard } from './components/LessonCard';

import { RoutePath } from '@/app/router/config';
import { useCourseDetails } from '@/hooks/useCourseDetails';
import { useIsMobile } from '@/hooks/useIsMobile';

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { courseDetails, isLoading, error } = useCourseDetails(id || '');
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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
          className="mt-2 w-full cursor-pointer sm:w-auto"
        >
          Start Learning
        </Button>
      );
    }

    if (courseDetails.progress === 100) {
      return (
        <Button
          onClick={handleStartLearning}
          className="mt-2 w-full cursor-pointer sm:w-auto"
        >
          Review Course
        </Button>
      );
    }

    return (
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
        <Button
          onClick={handleStartLearning}
          className="mt-2 w-full cursor-pointer sm:w-auto"
        >
          Continue Learning
        </Button>
        <button
          onClick={handleGetNotified}
          className="mt-2 text-sm text-[#050038] sm:text-base"
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
      <div className="mx-auto max-w-[1200px] px-4 py-4 sm:py-5">
        <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          <p>{error || 'Курс не найден'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6 sm:py-8 md:py-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
        <div className="relative w-full max-w-full md:max-w-[484px]">
          <img
            src={courseDetails.cover}
            alt={courseDetails.title}
            className="w-full rounded-lg object-cover"
          />

          <CircleProgress
            value={courseDetails.progress}
            className="absolute top-2 right-2"
          />
        </div>

        <div className="w-full md:max-w-[500px]">
          <h2 className="mb-3 text-xl font-semibold text-[#1E1E1E] sm:mb-4 sm:text-2xl md:mb-6">
            {courseDetails.title}
          </h2>
          <div
            className="w-full text-sm text-[#1E1E1E] sm:text-base md:w-[650px]"
            dangerouslySetInnerHTML={{ __html: courseDetails.description }}
          ></div>

          {renderAction()}
        </div>
      </div>

      <div className="my-5 h-px w-full bg-[#CAC4D0] sm:my-6 md:my-7"></div>

      <section className="flex flex-col gap-3 sm:gap-4">
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
