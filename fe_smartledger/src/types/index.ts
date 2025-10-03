// Centralized TypeScript types for the entire application
// This enables LLM-based code generation and maintains type safety

// Core Domain Types
export interface User {
  id: string
  username: string
  email?: string
  role: 'admin' | 'user' | 'manager'
  preferences: UserPreferences
  createdAt: Date
  updatedAt: Date
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  timezone: string
  notifications: NotificationSettings
  customizations: Record<string, any>
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  inApp: boolean
  frequency: 'instant' | 'daily' | 'weekly'
}

// Sector & Feature Types
export interface Sector {
  id: string
  name: string
  icon: string
  currency: string
  defaultTaxRate: number
  features: readonly string[]
  settings: SectorSettings
  isCustom?: boolean
  createdBy?: string
  createdAt?: Date
}

export interface SectorSettings {
  name: string
  icon: string
  currency: string
  defaultTaxRate: number
  businessType: string
  customFields?: Record<string, any>
  integrations?: IntegrationConfig[]
}

export interface IntegrationConfig {
  type: 'tally' | 'api' | 'webhook' | 'ai'
  enabled: boolean
  config: Record<string, any>
  lastSync?: Date
}

export interface Feature {
  id: string
  name: string
  description: string
  icon: string
  enabled: boolean
  category: 'core' | 'business' | 'integration' | 'ai'
  dependencies?: string[]
  settings?: Record<string, any>
  version?: string
}

// LLM & AI Types
export interface LLMConfig {
  provider: 'openai' | 'anthropic' | 'local' | 'custom'
  model: string
  apiKey?: string
  baseUrl?: string
  temperature: number
  maxTokens: number
  systemPrompt?: string
}

export interface LLMOnboardingRequest {
  businessType: string
  requirements: string[]
  preferences: Record<string, any>
  context?: string
}

export interface LLMOnboardingResponse {
  suggestedSector: Partial<Sector>
  suggestedFeatures: Feature[]
  customizations: Record<string, any>
  reasoning: string
  confidence: number
}

export interface AICustomization {
  type: 'sector' | 'feature' | 'ui' | 'workflow'
  prompt: string
  result: any
  timestamp: Date
  userId: string
}

// API Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  timestamp: Date
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// State Management Types
export interface AppState {
  user: User | null
  activeSector: Sector | null
  availableSectors: Sector[]
  isLoading: boolean
  error: string | null
}

export interface UIState {
  sidebarCollapsed: boolean
  theme: 'light' | 'dark' | 'system'
  modals: Record<string, boolean>
  notifications: Notification[]
}

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: Date
  read: boolean
  actions?: NotificationAction[]
}

export interface NotificationAction {
  label: string
  action: () => void
  variant?: 'default' | 'destructive'
}

// Form Types
export interface FormField {
  name: string
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'textarea'
  label: string
  placeholder?: string
  required?: boolean
  validation?: ValidationRule[]
  options?: SelectOption[]
}

export interface ValidationRule {
  type: 'required' | 'email' | 'min' | 'max' | 'pattern'
  value?: any
  message: string
}

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

// Feature Module Types
export interface FeatureModule {
  default: React.ComponentType<any>
  components?: Record<string, React.ComponentType<any>>
  hooks?: Record<string, Function>
  services?: Record<string, Function>
  schemas?: Record<string, any>
  config?: FeatureConfig
}

export interface FeatureConfig {
  name: string
  version: string
  dependencies: string[]
  permissions: string[]
  settings: Record<string, any>
}

// Real-time Types
export interface SocketEvent {
  type: string
  payload: any
  timestamp: Date
  userId?: string
}

export interface ChatMessage {
  id: string
  content: string
  role: 'user' | 'assistant' | 'system'
  timestamp: Date
  metadata?: Record<string, any>
}

// Export all types for easy importing
export * from './api'
export * from './features'
export * from './sectors'
export * from './table'
