'use client'

import { ReactNode } from 'react'
import { Card, CardHeader } from '@/components/ui/card'

interface SmartContentHeaderProps {
  icon: ReactNode
  title: string
  subtitle: string
  stats?: Array<{
    label: string
    value: number | string
    color?: 'default' | 'green' | 'gray' | 'red' | 'blue'
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
      case 'green':
        return 'text-green-600'
      case 'gray':
        return 'text-gray-500'
      case 'red':
        return 'text-red-600'
      case 'blue':
        return 'text-blue-600'
      default:
        return 'text-gray-700'
    }
  }

  return (
    <Card className={`border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 ${className}`}>
      <CardHeader className='pb-4'>
        <div className='flex items-center space-x-4'>
          <div className='p-3 bg-blue-100 rounded-xl'>
            {icon}
          </div>
          <div>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
              {title}
            </h1>
            <p className='text-gray-600 mt-1'>
              {subtitle}
            </p>
            {stats.length > 0 && (
              <div className='flex items-center space-x-4 mt-2'>
                {stats.map((stat, index) => (
                  <div key={index} className='text-sm text-gray-500'>
                    <span className={`font-semibold ${getStatColor(stat.color)}`}>
                      {stat.value}
                    </span> {stat.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
