'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export interface SmartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'text'
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'black'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  children: React.ReactNode
}

// Color variants mapping
const colorVariants = {
  primary: {
    filled: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    outlined: 'border-primary-500 text-primary-600 hover:bg-primary-50 hover:text-primary-700 focus:ring-primary-500',
    text: 'text-primary-600 hover:bg-primary-50 hover:text-primary-700 focus:ring-primary-500'
  },
  success: {
    filled: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    outlined: 'border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 focus:ring-green-500',
    text: 'text-green-600 hover:bg-green-50 hover:text-green-700 focus:ring-green-500'
  },
  warning: {
    filled: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500',
    outlined: 'border-yellow-500 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700 focus:ring-yellow-500',
    text: 'text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700 focus:ring-yellow-500'
  },
  danger: {
    filled: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outlined: 'border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 focus:ring-red-500',
    text: 'text-red-600 hover:bg-red-50 hover:text-red-700 focus:ring-red-500'
  },
  black: {
    filled: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500',
    outlined: 'border-gray-500 text-gray-900 hover:bg-gray-50 hover:text-gray-800 focus:ring-gray-500',
    text: 'text-gray-900 hover:bg-gray-50 hover:text-gray-800 focus:ring-gray-500'
  }
}

// Size variants mapping
const sizeVariants = {
  sm: 'px-3 py-1.5 text-sm font-medium',
  md: 'px-4 py-2 text-base font-semibold',
  lg: 'px-6 py-3 text-lg font-semibold'
}

export const SmartButton = forwardRef<HTMLButtonElement, SmartButtonProps>(
  ({ 
    variant = 'filled', 
    color = 'primary', 
    size = 'md', 
    loading = false, 
    disabled = false, 
    className = '', 
    children, 
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading

    const baseClasses = cn(
      // Base styles
      'inline-flex items-center justify-center rounded-md transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      
      // Size styles
      sizeVariants[size],
      
      // Variant and color styles
      variant === 'outlined' ? 'border' : '',
      colorVariants[color][variant],
      
      // Loading state
      loading && 'cursor-wait',
      
      // Custom className
      className
    )

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {children}
      </button>
    )
  }
)

SmartButton.displayName = 'SmartButton'

// Export individual variants for convenience
export const PrimaryButton = forwardRef<HTMLButtonElement, Omit<SmartButtonProps, 'color'>>(
  (props, ref) => <SmartButton ref={ref} color="primary" {...props} />
)

export const SuccessButton = forwardRef<HTMLButtonElement, Omit<SmartButtonProps, 'color'>>(
  (props, ref) => <SmartButton ref={ref} color="success" {...props} />
)

export const WarningButton = forwardRef<HTMLButtonElement, Omit<SmartButtonProps, 'color'>>(
  (props, ref) => <SmartButton ref={ref} color="warning" {...props} />
)

export const DangerButton = forwardRef<HTMLButtonElement, Omit<SmartButtonProps, 'color'>>(
  (props, ref) => <SmartButton ref={ref} color="danger" {...props} />
)

export const BlackButton = forwardRef<HTMLButtonElement, Omit<SmartButtonProps, 'color'>>(
  (props, ref) => <SmartButton ref={ref} color="black" {...props} />
)

PrimaryButton.displayName = 'PrimaryButton'
SuccessButton.displayName = 'SuccessButton'
WarningButton.displayName = 'WarningButton'
DangerButton.displayName = 'DangerButton'
BlackButton.displayName = 'BlackButton'
