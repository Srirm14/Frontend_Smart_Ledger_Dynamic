// settings.ts - Sector constants/config
export const departmentalStoreSettings = {
  name: 'Departmental Store',
  icon: 'Store',
  currency: 'INR',
  defaultTaxRate: 0.18, // 18% GST
  productCategories: ['Groceries', 'Electronics', 'Clothing', 'Home & Garden'],
  paymentMethods: ['Cash', 'Card', 'UPI', 'Credit'],
  businessHours: {
    open: '08:00',
    close: '21:00',
  },
  features: ['sales', 'inventory', 'credit'],
} as const