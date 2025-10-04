'use client'

import { useEffect, useState, useCallback } from 'react'
import { TrashIcon, PlusIcon, PackageIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { SmartTable, SmartTableToolbar, SmartContentHeader, SmartAppFooter } from '@/components/Shared'
import { mockPetrolBunkProducts, type Product } from '@/data/mockProducts'
import { generateColumns, PRODUCT_LIST_COLUMNS } from '@/utils/Sector/PetrolBunk/Features/Product/ProductListSmartTableUtils'

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])

  // Event handlers
  const handleProductClick = (product: Product) => {
    console.log('Product clicked:', product)
    // Add your product click handler here
  }

  const handleEdit = (product: Product) => {
    console.log('Edit product:', product)
    // Implement edit functionality
  }

  const handleToggleStatus = (product: Product) => {
    setProducts(prev => 
      prev.map(p => 
        p.id === product.id 
          ? { ...p, is_active: !p.is_active }
          : p
      )
    )
  }

  const handleDelete = (product: Product) => {
    setProducts(prev => prev.filter(p => p.id !== product.id))
  }

  // Generate columns using utility
  const columns = generateColumns(PRODUCT_LIST_COLUMNS, {
    onProductClick: handleProductClick,
    onEdit: handleEdit,
    onToggleStatus: handleToggleStatus,
    onDelete: handleDelete,
    selectedItems: selectedProducts
  })

  // Load mock products data
  useEffect(() => {
    const loadProducts = () => {
      try {
        setLoading(true)
        // Simulate API delay
        setTimeout(() => {
          setProducts(mockPetrolBunkProducts)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error('Error loading products:', error)
        setProducts([])
        setLoading(false)
      }
    }

    loadProducts()
  }, [])



  // Handle row selection
  const handleRowSelect = useCallback((selectedRows: Product[]) => {
    setSelectedProducts(selectedRows)
  }, [])

  // Handle bulk delete
  const handleBulkDelete = useCallback(() => {
    if (selectedProducts.length === 0) return
    
    setProducts(prev => prev.filter(p => !selectedProducts.some(item => item.id === p.id)))
    setSelectedProducts([])
  }, [selectedProducts])


  return (
    <div className='w-full max-w-full min-w-0 h-full flex flex-col'>
      {/* Smart Content Header - Fixed at top */}
      <div className='flex-shrink-0 px-4 pt-4 pb-0'>
        <SmartContentHeader
          icon={<PackageIcon className='size-7 text-primary-500' />}
          title="Product Management"
          className='mb-2'
          subtitle="Manage your product inventory, pricing, and availability"
          stats={[
            { label: 'Total Products', value: products.length, color: 'default' },
            { label: 'Active', value: products.filter(p => p.is_active !== false).length, color: 'primary' },
            { label: 'Inactive', value: products.filter(p => p.is_active === false).length, color: 'default' }
          ]}
        />
      </div>

      {/* Scrollable Content Area */}
      <div className='flex-1 overflow-auto min-h-0 p-4 pt-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400'>
        <div className='space-y-6'>
          {/* Smart Table Toolbar with Actions */}
          <SmartTableToolbar
            title="Actions"
            selectedItems={selectedProducts}
            bulkActions={[
              {
                label: `Delete ${selectedProducts.length} Selected`,
                icon: <TrashIcon className="h-4 w-4" />,
                onClick: handleBulkDelete,
                variant: 'destructive'
              }
            ]}
            actions={
              <>
                <Button 
                  variant='outline' 
                  className='border-primary-200 text-primary-700 hover:bg-primary-50'
                >
                  <PackageIcon className='h-4 w-4 mr-2' />
                  Import Products
                </Button>
                <Button className='bg-primary-600 hover:bg-primary-700 text-white shadow-lg'>
                  <PlusIcon className='h-4 w-4 mr-2' />
                  Create Product
                </Button>
              </>
            }
          >
            <SmartTable
              data={products}
              columns={columns}
              pageSize={15}
              enableSorting={true}
              enableSelection={true}
              enablePagination={true}
              rowContainerHeight='max-h-[calc(100vh-390px)]'
              onRowSelect={handleRowSelect}
              loading={loading}
              emptyTitle='No products found'
              emptyMessage='Create some products to get started.'
              paginationConfig={{
                pageSize: 15,
                pageSizeOptions: [10, 15, 25, 50, 100],
                showPageSizeSelector: true,
                showPageInfo: true,
                paginationItemsToDisplay: 7
              }}
              className='h-full'
            />
          </SmartTableToolbar>
        
        </div>
      </div>
      <SmartAppFooter />
    </div>
  )
}
