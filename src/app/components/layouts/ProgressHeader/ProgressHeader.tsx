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
    <header className={cn('flex items-center justify-between bg-[#D9D9D9] px-8 py-3', className)}>
      <div>
        {hasBack && typeof onBack === 'function' && (
          <button onClick={onBack}>
            <ArrowLeft />
          </button>
        )}
      </div>
      <div className="w-[640px]">
        <Progress
          value={progress}
          className="w-full"
        />
      </div>
      <div>
        {hasProfile && (
          <UserButton />
        )}
      </div>
    </header>
  );
};
