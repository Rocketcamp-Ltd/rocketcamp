import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

import { UserButton } from '@/app/components/layouts/UserButton/UserButton';
import { Progress } from '@/app/components/ui/progress';

interface Props {
  hasBack?: boolean;
  hasProfile?: boolean;
  onBack?: () => void;
  progress: number;
  className?: string;
}

export const ProgressHeader: React.FC<Props> = props => {
  const { hasBack = true, onBack, hasProfile = true, progress, className } = props;

  return (
    <header className={cn('flex items-center justify-between bg-[#D9D9D9] px-3 py-2 sm:px-8 sm:py-3', className)}>
      <div className="flex-shrink-0">
        {hasBack && typeof onBack === 'function' && (
          <button
            onClick={onBack}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-300"
          >
            <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        )}
      </div>
      <div className="mx-2 max-w-[500px] flex-1 sm:max-w-[640px]">
        <Progress
          value={progress}
          className="w-full"
        />
      </div>
      <div className="flex-shrink-0">{hasProfile && <UserButton />}</div>
    </header>
  );
};
