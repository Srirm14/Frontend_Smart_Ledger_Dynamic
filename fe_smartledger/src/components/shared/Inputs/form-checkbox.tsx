'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

interface FormCheckboxProps {
  label?: string
  required?: boolean
  error?: string
  className?: string
  id?: string
  [key: string]: any
}

export function FormCheckbox({ 
  label, 
  required, 
  error, 
  className, 
  id,
  ...props 
}: FormCheckboxProps) {
  const inputId = id || `checkbox-${props.name || 'field'}`
  
  return (
    <div className="grid gap-3">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={inputId}
          className={cn(error && "border-red-500", className)}
          {...props}
        />
        {label && (
          <Label 
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  )
}
