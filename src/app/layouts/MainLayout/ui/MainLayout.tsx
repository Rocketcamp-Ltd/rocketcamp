import React from 'react';
import { MainHeader } from './MainHeader';

interface Props {
  children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  return <>
    <MainHeader />
    <main>{children}</main>
  </>;
};
