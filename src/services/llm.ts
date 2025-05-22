/**
 * LLM Service
 * Handles interactions with free LLM APIs
 */
import { fetchWithTimeout } from '@/utils';
import { chatConfig } from '@/config';

// Supported free LLM providers
export type LLMProvider = 'huggingface' | 'ollama' | 'openai';

// LLM API response
export interface LLMResponse {
  text: string;
  provider: LLMProvider;
  success: boolean;
  error?: string;
}

// Default models for each provider
const DEFAULT_MODELS = {
  huggingface: 'mistralai/Mistral-7B-Instruct-v0.2',
  ollama: 'llama2',
  openai: 'gpt-3.5-turbo'
};

/**
 * Get the active LLM provider based on available API keys
 * Returns the first provider that has an API key configured
 * If no API keys are available, returns null
 */
export function getActiveProvider(): LLMProvider | null {
  if (process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY) {
    return 'huggingface';
  } else if (process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    return 'openai';
  } else if (process.env.NEXT_PUBLIC_OLLAMA_ENDPOINT) {
    return 'ollama';
  }
  return null;
}

/**
 * Generate a response using the Hugging Face Inference API
 * @param message - User message to respond to
 * @returns Promise with the generated response
 */
async function generateHuggingFaceResponse(message: string): Promise<LLMResponse> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;
    if (!apiKey) {
      throw new Error('Hugging Face API key not configured');
    }

    const model = process.env.NEXT_PUBLIC_HUGGINGFACE_MODEL || DEFAULT_MODELS.huggingface;
    const endpoint = `https://api-inference.huggingface.co/models/${model}`;

    // Create a system prompt about Jonas
    const systemPrompt = `You are an assistant for Jonas Zacho Poulsen, a Full Stack Developer.
    Answer questions about Jonas' experience, skills, projects, and contact information.
    Keep responses concise and professional.`;

    // Format the input for the model
    const input = `<s>[INST] ${systemPrompt} [/INST]</s>
    <s>[INST] ${message} [/INST]</s>`;

    const response = await fetchWithTimeout(
      endpoint,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: input, parameters: { max_new_tokens: 250 } }),
      },
      10000 // 10 second timeout
    );

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      text: data[0].generated_text || 'Sorry, I could not generate a response.',
      provider: 'huggingface',
      success: true
    };
  } catch (error) {
    console.error('Hugging Face API error:', error);
    return {
      text: 'Sorry, I encountered an error connecting to the language model.',
      provider: 'huggingface',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Generate a response using the OpenAI API
 * @param message - User message to respond to
 * @returns Promise with the generated response
 */
async function generateOpenAIResponse(message: string): Promise<LLMResponse> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const model = process.env.NEXT_PUBLIC_OPENAI_MODEL || DEFAULT_MODELS.openai;
    const endpoint = 'https://api.openai.com/v1/chat/completions';

    const response = await fetchWithTimeout(
      endpoint,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: 'system',
              content: `You are an assistant for Jonas Zacho Poulsen, a Full Stack Developer.
              Answer questions about Jonas' experience, skills, projects, and contact information.
              Keep responses concise and professional.`
            },
            { role: 'user', content: message }
          ],
          max_tokens: 150,
        }),
      },
      10000 // 10 second timeout
    );

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      text: data.choices[0]?.message?.content || 'Sorry, I could not generate a response.',
      provider: 'openai',
      success: true
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    return {
      text: 'Sorry, I encountered an error connecting to the language model.',
      provider: 'openai',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Generate a response using a local Ollama instance
 * @param message - User message to respond to
 * @returns Promise with the generated response
 */
async function generateOllamaResponse(message: string): Promise<LLMResponse> {
  try {
    const endpoint = process.env.NEXT_PUBLIC_OLLAMA_ENDPOINT;
    if (!endpoint) {
      throw new Error('Ollama endpoint not configured');
    }

    const model = process.env.NEXT_PUBLIC_OLLAMA_MODEL || DEFAULT_MODELS.ollama;

    const response = await fetchWithTimeout(
      `${endpoint}/api/generate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          prompt: `You are an assistant for Jonas Zacho Poulsen, a Full Stack Developer.
          Answer questions about Jonas' experience, skills, projects, and contact information.
          Keep responses concise and professional.

          User: ${message}
          Assistant:`,
          stream: false,
        }),
      },
      10000 // 10 second timeout
    );

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      text: data.response || 'Sorry, I could not generate a response.',
      provider: 'ollama',
      success: true
    };
  } catch (error) {
    console.error('Ollama API error:', error);
    return {
      text: 'Sorry, I encountered an error connecting to the language model.',
      provider: 'ollama',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Generate a fallback response using predefined responses
 * @param message - User message to respond to
 * @returns Object with the fallback response
 */
export function findBestResponse(message: string): { text: string; topic: string } {
  message = message.toLowerCase();

  if (message.includes("experience") || message.includes("background") || message.includes("work")) {
    return { text: chatConfig.predefinedResponses.experience, topic: "experience" };
  }
  if (message.includes("skill") || message.includes("technology") || message.includes("tech stack") ||
      message.includes("programming language") || message.includes("language") || message.includes("lang") ||
      message.includes("framework") || message.includes("tool")) {
    return { text: chatConfig.predefinedResponses.skills, topic: "skills" };
  }
  if (message.includes("project") || message.includes("portfolio") || message.includes("build")) {
    return { text: chatConfig.predefinedResponses.projects, topic: "projects" };
  }
  if (message.includes("contact") || message.includes("reach") || message.includes("email") || message.includes("phone")) {
    return { text: chatConfig.predefinedResponses.contact, topic: "contact" };
  }

  return { text: chatConfig.predefinedResponses.default, topic: "default" };
}

/**
 * Generate a response to a user message using the configured LLM provider
 * Falls back to predefined responses if no provider is available or if the API call fails
 * @param message - User message to respond to
 * @returns Promise with the generated response
 */
// Export MessageType for use in other files
export type MessageType = 'experience' | 'skills' | 'projects' | 'contact' | 'default';

// LLM Provider class for use in components
export class LLMProvider {
  static async sendMessage(message: string): Promise<{ text: string; topic: MessageType }> {
    return generateResponse(message);
  }
}

export async function generateResponse(message: string): Promise<{ text: string; topic: MessageType }> {
  const provider = getActiveProvider();

  try {
    if (!provider) {
      // No API keys configured, use fallback
      return findBestResponse(message);
    }

    let response: LLMResponse;

    switch (provider) {
      case 'huggingface':
        response = await generateHuggingFaceResponse(message);
        break;
      case 'openai':
        response = await generateOpenAIResponse(message);
        break;
      case 'ollama':
        response = await generateOllamaResponse(message);
        break;
      default:
        return findBestResponse(message);
    }

    if (!response.success) {
      // API call failed, use fallback
      return findBestResponse(message);
    }

    // Determine the topic based on the response or message
    let topic = 'default';
    const lowerResponse = response.text.toLowerCase();

    if (lowerResponse.includes('experience') || lowerResponse.includes('background') || message.toLowerCase().includes('experience')) {
      topic = 'experience';
    } else if (lowerResponse.includes('skill') || lowerResponse.includes('technology') || message.toLowerCase().includes('skill')) {
      topic = 'skills';
    } else if (lowerResponse.includes('project') || lowerResponse.includes('portfolio') || message.toLowerCase().includes('project')) {
      topic = 'projects';
    } else if (lowerResponse.includes('contact') || lowerResponse.includes('email') || message.toLowerCase().includes('contact')) {
      topic = 'contact';
    }

    return {
      text: response.text,
      topic: topic
    };
  } catch (error) {
    console.error('Error generating response:', error);
    return findBestResponse(message);
  }
}
