'use client'

import { motion } from 'framer-motion'
import { MessageType } from '@/types'

interface ChatMessageProps {
  message: {
    id: string
    text: string
    sender: 'user' | 'ai'
    timestamp: Date
    topic?: MessageType
    provider?: string
  }
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`px-4 py-2 rounded-lg ${
            isUser
              ? 'bg-blue-500 text-white ml-auto'
              : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>

          {/* Timestamp and provider info */}
          <div
            className={`text-xs mt-1 ${
              isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            {!isUser && message.provider && message.provider !== 'fallback' && (
              <span className="ml-2 opacity-75">• {message.provider}</span>
            )}
          </div>
        </div>

        {/* Avatar */}
        <div className={`flex items-center mt-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
              isUser
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            {isUser ? 'U' : 'J'}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
