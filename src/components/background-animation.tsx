"use client"

/**
 * @module BackgroundAnimation
 * @description Interactive background animation with particles that react to mouse movement
 */

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { throttle } from '@/utils'

/**
 * Interactive canvas background with animated particles
 *
 * Features:
 * - Particles that move around the screen
 * - Particles connect with nearby particles
 * - Mouse interaction (particles move away from cursor)
 * - Responsive to window resizing
 * - Theme-aware (adapts to light/dark mode)
 *
 * @returns {JSX.Element} Canvas element with animated background
 */
export function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    let mouse = { x: 0, y: 0 }
    let mouseRadius = 150
    let hue = 0

    // Get primary color RGB values from CSS variable
    const getCSSVariable = (name: string) => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
      return value
    }

    class Particle {
      x: number
      y: number
      size: number
      baseSize: number
      speedX: number
      speedY: number
      color: string
      originalX: number
      originalY: number
      density: number

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.originalX = this.x
        this.originalY = this.y
        this.baseSize = Math.random() * 3 + 1
        this.size = this.baseSize
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.density = (Math.random() * 30) + 1

        // Create a gradient color based on the primary color
        const primaryRGB = getCSSVariable('--primary-rgb').split(',').map(Number)
        const r = primaryRGB[0] || 96
        const g = primaryRGB[1] || 165
        const b = primaryRGB[2] || 250

        // Add slight variation to each particle's color
        const variation = 30
        const rVariation = Math.max(0, Math.min(255, r + (Math.random() * variation - variation/2)))
        const gVariation = Math.max(0, Math.min(255, g + (Math.random() * variation - variation/2)))
        const bVariation = Math.max(0, Math.min(255, b + (Math.random() * variation - variation/2)))

        this.color = `rgba(${rVariation}, ${gVariation}, ${bVariation}, 0.7)`
      }

      update(canvasWidth: number, canvasHeight: number, mouse: {x: number, y: number}) {
        // Normal movement
        this.x += this.speedX
        this.y += this.speedY

        // Screen boundaries
        if (this.x > canvasWidth) this.x = 0
        else if (this.x < 0) this.x = canvasWidth
        if (this.y > canvasHeight) this.y = 0
        else if (this.y < 0) this.y = canvasHeight

        // Mouse interaction
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRadius) {
          // Particles move away from mouse
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const force = (mouseRadius - distance) / mouseRadius

          const directionX = forceDirectionX * force * this.density * -0.6
          const directionY = forceDirectionY * force * this.density * -0.6

          this.x += directionX
          this.y += directionY

          // Increase size when near mouse
          this.size = this.baseSize + (this.baseSize * force)
        } else {
          // Gradually return to original size
          if (this.size > this.baseSize) {
            this.size -= 0.1
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const init = () => {
      particles = []
      const numberOfParticles = (canvas.width * canvas.height) / 12000 // Slightly more particles
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height))
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Increment hue for color cycling effect
      hue = (hue + 0.2) % 360

      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height, mouse)
        particle.draw(ctx)

        // Draw connections with improved visuals
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const primaryRGB = getCSSVariable('--primary-rgb').split(',').map(Number)
            const r = primaryRGB[0] || 96
            const g = primaryRGB[1] || 165
            const b = primaryRGB[2] || 250
            const opacity = 0.15 * (1 - distance/120)

            // Create gradient for connections
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            )

            gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${Math.min(opacity * 1.5, 1)})`)
            gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${opacity})`)

            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.x
      mouse.y = event.y
    }

    const handleMouseLeave = () => {
      // Reset mouse position when cursor leaves the window
      mouse.x = -1000
      mouse.y = -1000
    }

    handleResize()
    animate()

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mounted, theme]) // Re-initialize when theme changes

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-screen w-screen bg-background/80 opacity-40"
    />
  )
}