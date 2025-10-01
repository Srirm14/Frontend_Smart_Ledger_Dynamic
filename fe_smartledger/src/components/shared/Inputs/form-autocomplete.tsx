'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Autocomplete } from '@/components/ui/autocomplete'
import { cn } from '@/lib/utils'

interface FormAutocompleteProps {
  label?: string
  required?: boolean
  error?: string
  className?: string
  id?: string
  options?: { value: string; label: string }[]
  placeholder?: string
  [key: string]: any
}

export function FormAutocomplete({ 
  label, 
  required, 
  error, 
  className, 
  id,
  options = [],
  placeholder = "Search...",
  ...props 
}: FormAutocompleteProps) {
  const inputId = id || `autocomplete-${props.name || 'field'}`
  
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
      
      <Autocomplete
        options={options}
        placeholder={placeholder}
        className={cn(error && "border-red-500 focus:ring-red-500", className)}
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
