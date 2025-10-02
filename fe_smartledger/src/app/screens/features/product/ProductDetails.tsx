"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { memo, useState } from 'react'
import { ArrowLeft, Trash2 } from 'lucide-react'

// Mock data for demonstration
const mockProducts = [
  { id: 1, name: 'diesel001', category: 'Fuel', price: 103.00, uom: 'Ltr', status: 'Active', createdAt: 'Sep 17 2025, 12:00 AM', portfolio: 'Island1' },
  { id: 2, name: 'petrol1', category: 'Fuel', price: 105.80, uom: 'Ltr', status: 'Active', createdAt: 'Sep 18 2025, 12:00 AM', portfolio: 'Island2' },
  { id: 3, name: 'HSD', category: 'Fuel', price: 250.00, uom: 'Ltr', status: 'Active', createdAt: 'Sep 19 2025, 12:00 AM', portfolio: 'Island1' },
  { id: 4, name: 'test00909', category: 'Others', price: 230.45, uom: 'Ltr', status: 'Active', createdAt: 'Sep 20 2025, 12:00 AM', portfolio: 'Island3' },
  { id: 5, name: 'diesel', category: 'Fuel', price: 90.00, uom: 'Ltr', status: 'Active', createdAt: 'Sep 21 2025, 12:00 AM', portfolio: 'Island2' },
  { id: 6, name: 'testsnjnskndnhd', category: 'Others', price: 6.00, uom: 'Ltr', status: 'Active', createdAt: 'Sep 22 2025, 12:00 AM', portfolio: 'Island1' },
  { id: 7, name: 'petrol', category: 'Fuel', price: 12.00, uom: 'Ltr', status: 'Active', createdAt: 'Sep 23 2025, 12:00 AM', portfolio: 'Island3' },
  { id: 8, name: 'petrol', category: 'Fuel', price: 1000.00, uom: 'Ltr', status: 'Active', createdAt: 'Sep 24 2025, 12:00 AM', portfolio: 'Island2' },
  { id: 9, name: 'fruity', category: 'Others', price: 80.09, uom: 'Pcs', status: 'Inactive', createdAt: 'Sep 25 2025, 12:00 AM', portfolio: 'Island1' },
]

interface ProductDetailsProps {
  productId: string
  onBack?: () => void
}

const ProductDetails = memo(function ProductDetails({ productId, onBack }: ProductDetailsProps) {
  const [modifyPrice, setModifyPrice] = useState(false)
  const [selectedDate, setSelectedDate] = useState('2025-10-02')

  // Find the product by ID
  const product = mockProducts.find(p => p.id.toString() === productId)

  if (!product) {
    return (
      <div className="w-full space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="p-2" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Not Found</h1>
            <p className="text-gray-600 mt-2">The requested product could not be found</p>
          </div>
        </div>
      </div>
    )
  }

  const handleDelete = () => {
    console.log('Delete product:', product.id)
    // Handle delete action
  }

  return (
    <div className="w-full">
      {/* Product Information Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Product Information</CardTitle>
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
                <Label className="text-sm font-medium text-gray-700">Product Name</Label>
                <p className="text-lg font-semibold text-gray-900">{product.name}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Current Price</Label>
                <div className="flex items-center space-x-3">
                  <p className="text-lg font-semibold text-gray-900">₹{product.price.toFixed(2)} as of {selectedDate}</p>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="modify-price" className="text-sm">Modify Price</Label>
                    <Switch
                      id="modify-price"
                      checked={modifyPrice}
                      onCheckedChange={setModifyPrice}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Created At</Label>
                <p className="text-lg text-gray-900">{product.createdAt}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Status</Label>
                <Select defaultValue={product.status}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Category</Label>
                <p className="text-lg text-gray-900">{product.category}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">UOM</Label>
                <p className="text-lg text-gray-900">{product.uom}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Linked Portfolio</Label>
                <Button variant="outline" className="mt-2">
                  {product.portfolio}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
})

export default ProductDetails
