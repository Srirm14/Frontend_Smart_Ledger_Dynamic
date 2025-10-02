// Server-side features API endpoints
import { NextRequest, NextResponse } from 'next/server'

// Get all available features
export async function GET() {
  try {
    const features = [
      { id: 'product', name: 'Product', description: 'Manage products and pricing', icon: 'ShoppingCart' },
      { id: 'dashboard', name: 'Dashboard', description: 'Track sales and revenue', icon: 'ShoppingCart' },
      { id: 'inventory', name: 'Inventory', description: 'Manage stock levels', icon: 'Package' },
      { id: 'staff', name: 'Staff', description: 'Manage employees and shifts', icon: 'Building2' },
      { id: 'customer', name: 'Customer', description: 'Manage customer relationships', icon: 'Building2' },
      { id: 'credit', name: 'Credit', description: 'Manage customer credit accounts', icon: 'CreditCard' },
      { id: 'cashflow', name: 'Cashflow', description: 'Track daily cash flow', icon: 'BarChart3' },
      { id: 'tally', name: 'Tally', description: 'Sync with Tally software', icon: 'BarChart3' },
      { id: 'reports', name: 'Reports', description: 'Business reports and analytics', icon: 'BarChart3' }
    ]

    return NextResponse.json({ features })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch features' },
      { status: 500 }
    )
  }
}
