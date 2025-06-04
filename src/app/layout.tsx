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
  title: 'Jonas Zacho Poulsen - Full Stack Developer',
  description:
    'Portfolio of Jonas Zacho Poulsen, a Full Stack Developer specializing in building and maintaining scalable applications',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://jonas-poulsen.vercel.app/'),
  openGraph: {
    title: 'Jonas Zacho Poulsen - Full Stack Developer',
    description: 'Full Stack Developer specializing in scalable applications',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jonas Zacho Poulsen - Full Stack Developer',
    description: 'Full Stack Developer specializing in scalable applications',
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
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />

        {/* DNS prefetch for third-party resources */}
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://i.imgur.com" />
        <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />

        {/* Preload critical images */}
        <link rel="preload" as="image" href="https://i.imgur.com/27rWIav.jpeg" />

        {/* Preload critical scripts */}
        <link rel="modulepreload" href="/_next/static/chunks/main.js" />
      </head>
      <body className={inter.className}>
      <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system" disableTransitionOnChange>
        {children}
        <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
