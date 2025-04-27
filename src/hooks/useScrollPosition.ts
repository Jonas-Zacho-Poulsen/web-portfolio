/**
 * Custom hook for tracking scroll position
 */
import { useState, useEffect } from 'react';
import { throttle } from '@/utils';

interface ScrollPosition {
  scrollY: number;
  scrollX: number;
  isScrolled: boolean;
  scrollDirection: 'up' | 'down' | 'none';
}

/**
 * Hook that tracks window scroll position with performance optimizations
 * @param threshold - Pixel threshold to determine if page is scrolled
 * @param throttleTime - Time in ms to throttle scroll events
 * @returns Current scroll position state
 */
export function useScrollPosition(
  threshold = 50,
  throttleTime = 100
): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollX: 0,
    isScrolled: false,
    scrollDirection: 'none',
  });

  useEffect(() => {
    let previousScrollY = window.scrollY;

    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;
      const isScrolled = currentScrollY > threshold;
      
      // Determine scroll direction
      const scrollDirection = 
        currentScrollY > previousScrollY 
          ? 'down' 
          : currentScrollY < previousScrollY 
            ? 'up' 
            : 'none';
      
      previousScrollY = currentScrollY;
      
      setScrollPosition({
        scrollY: currentScrollY,
        scrollX: currentScrollX,
        isScrolled,
        scrollDirection,
      });
    }, throttleTime);

    window.addEventListener('scroll', handleScroll);
    
    // Call once to initialize
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, throttleTime]);

  return scrollPosition;
}

export default useScrollPosition;
