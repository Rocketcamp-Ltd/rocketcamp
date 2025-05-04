import React, { useState, useEffect } from 'react';
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
  const [feedbackExists, setFeedbackExists] = useState<boolean>(false);

  const supabase = useClient();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExistingFeedback = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const { data, error } = await supabase
          .from('lesson_feedback')
          .select('*')
          .eq('user_id', user.id)
          .eq('lesson_id', lessonId)
          .single();

        if (error) {
          console.error('Error fetching feedback:', error);
          return;
        }

        if (data) {
          setRating(data.rating || 0);
          setSelectedTags(data.tags || []);
          setFeedback(data.feedback || '');
          setShowFeedback(!!data.rating);
          setFeedbackExists(true);
        }
      } catch (err) {
        console.error('Error fetching feedback:', err);
      }
    };

    fetchExistingFeedback();
  }, [lessonId, supabase]);

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

      // Create or update feedback record
      const { error } = await supabase.from('lesson_feedback').upsert(
        {
          user_id: user.id,
          lesson_id: lessonId,
          rating: rating,
          tags: selectedTags,
          feedback: feedback,
          created_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id,lesson_id',
        },
      );

      if (error) throw error;

      setFeedbackExists(true);
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
    <div className="flex min-h-[50vh] flex-col items-center justify-center py-6 sm:h-[calc(100vh-80px)] sm:py-0">
      <div className="flex flex-col items-center justify-center">
        <CircleCheckBig className="mb-4 size-24 text-green-600 sm:mb-6 sm:size-32" />
        <h2 className="text-xl text-black sm:text-2xl">Lesson complete!</h2>
        {feedbackExists && <p className="mt-2 text-sm text-green-600 sm:text-base">Отзыв уже оставлен</p>}
      </div>

      <div className="mt-8 flex w-full max-w-[360px] flex-col items-center justify-center gap-4 rounded-[8px] border border-[#D9D9D9] p-4 sm:mt-16 sm:gap-6 sm:p-6">
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2, 3, 4].map(index => (
            <Star
              key={index}
              className={`size-5 cursor-pointer transition-transform duration-300 sm:size-6 ${
                index < rating ? 'fill-yellow-500 text-yellow-500' : ''
              } ${animatingStarIndex === index ? 'scale-125' : ''}`}
              onClick={() => handleStarClick(index)}
            />
          ))}
        </div>

        <div>
          <h3 className="text-center text-xl font-semibold text-black sm:text-2xl">Rate the lesson</h3>
          <p className="text-center text-sm text-[#1E1E1E] sm:text-base">Your feedback helps us get better</p>
        </div>

        {showFeedback && (
          <div className="mt-2 w-full sm:mt-4">
            <div className="mb-3 flex flex-wrap justify-center gap-1.5 sm:mb-4 sm:gap-2">
              {['Useful', 'Fun', 'Engaging', 'Easy to follow', 'Interactive'].map(item => (
                <button
                  key={item}
                  className={cn(
                    'cursor-pointer rounded-lg border-2 border-[#2C2C2C] px-2 py-1 text-xs transition-all duration-200 sm:px-3 sm:py-1.5 sm:text-base',
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
              className="min-h-20 w-full max-w-[300px] text-sm sm:min-h-24 sm:text-base"
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
            />
          </div>
        )}

        <div className="mt-3 sm:mt-4">
          <Button
            onClick={submitRating}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Submitting...
              </div>
            ) : feedbackExists ? (
              'Обновить отзыв'
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
