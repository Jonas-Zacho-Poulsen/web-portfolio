'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { useChatStore } from '@/stores/chatStore'

interface ChatInputProps {
  disabled?: boolean
}

export const ChatInput = ({ disabled = false }: ChatInputProps) => {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { addUserMessage } = useChatStore()

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }

    if (!input.trim() || disabled) return

    const message = input.trim()
    setInput('') // Clear input immediately

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    // Send message through store - don't await to keep UI responsive
    // The store will handle the async operation
    addUserMessage(message)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    handleResize()
  }

  const handleResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end space-x-2">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? 'Thinking...' : 'Ask about Jonas...'}
          disabled={disabled}
          className="w-full resize-none border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-[var(--color-card)] dark:bg-gray-800 text-[var(--color-card-foreground)] dark:text-gray-100 placeholder-[var(--color-muted-foreground)] dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ minHeight: '36px', maxHeight: '100px' }}
          rows={1}
        />
      </div>

      <motion.button
        type="submit"
        disabled={disabled || !input.trim()}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-1 rounded-lg transition-colors duration-200 flex items-center justify-center min-w-[36px] h-[36px]"
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
      >
        {disabled ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        )}
      </motion.button>
    </form>
  )
}
