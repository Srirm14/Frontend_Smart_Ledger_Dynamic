'use client'

import { useEffect, useState, useCallback } from 'react'
import { EditIcon, TrashIcon, PlusIcon } from 'lucide-react'

import type { ColumnDef } from '@tanstack/react-table'


import { Button } from '@/components/ui/button'
import { SmartTable } from '@/components/shared/Table/SmartTable'
import { Badge } from '@/components/ui/badge'


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
      cell: ({ row }) => (
        <div className='flex items-center gap-2 whitespace-nowrap'>
          <Button
            size='sm'
            variant='outline'
            onClick={() => {
              console.log('Edit product:', row.original)
              // Implement edit functionality
            }}
            className='h-8'
          >
            <EditIcon className='h-4 w-4' />
            Edit
          </Button>
          <Button
            size='sm'
            variant='destructive'
            onClick={() => {
              console.log('Delete product:', row.original)
              // Implement delete functionality
              setProducts(prev => prev.filter(p => p.id !== row.original.id))
            }}
            className='h-8'
          >
            <TrashIcon className='h-4 w-4' />
            Delete
          </Button>
        </div>
      ),
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
          updated_at: item.updated_at || new Date().toISOString()
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
    <div className='space-y-6 w-full'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Products</h1>
          <p className='text-muted-foreground'>
            Manage your product inventory and details
          </p>
        </div>
        <Button>
          <PlusIcon className='h-4 w-4 mr-2' />
          Add Product
        </Button>
      </div>

      {/* Products Table */}
      <div className='bg-white rounded-lg shadow-sm border w-full overflow-hidden'>
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
      </div>

    </div>
  )
}
