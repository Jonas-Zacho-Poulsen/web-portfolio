/**
 * Custom hook for responsive design with media queries
 */
import { useState, useEffect } from 'react';

/**
 * Hook that returns true if the current viewport matches the provided media query
 * @param query - CSS media query string (e.g., '(min-width: 768px)')
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with null to avoid hydration mismatch
  const [matches, setMatches] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Create media query list
    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Define callback for media query changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add event listener
    mediaQuery.addEventListener('change', handleChange);
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  // Return false during SSR to avoid hydration mismatch
  return mounted ? matches : false;
}

// Predefined breakpoints matching Tailwind CSS defaults
export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',
};

export default useMediaQuery;
