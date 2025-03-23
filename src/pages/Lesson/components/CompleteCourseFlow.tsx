import React, { useState } from 'react';
import { CircleCheckBig, Star } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { cn } from '@/lib/utils';

interface Props {
  lessonId: number;
  courseAlias: string | null;
}

export const CompleteCourseFlow: React.FC<Props> = ({ lessonId, courseAlias }) => {
  const [rating, setRating] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [animatingStarIndex, setAnimatingStarIndex] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleStarClick = (index: number) => {
    setAnimatingStarIndex(index);
    setTimeout(() => {
      setAnimatingStarIndex(null);
    }, 300);
    setRating(index + 1);
    setShowFeedback(true);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  const submitRating = () => {
    console.log('Rating submitted:', {
      rating,
      selectedTags,
      // здесь можно добавить чтение значения из textarea
    });
  };

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <CircleCheckBig className="mb-6 size-32" />
        <h2 className="text-2xl text-black">Lesson complete!</h2>
      </div>

      <div className="mt-16 flex max-w-[360px] flex-col items-center justify-center gap-6 rounded-[8px] border border-[#D9D9D9] p-6">
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2, 3, 4].map(index => (
            <Star
              key={index}
              className={`size-6 cursor-pointer transition-transform duration-300 ${
                index < rating ? 'fill-black' : ''
              } ${animatingStarIndex === index ? 'scale-125' : ''}`}
              onClick={() => handleStarClick(index)}
            />
          ))}
        </div>

        <div>
          <h3 className="text-center text-2xl font-semibold text-black">Rate the lesson</h3>
          <p className="text-center text-base text-[#1E1E1E]">Your feedback helps us get better</p>
        </div>

        {showFeedback && (
          <div className="mt-4 w-full">
            <div className="mb-4 flex flex-wrap justify-center gap-2">
              {['Useful', 'Fun', 'Engaging', 'Easy to follow', 'Interactive'].map(item => (
                <button
                  key={item}
                  className={cn(
                    'cursor-pointer rounded-lg border-2 border-[#2C2C2C] px-3 py-1.5 text-base text-[#1E1E1E] transition-all duration-200',
                    {
                      'opacity-80 hover:opacity-100': !selectedTags.includes(item),
                      'bg-[#2C2C2C] font-medium text-white': selectedTags.includes(item),
                    },
                  )}
                  onClick={() => handleTagClick(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <Textarea
              placeholder="Write your feedback here"
              className="min-h-24 w-full max-w-[300px]"
            />
          </div>
        )}

        <div className="mt-4">
          <Button onClick={submitRating}>Submit</Button>
        </div>
      </div>
    </div>
  );
};
