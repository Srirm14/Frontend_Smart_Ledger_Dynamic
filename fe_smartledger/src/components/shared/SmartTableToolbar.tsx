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
    <Card className={`shadow-lg border-0 bg-white ${className}`}>
      {/* Toolbar Section */}
      {(title || actions) && (
        <div className='flex items-center justify-between bg-white p-4 rounded-t-lg border-b'>
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
      
      {/* Table Content */}
      <CardContent className='p-0'>
        <div className='bg-white rounded-lg overflow-hidden'>
          {children}
        </div>
      </CardContent>
    </Card>
  )
}
