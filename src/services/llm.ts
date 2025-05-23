/**
 * LLM Service - Optimized for performance
 * Uses predefined responses for instant chat responses
 */
import { chatConfig } from '@/config'

// Supported LLM providers (for type compatibility)
export type LLMProvider = 'huggingface' | 'ollama' | 'openai' | 'fallback'

/**
 * Generate a fallback response using predefined responses
 * @param message - User message to respond to
 * @returns Object with the fallback response
 */
export function findBestResponse(message: string): { text: string; topic: MessageType } {
  message = message.toLowerCase()

  if (
    message.includes('experience') ||
    message.includes('background') ||
    message.includes('work')
  ) {
    return { text: chatConfig.predefinedResponses.experience, topic: 'experience' }
  }
  if (
    message.includes('skill') ||
    message.includes('technology') ||
    message.includes('tech stack') ||
    message.includes('programming language') ||
    message.includes('language') ||
    message.includes('lang') ||
    message.includes('framework') ||
    message.includes('tool')
  ) {
    return { text: chatConfig.predefinedResponses.skills, topic: 'skills' }
  }
  if (message.includes('project') || message.includes('portfolio') || message.includes('build')) {
    return { text: chatConfig.predefinedResponses.projects, topic: 'projects' }
  }
  if (
    message.includes('contact') ||
    message.includes('reach') ||
    message.includes('email') ||
    message.includes('phone')
  ) {
    return { text: chatConfig.predefinedResponses.contact, topic: 'contact' }
  }

  return { text: chatConfig.predefinedResponses.default, topic: 'default' }
}

/**
 * Message type for categorizing responses
 */
export type MessageType = 'experience' | 'skills' | 'projects' | 'contact' | 'default'

/**
 * Simplified LLM Service class for use in components
 * Uses predefined responses for instant chat responses
 */
export class LLMService {
  static async sendMessage(message: string): Promise<{ text: string; topic: MessageType }> {
    // Return predefined response immediately
    return findBestResponse(message)
  }
}
