// Mock data for petrol bunk related products
export interface Product {
  id: string
  product_name: string
  price: string
  availability: 'In Stock' | 'Out of Stock' | 'Limited'
  category?: string
  description?: string
  sku?: string
  created_at?: string
  updated_at?: string
  is_active?: boolean
  uom?: string // Unit of Measure
  supplier?: string
  stock_count?: number
}

export const mockPetrolBunkProducts: Product[] = [
  // Fuel Products
  {
    id: 'fuel-001',
    product_name: 'Premium Petrol',
    price: '95.50',
    availability: 'In Stock',
    category: 'Fuel',
    description: 'High-quality premium petrol for enhanced engine performance',
    sku: 'SKU-1',
    uom: 'Liters',
    supplier: 'Indian Oil Corporation',
    stock_count: 2500,
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-20T14:30:00Z',
    is_active: true
  },
  {
    id: 'fuel-002',
    product_name: 'Regular Petrol',
    price: '89.20',
    availability: 'In Stock',
    category: 'Fuel',
    description: 'Standard petrol for regular vehicles',
    sku: 'SKU-2',
    uom: 'Liters',
    supplier: 'Bharat Petroleum',
    stock_count: 3200,
    created_at: '2024-01-10T09:15:00Z',
    updated_at: '2024-01-19T11:45:00Z',
    is_active: true
  },
  {
    id: 'fuel-003',
    product_name: 'High-Speed Diesel',
    price: '87.40',
    availability: 'In Stock',
    category: 'Fuel',
    description: 'High-speed diesel for commercial vehicles',
    sku: 'SKU-3',
    uom: 'Liters',
    supplier: 'Hindustan Petroleum',
    stock_count: 1800,
    created_at: '2024-01-12T07:30:00Z',
    updated_at: '2024-01-18T16:20:00Z',
    is_active: true
  },
  {
    id: 'fuel-004',
    product_name: 'CNG Gas',
    price: '65.80',
    availability: 'Limited',
    category: 'Fuel',
    description: 'Compressed natural gas for eco-friendly vehicles',
    sku: 'SKU-4',
    uom: 'Kg',
    supplier: 'GAIL India',
    stock_count: 450,
    created_at: '2024-01-08T10:00:00Z',
    updated_at: '2024-01-17T13:15:00Z',
    is_active: true
  },
  {
    id: 'fuel-005',
    product_name: 'LPG Gas',
    price: '78.90',
    availability: 'In Stock',
    category: 'Fuel',
    description: 'Liquefied petroleum gas for automotive use',
    sku: 'SKU-5',
    uom: 'Kg',
    supplier: 'Indane Gas',
    stock_count: 320,
    created_at: '2024-01-05T12:30:00Z',
    updated_at: '2024-01-16T09:45:00Z',
    is_active: true
  },

  // Lubricants & Oils
  {
    id: 'lube-001',
    product_name: 'Synthetic Engine Oil',
    price: '850.00',
    availability: 'In Stock',
    category: 'Lubricants',
    description: 'High-performance synthetic engine oil',
    sku: 'SKU-6',
    uom: 'Liters',
    supplier: 'Castrol India',
    stock_count: 45,
    created_at: '2024-01-14T11:20:00Z',
    updated_at: '2024-01-21T08:30:00Z',
    is_active: true
  },
  {
    id: 'lube-002',
    product_name: 'Mineral Engine Oil',
    price: '420.00',
    availability: 'In Stock',
    category: 'Lubricants',
    description: 'Mineral-based engine oil for heavy-duty use',
    sku: 'SKU-7',
    uom: 'Liters',
    supplier: 'Shell India',
    stock_count: 68,
    created_at: '2024-01-11T14:45:00Z',
    updated_at: '2024-01-20T12:15:00Z',
    is_active: true
  },
  {
    id: 'lube-003',
    product_name: 'Gear Oil',
    price: '380.00',
    availability: 'In Stock',
    category: 'Lubricants',
    description: 'Heavy-duty gear oil for transmissions',
    sku: 'SKU-8',
    uom: 'Liters',
    supplier: 'Mobil India',
    stock_count: 32,
    created_at: '2024-01-09T16:30:00Z',
    updated_at: '2024-01-19T10:20:00Z',
    is_active: true
  },
  {
    id: 'lube-004',
    product_name: 'Brake Fluid',
    price: '180.00',
    availability: 'Limited',
    category: 'Lubricants',
    description: 'High-performance brake fluid',
    sku: 'SKU-9',
    uom: 'Liters',
    supplier: 'Bosch India',
    stock_count: 15,
    created_at: '2024-01-13T09:15:00Z',
    updated_at: '2024-01-21T15:45:00Z',
    is_active: true
  },
  {
    id: 'lube-005',
    product_name: 'Coolant',
    price: '320.00',
    availability: 'In Stock',
    category: 'Lubricants',
    description: 'Long-life coolant with antifreeze',
    sku: 'SKU-10',
    uom: 'Liters',
    supplier: 'Prestone India',
    stock_count: 28,
    created_at: '2024-01-07T13:20:00Z',
    updated_at: '2024-01-18T11:30:00Z',
    is_active: true
  },

  // Accessories & Parts
  {
    id: 'acc-001',
    product_name: 'Air Filter',
    price: '150.00',
    availability: 'In Stock',
    category: 'Accessories',
    description: 'High-quality air filter for engine',
    sku: 'SKU-11',
    uom: 'Pieces',
    supplier: 'Mahle India',
    stock_count: 120,
    created_at: '2024-01-16T10:45:00Z',
    updated_at: '2024-01-22T14:20:00Z',
    is_active: true
  },
  {
    id: 'acc-002',
    product_name: 'Oil Filter',
    price: '85.00',
    availability: 'In Stock',
    category: 'Accessories',
    description: 'Spin-on oil filter for engine protection',
    sku: 'SKU-12',
    uom: 'Pieces',
    supplier: 'Fram India',
    stock_count: 95,
    created_at: '2024-01-14T12:30:00Z',
    updated_at: '2024-01-21T09:15:00Z',
    is_active: true
  },
  {
    id: 'acc-003',
    product_name: 'Spark Plugs',
    price: '450.00',
    availability: 'In Stock',
    category: 'Accessories',
    description: 'Iridium spark plugs for better ignition',
    sku: 'SKU-13',
    uom: 'Sets',
    supplier: 'NGK India',
    stock_count: 35,
    created_at: '2024-01-12T15:20:00Z',
    updated_at: '2024-01-20T13:45:00Z',
    is_active: true
  },
  {
    id: 'acc-004',
    product_name: 'Wiper Blades',
    price: '280.00',
    availability: 'Limited',
    category: 'Accessories',
    description: 'Rubber wiper blades for windshield',
    sku: 'SKU-14',
    uom: 'Pairs',
    supplier: 'Bosch India',
    stock_count: 18,
    created_at: '2024-01-10T11:15:00Z',
    updated_at: '2024-01-19T16:30:00Z',
    is_active: true
  },
  {
    id: 'acc-005',
    product_name: 'Car Battery',
    price: '4500.00',
    availability: 'In Stock',
    category: 'Accessories',
    description: 'Maintenance-free car battery',
    sku: 'SKU-15',
    uom: 'Pieces',
    supplier: 'Exide India',
    stock_count: 8,
    created_at: '2024-01-06T14:00:00Z',
    updated_at: '2024-01-17T12:45:00Z',
    is_active: true
  },

  // Tyres & Wheels
  {
    id: 'tyre-001',
    product_name: 'Radial Tyre',
    price: '3200.00',
    availability: 'In Stock',
    category: 'Tyres',
    description: 'Premium radial tyre for passenger cars',
    sku: 'SKU-16',
    uom: 'Pieces',
    supplier: 'MRF India',
    stock_count: 12,
    created_at: '2024-01-18T09:30:00Z',
    updated_at: '2024-01-23T11:20:00Z',
    is_active: true
  },
  {
    id: 'tyre-002',
    product_name: 'Tubeless Tyre',
    price: '3800.00',
    availability: 'In Stock',
    category: 'Tyres',
    description: 'Tubeless radial tyre for cars',
    sku: 'SKU-17',
    uom: 'Pieces',
    supplier: 'Apollo Tyres',
    stock_count: 15,
    created_at: '2024-01-15T13:45:00Z',
    updated_at: '2024-01-22T08:15:00Z',
    is_active: true
  },
  {
    id: 'tyre-003',
    product_name: 'Commercial Tyre',
    price: '8500.00',
    availability: 'Limited',
    category: 'Tyres',
    description: 'Heavy-duty commercial vehicle tyre',
    sku: 'SKU-18',
    uom: 'Pieces',
    supplier: 'CEAT India',
    stock_count: 6,
    created_at: '2024-01-11T16:20:00Z',
    updated_at: '2024-01-20T14:30:00Z',
    is_active: true
  },
  {
    id: 'tyre-004',
    product_name: 'Alloy Wheel',
    price: '4500.00',
    availability: 'In Stock',
    category: 'Tyres',
    description: 'Lightweight alloy wheel',
    sku: 'SKU-19',
    uom: 'Pieces',
    supplier: 'Enkei India',
    stock_count: 8,
    created_at: '2024-01-13T12:15:00Z',
    updated_at: '2024-01-21T10:45:00Z',
    is_active: true
  },

  // Tools & Equipment
  {
    id: 'tool-001',
    product_name: 'Hydraulic Jack',
    price: '2800.00',
    availability: 'In Stock',
    category: 'Tools',
    description: 'Heavy-duty hydraulic jack for vehicle lifting',
    sku: 'SKU-20',
    uom: 'Pieces',
    supplier: 'Bosch India',
    stock_count: 5,
    created_at: '2024-01-17T10:30:00Z',
    updated_at: '2024-01-23T13:20:00Z',
    is_active: true
  },
  {
    id: 'tool-002',
    product_name: 'Pressure Gauge',
    price: '180.00',
    availability: 'In Stock',
    category: 'Tools',
    description: 'Digital pressure gauge for tires',
    sku: 'SKU-21',
    uom: 'Pieces',
    supplier: 'Michelin India',
    stock_count: 25,
    created_at: '2024-01-14T15:45:00Z',
    updated_at: '2024-01-22T09:30:00Z',
    is_active: true
  },
  {
    id: 'tool-003',
    product_name: 'Jump Starter',
    price: '3500.00',
    availability: 'Limited',
    category: 'Tools',
    description: 'Portable jump starter with compressor',
    sku: 'SKU-22',
    uom: 'Pieces',
    supplier: 'Stanley India',
    stock_count: 3,
    created_at: '2024-01-09T11:20:00Z',
    updated_at: '2024-01-19T15:45:00Z',
    is_active: true
  },
  {
    id: 'tool-004',
    product_name: 'OBD Scanner',
    price: '2200.00',
    availability: 'In Stock',
    category: 'Tools',
    description: 'Professional diagnostic scanner',
    sku: 'SKU-23',
    uom: 'Pieces',
    supplier: 'Autel India',
    stock_count: 4,
    created_at: '2024-01-12T14:15:00Z',
    updated_at: '2024-01-20T12:30:00Z',
    is_active: true
  },

  // Cleaning & Maintenance
  {
    id: 'clean-001',
    product_name: 'Car Shampoo',
    price: '120.00',
    availability: 'In Stock',
    category: 'Cleaning',
    description: 'pH-neutral car shampoo for safe cleaning',
    sku: 'SKU-24',
    uom: 'Liters',
    supplier: 'Turtle Wax India',
    stock_count: 45,
    created_at: '2024-01-16T08:45:00Z',
    updated_at: '2024-01-23T10:15:00Z',
    is_active: true
  },
  {
    id: 'clean-002',
    product_name: 'Tire Shine',
    price: '85.00',
    availability: 'In Stock',
    category: 'Cleaning',
    description: 'High-gloss tire shine spray',
    sku: 'SKU-25',
    uom: 'Pieces',
    supplier: 'Armor All India',
    stock_count: 38,
    created_at: '2024-01-13T12:30:00Z',
    updated_at: '2024-01-21T14:45:00Z',
    is_active: true
  },
  {
    id: 'clean-003',
    product_name: 'Dashboard Cleaner',
    price: '95.00',
    availability: 'In Stock',
    category: 'Cleaning',
    description: 'Non-greasy dashboard cleaner',
    sku: 'SKU-26',
    uom: 'Pieces',
    supplier: 'Meguiar\'s India',
    stock_count: 42,
    created_at: '2024-01-11T16:20:00Z',
    updated_at: '2024-01-20T11:30:00Z',
    is_active: true
  },
  {
    id: 'clean-004',
    product_name: 'Glass Cleaner',
    price: '65.00',
    availability: 'Limited',
    category: 'Cleaning',
    description: 'Streak-free glass cleaner',
    sku: 'SKU-27',
    uom: 'Pieces',
    supplier: 'Rain-X India',
    stock_count: 28,
    created_at: '2024-01-08T13:15:00Z',
    updated_at: '2024-01-18T16:20:00Z',
    is_active: true
  },

  // Inactive/Out of Stock Items
  {
    id: 'fuel-006',
    product_name: 'Ethanol Petrol',
    price: '92.30',
    availability: 'Out of Stock',
    category: 'Fuel',
    description: 'Ethanol blended petrol for environmental benefits',
    sku: 'SKU-28',
    uom: 'Liters',
    supplier: 'Indian Oil Corporation',
    stock_count: 0,
    created_at: '2024-01-03T10:00:00Z',
    updated_at: '2024-01-15T14:30:00Z',
    is_active: false
  },
  {
    id: 'lube-006',
    product_name: 'Transmission Fluid',
    price: '520.00',
    availability: 'Out of Stock',
    category: 'Lubricants',
    description: 'Automatic transmission fluid',
    sku: 'SKU-29',
    uom: 'Liters',
    supplier: 'Valvoline India',
    stock_count: 0,
    created_at: '2024-01-04T14:30:00Z',
    updated_at: '2024-01-16T09:45:00Z',
    is_active: false
  },
  {
    id: 'acc-006',
    product_name: 'LED Headlights',
    price: '1200.00',
    availability: 'Out of Stock',
    category: 'Accessories',
    description: 'High-brightness LED headlight bulbs',
    sku: 'SKU-30',
    uom: 'Pairs',
    supplier: 'Philips India',
    stock_count: 0,
    created_at: '2024-01-02T11:45:00Z',
    updated_at: '2024-01-14T13:20:00Z',
    is_active: false
  }
]

// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return mockPetrolBunkProducts.filter(product => product.category === category)
}

// Helper function to get active products only
export const getActiveProducts = (): Product[] => {
  return mockPetrolBunkProducts.filter(product => product.is_active !== false)
}

// Helper function to get products by availability
export const getProductsByAvailability = (availability: 'In Stock' | 'Out of Stock' | 'Limited'): Product[] => {
  return mockPetrolBunkProducts.filter(product => product.availability === availability)
}

// Helper function to search products
export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase()
  return mockPetrolBunkProducts.filter(product => 
    product.product_name.toLowerCase().includes(lowercaseQuery) ||
    product.description?.toLowerCase().includes(lowercaseQuery) ||
    product.sku?.toLowerCase().includes(lowercaseQuery) ||
    product.category?.toLowerCase().includes(lowercaseQuery)
  )
}
