'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DownloadCVButtonProps {
  variant?: 'primary' | 'outline'
  className?: string
}

function DanishFlag() {
  return (
    <svg className="inline-block w-5 h-4 mr-2 align-middle" viewBox="0 0 36 26">
      <rect width="36" height="26" fill="#C8102E" rx="1"/>
      <rect x="15" width="6" height="26" fill="white"/>
      <rect y="10" width="36" height="6" fill="white"/>
    </svg>
  )
}

function BritishFlag() {
  return (
    <svg className="inline-block w-5 h-4 mr-2 align-middle" viewBox="0 0 36 26">
      <rect width="36" height="26" fill="#012169" rx="1"/>
      <path d="M-8,-6 L44,32 M-8,32 L44,-6" stroke="white" strokeWidth="7" strokeLinecap="square"/>
      <path d="M-8,-6 L44,32 M-8,32 L44,-6" stroke="#C8102E" strokeWidth="3" strokeLinecap="square"/>
      <rect x="0" y="10" width="36" height="6" fill="white"/>
      <rect x="15" y="0" width="6" height="26" fill="white"/>
      <rect x="0" y="12" width="36" height="2" fill="#C8102E"/>
      <rect x="16" y="0" width="4" height="26" fill="#C8102E"/>
    </svg>
  )
}

export function DownloadCVButton({ variant = 'outline', className = '' }: DownloadCVButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const baseClasses = 'px-8 py-3 rounded-sm font-medium transition-all cursor-pointer inline-flex items-center justify-center'
  const variantClasses = variant === 'primary'
    ? 'bg-(--color-primary) text-(--color-primary-foreground) hover:bg-(--color-primary)/90'
    : 'border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary)/10'

  const downloadOptions = [
    { label: 'Download Danish CV/Resume', href: '/CV_Jonas_Poulsen_Danish.pdf', flag: <DanishFlag /> },
    { label: 'Download English CV/Resume', href: '/Jonas_Poulsen_Resume_English.pdf', flag: <BritishFlag /> },
  ]

  return (
    <div ref={containerRef} className="relative inline-block">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${baseClasses} ${variantClasses} ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        Download CV/Resume
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50"
          >
            {downloadOptions.map((option) => (
              <a
                key={option.href}
                href={option.href}
                download
                className="flex items-center px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                onClick={() => setIsOpen(false)}
              >
                {option.flag}
                {option.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
