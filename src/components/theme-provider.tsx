import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Use React.ComponentProps to get the props type from the NextThemesProvider component
export function ThemeProvider({ 
  children, 
  ...props 
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}