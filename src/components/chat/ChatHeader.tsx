'use client'

import { motion } from 'framer-motion'

interface ChatHeaderProps {
  onClose: () => void
  onClear: () => void
}

export const ChatHeader = ({ onClose, onClear }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between relative z-20">
      <div className="flex items-center space-x-1.5">
        <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <span className="text-xs font-bold">💬</span>
        </div>
        <div>
          <h3 className="font-semibold text-xs">Ask about my skills and experience</h3>
        </div>
      </div>

      <div className="flex items-center space-x-1 relative z-20">
        {/* Clear messages button */}
        <motion.button
          onClick={onClear}
          className="p-1.5 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Clear messages"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </motion.button>

        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="p-1.5 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors relative z-20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Close chat"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.button>
      </div>
    </div>
  )
}
