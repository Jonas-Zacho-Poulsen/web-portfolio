'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    Calendly: any;
  }
}

export function CalendlyInlineWidget() {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      className="calendly-inline-widget h-[600px] w-full rounded-lg overflow-hidden"
      data-url="https://calendly.com/jonaszp97"
      style={{ minWidth: '320px' }}
    />
  );
}

export function CalendlyButton({ className = '' }: { className?: string }) {
  const handleClick = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/jonaszp97' });
      return false;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors ${className}`}
    >
      Schedule a Meeting
    </button>
  );
}
