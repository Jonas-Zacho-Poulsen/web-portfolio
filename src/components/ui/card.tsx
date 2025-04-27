/**
 * Card component
 * Reusable card component with animations
 */
"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { forwardRef, HTMLAttributes } from "react"

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Card variant
   */
  variant?: "default" | "bordered" | "elevated"
  /**
   * Whether to disable animations
   */
  disableAnimations?: boolean
  /**
   * Motion props for animation configuration
   */
  motionProps?: Omit<HTMLMotionProps<"div">, keyof HTMLAttributes<HTMLDivElement>>
}

/**
 * Card component with animations and variants
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    children, 
    className = "", 
    variant = "default", 
    disableAnimations = false,
    motionProps = {},
    ...props 
  }, ref) => {
    // Base classes
    const baseClasses = "rounded-lg overflow-hidden"
    
    // Variant classes
    const variantClasses = {
      default: "bg-card text-card-foreground",
      bordered: "bg-card text-card-foreground border border-border",
      elevated: "bg-card text-card-foreground shadow-md"
    }
    
    // Combine classes
    const cardClasses = `${baseClasses} ${variantClasses[variant]} ${className}`
    
    // Animation props
    const cardAnimations = !disableAnimations ? {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 }
    } : {}
    
    return (
      <motion.div
        ref={ref}
        className={cardClasses}
        {...cardAnimations}
        {...props as any} // Type assertion to avoid event handler type conflicts
        {...motionProps}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = "Card"

export default Card