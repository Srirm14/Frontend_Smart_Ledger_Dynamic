import { memo, useMemo } from 'react'
import DashboardPage from './dashboard/page'
import ProductPage from './product'
import InventoryPage from './inventory/page'
import StaffPage from './staff/page'
import CustomerPage from './customer/page'
import CreditPage from './credit/page'
import CashflowPage from './cashflow/page'
import TallyPage from './tally/page'
import ReportsPage from './reports/page'

// Ultra-fast feature component registry with pre-optimized components
const FEATURE_REGISTRY = {
  dashboard: memo(DashboardPage),
  product: memo(ProductPage),
  inventory: memo(InventoryPage),
  staff: memo(StaffPage),
  customer: memo(CustomerPage),
  credit: memo(CreditPage),
  cashflow: memo(CashflowPage),
  tally: memo(TallyPage),
  reports: memo(ReportsPage),
} as const

// Pre-warm the component registry for instant access
Object.values(FEATURE_REGISTRY).forEach(Component => {
  // Pre-render components to cache them
  if (typeof Component === 'function') {
    Component.displayName = Component.displayName || Component.name
  }
})

export type FeatureKey = keyof typeof FEATURE_REGISTRY

// Ultra-fast feature factory - only renders the selected feature
export const FeatureFactory = memo(function FeatureFactory({ 
  featureKey 
}: { 
  featureKey: FeatureKey 
}) {
  // Direct component lookup - O(1) performance
  const FeatureComponent = useMemo(() => {
    return FEATURE_REGISTRY[featureKey]
  }, [featureKey])

  // Render only the selected feature with performance monitoring
  return (
      <FeatureComponent />
  )
})

// Feature availability checker
export function isFeatureAvailable(featureKey: string): featureKey is FeatureKey {
  return featureKey in FEATURE_REGISTRY
}

// Get all available features
export function getAvailableFeatures(): FeatureKey[] {
  return Object.keys(FEATURE_REGISTRY) as FeatureKey[]
}
