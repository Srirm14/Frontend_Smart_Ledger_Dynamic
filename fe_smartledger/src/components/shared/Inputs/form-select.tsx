'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface FormSelectProps {
  label?: string
  required?: boolean
  error?: string
  className?: string
  id?: string
  options?: { value: string; label: string }[]
  placeholder?: string
  [key: string]: any
}

export function FormSelect({ 
  label, 
  required, 
  error, 
  className, 
  id,
  options = [],
  placeholder = "Select an option...",
  ...props 
}: FormSelectProps) {
  const inputId = id || `select-${props.name || 'field'}`
  
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
      
      <Select {...props}>
        <SelectTrigger 
          id={inputId}
          className={cn(error && "border-red-500 focus:ring-red-500", className)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  )
}
