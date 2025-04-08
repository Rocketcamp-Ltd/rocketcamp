import React, { useState } from 'react';
import { CircleCheckBig, Star } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useClient } from '@/lib/useClient';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/app/router/config';
import { toast } from 'sonner';

interface Props {
  lessonId: number;
  courseId: string | null;
}

export const CompleteCourseFlow: React.FC<Props> = ({ lessonId, courseId }) => {
  const [rating, setRating] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [animatingStarIndex, setAnimatingStarIndex] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const supabase = useClient();
  const navigate = useNavigate();

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

  const submitRating = async () => {
    if (rating === 0) {
      toast.error('Please select a rating before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error('You must be logged in to submit feedback');
        return;
      }

      // Create feedback record in a new table (you would need to create this table)
      const { error } = await supabase.from('lesson_feedback').insert({
        user_id: user.id,
        lesson_id: lessonId,
        rating: rating,
        tags: selectedTags,
        feedback: feedback,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast.success('Thank you for your feedback!');

      // Navigate back to course page
      if (courseId) {
        navigate(RoutePath.course.replace(':id', courseId));
      } else {
        navigate(RoutePath.home);
      }
    } catch (err) {
      console.error('Error submitting feedback:', err);
      toast.error('Error submitting feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <CircleCheckBig className="mb-6 size-32 text-green-600" />
        <h2 className="text-2xl text-black">Lesson complete!</h2>
      </div>

      <div className="mt-16 flex max-w-[360px] flex-col items-center justify-center gap-6 rounded-[8px] border border-[#D9D9D9] p-6">
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2, 3, 4].map(index => (
            <Star
              key={index}
              className={`size-6 cursor-pointer transition-transform duration-300 ${
                index < rating ? 'fill-yellow-500 text-yellow-500' : ''
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
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
            />
          </div>
        )}

        <div className="mt-4">
          <Button
            onClick={submitRating}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Submitting...
              </div>
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
