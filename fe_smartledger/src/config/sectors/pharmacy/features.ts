// features.ts - Features enabled for pharmacy
export const pharmacyFeatures = {
  product: {
    enabled: true,
    name: 'Product',
    description: 'Manage medicine catalog and prescriptions',
    icon: 'ShoppingCart',
  },
  dashboard: {
    enabled: true,
    name: 'Dashboard',
    description: 'Manage medicine sales and prescriptions',
    icon: 'ShoppingCart',
  },
  inventory: {
    enabled: true,
    name: 'Inventory', 
    description: 'Track medicine stock and expiry dates',
    icon: 'Package',
  },
  staff: {
    enabled: true,
    name: 'Staff',
    description: 'Manage pharmacy staff and pharmacists',
    icon: 'Building2',
  },
  customer: {
    enabled: true,
    name: 'Customer',
    description: 'Manage patient records and prescriptions',
    icon: 'Building2',
  },
  credit: {
    enabled: false,
    name: 'Credit',
    description: 'Manage customer credit accounts',
    icon: 'CreditCard',
  },
  cashflow: {
    enabled: false,
    name: 'Cashflow',
    description: 'Track pharmacy cash flow and payments',
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
    description: 'Generate pharmacy performance reports',
    icon: 'BarChart3',
  },
} as const

export type PharmacyFeatureKey = keyof typeof pharmacyFeatures