import React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { LucideIcon } from 'lucide-react'

// Badge variants
export type BadgeVariant = 
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'success'
  | 'warning'
  | 'info'
  | 'primary'

// Badge sizes
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'

// Badge props interface
export interface SmartBadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  className?: string
  onClick?: () => void
  disabled?: boolean
}

// Variant styles mapping
const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  secondary: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  destructive: 'bg-red-100 text-red-800 hover:bg-red-200',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  success: 'bg-green-100 text-green-800 hover:bg-green-200',
  warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  info: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  primary: 'bg-primary-100 text-primary-800 hover:bg-primary-200',
}

// Size styles mapping
const sizeStyles: Record<BadgeSize, string> = {
  xs: 'px-1.5 py-0.5 text-xs',
  sm: 'px-2 py-1 text-xs',
  md: 'px-2.5 py-1.5 text-sm',
  lg: 'px-3 py-2 text-base',
}

// Icon size mapping
const iconSizes: Record<BadgeSize, string> = {
  xs: 'h-3 w-3',
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
}

export const SmartBadge: React.FC<SmartBadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  icon: Icon,
  iconPosition = 'left',
  className,
  onClick,
  disabled = false,
}) => {
  const baseClasses = 'inline-flex items-center gap-1 font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  const clickableClasses = onClick ? 'cursor-pointer' : ''
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : ''

  const badgeClasses = cn(
    baseClasses,
    variantStyles[variant],
    sizeStyles[size],
    clickableClasses,
    disabledClasses,
    className
  )

  const iconClasses = cn(
    iconSizes[size],
    'flex-shrink-0'
  )

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon className={iconClasses} />
      )}
      <span className="whitespace-nowrap">{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className={iconClasses} />
      )}
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        className={badgeClasses}
        onClick={handleClick}
        disabled={disabled}
      >
        {content}
      </button>
    )
  }

  return (
    <Badge className={badgeClasses}>
      {content}
    </Badge>
  )
}

// Predefined status badges for common use cases
export const StatusBadge: React.FC<{
  status: 'active' | 'inactive' | 'pending' | 'completed' | 'failed' | 'warning'
  size?: BadgeSize
  showIcon?: boolean
  className?: string
}> = ({ status, size = 'sm', showIcon = true, className }) => {
  const statusConfig = {
    active: {
      variant: 'success' as BadgeVariant,
      text: 'Active',
      icon: require('lucide-react').CheckCircle,
    },
    inactive: {
      variant: 'secondary' as BadgeVariant,
      text: 'Inactive',
      icon: require('lucide-react').XCircle,
    },
    pending: {
      variant: 'warning' as BadgeVariant,
      text: 'Pending',
      icon: require('lucide-react').Clock,
    },
    completed: {
      variant: 'success' as BadgeVariant,
      text: 'Completed',
      icon: require('lucide-react').CheckCircle,
    },
    failed: {
      variant: 'destructive' as BadgeVariant,
      text: 'Failed',
      icon: require('lucide-react').XCircle,
    },
    warning: {
      variant: 'warning' as BadgeVariant,
      text: 'Warning',
      icon: require('lucide-react').AlertTriangle,
    },
  }

  const config = statusConfig[status]

  return (
    <SmartBadge
      variant={config.variant}
      size={size}
      icon={showIcon ? config.icon : undefined}
      className={className}
    >
      {config.text}
    </SmartBadge>
  )
}

// Predefined availability badges
export const AvailabilityBadge: React.FC<{
  availability: 'in-stock' | 'limited' | 'out-of-stock'
  size?: BadgeSize
  showIcon?: boolean
  className?: string
}> = ({ availability, size = 'sm', showIcon = true, className }) => {
  const availabilityConfig = {
    'in-stock': {
      variant: 'success' as BadgeVariant,
      text: 'In Stock',
      icon: require('lucide-react').CheckCircle,
    },
    'limited': {
      variant: 'warning' as BadgeVariant,
      text: 'Limited',
      icon: require('lucide-react').AlertTriangle,
    },
    'out-of-stock': {
      variant: 'destructive' as BadgeVariant,
      text: 'Out of Stock',
      icon: require('lucide-react').XCircle,
    },
  }

  const config = availabilityConfig[availability]

  return (
    <SmartBadge
      variant={config.variant}
      size={size}
      icon={showIcon ? config.icon : undefined}
      className={className}
    >
      {config.text}
    </SmartBadge>
  )
}

// Predefined priority badges
export const PriorityBadge: React.FC<{
  priority: 'low' | 'medium' | 'high' | 'urgent'
  size?: BadgeSize
  showIcon?: boolean
  className?: string
}> = ({ priority, size = 'sm', showIcon = true, className }) => {
  const priorityConfig = {
    low: {
      variant: 'secondary' as BadgeVariant,
      text: 'Low',
      icon: require('lucide-react').ArrowDown,
    },
    medium: {
      variant: 'info' as BadgeVariant,
      text: 'Medium',
      icon: require('lucide-react').Minus,
    },
    high: {
      variant: 'warning' as BadgeVariant,
      text: 'High',
      icon: require('lucide-react').ArrowUp,
    },
    urgent: {
      variant: 'destructive' as BadgeVariant,
      text: 'Urgent',
      icon: require('lucide-react').AlertTriangle,
    },
  }

  const config = priorityConfig[priority]

  return (
    <SmartBadge
      variant={config.variant}
      size={size}
      icon={showIcon ? config.icon : undefined}
      className={className}
    >
      {config.text}
    </SmartBadge>
  )
}

// Export all badge components
export default SmartBadge
