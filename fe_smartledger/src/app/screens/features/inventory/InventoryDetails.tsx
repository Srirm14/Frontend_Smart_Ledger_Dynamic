"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { memo, useState } from 'react'
import { Trash2, Package, AlertTriangle, TrendingUp } from 'lucide-react'

// Mock data for demonstration
const mockInventory = [
  { id: 1, name: 'Diesel Tank', category: 'Fuel Storage', quantity: 1500, unit: 'Ltr', status: 'In Stock', createdAt: 'Sep 17 2025, 12:00 AM', minThreshold: 100, maxCapacity: 2000 },
  { id: 2, name: 'Petrol Pump', category: 'Equipment', quantity: 2, unit: 'Pcs', status: 'Low Stock', createdAt: 'Sep 18 2025, 12:00 AM', minThreshold: 5, maxCapacity: 10 },
  { id: 3, name: 'Safety Gear', category: 'Safety', quantity: 0, unit: 'Pcs', status: 'Out of Stock', createdAt: 'Sep 19 2025, 12:00 AM', minThreshold: 10, maxCapacity: 50 },
]

interface InventoryDetailsProps {
  inventoryId: string
  onBack?: () => void
}

const InventoryDetails = memo(function InventoryDetails({ inventoryId, onBack }: InventoryDetailsProps) {
  const [selectedDate, setSelectedDate] = useState('2025-10-02')

  // Find the inventory item by ID
  const item = mockInventory.find(i => i.id.toString() === inventoryId)

  if (!item) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500">Inventory item not found</p>
        </CardContent>
      </Card>
    )
  }

  const handleDelete = () => {
    console.log('Delete inventory item:', item.id)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'text-green-600'
      case 'Low Stock': return 'text-orange-600'
      case 'Out of Stock': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="w-full">
      {/* Inventory Information Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Inventory Information</CardTitle>
          <Button variant="destructive" size="sm" className="flex items-center space-x-2" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Item Name</Label>
                <p className="text-lg font-semibold text-gray-900">{item.name}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Category</Label>
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-gray-500" />
                  <p className="text-lg text-gray-900">{item.category}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Current Quantity</Label>
                <p className="text-lg font-semibold text-gray-900">{item.quantity} {item.unit}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Status</Label>
                <div className="flex items-center space-x-2">
                  {item.status === 'Low Stock' && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                  {item.status === 'Out of Stock' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                  {item.status === 'In Stock' && <TrendingUp className="h-4 w-4 text-green-500" />}
                  <span className={`text-sm font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Minimum Threshold</Label>
                <p className="text-lg text-gray-900">{item.minThreshold} {item.unit}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Maximum Capacity</Label>
                <p className="text-lg text-gray-900">{item.maxCapacity} {item.unit}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Created At</Label>
                <p className="text-lg text-gray-900">{item.createdAt}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Stock Level</Label>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      item.status === 'Out of Stock' ? 'bg-red-500' :
                      item.status === 'Low Stock' ? 'bg-orange-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(item.quantity / item.maxCapacity) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {Math.round((item.quantity / item.maxCapacity) * 100)}% full
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
})

export default InventoryDetails

