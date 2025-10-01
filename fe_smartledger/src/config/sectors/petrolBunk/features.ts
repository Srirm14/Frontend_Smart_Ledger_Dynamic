// features.ts - Features enabled for petrol bunk
export const petrolBunkFeatures = {
  // sales: {
  //   enabled: false,
  //   name: 'Sales Management',
  //   description: 'Manage fuel sales and transactions',
  //   icon: 'ShoppingCart',
  // },
  inventory: {
    enabled: true,
    name: 'Inventory Management', 
    description: 'Track fuel stock levels and deliveries',
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

export type PetrolBunkFeatureKey = keyof typeof petrolBunkFeatures
