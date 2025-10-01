// Feature exports - using dynamic imports for better performance
export { default as SalesPage } from './sales/page'
export { default as InventoryPage } from './inventory/page'
export { default as CreditPage } from './credit/page'
export { default as TallyPage } from './tally/page'

// Feature types
export interface FeatureConfig {
  title: string
  description: string
  stats: Array<{
    label: string
    value: string
    subtext: string
    color: string
  }>
}

// Feature registry
export const FEATURE_REGISTRY = {
  sales: {
    component: 'SalesPage',
    title: 'Sales Management',
    description: 'Manage your sales transactions and customer orders',
    stats: [
      { label: "Today's Sales", value: "₹0", subtext: "0 transactions", color: "text-green-600" },
      { label: "This Month", value: "₹0", subtext: "0 transactions", color: "text-blue-600" },
      { label: "Total Customers", value: "0", subtext: "registered customers", color: "text-purple-600" }
    ]
  },
  inventory: {
    component: 'InventoryPage',
    title: 'Inventory Management',
    description: 'Track and manage your inventory levels',
    stats: [
      { label: "Total Items", value: "0", subtext: "products", color: "text-blue-600" },
      { label: "Low Stock", value: "0", subtext: "items", color: "text-orange-600" },
      { label: "Total Value", value: "₹0", subtext: "worth of inventory", color: "text-green-600" }
    ]
  },
  credit: {
    component: 'CreditPage',
    title: 'Credit Management',
    description: 'Manage customer credit accounts and payments',
    stats: [
      { label: "Outstanding Credit", value: "₹0", subtext: "pending payments", color: "text-red-600" },
      { label: "Credit Customers", value: "0", subtext: "active accounts", color: "text-blue-600" },
      { label: "Overdue", value: "₹0", subtext: "overdue amount", color: "text-orange-600" }
    ]
  },
  tally: {
    component: 'TallyPage',
    title: 'Tally Integration',
    description: 'Connect and sync with Tally accounting software',
    stats: [
      { label: "Connection Status", value: "❌", subtext: "Not connected", color: "text-red-600" },
      { label: "Last Sync", value: "--", subtext: "Never synced", color: "text-gray-600" },
      { label: "Sync Status", value: "--", subtext: "No data", color: "text-gray-600" }
    ]
  }
} as const

export type FeatureKey = keyof typeof FEATURE_REGISTRY
