'use client'

import React from 'react'
import { 
  FormInput, 
  FormTextarea, 
  FormSelect, 
  FormRadioGroup, 
  FormCheckbox, 
  FormAutocomplete 
} from '@/components/shared/Inputs'

// Formily component wrappers with proper props handling
export const FormilyInput = (props: any) => {
  const error = props.errors?.[0]?.message || props.selfErrors?.[0]?.message
  const required = props.required || false
  
  return React.createElement(FormInput, {
    ...props,
    value: props.value ?? '',
    error: error,
    required: required,
    label: props.title,
    name: props.name,
  })
}

export const FormilyTextarea = (props: any) => {
  const error = props.errors?.[0]?.message || props.selfErrors?.[0]?.message
  const required = props.required || false
  
  return React.createElement(FormTextarea, {
    ...props,
    value: props.value ?? '',
    error: error,
    required: required,
    label: props.title,
    name: props.name,
  })
}

export const FormilySelect = (props: any) => {
  const error = props.errors?.[0]?.message || props.selfErrors?.[0]?.message
  const required = props.required || false
  
  return React.createElement(FormSelect, {
    ...props,
    value: props.value ?? '',
    error: error,
    required: required,
    label: props.title,
    name: props.name,
  })
}

export const FormilyRadioGroup = (props: any) => {
  const error = props.errors?.[0]?.message || props.selfErrors?.[0]?.message
  const required = props.required || false
  
  return React.createElement(FormRadioGroup, {
    ...props,
    value: props.value ?? '',
    error: error,
    required: required,
    label: props.title,
    name: props.name,
  })
}

export const FormilyCheckbox = (props: any) => {
  const error = props.errors?.[0]?.message || props.selfErrors?.[0]?.message
  const required = props.required || false
  
  return React.createElement(FormCheckbox, {
    ...props,
    checked: props.checked ?? false,
    error: error,
    required: required,
    label: props.title,
    name: props.name,
  })
}

export const FormilyAutocomplete = (props: any) => {
  const error = props.errors?.[0]?.message || props.selfErrors?.[0]?.message
  const required = props.required || false
  
  return React.createElement(FormAutocomplete, {
    ...props,
    value: props.value ?? '',
    error: error,
    required: required,
    label: props.title,
    name: props.name,
  })
}

// Formily component registry
export const componentRegistry = {
  'x-input': FormilyInput,
  'x-textarea': FormilyTextarea,
  'x-select': FormilySelect,
  'x-radio-group': FormilyRadioGroup,
  'x-checkbox': FormilyCheckbox,
  'x-autocomplete': FormilyAutocomplete,
} as const

// Type for component registry keys
export type ComponentRegistryKey = keyof typeof componentRegistry
