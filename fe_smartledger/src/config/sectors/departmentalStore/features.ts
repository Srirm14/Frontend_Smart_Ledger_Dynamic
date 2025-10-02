// features.ts - Features enabled for departmental store
export const departmentalStoreFeatures = {
  product: {
    enabled: true,
    name: 'Product Management',
    description: 'Manage retail products and categories',
    icon: 'ShoppingCart',
  },
  sales: {
    enabled: true,
    name: 'Sales Management',
    description: 'Manage retail sales and transactions',
    icon: 'ShoppingCart',
  },
  inventory: {
    enabled: true,
    name: 'Inventory Management', 
    description: 'Track product stock levels and suppliers',
    icon: 'Package',
  },
  staff: {
    enabled: false,
    name: 'Staff Management',
    description: 'Manage store staff and schedules',
    icon: 'Building2',
  },
  customer: {
    enabled: true,
    name: 'Customer Management',
    description: 'Manage customer accounts and preferences',
    icon: 'Building2',
  },
  credit: {
    enabled: true,
    name: 'Credit Management',
    description: 'Manage customer credit accounts',
    icon: 'CreditCard',
  },
  cashflow: {
    enabled: false,
    name: 'Cash Flow Management',
    description: 'Track daily cash flow and expenses',
    icon: 'BarChart3',
  },
  reports: {
    enabled: true,
    name: 'Reports & Analytics',
    description: 'Generate store performance reports',
    icon: 'BarChart3',
  },
} as const

export type DepartmentalStoreFeatureKey = keyof typeof departmentalStoreFeatures