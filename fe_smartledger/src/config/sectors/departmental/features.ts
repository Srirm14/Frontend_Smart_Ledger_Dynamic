// features.ts - Features enabled for departmental store
export const departmentalFeatures = {
  product: {
    enabled: true,
    name: 'Product',
    description: 'Manage retail products and categories',
    icon: 'ShoppingCart',
  },
  dashboard: {
    enabled: true,
    name: 'Dashboard',
    description: 'Manage retail sales and transactions',
    icon: 'ShoppingCart',
  },
  inventory: {
    enabled: true,
    name: 'Inventory', 
    description: 'Track product stock levels and suppliers',
    icon: 'Package',
  },
  staff: {
    enabled: false,
    name: 'Staff',
    description: 'Manage store staff and schedules',
    icon: 'Building2',
  },
  customer: {
    enabled: true,
    name: 'Customer',
    description: 'Manage customer accounts and preferences',
    icon: 'Building2',
  },
  credit: {
    enabled: true,
    name: 'Credit',
    description: 'Manage customer credit accounts',
    icon: 'CreditCard',
  },
  cashflow: {
    enabled: false,
    name: 'Cashflow',
    description: 'Track daily cash flow and expenses',
    icon: 'BarChart3',
  },
  reports: {
    enabled: true,
    name: 'Reports',
    description: 'Generate store performance reports',
    icon: 'BarChart3',
  },
} as const

export type departmentalFeatureKey = keyof typeof departmentalFeatures