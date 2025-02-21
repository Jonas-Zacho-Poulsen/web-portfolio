"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { EmailIcon, PhoneIcon, GithubIcon, LinkedInIcon } from "@/components/icons"

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

const socials = [
  {
    name: "Email",
    value: "jonaszachopoulsen@live.dk",
    icon: EmailIcon,
    href: "mailto:jonaszachopoulsen@live.dk"
  },
  {
    name: "Phone",
    value: "+45 50 22 73 00",
    icon: PhoneIcon,
    href: "tel:+4550227300"
  },
  {
    name: "GitHub",
    value: "Jonas-Zacho-Poulsen",
    icon: GithubIcon,
    href: "https://github.com/Jonas-Zacho-Poulsen"
  },
  {
    name: "LinkedIn",
    value: "j-poulsen",
    icon: LinkedInIcon,
    href: "https://www.linkedin.com/in/j-poulsen-/"
  }
]

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    setSent(false)
    
    try {
      console.log('Submitting form with data:', formData)
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log('Response from server:', data)

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setSent(true)
      setFormData({ name: "", email: "", message: "" })
    } catch (err) {
      console.error('Form submission error:', err)
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again later.')
      setSent(false)
    } finally {
      setSending(false)
    }
  }

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
          Get in Touch
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div variants={item} className="space-y-8">
            <h3 className="text-2xl font-semibold text-primary">Contact Information</h3>
            <div className="space-y-4">
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target={social.name === "GitHub" || social.name === "LinkedIn" ? "_blank" : undefined}
                  rel={social.name === "GitHub" || social.name === "LinkedIn" ? "noopener noreferrer" : undefined}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-secondary/50 backdrop-blur-sm hover:bg-secondary/70 transition-colors"
                >
                  <social.icon />
                  <div>
                    <p className="font-medium text-primary">{social.name}</p>
                    <p className="text-sm text-muted-foreground">{social.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={item}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              
              {error && (
                <div className="text-red-500 text-sm">
                  {error}
                </div>
              )}
              
              <motion.button
                type="submit"
                disabled={sending || sent}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full px-8 py-3 rounded-lg font-medium ${
                  sent
                    ? "bg-green-500 text-white"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                {sending ? "Sending..." : sent ? "Message Sent!" : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}