'use client'

import { useEffect, useState, useCallback } from 'react'
import { EditIcon, TrashIcon, PlusIcon, MoreHorizontalIcon, CheckCircleIcon, XCircleIcon, PackageIcon } from 'lucide-react'

import type { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { SmartTable, SmartTableToolbar, SmartContentHeader } from '@/components/shared'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu'

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
        <div className='text-sm font-semibold text-blue-600 whitespace-nowrap'>
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

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                <EditIcon className="mr-2 h-4 w-4" />
                Edit Product
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleToggleStatus}>
                {isActive ? (
                  <>
                    <XCircleIcon className="mr-2 h-4 w-4" />
                    Mark as Inactive
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="mr-2 h-4 w-4" />
                    Mark as Active
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleDelete}
                className="text-red-600 focus:text-red-600"
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete Product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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


  return (
    <div className='w-full max-w-full min-w-0 h-full flex flex-col'>
      {/* Smart Content Header - Fixed at top */}
      <div className='flex-shrink-0 px-4 pt-4 pb-0'>
        <SmartContentHeader
          icon={<PackageIcon className='h-8 w-8 text-primary-500' />}
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
            actions={
              <>
                <Button 
                  variant='outline' 
                  className='border-blue-200 text-blue-700 hover:bg-blue-50'
                >
                  <PackageIcon className='h-4 w-4 mr-2' />
                  Import Products
                </Button>
                <Button className='bg-blue-600 hover:bg-blue-700 text-white shadow-lg'>
                  <PlusIcon className='h-4 w-4 mr-2' />
                  Add Product
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
              onRowSelect={handleRowSelect}
              loading={loading}
              emptyMessage='No products found. Add some products to get started.'
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

            {/* Smart Table Toolbar with Actions */}
            <SmartTableToolbar
            title="Actions"
            actions={
              <>
                <Button 
                  variant='outline' 
                  className='border-blue-200 text-blue-700 hover:bg-blue-50'
                >
                  <PackageIcon className='h-4 w-4 mr-2' />
                  Import Products
                </Button>
                <Button className='bg-blue-600 hover:bg-blue-700 text-white shadow-lg'>
                  <PlusIcon className='h-4 w-4 mr-2' />
                  Add Product
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
              onRowSelect={handleRowSelect}
              loading={loading}
              emptyMessage='No products found. Add some products to get started.'
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

            {/* Smart Table Toolbar with Actions */}
            <SmartTableToolbar
            title="Actions"
            actions={
              <>
                <Button 
                  variant='outline' 
                  className='border-blue-200 text-blue-700 hover:bg-blue-50'
                >
                  <PackageIcon className='h-4 w-4 mr-2' />
                  Import Products
                </Button>
                <Button className='bg-blue-600 hover:bg-blue-700 text-white shadow-lg'>
                  <PlusIcon className='h-4 w-4 mr-2' />
                  Add Product
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
              onRowSelect={handleRowSelect}
              loading={loading}
              emptyMessage='No products found. Add some products to get started.'
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
    </div>
  )
}
