"use client"

import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { SmartContentHeader, SmartAppFooter, SmartButton } from '@/components/Shared'
import React, { memo, useState, useMemo, useCallback } from 'react'
import { 
  Trash2, 
  Calendar
} from 'lucide-react'
import { mockPetrolBunkProducts, type Product } from '@/data/mockProducts'

interface ProductDetailsProps {
  productId: string
  onBack?: () => void
}


const ProductDetails = memo(function ProductDetails({ productId, onBack }: ProductDetailsProps) {
  const [modifyPrice, setModifyPrice] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // Memoized product lookup
  const product = useMemo(() => 
    mockPetrolBunkProducts.find(p => p.id === productId),
    [productId]
  )

  // Memoized badge stats
  const badgeStats = useMemo(() => [
    { label: 'Price', value: product?.price || '0' },
    { label: 'Status', value: product?.is_active ? 'Active' : 'Inactive' }
  ], [product])

  // Memoized handlers
  const handleDelete = useCallback(() => {
    console.log('Delete product:', product?.id)
    // Handle delete action
  }, [product?.id])

  const handleSave = useCallback(() => {
    if (!hasChanges) return
    
    console.log('Saving product changes:', product?.id)
    // TODO: Implement actual save logic
    // - Validate form data
    // - Send API request
    // - Show success/error message
    // - Reset hasChanges state
    
    setHasChanges(false)
    alert('Product changes saved successfully!')
  }, [product?.id, hasChanges])

  // Memoized formatted date
  const formattedCreatedDate = useMemo(() => 
    product?.created_at ? new Date(product.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : 'N/A',
    [product?.created_at]
  )

  if (!product) {
    return (
      <div className="w-full max-w-full min-w-0 h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Product Not Found</h1>
            <p className="text-gray-600 mt-2">The requested product could not be found</p>
            {onBack && (
              <SmartButton variant="outlined" color="primary" className="mt-4" onClick={onBack}>
                Go Back
              </SmartButton>
            )}
          </div>
        </div>
        <SmartAppFooter />
      </div>
    )
  }

  return (
    <div className='w-full max-w-full min-w-0 min-h-[calc(100vh-60px)] flex flex-col'>
      {/* Smart Content Header - Fixed at top */}
      <div className='flex-shrink-0 px-4 pt-4 pb-0'>
        <SmartContentHeader
          variant="details"
          title="Product Details"
          className='mb-2'
          subtitle="Manage product information, pricing, and availability"
          onBack={onBack}
          badgeStats={badgeStats}
        />
      </div>

      {/* Scrollable Content Area */}
      <div className='flex-1 overflow-auto min-h-0 p-4 pt-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400'>
        <div className='space-y-6'>
          {/* Single Product Information Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            {/* Card Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Product Information</h3>
                <SmartButton 
                  variant="outlined" 
                  color="danger"
                  size="sm" 
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </SmartButton>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Product Name */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Product Name</Label>
                    <p className="text-lg text-gray-900">{product.product_name}</p>
                  </div>

                  {/* Current Price */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Current Price</Label>
                    <div className="flex items-center justify-between">
                      <p className="text-lg text-gray-900">₹{product.price} as of {formattedCreatedDate}</p>
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="modify-price" className="text-sm">Modify Price</Label>
                        <Switch
                          id="modify-price"
                          checked={modifyPrice}
                          onCheckedChange={(checked) => {
                            setModifyPrice(checked)
                            setHasChanges(true)
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Created At */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Created At</Label>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-900">{formattedCreatedDate}</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Status</Label>
                    <Select 
                      defaultValue={product.is_active ? "active" : "inactive"}
                      onValueChange={() => setHasChanges(true)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Category */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Category</Label>
                    <p className="text-lg text-gray-900">{product.category}</p>
                  </div>

                  {/* UOM */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">UOM</Label>
                    <p className="text-lg text-gray-900">{product.uom}</p>
                  </div>

                  {/* Linked Portfolio */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Linked Portfolio</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        Island3
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Island4
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer - Fixed at bottom */}
      <SmartAppFooter 
        variant="actions"
        onSave={handleSave}
        saveLabel="SAVE"
        saveDisabled={!hasChanges}
      />
    </div>
  )
})

export default ProductDetails

