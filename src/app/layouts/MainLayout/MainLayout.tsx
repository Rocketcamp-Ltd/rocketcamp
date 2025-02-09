import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <main>
      {children}
    </main>
  );
};
