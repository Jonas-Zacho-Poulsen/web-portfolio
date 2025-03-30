import { Suspense } from 'react'
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import { BackgroundAnimation } from "@/components/background-animation"
import "./globals.css"
import type { Metadata } from 'next'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jonas Zacho Poulsen - Full Stack Developer",
  description: "Portfolio of Jonas Zacho Poulsen, a Full Stack Developer specializing in building and maintaining scalable applications",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://your-production-domain.com'),
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
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <BackgroundAnimation />
            {children}
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
