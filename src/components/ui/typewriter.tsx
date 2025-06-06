'use client'

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TypewriterProps {
  text: string[]
  speed?: number
  waitTime?: number
  deleteSpeed?: number
  className?: string
  cursorChar?: string
}

const Typewriter = ({
  text,
  speed = 50,
  waitTime = 2000,
  deleteSpeed = 30,
  className,
  cursorChar = "|",
}: TypewriterProps) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    const currentText = text[currentTextIndex]

    const startTyping = () => {
      if (isDeleting) {
        if (displayText === "") {
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % text.length)
          setCurrentIndex(0)
          timeout = setTimeout(() => {}, waitTime)
        } else {
          timeout = setTimeout(() => {
            setDisplayText((prev) => prev.slice(0, -1))
          }, deleteSpeed)
        }
      } else {
        if (currentIndex < currentText.length) {
          timeout = setTimeout(() => {
            setDisplayText((prev) => prev + currentText[currentIndex])
            setCurrentIndex((prev) => prev + 1)
          }, speed)
        } else {
          timeout = setTimeout(() => {
            setIsDeleting(true)
          }, waitTime)
        }
      }
    }

    startTyping()

    return () => clearTimeout(timeout)
  }, [currentIndex, displayText, isDeleting, speed, deleteSpeed, waitTime, text, currentTextIndex])

  return (
    <span className={cn("inline whitespace-pre-wrap tracking-tight", className)}>
      {displayText}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.01,
          repeat: Infinity,
          repeatDelay: 0.4,
          repeatType: "reverse",
        }}
        className="ml-1"
      >
        {cursorChar}
      </motion.span>
    </span>
  )
}

export { Typewriter } 