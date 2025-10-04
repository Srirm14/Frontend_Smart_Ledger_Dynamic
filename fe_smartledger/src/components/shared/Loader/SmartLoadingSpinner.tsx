import { cn } from '@/lib/utils'

interface SmartLoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function SmartLoadingSpinner({ 
  size = 'md',
  className 
}: SmartLoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className={cn("flex items-center justify-center py-8", className)}>
      <div className={cn(
        "animate-spin rounded-full border-b-2 border-primary",
        sizeClasses[size]
      )}></div>
    </div>
  )
}

export default SmartLoadingSpinner
