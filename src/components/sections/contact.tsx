'use client'

import { motion, AnimatePresence } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import { EmailIcon, PhoneIcon, GithubIcon, LinkedInIcon } from '@/components/icons'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ReCAPTCHA from 'react-google-recaptcha'

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

const socials = [
  {
    name: 'Email',
    value: 'jonaszp97@gmail.com',
    icon: EmailIcon,
    href: 'mailto:jonaszp97@gmail.com',
    ariaLabel: 'Send an email to Jonas',
  },
  {
    name: 'Phone',
    value: '+45 50 22 73 00',
    icon: PhoneIcon,
    href: 'tel:+4550227300',
    ariaLabel: 'Call Jonas at +45 50 22 73 00',
  },
  {
    name: 'GitHub',
    value: 'Jonas-Zacho-Poulsen',
    icon: GithubIcon,
    href: 'https://github.com/Jonas-Zacho-Poulsen',
    ariaLabel: "Visit Jonas' GitHub profile",
  },
  {
    name: 'LinkedIn',
    value: 'linkedin.com/in/j-poulsen-',
    icon: LinkedInIcon,
    href: 'https://www.linkedin.com/in/j-poulsen-',
    ariaLabel: 'Connect with Jonas on LinkedIn',
  },
]

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
  recaptchaToken: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

// Calendly types are defined in src/types/global.d.ts

