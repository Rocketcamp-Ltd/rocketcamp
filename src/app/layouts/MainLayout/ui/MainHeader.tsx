import React from 'react';
import { User } from 'lucide-react';
import { Logo } from '@/app/components/layouts/Logo';
import { MainNavigation } from './MainNavigation';


export const MainHeader: React.FC = () => {
  return (
    <header className='px-14 flex items-center justify-between shadow-2xl'>
      <div>
        <Logo />
      </div>

      <MainNavigation />

      <div>
        <User className='size-10' />
      </div>
    </header>
  );
};
