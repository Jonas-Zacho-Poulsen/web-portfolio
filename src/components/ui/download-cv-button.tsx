'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DownloadCVButtonProps {
  variant?: 'primary' | 'outline'
  className?: string
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
    { label: '🇩🇰 Download Danish CV/Resume', href: '/CV_Jonas_Poulsen_Danish.pdf' },
    { label: '🇬🇧 Download English CV/Resume', href: '/Jonas_Poulsen_Resume_English.pdf' },
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
            className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50"
          >
            {downloadOptions.map((option) => (
              <a
                key={option.href}
                href={option.href}
                download
                className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                onClick={() => setIsOpen(false)}
              >
                {option.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
