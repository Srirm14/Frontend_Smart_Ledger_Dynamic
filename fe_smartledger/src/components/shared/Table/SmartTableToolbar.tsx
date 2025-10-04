'use client'

import { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface SmartTableToolbarProps {
  children: ReactNode
  title?: string
  actions?: ReactNode
  className?: string
  height?: string | number
  minTableHeight?: string | number
}

export function SmartTableToolbar({
  children,
  title = 'Actions',
  actions,
  className = '',
  height,
  minTableHeight
}: SmartTableToolbarProps) {
  // Only apply manual height when explicitly provided
  const cardStyle = height ? { height: typeof height === 'number' ? `${height}px` : height } : {}
  
  // Only apply minimum table height when explicitly provided
  const tableStyle = minTableHeight ? { minHeight: typeof minTableHeight === 'number' ? `${minTableHeight}px` : minTableHeight } : {}
  
  return (
    <Card 
      className={`shadow-lg border-0 bg-white rounded-lg flex flex-col w-full max-w-full min-w-0 ${className}`}
      style={cardStyle}
    >
      {/* Toolbar Section - Natural height */}
      {(title || actions) && (
        <div className='flex items-center justify-between bg-white p-4 rounded-t-lg border-b flex-shrink-0'>
          <div className='flex items-center space-x-2'>
            <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
          </div>
          {actions && (
            <div className='flex items-center space-x-3'>
              {actions}
            </div>
          )}
        </div>
      )}
      
      {/* Table Content - Flexible height based on available space */}
      <div 
        className='bg-white px-6 py-4 rounded-b-lg flex-1 min-w-0 overflow-hidden min-h-0'
        style={tableStyle}
      >
        <div className='h-full w-full overflow-auto'>
          {children}
        </div>
      </div>
    </Card>
  )
}
