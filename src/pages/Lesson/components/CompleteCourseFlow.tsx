import React, { useState } from 'react';
import { CircleCheckBig, Star } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { cn } from '@/lib/utils';

interface Props {
  lessonId: number;
  courseAlias: string;
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
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
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
      <div className="flex items-center justify-center flex-col">
        <CircleCheckBig className="size-32 mb-6" />
        <h2 className="text-2xl text-black">Lesson complete!</h2>
      </div>

      <div className="mt-16 flex gap-6 max-w-[360px] items-center justify-center flex-col border border-[#D9D9D9] rounded-[8px] p-6">
        <div className="flex gap-2 items-center justify-center">
          {[0, 1, 2, 3, 4].map((index) => (
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
          <h3 className="text-black font-semibold text-2xl text-center">Rate the lesson</h3>
          <p className="text-[#1E1E1E] text-center text-base">Your feedback helps us get better</p>
        </div>

        {showFeedback && (
          <div className="w-full mt-4">
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {['Useful', 'Fun', 'Engaging', 'Easy to follow', 'Interactive'].map(item => (
                <button
                  key={item}
                  className={cn(
                    "px-3 py-1.5 text-[#1E1E1E] text-base rounded-lg border-2 border-[#2C2C2C] cursor-pointer transition-all duration-200",
                    {
                      "opacity-80 hover:opacity-100": !selectedTags.includes(item),
                      "bg-[#2C2C2C] text-white font-medium": selectedTags.includes(item)
                    }
                  )}
                  onClick={() => handleTagClick(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <Textarea placeholder="Write your feedback here" className="w-full min-h-24 max-w-[300px]" />
          </div>
        )}

        <div className="mt-4">
          <Button onClick={submitRating}>Submit</Button>
        </div>
      </div>
    </div>
  );
};