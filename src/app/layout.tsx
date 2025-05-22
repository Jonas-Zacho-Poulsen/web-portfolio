import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import "./globals.css"
import type { Metadata } from 'next'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jonas Zacho Poulsen - Full Stack Developer",
  description: "Portfolio of Jonas Zacho Poulsen, a Full Stack Developer specializing in building and maintaining scalable applications",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://jonas-poulsen.vercel.app/'),
  openGraph: {
    title: "Jonas Zacho Poulsen - Full Stack Developer",
    description: "Full Stack Developer specializing in scalable applications",
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        
        {/* Add meta tags for performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Main content loads immediately */}
          {children}
          
          {/* Background removed */}
        </ThemeProvider>
      </body>
    </html>
  )
}
