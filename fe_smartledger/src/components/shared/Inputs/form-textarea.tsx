'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface FormTextareaProps {
  label?: string
  required?: boolean
  error?: string
  className?: string
  id?: string
  [key: string]: any
}

export function FormTextarea({ 
  label, 
  required, 
  error, 
  className, 
  id,
  ...props 
}: FormTextareaProps) {
  const inputId = id || `textarea-${props.name || 'field'}`
  
  return (
    <div className="grid gap-3">
      {label && (
        <Label 
          htmlFor={inputId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <Textarea
        id={inputId}
        className={cn(error && "border-red-500 focus-visible:ring-red-500", className)}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  )
}
