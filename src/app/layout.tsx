// Import CSS first to ensure it's loaded properly
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

// Optimize font loading
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Use font-display: swap for better performance
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
}

export const metadata: Metadata = {
  title: 'Jonas Zacho Poulsen - Remote Backend & Full-Stack Engineer | C#/.NET, React',
  description:
    'Remote Backend Engineer specializing in C#/.NET, React, and scalable integrations. Available for contracts and full-time roles in EU time zones.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://jonas-poulsen.vercel.app/'),
  keywords: ['Backend Engineer', 'Full-Stack Developer', 'C#', '.NET', 'React', 'Remote', 'EU', 'Denmark', 'API', 'Integrations'],
  openGraph: {
    title: 'Jonas Zacho Poulsen - Remote Backend & Full-Stack Engineer',
    description: 'Backend Engineer specializing in C#/.NET, React, APIs, and reliable systems. Open to remote roles in EU time zones.',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jonas Zacho Poulsen - Remote Backend & Full-Stack Engineer',
    description: 'Backend Engineer specializing in C#/.NET, React, APIs, and reliable systems. Open to remote roles in EU time zones.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cal.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />

        {/* DNS prefetch for third-party resources */}
        <link rel="dns-prefetch" href="https://cal.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://i.imgur.com" />
        <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />

        {/* Preload critical scripts */}
        <link rel="modulepreload" href="/_next/static/chunks/main.js" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system" disableTransitionOnChange>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
          {process.env.NODE_ENV === 'production' && <SpeedInsights />}
        </ThemeProvider>
      </body>
    </html>
  )
}
