import { Lock, CircleCheck } from 'lucide-react';
import type { Lesson } from '@/types/lessons';
import { Progress } from '@/app/components/ui/progress';

export const LessonCard: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  return (
    <div
      className="relative w-full rounded-[8px] border border-[#D9D9D9] p-3 shadow-md sm:p-4 md:p-5"
      key={lesson.id}
    >
      <div className="flex flex-col items-start gap-3 sm:flex-row">
        <div className="w-full sm:mr-4 sm:max-w-[200px] md:mr-8 md:max-w-[308px]">
          <img
            className="w-full rounded-lg object-cover"
            src={lesson.cover}
            alt=""
          />
        </div>
        <div>
          <h3 className="mb-2 text-lg font-medium text-[#1E1E1E] sm:mb-3 sm:text-xl md:text-2xl">{lesson.title}</h3>
          <p className="text-xs text-[#757575] sm:text-sm">{lesson.card_description}</p>
        </div>
      </div>

      {lesson.isBlocked && (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5">
          <Lock className="size-5 sm:size-6" />
        </div>
      )}

      {lesson.isDone && (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5">
          <CircleCheck className="size-5 sm:size-6" />
        </div>
      )}

      {!lesson.isDone && !lesson.isBlocked && (
        <div className="mt-3 sm:mt-4">
          <Progress
            className="bg-[#E8DEF8]"
            value={lesson.progress}
          />
        </div>
      )}
    </div>
  );
};
