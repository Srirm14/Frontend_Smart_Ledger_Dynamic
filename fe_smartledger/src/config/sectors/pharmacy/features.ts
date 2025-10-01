// features.ts - Features enabled for pharmacy
export const pharmacyFeatures = {
  sales: {
    enabled: true,
    name: 'Sales Management',
    description: 'Manage medicine sales and prescriptions',
    icon: 'ShoppingCart',
  },
  inventory: {
    enabled: true,
    name: 'Inventory Management', 
    description: 'Track medicine stock and expiry dates',
    icon: 'Package',
  },
  credit: {
    enabled: true,
    name: 'Credit Management',
    description: 'Manage customer credit accounts',
    icon: 'CreditCard',
  },
  tally: {
    enabled: true,
    name: 'Tally Integration',
    description: 'Sync with Tally accounting software',
    icon: 'BarChart3',
  },
} as const

export type PharmacyFeatureKey = keyof typeof pharmacyFeatures