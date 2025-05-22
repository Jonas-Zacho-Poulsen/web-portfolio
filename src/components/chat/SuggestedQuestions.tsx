"use client";

import { motion } from 'framer-motion';
import { useChatStore } from '@/stores/chatStore';

const suggestedQuestions = [
  {
    question: "What's Jonas' experience?",
    topic: "experience",
    icon: "💼"
  },
  {
    question: "What technologies does he use?",
    topic: "skills",
    icon: "⚡"
  },
  {
    question: "Show me his projects",
    topic: "projects",
    icon: "🚀"
  },
  {
    question: "How can I contact him?",
    topic: "contact",
    icon: "📧"
  }
];

export const SuggestedQuestions = () => {
  const { addUserMessage } = useChatStore();

  const handleQuestionClick = async (question: string) => {
    await addUserMessage(question);
  };

  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
        Quick questions:
      </p>

      <div className="grid grid-cols-1 gap-1.5">
        {suggestedQuestions.map((item, index) => (
          <motion.button
            key={index}
            onClick={() => handleQuestionClick(item.question)}
            className="text-left bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg p-1.5 transition-colors duration-200 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                {item.question}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};