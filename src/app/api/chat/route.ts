import { NextResponse } from 'next/server'
import { findExactQuestionResponse } from '@/services/predefinedQuestionResponses'
import { findBestResponse } from '@/services/llm'

// Local findBestResponse function is now imported from services/llm

/**
 * Optimized chat API route that uses predefined responses for instant replies
 */

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }

    // Check for exact predefined responses first
    const exactResponse = findExactQuestionResponse(message)
    if (exactResponse) {
      return NextResponse.json({
        response: exactResponse.text,
        topic: exactResponse.topic,
        provider: 'fallback',
      })
    }

    // Use keyword-based matching for other responses
    const bestResponse = findBestResponse(message)

    return NextResponse.json({
      response: bestResponse.text,
      topic: bestResponse.topic,
      provider: 'fallback',
    })
  } catch (error) {
    console.error('Chat API error:', error)

    return NextResponse.json(
      {
        response: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        provider: 'fallback',
        topic: 'error',
      },
      { status: 500 }
    )
  }
}
