// Server-side onboarding API endpoints
import { NextRequest, NextResponse } from 'next/server'

// Generate AI-powered sector and feature suggestions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt } = body

    // Mock AI response based on prompt
    const mockResponse = generateMockAIResponse(prompt)

    return NextResponse.json(mockResponse)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate AI suggestions' },
      { status: 500 }
    )
  }
}

function generateMockAIResponse(prompt: string) {
  const lowerPrompt = prompt.toLowerCase()
  
  // Determine business type and features based on prompt
  let businessType = 'Custom Business'
  let features = []
  let reasoning = ''

  if (lowerPrompt.includes('bakery') || lowerPrompt.includes('bread') || lowerPrompt.includes('cake')) {
    businessType = 'Bakery'
    features = [
      { id: 'sales', name: 'Sales Management', description: 'Track daily sales and revenue' },
      { id: 'inventory', name: 'Inventory Management', description: 'Manage ingredients and finished products' },
      { id: 'product', name: 'Product Management', description: 'Manage bread, cakes, and pastry items' },
      { id: 'customer', name: 'Customer Management', description: 'Track customer orders and preferences' },
      { id: 'reports', name: 'Reports & Analytics', description: 'Sales reports and profit analysis' }
    ]
    reasoning = 'Bakery businesses need sales tracking, ingredient inventory, product management, customer relationships, and financial reporting.'
  } else if (lowerPrompt.includes('restaurant') || lowerPrompt.includes('food') || lowerPrompt.includes('dining')) {
    businessType = 'Restaurant'
    features = [
      { id: 'sales', name: 'Sales Management', description: 'Track orders and daily revenue' },
      { id: 'inventory', name: 'Inventory Management', description: 'Manage food ingredients and supplies' },
      { id: 'product', name: 'Menu Management', description: 'Manage menu items and pricing' },
      { id: 'staff', name: 'Staff Management', description: 'Manage employees and shifts' },
      { id: 'customer', name: 'Customer Management', description: 'Track customer orders and feedback' },
      { id: 'reports', name: 'Reports & Analytics', description: 'Sales and profitability reports' }
    ]
    reasoning = 'Restaurants require comprehensive sales tracking, ingredient inventory, menu management, staff scheduling, customer service, and detailed reporting.'
  } else if (lowerPrompt.includes('retail') || lowerPrompt.includes('store') || lowerPrompt.includes('shop')) {
    businessType = 'Retail Store'
    features = [
      { id: 'sales', name: 'Sales Management', description: 'Track sales transactions' },
      { id: 'inventory', name: 'Inventory Management', description: 'Manage stock levels and products' },
      { id: 'product', name: 'Product Management', description: 'Manage product catalog' },
      { id: 'customer', name: 'Customer Management', description: 'Track customer purchases' },
      { id: 'credit', name: 'Credit Management', description: 'Manage customer credit accounts' },
      { id: 'reports', name: 'Reports & Analytics', description: 'Sales and inventory reports' }
    ]
    reasoning = 'Retail stores need sales tracking, inventory management, product catalog, customer relationships, credit management, and comprehensive reporting.'
  } else {
    // Generic business
    businessType = 'General Business'
    features = [
      { id: 'sales', name: 'Sales Management', description: 'Track sales and revenue' },
      { id: 'inventory', name: 'Inventory Management', description: 'Manage stock and products' },
      { id: 'product', name: 'Product Management', description: 'Manage product catalog' },
      { id: 'reports', name: 'Reports & Analytics', description: 'Business reports and analytics' }
    ]
    reasoning = 'Based on your requirements, I recommend core business features including sales tracking, inventory management, product management, and reporting.'
  }

  return {
    suggestedSector: {
      name: businessType,
      icon: 'Building2',
      currency: 'INR',
      defaultTaxRate: 18,
      settings: {
        businessType: businessType.toLowerCase().replace(' ', '_'),
        description: `AI-generated ${businessType} configuration`
      }
    },
    suggestedFeatures: features,
    customizations: {
      theme: 'light',
      currency: 'INR',
      taxRate: 18,
      businessType: businessType.toLowerCase().replace(' ', '_')
    },
    reasoning,
    confidence: 0.85,
    timestamp: new Date().toISOString()
  }
}
