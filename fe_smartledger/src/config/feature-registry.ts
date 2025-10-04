// Feature registry for dynamic module loading
export const featureRegistry = {
  product: () => import('../app/screens/features/product/list'),
  // Only include features that actually exist with index.tsx files
  // dashboard: () => import('../app/screens/features/dashboard'),
  // inventory: () => import('../app/screens/features/inventory'),
  // staff: () => import('../app/screens/features/staff'),
  // customer: () => import('../app/screens/features/customer'),
  // credit: () => import('../app/screens/features/credit'),
  // cashflow: () => import('../app/screens/features/cashflow'),
  // tally: () => import('../app/screens/features/tally'),
  // reports: () => import('../app/screens/features/reports'),
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
    product: 'Product',
    // Add display names for other features as they're implemented
  }
  return displayNames[featureKey] || featureKey
}
