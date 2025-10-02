// settings.ts - Sector constants/config
export const departmentalStoreSettings = {
  name: 'Departmental',
  icon: 'Store',
  currency: 'INR',
  defaultTaxRate: 0.18, // 18% GST
  productCategories: ['Groceries', 'Electronics', 'Clothing', 'Home & Garden'],
  paymentMethods: ['Cash', 'Card', 'UPI', 'Credit'],
  businessHours: {
    open: '08:00',
    close: '21:00',
  },
  features: ['product', 'dashboard', 'inventory', 'staff', 'customer', 'credit', 'cashflow', 'reports'],
} as const