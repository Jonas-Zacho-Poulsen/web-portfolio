import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Check if API key exists
if (!process.env.RESEND_API_KEY) {
  console.error('RESEND_API_KEY is not set in environment variables')
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log('Attempting to send email with data:', { name, email })

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: 'jonaszachopoulsen@live.dk',
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      reply_to: email,
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