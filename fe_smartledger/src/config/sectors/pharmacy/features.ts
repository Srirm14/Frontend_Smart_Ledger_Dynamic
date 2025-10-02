// features.ts - Features enabled for pharmacy
export const pharmacyFeatures = {
  product: {
    enabled: true,
    name: 'Product Management',
    description: 'Manage medicine catalog and prescriptions',
    icon: 'ShoppingCart',
  },
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
  staff: {
    enabled: true,
    name: 'Staff Management',
    description: 'Manage pharmacy staff and pharmacists',
    icon: 'Building2',
  },
  customer: {
    enabled: true,
    name: 'Customer Management',
    description: 'Manage patient records and prescriptions',
    icon: 'Building2',
  },
  credit: {
    enabled: false,
    name: 'Credit Management',
    description: 'Manage customer credit accounts',
    icon: 'CreditCard',
  },
  cashflow: {
    enabled: false,
    name: 'Cash Flow Management',
    description: 'Track pharmacy cash flow and payments',
    icon: 'BarChart3',
  },
  tally: {
    enabled: true,
    name: 'Tally Integration',
    description: 'Sync with Tally accounting software',
    icon: 'BarChart3',
  },
  reports: {
    enabled: true,
    name: 'Reports & Analytics',
    description: 'Generate pharmacy performance reports',
    icon: 'BarChart3',
  },
} as const

export type PharmacyFeatureKey = keyof typeof pharmacyFeatures