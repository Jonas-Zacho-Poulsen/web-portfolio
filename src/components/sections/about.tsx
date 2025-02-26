"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function About() {
  const [imageError, setImageError] = useState(false)

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
          About Me
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div variants={item} className="space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
              I enjoy working on meaningful projects, learning, and collaborating with great people. 
              My goal is to grow, contribute, and create solutions that matter.
              </p>
              <p className="text-lg text-muted-foreground">
                With a strong foundation in both frontend and backend development,
                I specialize in building scalable applications using technologies
                like .NET, Python, Next.js, TypeScript, and various cloud services.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="/cv.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg"
              >
                Download CV
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 border border-primary text-primary rounded-lg"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="relative h-[300px] rounded-lg overflow-hidden bg-secondary/50 flex items-center justify-center"
          >
            {!imageError ? (
              <Image
                src="https://i.imgur.com/27rWIav.jpeg"
                alt="Jonas Zacho Poulsen"
                width={400}
                height={400}
                className="object-contain p-4 rounded-lg"
                priority
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
} 
