import { NextResponse } from 'next/server';
import { generateResponse, getActiveProvider } from '@/services/llm';
import { chatConfig } from '@/config';

// Rate limiting
const RATE_LIMIT_MS = chatConfig.rateLimit || 1000;
let lastRequestTime = 0;

export async function POST(request: Request) {
  try {
    // Apply rate limiting
    const now = Date.now();
    if (now - lastRequestTime < RATE_LIMIT_MS) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in a moment.' },
        { status: 429 }
      );
    }
    lastRequestTime = now;

    // Parse the request body
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Missing message' },
        { status: 400 }
      );
    }

    // Check if any LLM provider is configured
    const provider = getActiveProvider();
    
    // Generate a response
    const response = await generateResponse(message);

    return NextResponse.json({
      text: response.text,
      topic: response.topic,
      provider: provider || 'fallback',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to generate response',
        fallback: true
      },
      { status: 500 }
    );
  }
}
