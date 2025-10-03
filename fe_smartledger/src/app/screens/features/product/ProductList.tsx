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

  // Column definitions with proper sizing
  const columns: ColumnDef<Product>[] = [
    {
      header: 'Product Name',
      accessorKey: 'product_name',
      size: 300,
      minSize: 200,
      cell: ({ row }) => (
        <div className='font-medium'>
          <div className='truncate'>{row.getValue('product_name')}</div>
          {row.original.sku && (
            <div className='text-xs text-gray-500 truncate'>SKU: {row.original.sku}</div>
          )}
        </div>
      )
    },
    {
      header: 'Price',
      accessorKey: 'price',
      size: 120,
      minSize: 100,
      cell: ({ row }) => (
        <div className='font-semibold text-green-600'>
          ${row.getValue('price')}
        </div>
      )
    },
    {
      header: 'Category',
      accessorKey: 'category',
      size: 150,
      minSize: 120,
      cell: ({ row }) => (
        <div className='text-sm text-gray-600 truncate'>
          {row.original.category || 'Uncategorized'}
        </div>
      )
    },
    {
      header: 'Availability',
      accessorKey: 'availability',
      size: 140,
      minSize: 120,
      cell: ({ row }) => {
        const availability = row.getValue('availability') as string

        const styles = {
          'In Stock':
            'bg-green-100 text-green-800 border-green-200',
          'Out of Stock':
            'bg-red-100 text-red-800 border-red-200',
          Limited:
            'bg-yellow-100 text-yellow-800 border-yellow-200'
        }[availability]

        return (
          <Badge className={cn('rounded-full border text-xs font-medium', styles)}>
            {row.getValue('availability')}
          </Badge>
        )
      }
    },
    {
      id: 'actions',
      header: 'Actions',
      size: 120,
      minSize: 100,
      cell: ({ row }) => (
        <div className='flex items-center gap-2'>
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
    <div className='space-y-6'>
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
      <div className='bg-white rounded-lg shadow-sm border'>
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
