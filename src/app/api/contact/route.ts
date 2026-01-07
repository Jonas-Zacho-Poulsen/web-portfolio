import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Define the validateRecaptcha function inline until the module is properly set up
async function validateRecaptcha(token: string): Promise<boolean> {
  try {
    // Get the secret key from environment variables
    const secretKey = process.env.RECAPTCHA_SECRET_KEY

    if (!secretKey || secretKey === 'your_recaptcha_secret_key') {
      console.warn('RECAPTCHA_SECRET_KEY is not properly set in environment variables')
      return false
    }

    // Send the token to Google's verification API
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    // Parse the response
    const data = await response.json()

    // Check if the token is valid
    return data.success === true
  } catch (error) {
    console.error('Error validating reCAPTCHA token:', error)
    return false
  }
}

// Check if API key exists
const hasResendApiKey = !!process.env.RESEND_API_KEY
if (!hasResendApiKey) {
  console.warn(
    'RESEND_API_KEY is not set in environment variables - contact form will use mock mode'
  )
}

// Initialize Resend only if API key is available
const resend = hasResendApiKey ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const { name, email, message, recaptchaToken } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify reCAPTCHA token if provided and keys are properly configured
    const hasValidRecaptchaKeys =
      process.env.RECAPTCHA_SECRET_KEY &&
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY &&
      process.env.RECAPTCHA_SECRET_KEY !== 'your_recaptcha_secret_key' &&
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY !== 'your_recaptcha_site_key'

    if (process.env.NODE_ENV !== 'development' && hasValidRecaptchaKeys) {
      if (!recaptchaToken) {
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        )
      }

      const recaptchaValid = await validateRecaptcha(recaptchaToken)
      if (!recaptchaValid) {
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        )
      }
    } else {
      console.log('Skipping reCAPTCHA verification - keys not configured or in development mode')
    }

    console.log('Attempting to send email with data:', { name, email })

    // If Resend API key is not available, return mock success response
    if (!hasResendApiKey) {
      console.log('Mock mode: Email would be sent with data:', { name, email, message })
      return NextResponse.json({
        success: true,
        data: {
          id: 'mock-email-id',
          from: 'Portfolio Contact Form <onboarding@resend.dev>',
          to: 'jonaszp97@gmail.com',
          subject: `New Contact Form Submission from ${name}`,
        },
        mock: true,
      })
    }

    // If Resend API key is available, send the email
    const { data, error } = await resend!.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: 'jonaszp97@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      replyTo: email,
    })

    if (error) {
      console.error('Resend API error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    console.log('Email sent successfully:', data)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send message' },
      { status: 500 }
    )
  }
}
