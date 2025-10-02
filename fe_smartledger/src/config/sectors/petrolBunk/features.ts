// features.ts - Features enabled for petrol bunk
export const petrolBunkFeatures = {
  product: {
    enabled: true,
    name: 'Product',
    description: 'Manage fuel products and pricing',
    icon: 'ShoppingCart',
  },
  dashboard: {
    enabled: true,
    name: 'Dashboard',
    description: 'Manage fuel sales and transactions',
    icon: 'ShoppingCart',
  },
  inventory: {
    enabled: true,
    name: 'Inventory', 
    description: 'Track fuel stock levels and deliveries',
    icon: 'Package',
  },
  staff: {
    enabled: true,
    name: 'Staff',
    description: 'Manage petrol bunk staff and shifts',
    icon: 'Building2',
  },
  customer: {
    enabled: true,
    name: 'Customer',
    description: 'Manage customer accounts and loyalty',
    icon: 'Building2',
  },
  credit: {
    enabled: true,
    name: 'Credit',
    description: 'Manage customer credit accounts',
    icon: 'CreditCard',
  },
  cashflow: {
    enabled: true,
    name: 'Cashflow',
    description: 'Track daily cash flow and payments',
    icon: 'BarChart3',
  },
  tally: {
    enabled: true,
    name: 'Tally',
    description: 'Sync with Tally accounting software',
    icon: 'BarChart3',
  },
  reports: {
    enabled: true,
    name: 'Reports',
    description: 'Generate business reports and insights',
    icon: 'BarChart3',
  },
} as const

export type PetrolBunkFeatureKey = keyof typeof petrolBunkFeatures
