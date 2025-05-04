import React, { useState } from 'react';
import { Logo } from '@/app/components/layouts/Logo';
import { MainNavigation } from '@/app/components/layouts/Navigation/MainNavigation';
import { UserButton } from '@/app/components/layouts/UserButton/UserButton';
import { Menu, X } from 'lucide-react';

export const MainHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="shadow-md">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 md:px-8 lg:px-14">
        <div>
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <MainNavigation />
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <UserButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="block md:hidden"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="block border-t border-gray-200 py-3 md:hidden">
          <div className="px-4 pb-3">
            <MainNavigation isMobile={true} />
          </div>
          <div className="border-t border-gray-200 px-4 pt-3">
            <UserButton isMobile={true} />
          </div>
        </div>
      )}
    </header>
  );
};
