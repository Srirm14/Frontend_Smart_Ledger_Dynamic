'use client'

import { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface SmartTableToolbarProps {
  children: ReactNode
  title?: string
  actions?: ReactNode
  className?: string
}

export function SmartTableToolbar({
  children,
  title = 'Actions',
  actions,
  className = ''
}: SmartTableToolbarProps) {
  return (
    <Card className={`shadow-lg border-0 bg-white rounded-lg flex-1 flex flex-col w-full max-w-full min-w-0 ${className}`}>
      {/* Toolbar Section */}
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
      
      {/* Table Content with proper padding */}
      <div className='bg-white p-6 rounded-b-lg flex-1 min-w-0'>
        {children}
      </div>
    </Card>
  )
}
