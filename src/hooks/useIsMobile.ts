import { useState, useEffect } from 'react';

export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is available (browser environment)
    if (typeof window !== 'undefined') {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < breakpoint);
      };

      // Initial check
      checkIfMobile();

      // Add event listener for resize
      window.addEventListener('resize', checkIfMobile);

      // Clean up
      return () => {
        window.removeEventListener('resize', checkIfMobile);
      };
    }
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile; 