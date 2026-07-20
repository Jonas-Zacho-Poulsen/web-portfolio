'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { EmailIcon, PhoneIcon, GithubIcon, LinkedInIcon } from '@/components/icons'
import { AnimatedTextCycle } from '@/components/ui/animated-text-cycle'
import { DownloadCVButton } from '@/components/ui/download-cv-button'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Animated gradient background for text
  const [gradientPosition, setGradientPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the window
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight

      setGradientPosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const titles = [
    "Backend-First Engineer",
    "APIs & Integrations",
    "C#/.NET & React",
    "Reliable Systems",
    "Collaborative Teams",
  ]

  return (
<section
       ref={ref}
       className="relative min-h-[80vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden w-full pt-16 pb-10"
    >


      {/* Main content with parallax effect */}
       <motion.div style={{ y, opacity }} className="relative z-10 text-center space-y-4 mx-auto w-full max-w-4xl">
        {/* Animated name with gradient effect */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold"
        >
          <span className="gradient-text">
            Jonas Zacho Poulsen
          </span>
        </motion.h1>

        {/* Static headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-xl sm:text-2xl font-medium text-(--color-muted-foreground)"
        >
          Full-Stack / Backend Engineer
        </motion.p>

        {/* Animated title cycling */}
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold w-full min-h-[4rem] relative flex items-center justify-center">
          <div className="w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] text-center">
            <AnimatedTextCycle
              words={titles}
              interval={3000}
              className="text-foreground text-balance"
            />
          </div>
        </div>

        {/* Description with animated reveal */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-xl sm:text-2xl text-(--color-muted-foreground) max-w-2xl mx-auto"
        >
          I build reliable backend systems and integrations. Ownership-driven, collaborative, EU-based.
        </motion.p>

        {/* Call to action buttons with enhanced hover effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="flex flex-wrap gap-4 justify-center pt-2"
        >
          <motion.a
            href="#projects"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 25px -5px rgba(var(--primary-rgb), 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-(--color-primary) text-(--color-primary-foreground) rounded-sm font-medium transition-all"
            onClick={e => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View Projects
          </motion.a>
          <DownloadCVButton variant="outline" />
        </motion.div>

        {/* Social links with staggered animation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 1.8,
              },
            },
          }}
          className="flex gap-8 justify-center pt-4"
        >
          {[
            { href: 'mailto:jonaszp97@gmail.com', icon: EmailIcon, title: 'Email me' },
            { href: 'tel:+45-50-22-73-00', icon: PhoneIcon, title: 'Call me: +45 50 22 73 00' },
            {
              href: 'https://github.com/Jonas-Zacho-Poulsen',
              icon: GithubIcon,
              title: 'View my GitHub',
            },
            {
              href: 'https://www.linkedin.com/in/j-poulsen-/',
              icon: LinkedInIcon,
              title: 'Connect on LinkedIn',
            },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{
                scale: 1.2,
                color: 'var(--color-primary)',
                rotate: [0, -10, 10, -10, 0],
              }}
              className="text-(--color-muted-foreground) transition-colors"
              title={social.title}
            >
              <social.icon />
            </motion.a>
          ))}
        </motion.div>

        {/* Availability signal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.5 }}
          className="text-sm text-(--color-muted-foreground) mt-4"
        >
          Open to onsite, hybrid, and remote roles (EU time zones)
        </motion.p>
      </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
          className="flex flex-col items-center"
        >
          <span className="text-sm text-(--color-muted-foreground) mb-2">Scroll Down</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-(--color-primary)"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
