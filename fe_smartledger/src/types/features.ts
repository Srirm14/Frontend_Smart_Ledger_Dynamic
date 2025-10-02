// Feature-specific types for dynamic module system

export interface FeatureRegistry {
  [key: string]: () => Promise<FeatureModule>
}

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
  aiConfig?: AIConfig
}

export interface AIConfig {
  enabled: boolean
  prompts: Record<string, string>
  capabilities: string[]
  integrations: string[]
}

export interface FeatureDefinition {
  id: string
  name: string
  description: string
  icon: string
  enabled: boolean
  category: 'core' | 'business' | 'integration' | 'ai'
  dependencies: string[]
  settings: Record<string, any>
  version: string
  aiGenerated?: boolean
  customPrompt?: string
}

export interface FeatureToggle {
  featureId: string
  enabled: boolean
  reason?: string
  userId?: string
  timestamp: Date
}

export interface FeatureUsage {
  featureId: string
  userId: string
  sessionId: string
  timestamp: Date
  duration: number
  actions: string[]
}
