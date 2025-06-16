'use client'

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AnimatedTextCycleProps {
  words: string[]
  interval?: number
  className?: string
}

export function AnimatedTextCycle({
  words,
  interval = 5000,
  className = "",
}: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const measureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, interval)

    return () => clearInterval(timer)
  }, [interval, words.length])

  // Container animation for the whole word
  const containerVariants = {
    hidden: { 
      y: -20,
      opacity: 0,
      filter: "blur(8px)"
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      y: 20,
      opacity: 0,
      filter: "blur(8px)",
      transition: { 
        duration: 0.3, 
        ease: "easeIn"
      }
    },
  }

  return (
    <div className="relative w-full flex justify-center items-center px-4">
      {/* Hidden measurement div with all words rendered */}
      <div 
        ref={measureRef} 
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none"
        style={{ visibility: "hidden" }}
      >
        {words.map((word, i) => (
          <span key={i} className={`font-bold ${className}`}>
            {word}
          </span>
        ))}
      </div>

      {/* Container with fixed width to prevent layout shifts */}
      <div className="w-full flex justify-center">
        {/* Visible animated word */}
        <div className="inline-block text-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={currentIndex}
              className={`inline-block font-bold ${className} text-center`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ 
                maxWidth: "100%",
                wordBreak: "break-word",
                hyphens: "auto"
              }}
            >
              {words[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
} 