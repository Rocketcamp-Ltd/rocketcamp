import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  to: string; icon: React.ReactNode; children: React.ReactNode
}

export const NavLink: React.FC<Props> = ({ to, icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <div className="relative">
      <div className="flex items-center gap-2 group">
        {icon}
        <Link
          to={to}
          className="relative py-4"
        >
          {children}
          <div
            className={`absolute bottom-0 left-0 w-full h-0.5 bg-black transform origin-left transition-transform duration-300
              ${isActive ? 'scale-x-100' : 'scale-x-0'}`}
          />
          <div
            className={`absolute bottom-0 left-0 w-full h-0.5 bg-black transform origin-left transition-transform duration-300 scale-x-0
              group-hover:scale-x-100
              ${isActive ? 'opacity-0' : 'opacity-100'}`}
          />
        </Link>
      </div>
    </div>
  );
};
