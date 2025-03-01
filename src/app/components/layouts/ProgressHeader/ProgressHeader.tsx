import React from 'react';
import { User, ArrowLeft } from 'lucide-react';

import { Progress } from '@/app/components/ui/progress';

interface Props {
  hasBack?: boolean;
  hasProfile?: boolean;
  progress: number;
}

export const ProgressHeader: React.FC<Props> = props => {
  const { hasBack = true, hasProfile = true, progress } = props;

  return (
    <header className="flex items-center justify-between bg-gray-400 px-8 py-4">
      <div>
        {hasBack && (
          <button>
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
          <div>
            <User />
          </div>
        )}
      </div>
    </header>
  );
};
