'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useChatStore } from '@/stores/chatStore'
import { ChatHeader } from './ChatHeader'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { SuggestedQuestions } from './SuggestedQuestions'
import { PredefinedPrompts } from './PredefinedPrompts'
import { SuggestedNextPrompts } from './SuggestedNextPrompts'

export const ChatContainer = () => {
  const {
    messages,
    isOpen,
    isLoading,
    error,
    chatSize,
    chatPosition,
    setIsOpen,
    setChatSize,
    setChatPosition,
    clearMessages,
  } = useChatStore()

  const [isResizing, setIsResizing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Refs for resize/drag state to avoid stale closures in window listeners
  const resizeRef = useRef({
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    startChatX: 0,
    startChatY: 0,
    direction: 'se',
  })

  const dragRef = useRef({
    startX: 0,
    startY: 0,
    startChatX: 0,
    startChatY: 0,
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const positionChatInViewport = useCallback(() => {
    const padding = 20
    const state = useChatStore.getState()
    const maxX = window.innerWidth - state.chatSize.width - padding
    const maxY = window.innerHeight - state.chatSize.height - padding
    const newX = Math.max(0, Math.min(state.chatPosition.x, maxX))
    const newY = Math.max(0, Math.min(state.chatPosition.y, maxY))
    if (newX !== state.chatPosition.x || newY !== state.chatPosition.y) {
      setChatPosition({ x: newX, y: newY })
    }
  }, [setChatPosition])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Position chat in viewport when opened or window resizes
  useEffect(() => {
    if (!isOpen) return

    positionChatInViewport()

    const handleViewportChange = () => positionChatInViewport()
    window.addEventListener('resize', handleViewportChange)
    return () => window.removeEventListener('resize', handleViewportChange)
  }, [isOpen, positionChatInViewport])

  // ─── Resize ───────────────────────────────────────────────────────────
  const startResize = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const target = e.target as HTMLElement
    if (target.closest('button[title="Close chat"]')) return

    const direction = (e.currentTarget as HTMLElement).dataset.direction || 'se'

    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: chatSize.width,
      startHeight: chatSize.height,
      startChatX: chatPosition.x,
      startChatY: chatPosition.y,
      direction,
    }

    setIsResizing(true)
  }

  useEffect(() => {
    if (!isResizing) return

    const handlePointerMove = (e: PointerEvent) => {
      const r = resizeRef.current
      const deltaX = e.clientX - r.startX
      const deltaY = e.clientY - r.startY

      const minWidth = 300
      const maxWidth = Math.min(800, window.innerWidth - 40)
      const minHeight = 350
      const maxHeight = Math.min(800, window.innerHeight - 40)

      let newWidth = r.startWidth
      let newHeight = r.startHeight
      let newX = r.startChatX
      let newY = r.startChatY

      // East: left edge fixed, right edge follows cursor
      if (r.direction.includes('e')) {
        newWidth = Math.max(minWidth, Math.min(maxWidth, r.startWidth + deltaX))
      }
      // West: right edge fixed, left edge follows cursor
      if (r.direction.includes('w')) {
        const proposedWidth = r.startWidth - deltaX
        newWidth = Math.max(minWidth, Math.min(maxWidth, proposedWidth))
        newX = r.startChatX + r.startWidth - newWidth
      }
      // South: top edge fixed, bottom edge follows cursor
      if (r.direction.includes('s')) {
        newHeight = Math.max(minHeight, Math.min(maxHeight, r.startHeight + deltaY))
      }
      // North: bottom edge fixed, top edge follows cursor
      if (r.direction.includes('n')) {
        const proposedHeight = r.startHeight - deltaY
        newHeight = Math.max(minHeight, Math.min(maxHeight, proposedHeight))
        newY = r.startChatY + r.startHeight - newHeight
      }

      // Clamp to viewport
      newX = Math.max(0, Math.min(newX, window.innerWidth - newWidth))
      newY = Math.max(0, Math.min(newY, window.innerHeight - newHeight))

      setChatSize({ width: newWidth, height: newHeight })
      setChatPosition({ x: newX, y: newY })
    }

    const handlePointerUp = () => setIsResizing(false)

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [isResizing, setChatSize, setChatPosition])

  // ─── Drag ─────────────────────────────────────────────────────────────
  const startDrag = (e: React.PointerEvent) => {
    if (isResizing) return
    // Don't start drag if clicking on a button or interactive element
    const target = e.target as HTMLElement
    if (target.closest('button')) return
    e.preventDefault()

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startChatX: chatPosition.x,
      startChatY: chatPosition.y,
    }

    setIsDragging(true)
  }

  useEffect(() => {
    if (!isDragging) return

    const handlePointerMove = (e: PointerEvent) => {
      const d = dragRef.current
      const newX = Math.max(
        0,
        Math.min(window.innerWidth - chatSize.width, d.startChatX + (e.clientX - d.startX))
      )
      const newY = Math.max(
        0,
        Math.min(window.innerHeight - chatSize.height, d.startChatY + (e.clientY - d.startY))
      )
      setChatPosition({ x: newX, y: newY })
    }

    const handlePointerUp = () => setIsDragging(false)

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [isDragging, chatSize.width, chatSize.height, setChatPosition])

  // Close / Clear
  const handleClose = () => setIsOpen(false)
  const handleClear = () => clearMessages()

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className="bg-[var(--color-card)] border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl overflow-hidden pointer-events-auto relative flex flex-col"
        style={{
          position: 'fixed',
          left: chatPosition.x,
          top: chatPosition.y,
          width: chatSize.width,
          height: chatSize.height,
          minWidth: 300,
          minHeight: 400,
          maxWidth: '90vw',
          maxHeight: '90vh',
          zIndex: 50,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        {/* Chat Header — drag handle */}
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-t-lg cursor-move select-none"
          onPointerDown={startDrag}
        >
          <ChatHeader onClose={handleClose} onClear={handleClear} />
        </div>

        {/* Chat Content */}
        <div className="flex flex-col h-[calc(100%-40px)]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-1 space-y-1 bg-[var(--color-secondary)]">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-0.5"></div>
            ) : (
              messages.map(message => <ChatMessage key={message.id} message={message} />)
            )}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-center space-x-1.5 text-gray-500 dark:text-gray-400">
                <div className="flex space-x-0.5">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
                <span className="text-xs">Thinking...</span>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-2 py-1 rounded text-xs">
                {error}
              </div>
            )}

            {/* Suggested questions */}
            {messages.length === 0 && (
              <div className="space-y-0.5">
                <SuggestedQuestions />
                <PredefinedPrompts />
              </div>
            )}

            {messages.length > 0 && <SuggestedNextPrompts />}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-1.5 bg-[var(--color-card)]">
            <ChatInput disabled={isLoading} />
          </div>
        </div>

        {/* Resize handles for all corners */}
        {/* Bottom-right corner */}
        <div
          className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize z-10"
          onPointerDown={startResize}
          style={{ touchAction: 'none' }}
          data-direction="se"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute bottom-0 right-0 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            <path d="M22 22H16V16H22V22ZM22 13H19V16H16V19H13V22H22V13Z" />
          </svg>
        </div>

        {/* Bottom-left corner */}
        <div
          className="absolute bottom-0 left-0 w-6 h-6 cursor-sw-resize z-10"
          onPointerDown={startResize}
          style={{ touchAction: 'none' }}
          data-direction="sw"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute bottom-0 left-0 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            <path
              d="M2 22H8V16H2V22ZM2 13H5V16H8V19H11V22H2V13Z"
              transform="scale(-1, 1) translate(-24, 0)"
            />
          </svg>
        </div>

        {/* Top-right corner */}
        <div
          className="absolute top-0 right-0 w-6 h-6 cursor-ne-resize z-10"
          onPointerDown={startResize}
          style={{ touchAction: 'none' }}
          data-direction="ne"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            <path d="M22 2H16V8H22V2ZM22 11H19V8H16V5H13V2H22V11Z" />
          </svg>
        </div>

        {/* Top-left corner */}
        <div
          className="absolute top-0 left-0 w-6 h-6 cursor-nw-resize z-10"
          onPointerDown={startResize}
          style={{ touchAction: 'none' }}
          data-direction="nw"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute top-0 left-0 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            <path
              d="M2 2H8V8H2V2ZM2 11H5V8H8V5H11V2H2V11Z"
              transform="scale(-1, 1) translate(-24, 0)"
            />
          </svg>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
