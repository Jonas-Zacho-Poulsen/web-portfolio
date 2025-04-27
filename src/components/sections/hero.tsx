"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { EmailIcon, PhoneIcon, GithubIcon, LinkedInIcon } from "@/components/icons"

// Animated text typing effect
const TypedText = ({ text, className }: { text: string, className?: string }) => {
  const letters = Array.from(text)

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}



// Background decoration for hero section
const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl"></div>

      {/* Animated lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--accent-color)" stopOpacity="0.3" />
          </linearGradient>
          <style>
            {`
              :root {
                --primary-color: hsl(142, 76%, 36%);
                --accent-color: hsl(271, 91%, 65%);
              }
              @keyframes dash {
                to {
                  stroke-dashoffset: 1000;
                }
              }
              .animated-line {
                stroke-dasharray: 5;
                animation: dash 30s linear infinite;
              }
            `}
          </style>
        </defs>

        <line
          className="animated-line"
          x1="0" y1="20%" x2="100%" y2="80%"
          stroke="url(#heroGradient)"
          strokeWidth="1"
        />
        <line
          className="animated-line"
          x1="20%" y1="0" x2="80%" y2="100%"
          stroke="url(#heroGradient)"
          strokeWidth="1"
          style={{ animationDelay: "-5s" }}
        />
        <line
          className="animated-line"
          x1="80%" y1="0" x2="20%" y2="100%"
          stroke="url(#heroGradient)"
          strokeWidth="1"
          style={{ animationDelay: "-10s" }}
        />
      </svg>
    </div>
  )
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
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

  // Dynamic gradient style based on mouse position
  const gradientStyle = {
    backgroundImage: `radial-gradient(circle at ${gradientPosition.x * 100}% ${gradientPosition.y * 100}%, #19c37d, #8b5cf6, #3b82f6)`,
  }

  return (
    <section ref={ref} className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle background decoration */}
      <HeroBackground />

      {/* Main content with parallax effect */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center space-y-6 max-w-4xl"
      >
        {/* Animated name with gradient effect */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">Jonas Zacho Poulsen</span>
        </motion.h1>

        {/* Animated typing effect for title */}
        <TypedText
          text="Full Stack Developer"
          className="text-3xl sm:text-4xl md:text-5xl font-bold"
        />

        {/* Description with animated reveal */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto"
        >
          Passionate about building elegant solutions to complex problems with modern technologies.
        </motion.p>

        {/* Call to action buttons with enhanced hover effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="flex flex-wrap gap-4 justify-center pt-4"
        >
          <motion.a
            href="#projects"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(var(--primary-rgb), 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            View Projects
          </motion.a>
          <motion.a
            href="/Jonas_Poulsen_Software_Resume.pdf"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(var(--primary-rgb), 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-primary text-primary rounded-lg font-medium transition-all"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV/Resume
          </motion.a>
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
                delayChildren: 1.8
              }
            }
          }}
          className="flex gap-8 justify-center pt-8"
        >
          {[
            { href: "mailto:jonaszachopoulsen@live.dk", icon: EmailIcon, title: "Email me" },
            { href: "tel:+45-50-22-73-00", icon: PhoneIcon, title: "Call me: +45 50 22 73 00" },
            { href: "https://github.com/Jonas-Zacho-Poulsen", icon: GithubIcon, title: "View my GitHub" },
            { href: "https://www.linkedin.com/in/j-poulsen-/", icon: LinkedInIcon, title: "Connect on LinkedIn" }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{
                scale: 1.2,
                color: "hsl(var(--primary))",
                rotate: [0, -10, 10, -10, 0]
              }}
              className="text-muted-foreground transition-colors"
              title={social.title}
            >
              <social.icon />
            </motion.a>
          ))}
        </motion.div>
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
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          className="flex flex-col items-center"
        >
          <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
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
            className="text-primary"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
