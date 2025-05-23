'use client'

import { motion } from 'framer-motion'
import { useChatStore } from '@/stores/chatStore'
import { useState } from 'react'

const prompts = [
  "Tell me about Jonas' background",
  'What makes Jonas a good developer?',
  'Is Jonas available for hire?',
  "What are Jonas' strongest skills?",
]

export const PredefinedPrompts = () => {
  const { addUserMessage } = useChatStore()
  const [isExpanded, setIsExpanded] = useState(false)

  const handlePromptClick = (prompt: string) => {
    // Don't await to keep UI responsive
    addUserMessage(prompt)
  }

  return (
    <div className="mt-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 flex items-center space-x-1"
      >
        <span>More questions</span>
        <motion.svg
          className="w-4 h-4"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-1 gap-2 mt-2">
          {prompts.map((prompt, index) => (
            <motion.button
              key={index}
              onClick={() => handlePromptClick(prompt)}
              className="text-left bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-800/30 dark:hover:to-purple-800/30 border border-blue-200 dark:border-blue-700 rounded-lg p-2 transition-all duration-200 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200">
                  💡
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {prompt}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
