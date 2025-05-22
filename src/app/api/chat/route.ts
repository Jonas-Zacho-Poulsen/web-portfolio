import { NextResponse } from 'next/server';
import { findExactQuestionResponse } from '@/services/predefinedQuestionResponses';

// Simple predefined responses for common questions
const predefinedResponses = {
  'experience': {
    keywords: ['experience', 'work', 'job', 'career', 'professional', 'employment'],
    response: "Jonas has extensive experience in software development, particularly in full-stack web development with React, Next.js, and TypeScript. He's worked on various projects including e-commerce platforms, portfolio websites, and web applications."
  },
  'skills': {
    keywords: ['skills', 'technologies', 'tech', 'programming', 'languages', 'frameworks'],
    response: "Jonas is proficient in modern web technologies including React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Node.js, and various databases. He also has experience with cloud platforms and deployment tools."
  },
  'projects': {
    keywords: ['projects', 'portfolio', 'work', 'built', 'created', 'developed'],
    response: "Jonas has worked on several interesting projects including responsive web applications, e-commerce solutions, and this very portfolio website. You can see his latest work on his GitHub profile and project showcase section."
  },
  'contact': {
    keywords: ['contact', 'reach', 'email', 'phone', 'hire', 'available'],
    response: "You can reach Jonas through email at jonaszachopoulsen@live.dk, phone at +45 50 22 73 00, or connect with him on LinkedIn. He's always open to discussing new opportunities and collaborations!"
  }
};

function findBestResponse(message: string): { text: string; topic: string } {
  const lowercaseMessage = message.toLowerCase();
  
  // Check for exact predefined responses first
  const exactResponse = findExactQuestionResponse(message);
  if (exactResponse) {
    return { text: exactResponse.text, topic: exactResponse.topic };
  }
  
  // Find best match based on keywords
  let bestMatch = { score: 0, response: '', topic: 'default' };
  
  for (const [topic, data] of Object.entries(predefinedResponses)) {
    const score = data.keywords.reduce((acc, keyword) => {
      return acc + (lowercaseMessage.includes(keyword) ? 1 : 0);
    }, 0);
    
    if (score > bestMatch.score) {
      bestMatch = { score, response: data.response, topic };
    }
  }
  
  // Default response if no good match found
  if (bestMatch.score === 0) {
    return {
      text: "Hi! I'm Jonas' AI assistant. I can help you learn more about his experience, skills, projects, or how to contact him. What would you like to know?",
      topic: 'default'
    };
  }
  
  return { text: bestMatch.response, topic: bestMatch.topic };
}

// Try to use external LLM if available
async function tryExternalLLM(message: string): Promise<{ text: string; provider: string } | null> {
  // Check for OpenAI API key
  if (process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: process.env.NEXT_PUBLIC_OPENAI_MODEL || 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are Jonas Zacho Poulsen's personal AI assistant. Jonas is a skilled full-stack developer with expertise in React, Next.js, TypeScript, and modern web technologies. 

              Key information about Jonas:
              - Contact: jonaszachopoulsen@live.dk, +45 50 22 73 00
              - Skills: React, Next.js, TypeScript, JavaScript, Tailwind CSS, Node.js
              - Experience: Full-stack web development, e-commerce, responsive design
              - Location: Denmark
              - Open to new opportunities and collaborations

              Respond conversationally and helpfully about Jonas' background, skills, projects, or contact information. Keep responses concise but informative.`
            },
            {
              role: 'user', 
              content: message
            }
          ],
          max_tokens: 200,
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return {
          text: data.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.',
          provider: 'openai'
        };
      }
    } catch (error) {
      console.error('OpenAI API error:', error);
    }
  }

  // Check for Hugging Face API key
  if (process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY) {
    try {
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${process.env.NEXT_PUBLIC_HUGGINGFACE_MODEL || 'mistralai/Mistral-7B-Instruct-v0.2'}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: `You are Jonas Zacho Poulsen's AI assistant. Answer questions about his skills, experience, and contact information. User question: ${message}`,
            parameters: {
              max_new_tokens: 150,
              temperature: 0.7,
              return_full_text: false,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        return {
          text: data[0]?.generated_text || 'Sorry, I couldn\'t generate a response.',
          provider: 'huggingface'
        };
      }
    } catch (error) {
      console.error('Hugging Face API error:', error);
    }
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Try external LLM first
    const llmResponse = await tryExternalLLM(message);
    
    if (llmResponse) {
      return NextResponse.json({
        response: llmResponse.text,
        provider: llmResponse.provider,
        topic: 'ai-generated'
      });
    }

    // Fall back to predefined responses
    const fallbackResponse = findBestResponse(message);
    
    return NextResponse.json({
      response: fallbackResponse.text,
      topic: fallbackResponse.topic,
      provider: 'fallback'
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    return NextResponse.json({
      response: "I'm sorry, I'm having trouble responding right now. Please try again later.",
      provider: 'fallback',
      topic: 'error'
    }, { status: 500 });
  }
}