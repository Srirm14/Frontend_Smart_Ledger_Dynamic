import React from 'react'
import { cn } from '@/lib/utils'

// Link variants
export type LinkVariant = 
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'muted'

// Link sizes
export type LinkSize = 'xs' | 'sm' | 'md' | 'lg'

// Link props interface
export interface SmartLinkProps {
  children: React.ReactNode
  variant?: LinkVariant
  size?: LinkSize
  className?: string
  onClick?: () => void
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  disabled?: boolean
  underline?: boolean
  hoverUnderline?: boolean
}

// Variant styles mapping
const variantStyles: Record<LinkVariant, string> = {
  default: 'text-black hover:text-primary-600',
  primary: 'text-primary-600 hover:text-primary-700',
  secondary: 'text-gray-600 hover:text-gray-800',
  success: 'text-green-600 hover:text-green-700',
  warning: 'text-yellow-600 hover:text-yellow-700',
  destructive: 'text-red-600 hover:text-red-700',
  muted: 'text-gray-500 hover:text-gray-700',
}

// Size styles mapping
const sizeStyles: Record<LinkSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}

export const SmartLink: React.FC<SmartLinkProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className,
  onClick,
  href,
  target = '_self',
  disabled = false,
  underline = true,
  hoverUnderline = true,
}) => {
  const baseClasses = 'font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
  const underlineClasses = underline ? 'underline' : ''
  const hoverUnderlineClasses = hoverUnderline ? 'hover:underline' : ''
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

  const linkClasses = cn(
    baseClasses,
    variantStyles[variant],
    sizeStyles[size],
    underlineClasses,
    hoverUnderlineClasses,
    disabledClasses,
    className
  )

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  const content = children

  if (href && !disabled) {
    return (
      <a
        href={href}
        target={target}
        className={cn(linkClasses, 'whitespace-nowrap')}
        onClick={handleClick}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={cn(linkClasses, 'whitespace-nowrap')}
      onClick={handleClick}
      disabled={disabled}
    >
      {content}
    </button>
  )
}

// Predefined link components for common use cases
export const ProductLink: React.FC<{
  productName: string
  onClick?: () => void
  size?: LinkSize
  className?: string
}> = ({ productName, onClick, size = 'sm', className }) => {
  return (
    <SmartLink
      variant="default"
      size={size}
      onClick={onClick}
      className={className}
      underline={true}
      hoverUnderline={true}
    >
      {productName}
    </SmartLink>
  )
}

export const NavigationLink: React.FC<{
  children: React.ReactNode
  href: string
  variant?: LinkVariant
  size?: LinkSize
  className?: string
}> = ({ children, href, variant = 'primary', size = 'sm', className }) => {
  return (
    <SmartLink
      href={href}
      variant={variant}
      size={size}
      className={className}
      underline={true}
      hoverUnderline={true}
    >
      {children}
    </SmartLink>
  )
}

export const ActionLink: React.FC<{
  children: React.ReactNode
  onClick: () => void
  variant?: LinkVariant
  size?: LinkSize
  className?: string
  disabled?: boolean
}> = ({ children, onClick, variant = 'default', size = 'sm', className, disabled = false }) => {
  return (
    <SmartLink
      onClick={onClick}
      variant={variant}
      size={size}
      className={className}
      disabled={disabled}
      underline={true}
      hoverUnderline={true}
    >
      {children}
    </SmartLink>
  )
}

// Export all link components
export default SmartLink
