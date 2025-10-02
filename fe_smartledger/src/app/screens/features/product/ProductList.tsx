"use client"

import SmartTable, { Column } from '@/components/shared/Table/SmartTable'
import SmartTableActionPopover, { ActionItem } from '@/components/shared/Table/SmartTableActionPopover'
import { memo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Package, 
  Tag, 
  IndianRupee, 
  Scale, 
  Clock,
  Edit,
  ToggleLeft,
  Trash2
} from 'lucide-react'

// Mock data for demonstration
const mockProducts = [
  { id: 1, name: 'diesel001', category: 'Fuel', price: 103.00, uom: 'Ltr', status: 'Active' },
  { id: 2, name: 'petrol1', category: 'Fuel', price: 105.80, uom: 'Ltr', status: 'Active' },
  { id: 3, name: 'HSD', category: 'Fuel', price: 250.00, uom: 'Ltr', status: 'Active' },
  { id: 4, name: 'test00909', category: 'Others', price: 230.45, uom: 'Ltr', status: 'Active' },
  { id: 5, name: 'diesel', category: 'Fuel', price: 90.00, uom: 'Ltr', status: 'Active' },
  { id: 6, name: 'testsnjnskndnhd', category: 'Others', price: 6.00, uom: 'Ltr', status: 'Active' },
  { id: 7, name: 'petrol', category: 'Fuel', price: 12.00, uom: 'Ltr', status: 'Active' },
  { id: 8, name: 'petrol', category: 'Fuel', price: 1000.00, uom: 'Ltr', status: 'Active' },
  { id: 9, name: 'fruity', category: 'Others', price: 80.09, uom: 'Pcs', status: 'Inactive' },
  { id: 3, name: 'HSD', category: 'Fuel', price: 250.00, uom: 'Ltr', status: 'Active' },
  { id: 4, name: 'test00909', category: 'Others', price: 230.45, uom: 'Ltr', status: 'Active' },
  { id: 5, name: 'diesel', category: 'Fuel', price: 90.00, uom: 'Ltr', status: 'Active' },
  { id: 6, name: 'testsnjnskndnhd', category: 'Others', price: 6.00, uom: 'Ltr', status: 'Active' },
  { id: 7, name: 'petrol', category: 'Fuel', price: 12.00, uom: 'Ltr', status: 'Active' },
  { id: 8, name: 'petrol', category: 'Fuel', price: 1000.00, uom: 'Ltr', status: 'Active' },
  { id: 9, name: 'fruity', category: 'Others', price: 80.09, uom: 'Pcs', status: 'Inactive' },
  { id: 3, name: 'HSD', category: 'Fuel', price: 250.00, uom: 'Ltr', status: 'Active' },
  { id: 4, name: 'test00909', category: 'Others', price: 230.45, uom: 'Ltr', status: 'Active' },
  { id: 5, name: 'diesel', category: 'Fuel', price: 90.00, uom: 'Ltr', status: 'Active' },
  { id: 6, name: 'testsnjnskndnhd', category: 'Others', price: 6.00, uom: 'Ltr', status: 'Active' },
  { id: 7, name: 'petrol', category: 'Fuel', price: 12.00, uom: 'Ltr', status: 'Active' },
  { id: 8, name: 'petrol', category: 'Fuel', price: 1000.00, uom: 'Ltr', status: 'Active' },
  { id: 9, name: 'fruity', category: 'Others', price: 80.09, uom: 'Pcs', status: 'Inactive' },
  { id: 3, name: 'HSD', category: 'Fuel', price: 250.00, uom: 'Ltr', status: 'Active' },
  { id: 4, name: 'test00909', category: 'Others', price: 230.45, uom: 'Ltr', status: 'Active' },
  { id: 5, name: 'diesel', category: 'Fuel', price: 90.00, uom: 'Ltr', status: 'Active' },
  { id: 6, name: 'testsnjnskndnhd', category: 'Others', price: 6.00, uom: 'Ltr', status: 'Active' },
  { id: 7, name: 'petrol', category: 'Fuel', price: 12.00, uom: 'Ltr', status: 'Active' },
  { id: 8, name: 'petrol', category: 'Fuel', price: 1000.00, uom: 'Ltr', status: 'Active' },
  { id: 9, name: 'fruity', category: 'Others', price: 80.09, uom: 'Pcs', status: 'Inactive' },
]

const ProductList = memo(function ProductList() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const getActionItems = (row: any): ActionItem[] => [
    {
      label: 'Modify Price',
      icon: <Edit className="h-4 w-4" />,
      onClick: () => handleModifyPrice(row),
    },
    {
      label: 'Make Inactive',
      icon: <ToggleLeft className="h-4 w-4" />,
      onClick: () => handleToggleStatus(row),
    },
    {
      label: 'Delete',
      icon: <Trash2 className="h-4 w-4" />,
      onClick: () => handleDelete(row),
      variant: 'destructive',
    },
  ]

  const columns: Column[] = [
    {
      key: 'name',
      label: 'Product',
      icon: <Package className="h-4 w-4" />,
      sortable: true,
    },
    {
      key: 'category',
      label: 'Category',
      icon: <Tag className="h-4 w-4" />,
      sortable: true,
    },
    {
      key: 'price',
      label: 'Price',
      icon: <IndianRupee className="h-4 w-4" />,
      sortable: true,
    },
    {
      key: 'uom',
      label: 'UOM',
      icon: <Scale className="h-4 w-4" />,
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      icon: <Clock className="h-4 w-4" />,
      sortable: true,
    },
    {
      key: 'actions',
      label: 'Actions',
      cell: ({ row }: any) => (
        <SmartTableActionPopover 
          actions={getActionItems(row.original)} 
          rowData={row.original}
        />
      ),
    },
  ]

  const handleModifyPrice = (row: any) => {
    console.log('Modify price for:', row.name)
    // Handle modify price action
  }

  const handleToggleStatus = (row: any) => {
    console.log('Toggle status for:', row.name)
    // Handle toggle status action
  }

  const handleDelete = (row: any) => {
    console.log('Delete:', row.name)
    // Handle delete action
  }

  const handleRowClick = (row: any) => {
    const currentPath = window.location.pathname
    const pathParts = currentPath.split('/').filter(Boolean)
    const sector = pathParts[0] || 'petrolBunk'
    router.push(`/${sector}/product/${row.id}`)
  }

  const handleRowAction = (action: string, row: any) => {
    if (action === 'menu') {
      const currentPath = window.location.pathname
      const pathParts = currentPath.split('/').filter(Boolean)
      const sector = pathParts[0] || 'petrolBunk'
      router.push(`/${sector}/product/${row.id}`)
    }
  }

  return (
    <>
    <div className="" style={{ height: '100px' }}>  </div>
    <SmartTable
      data={mockProducts}
      columns={columns}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      onPageChange={setCurrentPage}
      onItemsPerPageChange={setItemsPerPage}
      onRowClick={handleRowClick}
      isRowClickable={true}
      tableHeight="600px"
    />
    </>
  )
})

export default ProductList
