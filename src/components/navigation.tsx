'use client'

import { motion, useScroll, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ThemeSwitcher } from './theme-switcher'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.on('change', latest => {
      setIsScrolled(latest > 50)
    })

    return () => unsubscribe()
  }, [scrollY])

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      // Get the navigation bar height (h-16 = 64px)
      const navHeight = 64

      // Get the element's position relative to the viewport
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset

      // Calculate the offset position
      const offsetPosition = elementPosition - navHeight - 16 // Added extra padding

      // Scroll to the element with the offset
      requestAnimationFrame(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled ? 'bg-(--color-background)/80 backdrop-blur-sm border-b border-(--color-border)' : 'bg-(--color-background)/80 backdrop-blur-sm'
      }`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.span
            className="text-xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            JZP
          </motion.span>

          <div className="hidden sm:block">
            <div className="flex items-center space-x-4">
              {navItems.map(item => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ y: -2 }}
                  className="px-3 py-2 rounded-xs text-sm font-medium text-(--color-foreground)/80 hover:text-(--color-foreground) hover:bg-(--color-primary)/10"
                  onClick={e => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                >
                  {item.name}
                </motion.a>
              ))}
              <ThemeSwitcher className="text-(--color-foreground)/80 hover:text-(--color-foreground)" />
            </div>
          </div>

          {/* Theme switcher and mobile menu button */}
          <div className="sm:hidden flex items-center space-x-2">
            <ThemeSwitcher className="text-(--color-foreground)/80 hover:text-(--color-foreground)" />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xs text-(--color-foreground)/80 hover:text-(--color-foreground) hover:bg-(--color-primary)/10"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="sm:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map(item => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    whileHover={{ x: 4 }}
                    className="block px-3 py-2 rounded-xs text-base font-medium text-(--color-foreground)/80 hover:text-(--color-foreground) hover:bg-(--color-primary)/10"
                    onClick={e => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
