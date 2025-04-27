/**
 * Contact form service
 * Handles contact form submission
 */
import { ContactFormData } from '@/types';
import { isValidEmail } from '@/utils';

/**
 * Validates contact form data
 * @param data - Contact form data to validate
 * @returns Validation result with error message if invalid
 */
export function validateContactForm(data: ContactFormData): { 
  isValid: boolean; 
  error?: string;
} {
  if (!data.name.trim()) {
    return { isValid: false, error: 'Name is required' };
  }
  
  if (!data.email.trim()) {
    return { isValid: false, error: 'Email is required' };
  }
  
  if (!isValidEmail(data.email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  if (!data.message.trim()) {
    return { isValid: false, error: 'Message is required' };
  }
  
  if (data.message.length < 10) {
    return { isValid: false, error: 'Message must be at least 10 characters long' };
  }
  
  return { isValid: true };
}

/**
 * Submits contact form data to the API
 * @param data - Contact form data to submit
 * @returns Promise with submission result
 */
export async function submitContactForm(data: ContactFormData): Promise<{ 
  success: boolean; 
  message: string;
}> {
  try {
    // Validate form data
    const validation = validateContactForm(data);
    if (!validation.isValid) {
      return { success: false, message: validation.error || 'Invalid form data' };
    }
    
    // Submit form data to API
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      return { 
        success: false, 
        message: result.error || 'Failed to send message. Please try again later.' 
      };
    }
    
    return { 
      success: true, 
      message: 'Message sent successfully! I will get back to you soon.' 
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { 
      success: false, 
      message: 'An unexpected error occurred. Please try again later.' 
    };
  }
}
