import React from 'react';
import { CourseHeader } from './CourseHeader';

interface Props {
  children: React.ReactNode;
}

export const CourseLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <CourseHeader />
      <main>{children}</main>
    </>
  );
};
