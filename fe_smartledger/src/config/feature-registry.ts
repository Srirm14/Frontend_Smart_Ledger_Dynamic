// Feature registry for dynamic module loading
export const featureRegistry = {
  product: () => import('../app/features/product'),
  sales: () => import('../app/features/sales/page'),
  inventory: () => import('../app/features/inventory'),
  staff: () => import('../app/features/staff'),
  customer: () => import('../app/features/customer'),
  credit: () => import('../app/features/credit'),
  cashflow: () => import('../app/features/cashflow'),
  tally: () => import('../app/features/tally'),
  reports: () => import('../app/features/reports'),
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
    dashboard: 'Dashboard',
    inventory: 'Inventory',
    staff: 'Staff',
    customer: 'Customer',
    credit: 'Credit',
    cashflow: 'Cashflow',
    tally: 'Tally',
    reports: 'Reports',
  }
  return displayNames[featureKey] || featureKey
}
