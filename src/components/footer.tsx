'use client'

import { motion } from 'framer-motion'
import { EmailIcon, PhoneIcon, GithubIcon, LinkedInIcon } from '@/components/icons'
import { socialLinks } from '@/config'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Jonas Zacho Poulsen</h3>
            <p className="text-sm text-muted-foreground">
              Backend & Full-Stack Engineer specializing in C#/.NET, React, and scalable integrations.
            </p>
            <p className="text-xs text-muted-foreground">
              Open to onsite, hybrid, and remote roles in EU time zones.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.querySelector(`#${item.toLowerCase()}`)
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Connect</h3>
            <div className="flex flex-col space-y-3">
              {[
                { href: 'mailto:jonaszp97@gmail.com', icon: EmailIcon, label: 'jonaszp97@gmail.com' },
                { href: 'tel:+4550227300', icon: PhoneIcon, label: '+45 50 22 73 00' },
                { href: 'https://github.com/Jonas-Zacho-Poulsen', icon: GithubIcon, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/j-poulsen-/', icon: LinkedInIcon, label: 'LinkedIn' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Jonas Zacho Poulsen. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
