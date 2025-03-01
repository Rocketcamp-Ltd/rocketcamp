import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const NavLink: React.FC<Props> = ({ to, icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <div className="relative">
      <div className="group flex items-center gap-2">
        {icon}
        <Link
          to={to}
          className="relative py-4"
        >
          {children}
          <div
            className={`absolute bottom-0 left-0 h-0.5 w-full origin-left transform bg-black transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0'}`}
          />
          <div
            className={`absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-black transition-transform duration-300 group-hover:scale-x-100 ${isActive ? 'opacity-0' : 'opacity-100'}`}
          />
        </Link>
      </div>
    </div>
  );
};
