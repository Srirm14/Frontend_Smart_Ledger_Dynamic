// settings.ts - Sector constants/config
export const pharmacySettings = {
  name: 'Pharmacy',
  icon: 'Pill',
  currency: 'INR',
  defaultTaxRate: 0.12, // 12% GST for medicines
  medicineCategories: ['Prescription', 'OTC', 'Vitamins', 'Medical Devices'],
  paymentMethods: ['Cash', 'Card', 'UPI', 'Credit', 'Insurance'],
  businessHours: {
    open: '08:00',
    close: '22:00',
  },
  features: ['product', 'sales', 'inventory', 'staff', 'customer', 'credit', 'cashflow', 'tally', 'reports'],
} as const