"use client";

import { motion } from 'framer-motion';
import { useChatStore } from '@/stores/chatStore';

export const ChatToggle = () => {
  const { isOpen, setIsOpen, chatPosition, chatSize } = useChatStore();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Position the toggle button to the right of the chat window when open
  const buttonStyle = isOpen 
    ? { 
        top: `${Math.min(chatPosition.y, window.innerHeight - 68)}px`,
        left: `${chatPosition.x + chatSize.width + 10}px`,
        bottom: 'auto',
        right: 'auto',
        position: 'fixed' as const,
        zIndex: 50,
        transform: 'none',
        margin: 0
      }
    : {};

  return (
    <motion.button
      onClick={toggleChat}
      className={`bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${!isOpen ? 'fixed bottom-6 right-6 z-40' : 'fixed'}`}
      style={isOpen ? buttonStyle : {}}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      title="Chat with Jonas"
    >
      <div className="relative">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>

        {/* Notification dot */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.button>
  );
};