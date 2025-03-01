import React from 'react';
import { Logo } from '@/app/components/layouts/Logo';
import { MainNavigation } from '@/app/components/layouts/Navigation/MainNavigation';
import { UserButton } from '@/app/components/layouts/UserButton/UserButton';

export const MainHeader: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-14 shadow-2xl">
      <div>
        <Logo />
      </div>

      <MainNavigation />

      <UserButton />
    </header>
  );
};
