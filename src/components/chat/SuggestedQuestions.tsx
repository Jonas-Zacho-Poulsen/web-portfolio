'use client'

import { motion } from 'framer-motion'
import { useChatStore } from '@/stores/chatStore'

const suggestedQuestions = [
  {
    question: "What's Jonas' experience?",
    topic: 'experience',
    icon: '💼',
  },
  {
    question: 'What technologies does he use?',
    topic: 'skills',
    icon: '⚡',
  },
  {
    question: 'Show me his projects',
    topic: 'projects',
    icon: '🚀',
  },
  {
    question: 'How can I contact him?',
    topic: 'contact',
    icon: '📧',
  },
]

export const SuggestedQuestions = () => {
  const { addUserMessage } = useChatStore()

  const handleQuestionClick = (question: string) => {
    // Don't await to keep UI responsive
    addUserMessage(question)
  }

  return (
    <div className="space-y-0.5"> {/* Reduced spacing */}
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-0.5">Quick questions:</p> {/* Reduced margin */}

      <div className="grid grid-cols-1 gap-1"> {/* Reduced gap */}
        {suggestedQuestions.map((item, index) => (
          <motion.button
            key={index}
            onClick={() => handleQuestionClick(item.question)}
            className="text-left bg-[var(--color-card)] hover:bg-[var(--color-secondary)] border border-gray-200 dark:border-gray-600 rounded-md p-2 transition-colors duration-200 group" /* Reduced padding and border radius */
            whileHover={{ scale: 1.01 }} /* Reduced scale effect */
            whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0, y: 5 }} /* Reduced animation distance */
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }} /* Faster animations */
          >
            <div className="flex items-center space-x-2"> {/* Reduced spacing */}
              <span className="text-sm group-hover:scale-110 transition-transform duration-200"> {/* Smaller icon */}
                {item.icon}
              </span>
              <span className="text-sm text-[var(--color-foreground)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"> {/* Smaller text */}
                {item.question}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
