// Sector-specific types for multi-business support

export interface SectorDefinition {
  id: string
  name: string
  icon: string
  currency: string
  defaultTaxRate: number
  features: readonly string[]
  settings: SectorSettings
  isCustom: boolean
  createdBy?: string
  createdAt?: Date
  aiGenerated?: boolean
  customPrompt?: string
}

export interface SectorSettings {
  name: string
  icon: string
  currency: string
  defaultTaxRate: number
  businessType: string
  customFields: Record<string, any>
  integrations: IntegrationConfig[]
  aiSuggestions: AISuggestion[]
}

export interface IntegrationConfig {
  type: 'tally' | 'api' | 'webhook' | 'ai' | 'payment' | 'inventory'
  enabled: boolean
  config: Record<string, any>
  lastSync?: Date
  status: 'active' | 'inactive' | 'error' | 'pending'
}

export interface AISuggestion {
  type: 'feature' | 'setting' | 'integration' | 'workflow' | 'sector'
  suggestion: string
  reasoning: string
  confidence: number
  timestamp: Date
  applied: boolean
}

export interface SectorTemplate {
  id: string
  name: string
  description: string
  businessType: string
  features: string[]
  settings: Partial<SectorSettings>
  isDefault: boolean
  aiGenerated: boolean
}

export interface SectorMigration {
  fromVersion: string
  toVersion: string
  changes: SectorChange[]
  timestamp: Date
  applied: boolean
}

export interface SectorChange {
  type: 'add' | 'remove' | 'modify'
  field: string
  oldValue?: any
  newValue?: any
  reason: string
}
