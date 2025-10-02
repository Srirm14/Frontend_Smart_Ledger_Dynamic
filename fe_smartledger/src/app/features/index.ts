// Feature exports - using dynamic imports for better performance
export { default as ProductPage } from './product/page'
export { default as SalesPage } from './sales/page'
export { default as InventoryPage } from './inventory/page'
export { default as StaffPage } from './staff/page'
export { default as CustomerPage } from './customer/page'
export { default as CreditPage } from './credit/page'
export { default as CashFlowPage } from './cashflow/page'
export { default as TallyPage } from './tally/page'
export { default as ReportsPage } from './reports/page'

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
  product: {
    component: 'ProductPage',
    title: 'Product',
    description: 'Manage your product catalog and pricing',
    stats: [
      { label: "Total Products", value: "0", subtext: "active products", color: "text-blue-600" },
      { label: "Categories", value: "0", subtext: "categories", color: "text-green-600" },
      { label: "Low Stock", value: "0", subtext: "items", color: "text-orange-600" }
    ]
  },
  dashboard: {
    component: 'DashboardPage',
    title: 'Dashboard',
    description: 'Manage your sales transactions and customer orders',
    stats: [
      { label: "Today's Sales", value: "₹0", subtext: "0 transactions", color: "text-green-600" },
      { label: "This Month", value: "₹0", subtext: "0 transactions", color: "text-blue-600" },
      { label: "Total Customers", value: "0", subtext: "registered customers", color: "text-purple-600" }
    ]
  },
  inventory: {
    component: 'InventoryPage',
    title: 'Inventory',
    description: 'Track and manage your inventory levels',
    stats: [
      { label: "Total Items", value: "0", subtext: "products", color: "text-blue-600" },
      { label: "Low Stock", value: "0", subtext: "items", color: "text-orange-600" },
      { label: "Total Value", value: "₹0", subtext: "worth of inventory", color: "text-green-600" }
    ]
  },
  staff: {
    component: 'StaffPage',
    title: 'Staff',
    description: 'Manage your team members and their roles',
    stats: [
      { label: "Total Staff", value: "0", subtext: "employees", color: "text-blue-600" },
      { label: "Active Today", value: "0", subtext: "present", color: "text-green-600" },
      { label: "Roles", value: "0", subtext: "roles", color: "text-purple-600" }
    ]
  },
  customer: {
    component: 'CustomerPage',
    title: 'Customer',
    description: 'Manage your customer relationships and data',
    stats: [
      { label: "Total Customers", value: "0", subtext: "customers", color: "text-blue-600" },
      { label: "Active Customers", value: "0", subtext: "active", color: "text-green-600" },
      { label: "Credit Customers", value: "0", subtext: "credit accounts", color: "text-purple-600" }
    ]
  },
  credit: {
    component: 'CreditPage',
    title: 'Credit',
    description: 'Manage customer credit accounts and payments',
    stats: [
      { label: "Outstanding Credit", value: "₹0", subtext: "pending payments", color: "text-red-600" },
      { label: "Credit Customers", value: "0", subtext: "active accounts", color: "text-blue-600" },
      { label: "Overdue", value: "₹0", subtext: "overdue amount", color: "text-orange-600" }
    ]
  },
  cashflow: {
    component: 'CashFlowPage',
    title: 'Cashflow',
    description: 'Track your business cash flow and financial health',
    stats: [
      { label: "Cash In", value: "₹0", subtext: "received", color: "text-green-600" },
      { label: "Cash Out", value: "₹0", subtext: "spent", color: "text-red-600" },
      { label: "Net Cash Flow", value: "₹0", subtext: "net flow", color: "text-blue-600" }
    ]
  },
  tally: {
    component: 'TallyPage',
    title: 'Tally',
    description: 'Connect and sync with Tally accounting software',
    stats: [
      { label: "Connection Status", value: "❌", subtext: "Not connected", color: "text-red-600" },
      { label: "Last Sync", value: "--", subtext: "Never synced", color: "text-gray-600" },
      { label: "Sync Status", value: "--", subtext: "No data", color: "text-gray-600" }
    ]
  },
  reports: {
    component: 'ReportsPage',
    title: 'Reports',
    description: 'Generate comprehensive business reports and insights',
    stats: [
      { label: "Sales Reports", value: "0", subtext: "reports generated", color: "text-green-600" },
      { label: "Inventory Reports", value: "0", subtext: "reports available", color: "text-blue-600" },
      { label: "Financial Reports", value: "0", subtext: "reports ready", color: "text-purple-600" }
    ]
  }
} as const

export type FeatureKey = keyof typeof FEATURE_REGISTRY
