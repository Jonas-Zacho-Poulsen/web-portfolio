"use client"

import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4 p-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </motion.button>
  )
} 