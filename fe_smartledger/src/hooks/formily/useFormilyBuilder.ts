import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/react'
import { componentRegistry, ComponentRegistryKey } from './formily-components'
import { FormilySchema, UseFormilyBuilderOptions, FormilyBuilderReturn } from './formily-types'

export const useFormilyBuilder = ({
  schema,
  initialValues = {},
  onSubmit,
  onValuesChange,
}: UseFormilyBuilderOptions): FormilyBuilderReturn => {
  // Create form instance with memoization
  const form = useMemo(() => {
    return createForm({
      initialValues,
    })
  }, [initialValues])

  // Render individual field with proper component mapping
  const renderField = (fieldSchema: FormilySchema, key: string): React.ReactElement | null => {
    const componentKey = fieldSchema['x-component'] as ComponentRegistryKey
    const Component = componentRegistry[componentKey]
    
    if (!Component) {
      console.warn(`Component ${componentKey} not found in registry`)
      return null
    }

    // Calculate required state from validator
    const isRequired = fieldSchema['x-validator']?.some((v: any) => v.required) || false

    return React.createElement(Field, {
      key: key,
      name: fieldSchema.name,
      title: fieldSchema.title,
      component: [Component, {
        ...fieldSchema['x-component-props'],
        title: fieldSchema.title,
        name: fieldSchema.name,
        required: isRequired,
        disabled: fieldSchema['x-disabled'],
        readOnly: fieldSchema['x-read-pretty'],
      }],
      decorator: fieldSchema['x-decorator'] ? [fieldSchema['x-decorator']] : undefined,
      validator: fieldSchema['x-validator'],
      visible: !fieldSchema['x-hidden'],
    })
  }

  // Render schema structure (object with properties or single field)
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

  // FormProvider component factory
  const FormProviderComponent = () => 
    React.createElement(FormProvider, { form }, renderSchema(schema))

  return {
    form,
    FormProvider: FormProviderComponent,
    renderField,
    renderSchema,
  }
}