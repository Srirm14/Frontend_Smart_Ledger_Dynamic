// features.ts - Features enabled for petrol bunk
export const petrolBunkFeatures = {
  product: {
    enabled: false,
    name: 'Product Management',
    description: 'Manage fuel products and pricing',
    icon: 'ShoppingCart',
  },
  sales: {
    enabled: true,
    name: 'Sales Management',
    description: 'Manage fuel sales and transactions',
    icon: 'ShoppingCart',
  },
  inventory: {
    enabled: true,
    name: 'Inventory Management', 
    description: 'Track fuel stock levels and deliveries',
    icon: 'Package',
  },
  staff: {
    enabled: false,
    name: 'Staff Management',
    description: 'Manage petrol bunk staff and shifts',
    icon: 'Building2',
  },
  customer: {
    enabled: false,
    name: 'Customer Management',
    description: 'Manage customer accounts and loyalty',
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
    description: 'Track daily cash flow and payments',
    icon: 'BarChart3',
  },
  tally: {
    enabled: true,
    name: 'Tally Integration',
    description: 'Sync with Tally accounting software',
    icon: 'BarChart3',
  },
  reports: {
    enabled: false,
    name: 'Reports & Analytics',
    description: 'Generate business reports and insights',
    icon: 'BarChart3',
  },
} as const

export type PetrolBunkFeatureKey = keyof typeof petrolBunkFeatures
