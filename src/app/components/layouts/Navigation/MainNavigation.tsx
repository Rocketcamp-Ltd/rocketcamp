import React from 'react';
import { Home, BookOpen, Book } from 'lucide-react';
import { RoutePath } from '@/app/router/config';
import { NavLink } from './NavLink';

interface Props {
  isMobile?: boolean;
}

export const MainNavigation: React.FC<Props> = ({ isMobile = false }) => {
  return (
    <nav className={`flex ${isMobile ? 'flex-col gap-4' : 'gap-4'}`}>
      <NavLink
        to={RoutePath.home}
        icon={<Home className="size-5" />}
        isMobile={isMobile}
      >
        Home
      </NavLink>

      <NavLink
        to={RoutePath.courses}
        icon={<BookOpen className="size-5" />}
        isMobile={isMobile}
      >
        Courses
      </NavLink>

      <NavLink
        to={RoutePath.library}
        icon={<Book className="size-5" />}
        isMobile={isMobile}
      >
        Library
      </NavLink>
    </nav>
  );
};

export default MainNavigation;
