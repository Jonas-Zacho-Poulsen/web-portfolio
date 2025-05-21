/**
 * Utility functions for reCAPTCHA verification
 */

/**
 * Validates a reCAPTCHA token by sending it to Google's verification API
 * @param token - The reCAPTCHA token to validate
 * @returns A boolean indicating whether the token is valid
 */
export async function validateRecaptcha(token: string): Promise<boolean> {
  try {
    // Get the secret key from environment variables
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      console.warn('RECAPTCHA_SECRET_KEY is not set in environment variables');
      return false;
    }
    
    // Send the token to Google's verification API
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });
    
    // Parse the response
    const data = await response.json();
    
    // Check if the token is valid
    return data.success === true;
  } catch (error) {
    console.error('Error validating reCAPTCHA token:', error);
    return false;
  }
}
