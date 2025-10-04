'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SmartContentHeaderProps {
  icon: ReactNode
  title: string
  subtitle: string
  stats?: Array<{
    label: string
    value: number | string
    color?: 'default' | 'primary' | 'black'
  }>
  className?: string
}

export function SmartContentHeader({
  icon,
  title,
  subtitle,
  stats = [],
  className = ''
}: SmartContentHeaderProps) {
  const getStatColor = (color?: string) => {
    switch (color) {
      case 'primary':
        return 'text-primary-600'
      default:
        return 'text-black'
    }
  }

  return (
    <div className={cn(
      'sticky top-0 z-[999999] flex-1 border-0 shadow-sm bg-gradient-to-r from-primary-100 to-indigo-50 rounded-lg border border-primary-200',
      className
    )}>
      <div className='py-3 px-4'>
        <div className='flex items-center justify-between'>
          {/* Left side - Icon and Text */}
          <div className='flex items-center space-x-4'>
            <div className='p-2 bg-primary-100 rounded-lg'>
              {icon}
            </div>
            <div>
              <h1 className='text-xl font-semibold tracking-tight text-gray-900'>
                {title}
              </h1>
              <p className='text-gray-600 text-sm'>
                {subtitle}
              </p>
            </div>
          </div>
          
          {/* Right side - Stats */}
          {stats.length > 0 && (
            <div className='flex items-center space-x-6'>
              {stats.map((stat, index) => (
                <div key={index} className='text-sm text-gray-500'>
                  <span className={`font-semibold ${getStatColor(stat.color)}`}>
                    {stat.value}
                  </span> <span className='text-sm font-medium'>{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
