import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { RadioGroup } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Autocomplete } from '@/components/ui/autocomplete'

// Formily component wrappers
const FormilyInput = (props: any) => React.createElement(Input, { ...props, value: props.value ?? '' })
const FormilyTextarea = (props: any) => React.createElement(Textarea, { ...props, value: props.value ?? '' })
const FormilySelect = (props: any) => React.createElement(Select, { ...props, value: props.value ?? '' })
const FormilyRadioGroup = (props: any) => React.createElement(RadioGroup, { ...props, value: props.value ?? '' })
const FormilyCheckbox = (props: any) => React.createElement(Checkbox, { ...props, checked: props.checked ?? false })
const FormilyAutocomplete = (props: any) => React.createElement(Autocomplete, { ...props, value: props.value ?? '' })

// Formily component registry
const componentRegistry = {
  'x-input': FormilyInput,
  'x-textarea': FormilyTextarea,
  'x-select': FormilySelect,
  'x-radio-group': FormilyRadioGroup,
  'x-checkbox': FormilyCheckbox,
  'x-autocomplete': FormilyAutocomplete,
}

// Schema type definitions
export interface FormilySchema {
  type: string
  name: string
  title?: string
  'x-component': string
  'x-component-props'?: Record<string, any>
  'x-decorator'?: string
  'x-decorator-props'?: Record<string, any>
  'x-reactions'?: Array<{
    dependencies: string[]
    fulfill: {
      state?: Record<string, any>
      schema?: Record<string, any>
    }
  }>
  'x-disabled'?: boolean
  'x-read-pretty'?: boolean
  'x-hidden'?: boolean
  'x-validator'?: Array<{
    required?: boolean
    message?: string
    pattern?: RegExp
    min?: number
    max?: number
    email?: boolean
    url?: boolean
    phone?: boolean
  }>
  properties?: Record<string, FormilySchema>
  items?: FormilySchema
}

export interface UseFormilyBuilderOptions {
  schema: FormilySchema
  initialValues?: Record<string, any>
  onSubmit?: (values: Record<string, any>) => void
  onValuesChange?: (values: Record<string, any>) => void
}

export const useFormilyBuilder = ({
  schema,
  initialValues = {},
  onSubmit,
  onValuesChange,
}: UseFormilyBuilderOptions) => {
  const form = useMemo(() => {
    const formInstance = createForm({
      initialValues,
    })

    return formInstance
  }, [initialValues])

  const renderField = (fieldSchema: FormilySchema, key: string) => {
    const Component = componentRegistry[fieldSchema['x-component'] as keyof typeof componentRegistry]
    
    if (!Component) {
      console.warn(`Component ${fieldSchema['x-component']} not found in registry`)
      return null
    }

    return React.createElement(Field, {
      key: key,
      name: fieldSchema.name,
      title: fieldSchema.title,
      component: [Component, {
        ...fieldSchema['x-component-props'],
        disabled: fieldSchema['x-disabled'],
        readOnly: fieldSchema['x-read-pretty'],
      }],
      decorator: fieldSchema['x-decorator'] ? [fieldSchema['x-decorator']] : undefined,
      validator: fieldSchema['x-validator'],
      visible: !fieldSchema['x-hidden'],
    })
  }

  const renderSchema = (schemaToRender: FormilySchema): React.ReactNode => {
    if (schemaToRender.properties) {
      return Object.entries(schemaToRender.properties).map(([key, fieldSchema]) =>
        renderField(fieldSchema, key)
      )
    }

    if (schemaToRender.items) {
      return renderField(schemaToRender.items, 'items')
    }

    return renderField(schemaToRender, schemaToRender.name)
  }

  return {
    form,
    FormProvider: () => React.createElement(FormProvider, { form }, renderSchema(schema)),
    renderField,
    renderSchema,
  }
}