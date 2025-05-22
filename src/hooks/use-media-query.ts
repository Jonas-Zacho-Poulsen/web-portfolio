"use client"

import { useState, useEffect } from 'react'

/**
 * Common breakpoints for responsive design
 */
export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
} as const

/**
 * Custom hook to detect if a media query matches
 * 
 * @param query The media query to check
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    // Default to false on the server or during initial client-side render
    if (typeof window === 'undefined') return
    
    // Create media query list
    const mediaQuery = window.matchMedia(query)
    
    // Set initial value
    setMatches(mediaQuery.matches)
    
    // Create event listener for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }
    
    // Add event listener
    mediaQuery.addEventListener('change', handleChange)
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [query])
  
  return matches
}