export default function Contact() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)
  // State for form submission and UI feedback
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const recaptchaRef = React.useRef<ReCAPTCHA>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [isCalendlyReady, setIsCalendlyReady] = useState(false)

  // Form validation with react-hook-form and zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  // Handle Calendly events
  useEffect(() => {
    // Add event listener for Calendly events
    const handleCalendlyEvent = (e: any) => {
      if (e.data && e.data.event && e.data.event === 'calendly.close') {
        setIsCalendlyOpen(false)
        document.body.style.overflow = 'auto'
      }
    }

    window.addEventListener('message', handleCalendlyEvent)

    return () => {
      // Clean up on unmount
      window.removeEventListener('message', handleCalendlyEvent)
      if (isCalendlyOpen) {
        document.body.style.overflow = 'auto'
      }
    }
  }, [isCalendlyOpen])

  // Set Calendly as ready when component mounts
  useEffect(() => {
    // Import the loadCalendlyScript function from our shared component
    import('@/components/calendly').then(({ loadCalendlyScript }) => {
      loadCalendlyScript().then(() => {
        setIsCalendlyReady(true)
      })
    })
  }, [])

  // Simple toggle for Calendly modal
  const toggleCalendly = () => {
    const wasOpen = isCalendlyOpen
    setIsCalendlyOpen(!wasOpen)
    document.body.style.overflow = wasOpen ? 'auto' : 'hidden'

    // Force reflow to ensure the previous state is cleaned up
    if (wasOpen) {
      const container = document.getElementById('calendly-container')
      if (container) {
        container.innerHTML = ''
      }
    }
  }

  // Handle Calendly script loading and initialization
  useEffect(() => {
    if (!isCalendlyOpen || !isCalendlyReady) return

    // Clean up any existing iframes first
    const existingIframe = document.getElementById('calendly-iframe')
    if (existingIframe) {
      existingIframe.remove()
    }

    // Create and append the iframe
    const iframe = document.createElement('iframe')
    iframe.id = 'calendly-iframe'
    iframe.src =
      'https://calendly.com/jonaszp97?hide_gdpr_banner=1&background_color=ffffff&text_color=333333&primary_color=6366f1'
    iframe.width = '100%'
    iframe.height = '100%'
    iframe.title = 'Schedule a Meeting'
    iframe.style.border = 'none'
    iframe.style.display = 'block'
    iframe.style.background = 'white'

    const calendlyContainer = document.getElementById('calendly-container')
    if (calendlyContainer) {
      // Clear any existing content
      calendlyContainer.innerHTML = ''
      calendlyContainer.style.background = 'white'
      calendlyContainer.appendChild(iframe)
    }

    // Cleanup function
    return () => {
      if (iframe && iframe.parentNode) {
        iframe.parentNode.removeChild(iframe)
      }
      const container = document.getElementById('calendly-container')
      if (container) {
        container.innerHTML = ''
      }
    }
  }, [isCalendlyOpen, isCalendlyReady])

  // Hide success message after 5 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (showSuccessMessage) {
      timer = setTimeout(() => {
        setShowSuccessMessage(false)
      }, 5000)
    }
    return () => clearTimeout(timer)
  }, [showSuccessMessage])

  const onSubmit = async (data: FormValues) => {
    // Set form state for submission
    setError(null)
    setSent(false)

    try {
      // Verify reCAPTCHA if we're not in development mode
      if (process.env.NODE_ENV !== 'development' && !recaptchaToken) {
        // Execute reCAPTCHA verification
        const token = await recaptchaRef.current?.executeAsync()
        if (token) {
          setRecaptchaToken(token)
          data.recaptchaToken = token
        } else {
          setError('Please complete the reCAPTCHA verification')
          return
        }
      } else if (recaptchaToken) {
        // Use existing token if available
        data.recaptchaToken = recaptchaToken
      }

      // Add CSRF token from cookie if available
      const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1]

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken || '',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to send message')
      }

      setSent(true)
      setShowSuccessMessage(true)
      reset() // Reset form fields

      // Reset reCAPTCHA
      recaptchaRef.current?.reset()
      setRecaptchaToken(null)
    } catch (err) {
      console.error('Form submission error:', err)
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.')
      setSent(false)
    }
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16" id="contact">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
          Get in Touch
        </h2>

        <div className="space-y-16">
          {/* Meeting Section */}
          <motion.div variants={item} className="text-center">
            <h3 className="text-2xl font-semibold text-primary mb-6">Schedule a Meeting</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Book a time that works for you to discuss potential opportunities or collaborations.
              <span className="block mt-2 text-sm font-medium text-primary">
                I'll get back to you within 24 hours to confirm our meeting.
              </span>
            </p>
            <motion.button
              onClick={toggleCalendly}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 text-lg font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-all duration-300 shadow-md"
              aria-label="Open scheduling calendar"
            >
              Book a Meeting
            </motion.button>

            {/* Calendly Modal */}
            <AnimatePresence>
              {isCalendlyOpen && (
                <div className="fixed inset-0 z-50">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={toggleCalendly}
                  />
                  <div className="fixed inset-0 flex items-center justify-center p-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden"
                      style={{ height: '700px' }}
                      onClick={e => e.stopPropagation()}
                    >
                      <button
                        onClick={toggleCalendly}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        aria-label="Close"
                      >
                        <span className="text-2xl text-gray-700">×</span>
                      </button>

                      {/* Calendly container */}
                      <div
                        id="calendly-container"
                        className="w-full h-full bg-white"
                        style={{ minHeight: '650px' }}
                      />
                    </motion.div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Divider */}
          <motion.div variants={item} className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-sm text-muted-foreground">or</span>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-primary mb-6">Contact Information</h3>
              <p className="text-muted-foreground mb-6">
                Feel free to reach out through any of these channels. I'm always excited to discuss
                new opportunities and ideas
              </p>
              <div className="space-y-4">
                {socials.map(social => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target={
                      social.name === 'GitHub' || social.name === 'LinkedIn' ? '_blank' : undefined
                    }
                    rel={
                      social.name === 'GitHub' || social.name === 'LinkedIn'
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    whileHover={{
                      x: 5,
                      boxShadow:
                        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    }}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-secondary/50 backdrop-blur-sm hover:bg-secondary/70 transition-all duration-300"
                    aria-label={social.ariaLabel}
                  >
                    <div className="text-primary transition-transform duration-300 group-hover:scale-110">
                      <social.icon />
                    </div>
                    <div>
                      <p className="font-medium text-primary">{social.name}</p>
                      <p className="text-sm text-muted-foreground">{social.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="flex text-sm font-medium text-primary mb-1">
                    Name <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    {...register('name')}
                    className={`w-full px-4 py-3 rounded-lg bg-secondary/50 border ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-border focus:border-primary focus:ring-primary'} focus:outline-none focus:ring-1 transition-colors duration-200`}
                    aria-invalid={errors.name ? 'true' : 'false'}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="flex text-sm font-medium text-primary mb-1">
                    Email <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your.email@example.com"
                    {...register('email')}
                    className={`w-full px-4 py-3 rounded-lg bg-secondary/50 border ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-border focus:border-primary focus:ring-primary'} focus:outline-none focus:ring-1 transition-colors duration-200`}
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="flex text-sm font-medium text-primary mb-1">
                    Message <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    id="message"
                    placeholder="Your message here..."
                    {...register('message')}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg bg-secondary/50 border ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-border focus:border-primary focus:ring-primary'} focus:outline-none focus:ring-1 transition-colors duration-200`}
                    aria-invalid={errors.message ? 'true' : 'false'}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* reCAPTCHA - hidden until keys are provided */}
                {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY &&
                  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY !== 'your_recaptcha_site_key' && (
                    <div className="my-4">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        size="invisible"
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        onChange={token => setRecaptchaToken(token)}
                        onExpired={() => setRecaptchaToken(null)}
                        onErrored={() => setError('reCAPTCHA error occurred. Please try again.')}
                      />
                    </div>
                  )}

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-500 text-sm">{error}</p>
                  </div>
                )}

                {/* Success message */}
                <AnimatePresence>
                  {showSuccessMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-green-50 border border-green-200 rounded-md"
                    >
                      <p className="text-green-600 text-sm flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Message sent successfully! I'll get back to you within 24 hours.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || sent}
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 shadow-md"
                  aria-label="Send message"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : sent ? (
                    'Message Sent!'
                  ) : (
                    'Send Message'
                  )}
                </motion.button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Your information is securely processed and never shared with third parties.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
