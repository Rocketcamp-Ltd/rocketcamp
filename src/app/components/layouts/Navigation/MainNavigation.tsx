import React from 'react';
import { Home, BookOpen, Book } from 'lucide-react';
import { RoutePath } from '@/app/router/config';
import { NavLink } from './NavLink';

export const MainNavigation: React.FC = () => {
  return (
    <nav className="flex gap-8">
      <NavLink
        to={RoutePath.home}
        icon={<Home className="size-5" />}
      >
        Home
      </NavLink>

      <NavLink
        to={RoutePath.courses}
        icon={<BookOpen className="size-5" />}
      >
        Courses
      </NavLink>

      <NavLink
        to={RoutePath.library}
        icon={<Book className="size-5" />}
      >
        Library
      </NavLink>
    </nav>
  );
};

export default MainNavigation;
