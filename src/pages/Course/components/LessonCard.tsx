import { Lock, CircleCheck } from 'lucide-react';
import type { Lesson } from '@/types/lessons';
import { Progress } from '@/app/components/ui/progress';

export const LessonCard: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  return (
    <div
      className="relative w-full rounded-[8px] border border-[#D9D9D9] p-5 shadow-md"
      key={lesson.id}
    >
      <div className="flex items-start">
        <div className="mr-8 max-w-[308px]">
          <img
            className="rounded-lg object-cover"
            src={lesson.cover}
            alt=""
          />
        </div>
        <div>
          <h3 className="mb-3 text-2xl font-medium text-[#1E1E1E]">{lesson.title}</h3>
          <p className="text-sm text-[#757575]">{lesson.card_description}</p>
        </div>
      </div>

      {lesson.isBlocked && (
        <div className="absolute top-5 right-5">
          <Lock />
        </div>
      )}

      {lesson.isDone && (
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
  );
};
