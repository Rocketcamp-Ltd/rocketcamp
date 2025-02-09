import React from 'react';
import { User, ArrowLeft } from 'lucide-react';

interface Props {
  hasBack?: boolean;
  hasProfile?: boolean;
}

export const ProgressHeader: React.FC<Props> = props => {
  const { hasBack = true, hasProfile = true } = props;

  return (
    <header className='flex items-center justify-between px-8 py-4 bg-gray-400'>
      <div>
        {hasBack && (
          <button>
            <ArrowLeft />
          </button>
        )}
      </div>
      <div>
        тут будет прогресс бар
      </div>
      <div>
        {
          hasProfile && (
            <div>
              <User />
            </div>
          )
        }
      </div>
    </header>
  );
};
