// Server-side features API endpoints
import { NextRequest, NextResponse } from 'next/server'

// Get all available features
export async function GET() {
  try {
    const features = [
      { id: 'product', name: 'Product Management', description: 'Manage products and pricing', icon: 'ShoppingCart' },
      { id: 'sales', name: 'Sales Management', description: 'Track sales and revenue', icon: 'ShoppingCart' },
      { id: 'inventory', name: 'Inventory Management', description: 'Manage stock levels', icon: 'Package' },
      { id: 'staff', name: 'Staff Management', description: 'Manage employees and shifts', icon: 'Building2' },
      { id: 'customer', name: 'Customer Management', description: 'Manage customer relationships', icon: 'Building2' },
      { id: 'credit', name: 'Credit Management', description: 'Manage customer credit accounts', icon: 'CreditCard' },
      { id: 'cashflow', name: 'Cash Flow Management', description: 'Track daily cash flow', icon: 'BarChart3' },
      { id: 'tally', name: 'Tally Integration', description: 'Sync with Tally software', icon: 'BarChart3' },
      { id: 'reports', name: 'Reports & Analytics', description: 'Business reports and analytics', icon: 'BarChart3' }
    ]

    return NextResponse.json({ features })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch features' },
      { status: 500 }
    )
  }
}
