import { create } from 'zustand'
import type { ChatMessage } from '@/types'

interface ChatState {
  messages: ChatMessage[]
  isOpen: boolean
  isLoading: boolean
  error: string | null
  chatSize: { width: number; height: number }
  chatPosition: { x: number; y: number }

  // Actions
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void
  addUserMessage: (text: string) => Promise<void>
  setIsOpen: (isOpen: boolean) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  clearMessages: () => void
  setChatSize: (size: { width: number; height: number }) => void
  setChatPosition: (position: { x: number; y: number }) => void
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isOpen: false,
  isLoading: false,
  error: null,
  chatSize: { width: 350, height: 400 },
  chatPosition: {
    x: typeof window !== 'undefined' ? window.innerWidth - 370 : 20,
    y: typeof window !== 'undefined' ? window.innerHeight - 420 : 20,
  },

  addMessage: message => {
    const newMessage: ChatMessage = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    }

    set(state => ({
      messages: [...state.messages, newMessage],
    }))
  },

  addUserMessage: async (text: string) => {
    const { addMessage, setIsLoading, setError } = get()

    // Add user message immediately
    addMessage({
      text,
      sender: 'user',
    })

    // Set loading state for AI response (very brief for UI feedback)
    setIsLoading(true)
    setError(null)

    try {
      // For instant responses, use client-side predefined responses
      // Import dynamically to avoid circular dependencies
      const { findExactQuestionResponse } = await import('@/services/predefinedQuestionResponses')
      const { findBestResponse } = await import('@/services/llm')

      // First check for exact match
      const exactMatch = findExactQuestionResponse(text)

      if (exactMatch) {
        // Add AI response with exact match
        addMessage({
          text: exactMatch.text,
          sender: 'ai',
          topic: exactMatch.topic,
          provider: 'fallback',
        })
      } else {
        // Find best response based on keywords
        const bestResponse = findBestResponse(text)

        // Add AI response with best match
        addMessage({
          text: bestResponse.text,
          sender: 'ai',
          topic: bestResponse.topic,
          provider: 'fallback',
        })
      }
    } catch (error) {
      console.error('Chat processing error:', error)
      setError('Failed to process your message. Please try again.')

      // Add fallback response
      addMessage({
        text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        sender: 'ai',
        provider: 'fallback',
      })
    } finally {
      // Always set loading to false
      setIsLoading(false)
    }
  },

  setIsOpen: isOpen => set({ isOpen }),
  setIsLoading: isLoading => set({ isLoading }),
  setError: error => set({ error }),
  clearMessages: () => set({ messages: [] }),
  setChatSize: chatSize => set({ chatSize }),
  setChatPosition: chatPosition => set({ chatPosition }),
}))
