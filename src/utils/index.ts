/**
 * Utility functions for the portfolio website
 * This file contains reusable helper functions used throughout the application
 */

/**
 * Formats a date to a readable string
 * @param date - The date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/**
 * Generates a unique ID for elements that need one
 * @returns A unique string ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Debounces a function to limit how often it can be called
 * @param func - The function to debounce
 * @param wait - The time to wait in milliseconds
 * @returns A debounced version of the function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttles a function to limit how often it can be called
 * @param func - The function to throttle
 * @param limit - The time limit in milliseconds
 * @returns A throttled version of the function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return function(...args: Parameters<T>): void {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Validates an email address format
 * @param email - The email to validate
 * @returns Whether the email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Truncates text to a specified length and adds ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Fetches data with error handling and timeout
 * @param url - The URL to fetch from
 * @param options - Fetch options
 * @param timeout - Timeout in milliseconds
 * @returns Promise with the fetched data
 */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = 8000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}
