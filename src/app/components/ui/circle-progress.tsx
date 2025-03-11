import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

const CircleProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value || 0) / 100 * circumference;

  return (
    <div className={cn('relative', className)} {...props}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        className="transform -rotate-90"
      >
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#65558F80"
          strokeWidth="6"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="#65558F"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.2s ease-in-out'
          }}
        />
      </svg>
    </div>
  );
});

CircleProgress.displayName = 'CircleProgress';

export { CircleProgress };
