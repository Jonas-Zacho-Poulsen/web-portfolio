import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import { BackgroundAnimation } from "@/components/background-animation"
import "./globals.css"
import type { Metadata } from 'next'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jonas Zacho Poulsen - Full Stack Developer",
  description: "Portfolio of Jonas Zacho Poulsen, a Full Stack Developer specializing in modern web technologies.",
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
          <BackgroundAnimation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 