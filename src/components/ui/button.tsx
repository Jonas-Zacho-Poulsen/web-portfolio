/**
 * Button component
 * Reusable button component with variants and animations
 */
'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { forwardRef, ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Whether to show loading state
   */
  isLoading?: boolean
  /**
   * Icon to show before button text
   */
  leftIcon?: React.ReactNode
  /**
   * Icon to show after button text
   */
  rightIcon?: React.ReactNode
  /**
   * Motion props for animation configuration
   */
  motionProps?: Omit<HTMLMotionProps<'button'>, keyof ButtonHTMLAttributes<HTMLButtonElement>>
}

/**
 * Button component with animations and variants
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      motionProps = {},
      ...props
    },
    ref
  ) => {
    // Base classes
    const baseClasses =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50'

    // Size classes
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    // Variant classes
    const variantClasses = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
      outline: 'border border-primary text-primary hover:bg-primary/10',
      ghost: 'text-foreground hover:bg-muted',
    }

    // Combine classes
    const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`

    // Animation props
    const animationProps = {
      whileHover: !disabled && !isLoading ? { scale: 1.02 } : undefined,
      whileTap: !disabled && !isLoading ? { scale: 0.98 } : undefined,
    }

    return (
      <motion.button
        ref={ref}
        className={buttonClasses}
        disabled={isLoading || disabled}
        {...animationProps}
        {...(props as any)} // Type assertion to avoid event handler type conflicts
        {...motionProps}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
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
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}

        {children}

        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button
