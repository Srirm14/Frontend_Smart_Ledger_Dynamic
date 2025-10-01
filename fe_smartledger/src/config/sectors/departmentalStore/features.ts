// features.ts - Features enabled for departmental store
export const departmentalStoreFeatures = {
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
  credit: {
    enabled: true,
    name: 'Credit Management',
    description: 'Manage customer credit accounts',
    icon: 'CreditCard',
  },
} as const

export type DepartmentalStoreFeatureKey = keyof typeof departmentalStoreFeatures