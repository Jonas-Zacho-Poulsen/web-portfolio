'use client'

import { useEffect, useState } from 'react'

// Global variable to track if Calendly script is loaded
let isCalendlyScriptLoaded = false

// Function to load Calendly script once
export const loadCalendlyScript = (): Promise<void> => {
  return new Promise((resolve) => {
    if (isCalendlyScriptLoaded || document.getElementById('calendly-script')) {
      isCalendlyScriptLoaded = true
      resolve()
      return
    }

    const script = document.createElement('script')
    script.id = 'calendly-script'
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.defer = true
    script.onload = () => {
      isCalendlyScriptLoaded = true
      resolve()
    }
    document.head.appendChild(script)
  })
}

export function CalendlyInlineWidget() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Add preconnect for Calendly domain
    const preconnect = document.createElement('link')
    preconnect.rel = 'preconnect'
    preconnect.href = 'https://assets.calendly.com'
    document.head.appendChild(preconnect)

    // Load script
    loadCalendlyScript().then(() => setIsReady(true))

    return () => {
      // Cleanup preconnect
      document.head.removeChild(preconnect)
    }
  }, [])

  return (
    <div
      className={`calendly-inline-widget h-[600px] w-full rounded-lg overflow-hidden calendly-widget-min-width ${isReady ? 'calendly-ready' : 'calendly-loading'}`}
      data-url="https://calendly.com/jonaszp97"
    />
  )
}

export function CalendlyButton({ className = '' }: { className?: string }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    loadCalendlyScript().then(() => setIsReady(true))
  }, [])

  const handleClick = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/jonaszp97' })
      return false
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={!isReady}
      className={`px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors ${className}`}
    >
      Schedule a Meeting
    </button>
  )
}
