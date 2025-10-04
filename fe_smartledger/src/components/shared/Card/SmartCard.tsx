import React from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'

export interface SmartCardProps {
  children: React.ReactNode
  title?: string
  description?: string
  icon?: React.ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
  footerClassName?: string
  variant?: 'default' | 'outlined' | 'elevated' | 'flat'
  size?: 'sm' | 'md' | 'lg'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  border?: boolean
  shadow?: boolean
  footer?: React.ReactNode
  actions?: React.ReactNode
}

const variantStyles = {
  default: 'bg-white border border-gray-200',
  outlined: 'bg-white border-2 border-gray-300',
  elevated: 'bg-white border border-gray-200 shadow-lg',
  flat: 'bg-gray-50 border-0'
}

const sizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
}

export const SmartCard: React.FC<SmartCardProps> = ({
  children,
  title,
  description,
  icon,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  variant = 'default',
  size = 'md',
  padding = 'md',
  border = true,
  shadow = false,
  footer,
  actions,
}) => {
  const cardClasses = cn(
    'rounded-lg transition-all duration-200',
    variantStyles[variant],
    sizeStyles[size],
    !border && 'border-0',
    shadow && 'shadow-lg hover:shadow-xl',
    className
  )

  const headerClasses = cn(
    'flex items-center justify-between',
    headerClassName
  )

  const contentClasses = cn(
    paddingStyles[padding],
    contentClassName
  )

  const footerClasses = cn(
    'flex items-center justify-between pt-4 border-t border-gray-200',
    footerClassName
  )

  return (
    <Card className={cardClasses}>
      {(title || description || icon || actions) && (
        <CardHeader className={headerClasses}>
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="flex-shrink-0">
                {icon}
              </div>
            )}
            <div className="flex-1">
              {title && (
                <CardTitle className="flex items-center space-x-2">
                  <span>{title}</span>
                </CardTitle>
              )}
              {description && (
                <CardDescription className="mt-1">
                  {description}
                </CardDescription>
              )}
            </div>
          </div>
          {actions && (
            <div className="flex-shrink-0">
              {actions}
            </div>
          )}
        </CardHeader>
      )}
      
      <CardContent className={contentClasses}>
        {children}
      </CardContent>
      
      {footer && (
        <CardFooter className={footerClasses}>
          {footer}
        </CardFooter>
      )}
    </Card>
  )
}

// Predefined card variants for common use cases
export const InfoCard: React.FC<Omit<SmartCardProps, 'variant'> & { 
  variant?: 'info' | 'success' | 'warning' | 'error' 
}> = ({ variant = 'info', ...props }) => {
  const variantStyles = {
    info: 'border-l-4 border-l-blue-500 bg-blue-50/30',
    success: 'border-l-4 border-l-green-500 bg-green-50/30',
    warning: 'border-l-4 border-l-yellow-500 bg-yellow-50/30',
    error: 'border-l-4 border-l-red-500 bg-red-50/30'
  }

  return (
    <SmartCard
      {...props}
      className={cn(variantStyles[variant], props.className)}
    />
  )
}

export const MetricCard: React.FC<{
  title: string
  value: string | number
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  className?: string
}> = ({ title, value, icon, trend, trendValue, className }) => {
  const trendStyles = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  }

  return (
    <SmartCard
      variant="elevated"
      className={cn('hover:shadow-lg transition-shadow', className)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="p-2 bg-gray-100 rounded-lg">
              {icon}
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
        {trend && trendValue && (
          <div className={cn('text-sm font-medium', trendStyles[trend])}>
            {trend === 'up' && '↗'} {trend === 'down' && '↘'} {trendValue}
          </div>
        )}
      </div>
    </SmartCard>
  )
}

export default SmartCard
