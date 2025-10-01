'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

interface FormRadioGroupProps {
  label?: string
  required?: boolean
  error?: string
  className?: string
  id?: string
  options?: { value: string; label: string }[]
  [key: string]: any
}

export function FormRadioGroup({ 
  label, 
  required, 
  error, 
  className, 
  id,
  options = [],
  ...props 
}: FormRadioGroupProps) {
  const inputId = id || `radio-${props.name || 'field'}`
  
  return (
    <div className="grid gap-3">
      {label && (
        <Label 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <RadioGroup
        id={inputId}
        className={cn(error && "border-red-500", className)}
        {...props}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`${inputId}-${option.value}`} />
            <Label htmlFor={`${inputId}-${option.value}`} className="text-sm font-normal">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  )
}
