'use client'

import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useChatStore } from '@/stores/chatStore'
import { ChatHeader } from './ChatHeader'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { SuggestedQuestions } from './SuggestedQuestions'
import { PredefinedPrompts } from './PredefinedPrompts'

// Temporary store for logging values for debugging resize logic
let __LOG_DATA__: Record<string, any>[] = []

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
  // State for tracking resize operations
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const dragControls = useDragControls()
  const containerRef = useRef<HTMLDivElement>(null)

  const positionChatInViewport = useCallback(() => {
    // Simplified positioning - always start in bottom right corner
    // This matches user preference from memories
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    // Default to bottom right corner with fixed padding
    const padding = 20
    const newX = viewport.width - chatSize.width - padding
    const newY = viewport.height - chatSize.height - padding

    // Only update if position has changed
    if (newX !== chatPosition.x || newY !== chatPosition.y) {
      setChatPosition({ x: newX, y: newY })
    }
  }, [chatPosition.x, chatPosition.y, chatSize.width, chatSize.height])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Position chat in viewport when opened
  useEffect(() => {
    if (isOpen) {
      positionChatInViewport()
    }
  }, [isOpen, positionChatInViewport])

  // Handle viewport changes
  useEffect(() => {
    let ticking = false

    const handleViewportChange = () => {
      if (isOpen) {
        positionChatInViewport()
      }
    }

    const handleScroll = () => {
      if (!ticking && isOpen) {
        window.requestAnimationFrame(() => {
          // Calculate position relative to the viewport
          const viewport = {
            width: window.innerWidth,
            height: window.innerHeight,
          }
          const padding = 20
          const newX = viewport.width - chatSize.width - padding
          const newY = viewport.height - chatSize.height - padding

          setChatPosition({ x: newX, y: newY })
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('resize', handleViewportChange)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('resize', handleViewportChange)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isOpen, chatSize, positionChatInViewport])

  // Resize handlers for all corners
  const startResize = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Don't start resizing if clicking on close button or its children
    const target = e.target as HTMLElement
    if (target.closest('button[title="Close chat"]')) {
      return
    }

    // Capture the pointer to ensure all pointer events go to this element
    ;(e.target as Element).setPointerCapture(e.pointerId)

    // Determine which corner is being resized based on the target's position
    const targetElement = e.currentTarget as HTMLElement
    const isTop = targetElement.classList.contains('top') || targetElement.style.top === '0px'
    const isLeft = targetElement.classList.contains('left') || targetElement.style.left === '0px'
    const isBottom =
      targetElement.classList.contains('bottom') || targetElement.style.bottom === '0px'
    const isRight = targetElement.classList.contains('right') || targetElement.style.right === '0px'

    let direction = ''
    if (isTop) direction += 'n'
    if (isBottom) direction += 's'
    if (isLeft) direction += 'w'
    if (isRight) direction += 'e'

    // If no direction is determined from classes, infer from position
    if (!direction) {
      const rect = targetElement.getBoundingClientRect()
      if (rect.top === 0) direction += 'n'
      if (rect.bottom === window.innerHeight) direction += 's'
      if (rect.left === 0) direction += 'w'
      if (rect.right === window.innerWidth) direction += 'e'
    }

    // Default to southeast if still no direction
    if (!direction) direction = 'se'

    // Store the direction on the element
    targetElement.dataset.direction = direction

    setIsResizing(true)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: chatSize.width,
      height: chatSize.height,
    })
  }

  const handleResize = (e: React.PointerEvent) => {
    if (!isResizing) return

    // Log initial values
    const initialLog = {
      step: 'initial_values',
      direction: (e.currentTarget as HTMLElement).dataset.direction || 'se',
      event_clientX: e.clientX,
      event_clientY: e.clientY,
      resizeStart_x: resizeStart.x,
      resizeStart_y: resizeStart.y,
      resizeStart_width: resizeStart.width,
      resizeStart_height: resizeStart.height,
      initial_chatPosition_x: chatPosition.x,
      initial_chatPosition_y: chatPosition.y,
    }
    __LOG_DATA__.push(initialLog)

    const targetElement = e.currentTarget as HTMLElement
    const direction = targetElement.dataset.direction || 'se'

    const deltaX = e.clientX - resizeStart.x
    const deltaY = e.clientY - resizeStart.y

    // Log delta values
    const deltaLog = {
      step: 'delta_values',
      deltaX_calculated: deltaX,
      deltaY_calculated: deltaY,
    }
    __LOG_DATA__.push(deltaLog)

    let newWidth = chatSize.width
    let newHeight = chatSize.height
    let newX = chatPosition.x
    let newY = chatPosition.y

    // Store raw calculated values before clamping
    let raw_newWidth = newWidth
    let raw_newHeight = newHeight
    let raw_newX = newX
    let raw_newY = newY

    // Handle width changes based on direction (raw calculation)
    if (direction.includes('e')) {
      raw_newWidth = resizeStart.width + deltaX
    } else if (direction.includes('w')) {
      raw_newWidth = resizeStart.width - deltaX
      raw_newX = chatPosition.x + (resizeStart.width - raw_newWidth) // Simplified: chatPosition.x + deltaX
    }

    // Handle height changes based on direction (raw calculation)
    if (direction.includes('s')) {
      raw_newHeight = resizeStart.height + deltaY
    } else if (direction.includes('n')) {
      raw_newHeight = resizeStart.height - deltaY
      raw_newY = chatPosition.y + (resizeStart.height - raw_newHeight) // Simplified: chatPosition.y + deltaY
    }

    const rawCalculatedLog = {
      step: 'raw_calculated_values',
      raw_newWidth: raw_newWidth,
      raw_newHeight: raw_newHeight,
      raw_newX: raw_newX,
      raw_newY: raw_newY,
    }
    __LOG_DATA__.push(rawCalculatedLog)

    // Min and max dimensions - respect viewport size
    const minWidth = 300
    const maxWidth = Math.min(800, window.innerWidth - 40)
    const minHeight = 350
    const maxHeight = Math.min(800, window.innerHeight - 40)

    // Handle width changes based on direction (now applying clamping)
    if (direction.includes('e')) {
      // East/right edge
      newWidth = Math.max(minWidth, Math.min(maxWidth, resizeStart.width + deltaX))
      // newX remains chatPosition.x from initialization
    } else if (direction.includes('w')) {
      // West/left edge
      newWidth = Math.max(minWidth, Math.min(maxWidth, resizeStart.width - deltaX)); // Corrected: should be -deltaX
      newX = chatPosition.x + (resizeStart.width - newWidth)
    }

    // Handle height changes based on direction (now applying clamping)
    if (direction.includes('s')) {
      // South/bottom edge
      newHeight = Math.max(minHeight, Math.min(maxHeight, resizeStart.height + deltaY))
      // newY remains chatPosition.y from initialization
    } else if (direction.includes('n')) {
      // North/top edge
      newHeight = Math.max(minHeight, Math.min(maxHeight, resizeStart.height - deltaY)); // Corrected: should be -deltaY
      newY = chatPosition.y + (resizeStart.height - newHeight)
    }

    // Ensure chat stays within viewport bounds
    if (newX < 0) newX = 0
    if (newY < 0) newY = 0
    if (newX + newWidth > window.innerWidth) newX = window.innerWidth - newWidth
    if (newY + newHeight > window.innerHeight) newY = window.innerHeight - newHeight

    setChatSize({ width: newWidth, height: newHeight })
    setChatPosition({ x: newX, y: newY })
  }

  const stopResize = (e: React.PointerEvent) => {
    if (!isResizing) return

    // Release the pointer capture
    ;(e.target as Element).releasePointerCapture(e.pointerId)

    // Clean up the direction data attribute
    const targetElement = e.currentTarget as HTMLElement
    if (targetElement.dataset.direction) {
      delete targetElement.dataset.direction
    }

    setIsResizing(false)
  }

  // Drag handlers
  const startDrag = (e: React.PointerEvent) => {
    if (isResizing) return
    e.preventDefault()
    // Start the drag operation using Framer Motion's drag controls
    dragControls.start(e)
  }

  const onDragEnd = (info: any) => {
    if (isResizing) return

    // Check if info and info.offset exist before accessing properties
    if (info && info.offset) {
      const newX = Math.max(
        0,
        Math.min(window.innerWidth - chatSize.width, chatPosition.x + info.offset.x)
      )
      const newY = Math.max(
        0,
        Math.min(window.innerHeight - chatSize.height, chatPosition.y + info.offset.y)
      )
      setChatPosition({ x: newX, y: newY })
    }
  }

  // Close chat
  const handleClose = () => {
    setIsOpen(false)
  }

  // Clear messages
  const handleClear = () => {
    clearMessages()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className="bg-[var(--color-card)] border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl overflow-hidden pointer-events-auto relative flex flex-col fixed z-50"
        style={{
          width: chatSize.width,
          height: chatSize.height,
          position: 'fixed',
          minWidth: '300px',
          minHeight: '400px',
          maxWidth: '90vw',
          maxHeight: '90vh',
          left: chatPosition.x + 'px',
          top: chatPosition.y + 'px',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        drag={!isResizing}
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0}
        onDragEnd={onDragEnd}
      >
        {/* Chat Header */}
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-t-lg cursor-move select-none"
          onPointerDown={startDrag}
          onTouchStart={e => {
            if (isResizing) return
            e.preventDefault()
            // Touch events are handled by the drag functionality
          }}
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
          onPointerMove={handleResize}
          onPointerUp={stopResize}
          onPointerCancel={stopResize}
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
          onPointerMove={handleResize}
          onPointerUp={stopResize}
          onPointerCancel={stopResize}
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
          onPointerMove={handleResize}
          onPointerUp={stopResize}
          onPointerCancel={stopResize}
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
          onPointerMove={handleResize}
          onPointerUp={stopResize}
          onPointerCancel={stopResize}
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
