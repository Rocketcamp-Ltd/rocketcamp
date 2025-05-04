import React from 'react';
import { MainHeader } from './MainHeader';

interface Props {
  children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <MainHeader />
      <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-14">{children}</main>
    </div>
  );
};
