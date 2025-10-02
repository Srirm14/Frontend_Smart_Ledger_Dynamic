// settings.ts - Sector constants/config
export const petrolBunkSettings = {
  name: 'Petrol Bunk',
  icon: 'Building2',
  currency: 'INR',
  defaultTaxRate: 0.18, // 18% GST
  fuelTypes: ['Petrol', 'Diesel', 'CNG', 'LPG'],
  paymentMethods: ['Cash', 'Card', 'UPI', 'Credit'],
  businessHours: {
    open: '06:00',
    close: '22:00',
  },
  features: ['product', 'sales', 'inventory', 'staff', 'customer', 'credit', 'cashflow', 'tally', 'reports'],
} as const
