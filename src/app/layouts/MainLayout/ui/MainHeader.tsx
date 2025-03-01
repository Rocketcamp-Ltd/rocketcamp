import React from 'react';
import { User } from 'lucide-react';
import { Logo } from '@/app/components/layouts/Logo';
import { MainNavigation } from '@/app/components/layouts/Navigation/MainNavigation';

export const MainHeader: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-14 shadow-2xl">
      <div>
        <Logo />
      </div>

      <MainNavigation />

      <div>
        <User className="size-10" />
      </div>
    </header>
  );
};
