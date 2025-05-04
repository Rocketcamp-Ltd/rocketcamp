import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isMobile?: boolean;
}

export const NavLink: React.FC<Props> = ({ to, icon, children, isMobile = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <div className="relative">
      <div className="group flex items-center gap-2">
        {icon}
        <Link
          to={to}
          className={`relative ${isMobile ? 'py-2' : 'py-1'} `}
        >
          {children}
          {!isMobile && (
            <>
              <div
                className={`absolute bottom-0 left-0 h-0.5 w-full origin-left transform bg-black transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0'}`}
              />
              <div
                className={`absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-black transition-transform duration-300 group-hover:scale-x-100 ${isActive ? 'opacity-0' : 'opacity-100'}`}
              />
            </>
          )}
          {isMobile && isActive && (
            <div className="absolute top-1/2 -left-1.5 h-6 w-0.5 -translate-y-1/2 rounded-full bg-black" />
          )}
        </Link>
      </div>
    </div>
  );
};
