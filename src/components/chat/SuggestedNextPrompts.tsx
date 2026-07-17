'use client'

import { motion } from 'framer-motion'
import { useChatStore } from '@/stores/chatStore'

const ALL_SUGGESTED_PROMPTS = [
  { text: "What's Jonas' experience?", icon: '💼' },
  { text: 'What technologies does he use?', icon: '⚡' },
  { text: 'Show me his projects', icon: '🚀' },
  { text: 'How can I contact him?', icon: '📧' },
  { text: "Tell me about Jonas' background", icon: '💡' },
  { text: 'What makes Jonas a great developer?', icon: '💡' },
  { text: 'Is Jonas available for hire?', icon: '💡' },
  { text: "What are Jonas' strongest skills?", icon: '💡' },
]

export const SuggestedNextPrompts = () => {
  const { messages, addUserMessage, isLoading } = useChatStore()

  // Only show when the last message is from the AI and we are not loading
  const lastMessage = messages[messages.length - 1]
  if (!lastMessage || lastMessage.sender !== 'ai' || isLoading) {
    return null
  }

  // Get user's latest prompt
  const userMessages = messages.filter(m => m.sender === 'user')
  const latestUserPrompt = userMessages[userMessages.length - 1]?.text || ''

  // All user prompts in the session (case insensitive)
  const askedPrompts = new Set(userMessages.map(m => m.text.toLowerCase().trim()))

  // 1. Filter out prompts that match the latest user prompt
  // 2. Filter out prompts that have been asked in this session
  let filtered = ALL_SUGGESTED_PROMPTS.filter(p => {
    const promptTextLower = p.text.toLowerCase().trim()
    const isLatest = promptTextLower === latestUserPrompt.toLowerCase().trim()
    const wasAsked = askedPrompts.has(promptTextLower)
    return !isLatest && !wasAsked
  })

  // If we have fewer than 3 prompts (e.g. user asked many things),
  // add back some prompts that weren't the latest one to make sure we have exactly 3
  if (filtered.length < 3) {
    const remainingNeeded = 3 - filtered.length
    const fallbackPrompts = ALL_SUGGESTED_PROMPTS.filter(p => {
      const promptTextLower = p.text.toLowerCase().trim()
      const isLatest = promptTextLower === latestUserPrompt.toLowerCase().trim()
      const alreadyInFiltered = filtered.some(fp => fp.text.toLowerCase().trim() === promptTextLower)
      return !isLatest && !alreadyInFiltered
    })
    filtered = [...filtered, ...fallbackPrompts.slice(0, remainingNeeded)]
  }

  // Take the top 3
  const nextPrompts = filtered.slice(0, 3)

  if (nextPrompts.length === 0) return null

  const handlePromptClick = (prompt: string) => {
    addUserMessage(prompt)
  }

  return (
    <div className="mt-3 px-2 py-1.5 space-y-1.5 border-t border-gray-200 dark:border-gray-700">
      <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Suggested next questions:</p>
      <div className="flex flex-col gap-1.5">
        {nextPrompts.map((prompt, index) => (
          <motion.button
            key={prompt.text}
            onClick={() => handlePromptClick(prompt.text)}
            className="text-left bg-[var(--color-card)] hover:bg-[var(--color-secondary)] border border-gray-200 dark:border-gray-600 rounded-md py-1.5 px-2.5 transition-colors duration-200 group w-full flex items-center space-x-2"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <span className="text-xs group-hover:scale-110 transition-transform duration-200">
              {prompt.icon}
            </span>
            <span className="text-xs text-[var(--color-foreground)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 font-medium">
              {prompt.text}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
