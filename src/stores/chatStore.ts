import { create } from 'zustand';
import type { ChatMessage } from '@/types';

interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  chatSize: { width: number; height: number };
  chatPosition: { x: number; y: number };

  // Actions
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  addUserMessage: (text: string) => Promise<void>;
  setIsOpen: (isOpen: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearMessages: () => void;
  setChatSize: (size: { width: number; height: number }) => void;
  setChatPosition: (position: { x: number; y: number }) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isOpen: false,
  isLoading: false,
  error: null,
  chatSize: { width: 350, height: 400 },
  chatPosition: {
    x: typeof window !== 'undefined' ? window.innerWidth - 370 : 20,
    y: typeof window !== 'undefined' ? window.innerHeight - 420 : 20
  },

  addMessage: (message) => {
    const newMessage: ChatMessage = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };

    set((state) => ({
      messages: [...state.messages, newMessage]
    }));
  },

  addUserMessage: async (text: string) => {
    const { addMessage, setIsLoading, setError } = get();

    // Add user message immediately
    addMessage({
      text,
      sender: 'user',
    });

    // Set loading state for AI response
    setIsLoading(true);
    setError(null);

    try {
      // Call the chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Add AI response
      addMessage({
        text: data.response || data.text || "I'm sorry, I couldn't generate a response.",
        sender: 'ai',
        topic: data.topic,
        provider: data.provider,
      });

    } catch (error) {
      console.error('Chat API error:', error);
      setError('Failed to get response. Please try again.');

      // Add fallback response
      addMessage({
        text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        sender: 'ai',
        provider: 'fallback',
      });
    } finally {
      setIsLoading(false);
    }
  },

  setIsOpen: (isOpen) => set({ isOpen }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearMessages: () => set({ messages: [] }),
  setChatSize: (chatSize) => set({ chatSize }),
  setChatPosition: (chatPosition) => set({ chatPosition }),
}));