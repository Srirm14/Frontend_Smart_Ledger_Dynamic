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

export interface FormilyBuilderReturn {
  form: any
  FormProvider: () => React.ReactElement
  renderField: (fieldSchema: FormilySchema, key: string) => React.ReactElement | null
  renderSchema: (schemaToRender: FormilySchema) => React.ReactNode
}
