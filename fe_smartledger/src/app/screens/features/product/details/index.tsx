"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { memo, useState } from 'react'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { mockPetrolBunkProducts, type Product } from '@/data/mockProducts'

interface ProductDetailsProps {
  productId: string
  onBack?: () => void
}

const ProductDetails = memo(function ProductDetails({ productId, onBack }: ProductDetailsProps) {
  const [modifyPrice, setModifyPrice] = useState(false)
  const [selectedDate, setSelectedDate] = useState('2025-10-02')

  // Debug: Log the productId being passed
  console.log('ProductDetails received productId:', productId)
  console.log('Available product IDs:', mockPetrolBunkProducts.map(p => p.id))

  // Find the product by ID
  const product = mockPetrolBunkProducts.find(p => p.id === productId)

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
                <p className="text-lg font-semibold text-gray-900">{product.product_name}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Current Price</Label>
                <div className="flex items-center space-x-3">
                  <p className="text-lg font-semibold text-gray-900">₹{product.price} as of {selectedDate}</p>
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
                <p className="text-lg text-gray-900">{product.created_at ? new Date(product.created_at).toLocaleDateString() : 'N/A'}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Status</Label>
                <Select defaultValue={product.is_active ? 'Active' : 'Inactive'}>
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
                <p className="text-lg text-gray-900">{product.category || 'N/A'}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">UOM</Label>
                <p className="text-lg text-gray-900">{product.uom || 'N/A'}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">SKU</Label>
                <p className="text-lg text-gray-900">{product.sku || 'N/A'}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Supplier</Label>
                <p className="text-lg text-gray-900">{product.supplier || 'N/A'}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Stock Count</Label>
                <p className="text-lg text-gray-900">{product.stock_count || 0}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Availability</Label>
                <p className="text-lg text-gray-900">{product.availability}</p>
              </div>
            </div>
          </div>
          
          {/* Description Section */}
          {product.description && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Label className="text-sm font-medium text-gray-700">Description</Label>
              <p className="text-lg text-gray-900 mt-2">{product.description}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
})

export default ProductDetails

