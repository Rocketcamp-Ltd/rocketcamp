import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, HelpCircle, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RoutePath, AppRoutes } from '@/app/router/config';
import { useAuth } from '@/app/hooks/useAuth';

interface Props {
  isMobile?: boolean;
}

export const UserButton: React.FC<Props> = ({ isMobile = false }) => {
  const { isAuthenticated, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (!isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isMobile]);

  if (!isAuthenticated) {
    if (isMobile) {
      return (
        <div className="flex flex-col space-y-3">
          <Link
            to={RoutePath[AppRoutes.LOGIN]}
            className="text-base font-medium text-gray-700 hover:text-gray-900"
          >
            Sign in
          </Link>
          <Link
            to={RoutePath[AppRoutes.REGISTER]}
            className="rounded-md bg-blue-600 px-4 py-2 text-center text-base font-medium text-white hover:bg-blue-700"
          >
            Sign up
          </Link>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-4">
        <Link
          to={RoutePath[AppRoutes.LOGIN]}
          className="text-base font-medium text-gray-700 hover:text-gray-900"
        >
          Sign in
        </Link>
        <Link
          to={RoutePath[AppRoutes.REGISTER]}
          className="rounded-md bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700"
        >
          Sign up
        </Link>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-3">
        <Link
          to={RoutePath[AppRoutes.PROFILE_SETTINGS]}
          className="flex items-center gap-2 text-base font-normal text-[#1E1E1E]"
        >
          <Settings className="size-5" /> Settings
        </Link>
        <Link
          to={RoutePath[AppRoutes.FAQ]}
          className="flex items-center gap-2 text-base font-normal text-[#1E1E1E]"
        >
          <HelpCircle className="size-5" /> Help
        </Link>
        <button
          className="flex items-center gap-2 text-base font-normal text-[#1E1E1E]"
          onClick={handleLogout}
        >
          <LogOut className="size-5" /> Log out
        </button>
      </div>
    );
  }

  return (
    <div
      className="relative"
      ref={dropdownRef}
    >
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center rounded-full p-2 hover:bg-gray-100 focus:outline-none"
      >
        <User className="size-8 text-gray-700" />
      </button>

      {isOpen && (
        <div className="ring-opacity-5 absolute right-0 z-40 mt-0.5 w-48 origin-top-right rounded-md bg-white shadow-lg focus:outline-none">
          <div className="py-1">
            <Link
              to={RoutePath[AppRoutes.PROFILE_SETTINGS]}
              className="block px-4 py-2 text-base font-normal text-[#1E1E1E] hover:bg-gray-100"
            >
              Settings
            </Link>
            <Link
              to={RoutePath[AppRoutes.FAQ]}
              className="block px-4 py-2 text-base font-normal text-[#1E1E1E] hover:bg-gray-100"
            >
              Help
            </Link>

            <div className="my-1 h-px bg-gray-200"></div>

            <button
              className="block w-full px-4 py-2 text-left text-base font-normal text-[#1E1E1E] hover:bg-gray-100"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
