"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { EmailIcon, PhoneIcon, GithubIcon, LinkedInIcon } from "@/components/icons"

export function Hero() {
  return (
    <section className="min-h-[70vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold">
          Jonas Zacho Poulsen
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
          Full Stack Developer
        </h2>
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
        Passionate about solving real-world problems and making a difference. </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            View Projects
          </motion.a>
          <motion.a
            href="/Jonas_Poulsen_Software_Resume.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-primary text-primary rounded-lg font-medium"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV/Resume
          </motion.a>
        </div>

        <div className="flex gap-8 justify-center pt-8">
          <motion.a
            href="mailto:jonaszachopoulsen@live.dk"
            whileHover={{ scale: 1.1 }}
            className="text-muted-foreground hover:text-primary transition-colors"
            title="Email me"
          >
            <EmailIcon />
          </motion.a>
          <motion.a
            href="tel:+45-50-22-73-00"
            whileHover={{ scale: 1.1 }}
            className="text-muted-foreground hover:text-primary transition-colors"
            title="Call me: +45 50 22 73 00"
          >
            <PhoneIcon />
          </motion.a>
          <motion.a
            href="https://github.com/Jonas-Zacho-Poulsen"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="text-muted-foreground hover:text-primary transition-colors"
            title="View my GitHub"
          >
            <GithubIcon />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/j-poulsen-/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="text-muted-foreground hover:text-primary transition-colors"
            title="Connect on LinkedIn"
          >
            <LinkedInIcon />
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
