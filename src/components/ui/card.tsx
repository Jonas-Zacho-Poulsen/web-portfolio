/**
 * Card component
 * Reusable card component with variants
 */
"use client"

import { motion } from "framer-motion"
import { forwardRef, HTMLAttributes } from "react"

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Card variant
   */
  variant?: "default" | "outline" | "glass"
  /**
   * Whether to add hover effects
   */
  hoverable?: boolean
}

/**
 * Card component with animations and variants
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    className = "", 
    variant = "default", 
    hoverable = false,
    ...props 
  }, ref) => {
    // Base classes
    const baseClasses = "rounded-lg overflow-hidden"
    
    // Variant classes
    const variantClasses = {
      default: "bg-secondary/50 backdrop-blur-sm",
      outline: "border border-border",
      glass: "glass"
    }
    
    // Combine classes
    const cardClasses = `${baseClasses} ${variantClasses[variant]} ${className}`
    
    // Animation variants
    const cardAnimations = hoverable ? {
      whileHover: { y: -5, boxShadow: "0 10px 25px -5px rgba(var(--primary-rgb), 0.2)" },
      transition: { duration: 0.2 }
    } : {}
    
    return (
      <motion.div
        ref={ref}
        className={cardClasses}
        {...cardAnimations}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = "Card"

export default Card
