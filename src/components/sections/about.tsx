'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Typewriter } from '@/components/ui/typewriter'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function About() {
  const [imageError, setImageError] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const technologies = [
    ".NET/C#",
    "Python",
    "JavaScript",
    "Java",
    "SQL",
    "Node.js",
    "React",
    "TypeScript",
    "Next.js",
  ]

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 w-full mt-0">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
        className="max-w-5xl mx-auto w-full"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
          About Me
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div variants={item} className="flex-1 space-y-8 max-w-2xl mx-auto lg:mx-0">
            <div className="space-y-6 text-center lg:text-left">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I enjoy working on meaningful projects, learning, and collaborating with great
                people. My goal is to grow, contribute, and create solutions that matter.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With a strong foundation in both frontend and backend development, I specialize in
                building scalable applications using technologies like{" "}
                {isClient ? (
                  <Typewriter
                    text={technologies}
                    speed={70}
                    className="text-primary font-medium"
                    waitTime={1500}
                    deleteSpeed={40}
                    cursorChar="_"
                  />
                ) : (
                  <span className="text-primary font-medium">{technologies[0]}</span>
                )}
                {" "}and various cloud services.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <motion.a
                href="/Jonas_Poulsen_Software_Resume.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-colors hover:bg-primary/90"
              >
                Download CV/Resume
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 border border-primary text-primary rounded-lg text-sm font-medium transition-colors hover:bg-primary/5"
                onClick={e => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="relative w-full max-w-[220px] sm:max-w-[260px] aspect-square rounded-full overflow-hidden border-4 border-primary/20 shadow-lg mx-auto"
          >
            {!imageError ? (
              <Image
                src="https://i.imgur.com/27rWIav.jpeg"
                alt="Jonas Zacho Poulsen"
                width={350}
                height={350}
                className="w-full h-full object-cover"
                priority={true}
                sizes="(max-width: 640px) 220px, 260px"
                quality={85}
                loading="eager"
                fetchPriority="high"
                onError={() => setImageError(true)}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGERIhMUFRcf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AmzHMVs7vT5beW3EsSsVI3KCR7iqNAooP/9k="
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-secondary">
                <span className="text-6xl">👨‍💻</span>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
