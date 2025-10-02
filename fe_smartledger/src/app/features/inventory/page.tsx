import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { memo } from 'react'

const InventoryPage = memo(function InventoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
        <p className="text-gray-600 mt-2">Track and manage your inventory levels</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Items</CardTitle>
            <CardDescription>Items in inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-500">products</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock</CardTitle>
            <CardDescription>Items needing restock</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">0</p>
            <p className="text-sm text-gray-500">items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Value</CardTitle>
            <CardDescription>Inventory value</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">₹0</p>
            <p className="text-sm text-gray-500">worth of inventory</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Features</CardTitle>
          <CardDescription>Available inventory management tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">Inventory management features coming soon...</p>
            <p className="text-sm text-gray-400 mt-2">This will include stock tracking, purchase orders, and inventory reports</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
})

export default InventoryPage
