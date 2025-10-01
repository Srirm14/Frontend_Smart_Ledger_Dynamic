// Feature registry for dynamic module loading
export const featureRegistry = {
  sales: () => import('../features/sales'),
  inventory: () => import('../features/inventory'),
  credit: () => import('../features/credit'),
  tally: () => import('../features/tally'),
} as const

export type FeatureKey = keyof typeof featureRegistry

export interface FeatureModule {
  default: React.ComponentType<any>
  components?: Record<string, React.ComponentType<any>>
  hooks?: Record<string, Function>
  services?: Record<string, Function>
}

// Helper function to check if a feature is available
export const isFeatureAvailable = (featureKey: string): featureKey is FeatureKey => {
  return featureKey in featureRegistry
}

// Helper function to get feature display name
export const getFeatureDisplayName = (featureKey: FeatureKey): string => {
  const displayNames: Record<FeatureKey, string> = {
    sales: 'Sales Management',
    inventory: 'Inventory Management',
    credit: 'Credit Management',
    tally: 'Tally Integration',
  }
  return displayNames[featureKey] || featureKey
}
