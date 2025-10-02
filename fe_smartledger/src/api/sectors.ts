// Server-side sector API endpoints
import { NextRequest, NextResponse } from 'next/server'

// Get all sectors configuration
export async function GET() {
  try {
    const sectorsConfig = {
      sectors: [
        {
          id: 'petrolBunk',
          name: 'Petrol Bunk',
          icon: 'Building2',
          currency: 'INR',
          defaultTaxRate: 0.18,
          settings: {
            fuelTypes: ['Petrol', 'Diesel', 'CNG', 'LPG'],
            paymentMethods: ['Cash', 'Card', 'UPI', 'Credit'],
            businessHours: { open: '06:00', close: '22:00' }
          },
          features: {
            product: { enabled: false, name: 'Product', description: 'Manage fuel products and pricing', icon: 'ShoppingCart' },
            dashboard: { enabled: true, name: 'Dashboard', description: 'Manage fuel sales and transactions', icon: 'ShoppingCart' },
            inventory: { enabled: true, name: 'Inventory', description: 'Track fuel stock levels and deliveries', icon: 'Package' },
            staff: { enabled: false, name: 'Staff', description: 'Manage petrol bunk staff and shifts', icon: 'Building2' },
            customer: { enabled: false, name: 'Customer', description: 'Manage customer accounts and loyalty', icon: 'Building2' },
            credit: { enabled: true, name: 'Credit', description: 'Manage customer credit accounts', icon: 'CreditCard' },
            cashflow: { enabled: false, name: 'Cashflow', description: 'Track daily cash flow and payments', icon: 'BarChart3' },
            tally: { enabled: true, name: 'Tally', description: 'Sync with Tally accounting software', icon: 'BarChart3' },
            reports: { enabled: false, name: 'Reports', description: 'Generate business reports and insights', icon: 'BarChart3' }
          }
        },
        {
          id: 'pharmacy',
          name: 'Pharmacy',
          icon: 'Pill',
          currency: 'INR',
          defaultTaxRate: 0.12,
          settings: {
            medicineTypes: ['Prescription', 'OTC', 'Generic', 'Branded'],
            paymentMethods: ['Cash', 'Card', 'UPI', 'Insurance'],
            businessHours: { open: '08:00', close: '22:00' }
          },
          features: {
            product: { enabled: true, name: 'Product', description: 'Manage medicine inventory and prescriptions', icon: 'Pill' },
            dashboard: { enabled: true, name: 'Dashboard', description: 'Track medicine sales and prescriptions', icon: 'ShoppingCart' },
            inventory: { enabled: true, name: 'Inventory', description: 'Track medicine stock and expiry dates', icon: 'Package' },
            staff: { enabled: true, name: 'Staff', description: 'Manage pharmacy staff and pharmacists', icon: 'Building2' },
            customer: { enabled: true, name: 'Customer', description: 'Manage patient records and prescriptions', icon: 'Building2' },
            credit: { enabled: false, name: 'Credit', description: 'Manage credit accounts', icon: 'CreditCard' },
            cashflow: { enabled: true, name: 'Cashflow', description: 'Track daily revenue and payments', icon: 'BarChart3' },
            tally: { enabled: false, name: 'Tally', description: 'Sync with accounting software', icon: 'BarChart3' },
            reports: { enabled: true, name: 'Reports', description: 'Generate pharmacy reports and insights', icon: 'BarChart3' }
          }
        },
        {
          id: 'departmental',
          name: 'Departmental',
          icon: 'Store',
          currency: 'INR',
          defaultTaxRate: 0.18,
          settings: {
            categories: ['Groceries', 'Electronics', 'Clothing', 'Home & Garden'],
            paymentMethods: ['Cash', 'Card', 'UPI', 'Credit'],
            businessHours: { open: '09:00', close: '21:00' }
          },
          features: {
            product: { enabled: true, name: 'Product', description: 'Manage store products and categories', icon: 'ShoppingCart' },
            dashboard: { enabled: true, name: 'Dashboard', description: 'Track retail sales and transactions', icon: 'ShoppingCart' },
            inventory: { enabled: true, name: 'Inventory', description: 'Track product stock and suppliers', icon: 'Package' },
            staff: { enabled: true, name: 'Staff', description: 'Manage store employees and shifts', icon: 'Building2' },
            customer: { enabled: true, name: 'Customer', description: 'Manage customer loyalty and accounts', icon: 'Building2' },
            credit: { enabled: true, name: 'Credit', description: 'Manage customer credit accounts', icon: 'CreditCard' },
            cashflow: { enabled: true, name: 'Cashflow', description: 'Track daily revenue and expenses', icon: 'BarChart3' },
            tally: { enabled: true, name: 'Tally', description: 'Sync with accounting software', icon: 'BarChart3' },
            reports: { enabled: true, name: 'Reports', description: 'Generate retail reports and insights', icon: 'BarChart3' }
          }
        }
      ]
    }

    return NextResponse.json(sectorsConfig)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch sectors configuration' },
      { status: 500 }
    )
  }
}

// Create custom sector based on user selections
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sectorId, sectorName, selectedFeatures, aiGenerated, aiPrompt } = body

    // Generate sector config based on selections
    const sectorConfig = {
      id: sectorId || `custom_${Date.now()}`,
      name: sectorName,
      icon: 'Building2',
      currency: 'INR',
      defaultTaxRate: 0.18,
      settings: {
        businessType: sectorId || 'custom',
        customFields: {},
        integrations: [],
        aiGenerated: aiGenerated || false,
        aiPrompt: aiPrompt || null
      },
      features: {
        product: { enabled: selectedFeatures.includes('product'), name: 'Product', description: 'Manage products and pricing', icon: 'ShoppingCart' },
        dashboard: { enabled: selectedFeatures.includes('dashboard'), name: 'Dashboard', description: 'Track sales and revenue', icon: 'ShoppingCart' },
        inventory: { enabled: selectedFeatures.includes('inventory'), name: 'Inventory', description: 'Manage stock levels', icon: 'Package' },
        staff: { enabled: selectedFeatures.includes('staff'), name: 'Staff', description: 'Manage employees and shifts', icon: 'Building2' },
        customer: { enabled: selectedFeatures.includes('customer'), name: 'Customer', description: 'Manage customer relationships', icon: 'Building2' },
        credit: { enabled: selectedFeatures.includes('credit'), name: 'Credit', description: 'Manage customer credit accounts', icon: 'CreditCard' },
        cashflow: { enabled: selectedFeatures.includes('cashflow'), name: 'Cashflow', description: 'Track daily cash flow', icon: 'BarChart3' },
        tally: { enabled: selectedFeatures.includes('tally'), name: 'Tally', description: 'Sync with Tally software', icon: 'BarChart3' },
        reports: { enabled: selectedFeatures.includes('reports'), name: 'Reports', description: 'Business reports and analytics', icon: 'BarChart3' }
      }
    }

    // Update config files (in real implementation, this would update actual files)
    await updateConfigFiles(sectorConfig)

    return NextResponse.json({
      success: true,
      sector: sectorConfig,
      message: 'Custom sector created successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create custom sector' },
      { status: 500 }
    )
  }
}

// Update config files based on sector configuration
async function updateConfigFiles(sectorConfig: any) {
  // In a real implementation, this would:
  // 1. Update the sector's features.ts file with new enabled/disabled states
  // 2. Update the sector's settings.ts file with new settings
  // 3. Regenerate the sector configuration
  
  console.log('Config files updated for sector:', sectorConfig.id)
  console.log('Features updated:', sectorConfig.features)
  
  return {
    success: true,
    message: 'Config files updated successfully'
  }
}
