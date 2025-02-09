import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const OnboardingLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <header>

      </header>

      <main>
        {children}
      </main>
    </div>
  );
};
