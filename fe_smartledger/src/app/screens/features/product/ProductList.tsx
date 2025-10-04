'use client'

import { useEffect, useState, useCallback } from 'react'
import { EditIcon, TrashIcon, PlusIcon, CheckCircleIcon, XCircleIcon, PackageIcon } from 'lucide-react'

import type { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { SmartTable, SmartTableToolbar, SmartContentHeader, SmartAppFooter, SmartTableActionPopover } from '@/components/Shared'
import { Badge } from '@/components/ui/badge'
import type { ActionItem } from '@/components/Shared/Table/SmartTableActionPopover'

import { cn } from '@/lib/utils'

// Product type definition
export interface Product {
  id: string
  product_name: string
  price: string
  availability: 'In Stock' | 'Out of Stock' | 'Limited'
  category?: string
  description?: string
  sku?: string
  created_at?: string
  updated_at?: string
  is_active?: boolean
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])

  // Column definitions with even distribution
  const columns: ColumnDef<Product>[] = [
    {
      header: 'Product Name',
      accessorKey: 'product_name',
      cell: ({ row }) => (
        <div className='font-medium'>
          <div className='whitespace-nowrap'>{row.getValue('product_name')}</div>
          {row.original.sku && (
            <div className='text-xs text-gray-500 whitespace-nowrap'>SKU: {row.original.sku}</div>
          )}
        </div>
      )
    },
    {
      header: 'Price',
      accessorKey: 'price',
      cell: ({ row }) => (
        <div className='font-semibold text-green-600 whitespace-nowrap'>
          ${row.getValue('price')}
        </div>
      )
    },
    {
      header: 'Status',
      accessorKey: 'is_active',
      cell: ({ row }) => {
        const isActive = row.original.is_active ?? true
        return (
          <Badge
            variant={isActive ? 'default' : 'secondary'}
            className={cn(
              'whitespace-nowrap',
              isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            )}
          >
            {isActive ? 'Active' : 'Inactive'}
          </Badge>
        )
      }
    },
    {
      header: 'Category',
      accessorKey: 'category',
      cell: ({ row }) => (
        <div className='text-sm text-gray-600 whitespace-nowrap'>
          {row.original.category || 'Uncategorized'}
        </div>
      )
    },
    {
      header: 'SKU',
      accessorKey: 'sku',
      cell: ({ row }) => (
        <div className='text-sm text-gray-600 font-mono whitespace-nowrap'>
          {row.original.sku || 'N/A'}
        </div>
      )
    },
    {
      header: 'Description',
      accessorKey: 'description',
      cell: ({ row }) => (
        <div className='text-sm text-gray-600 whitespace-nowrap'>
          {row.original.description || 'No description available'}
        </div>
      )
    },
    {
      header: 'Created Date',
      accessorKey: 'created_at',
      cell: ({ row }) => (
        <div className='text-sm text-gray-600 whitespace-nowrap'>
          {row.original.created_at ? new Date(row.original.created_at).toLocaleDateString() : 'N/A'}
        </div>
      )
    },
    {
      header: 'Updated Date',
      accessorKey: 'updated_at',
      cell: ({ row }) => (
        <div className='text-sm text-gray-600 whitespace-nowrap'>
          {row.original.updated_at ? new Date(row.original.updated_at).toLocaleDateString() : 'N/A'}
        </div>
      )
    },
    {
      header: 'Stock Count',
      accessorKey: 'stock_count',
      cell: ({ row }) => (
        <div className='text-sm font-semibold text-primary-600 whitespace-nowrap'>
          {Math.floor(Math.random() * 100) + 1}
        </div>
      )
    },
    {
      header: 'Supplier',
      accessorKey: 'supplier',
      cell: ({ row }) => (
        <div className='text-sm text-gray-600 whitespace-nowrap'>
          Supplier {Math.floor(Math.random() * 5) + 1}
        </div>
      )
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const isActive = row.original.is_active ?? true
        const hasMultipleSelections = selectedProducts.length > 1
        
        const handleToggleStatus = () => {
          setProducts(prev => 
            prev.map(p => 
              p.id === row.original.id 
                ? { ...p, is_active: !p.is_active }
                : p
            )
          )
        }

        const handleDelete = () => {
          setProducts(prev => prev.filter(p => p.id !== row.original.id))
        }

        const handleEdit = () => {
          console.log('Edit product:', row.original)
          // Implement edit functionality
        }

        const actions: ActionItem[] = [
          {
            label: 'Edit Product',
            icon: <EditIcon className="h-4 w-4" />,
            onClick: handleEdit
          },
          {
            label: isActive ? 'Mark as Inactive' : 'Mark as Active',
            icon: isActive ? <XCircleIcon className="h-4 w-4" /> : <CheckCircleIcon className="h-4 w-4" />,
            onClick: handleToggleStatus
          },
          {
            label: 'Delete Product',
            icon: <TrashIcon className="h-4 w-4" />,
            onClick: handleDelete,
            variant: 'destructive',
            showSeparator: true
          }
        ]

        // Disable actions when multiple items are selected
        const disabledActions = hasMultipleSelections 
          ? actions.map(action => ({ ...action, onClick: () => {} }))
          : actions

        return (
          <div className={hasMultipleSelections ? 'opacity-50 pointer-events-none' : ''}>
            <SmartTableActionPopover actions={disabledActions} rowData={row.original} />
          </div>
        )
      },
      enableSorting: false
    }
  ]

  // Fetch products data
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const res = await fetch('https://cdn.jsdelivr.net/gh/themeselection/fy-assets/assets/json/mobile-stock.json')

        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }

        const items = await res.json()
        const data = await items.data

        // Transform data to match our Product interface
        const transformedData: Product[] = data.map((item: any, index: number) => ({
          id: item.id || `product-${index}`,
          product_name: item.product_name || item.name || 'Unknown Product',
          price: item.price || '0.00',
          availability: item.availability || 'In Stock',
          category: item.category || 'Electronics',
          description: item.description || '',
          sku: item.sku || `SKU-${index + 1}`,
          created_at: item.created_at || new Date().toISOString(),
          updated_at: item.updated_at || new Date().toISOString(),
          is_active: Math.random() > 0.2 // 80% chance of being active
        }))

        // Duplicate data for demo purposes
        setProducts([...transformedData, ...transformedData])
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
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
            { label: 'Products', value: products.length, color: 'default' },
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
