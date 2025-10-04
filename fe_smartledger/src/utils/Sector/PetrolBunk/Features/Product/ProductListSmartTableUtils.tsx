import React from 'react'
import { EditIcon, TrashIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import { StatusBadge } from '@/components/Shared/Badge'
import { ProductLink } from '@/components/Shared/Link'
import type { ActionItem } from '@/components/Shared/Table/SmartTableActionPopover'
import { formatCurrency } from '@/utils/formatters'
import type { Product } from '@/data/mockProducts'

// Rendering types for different cell types
export type CellRenderType = 
  | 'productName'
  | 'price'
  | 'status'
  | 'category'
  | 'sku'
  | 'uom'
  | 'description'
  | 'date'
  | 'stockCount'
  | 'supplier'
  | 'actions'

// Cell renderer interface
interface CellRendererProps {
  value: any
  row: any
  renderType: CellRenderType
  onClick?: (data: any) => void
  onEdit?: (data: any) => void
  onToggleStatus?: (data: any) => void
  onDelete?: (data: any) => void
  selectedItems?: any[]
}

// Individual cell renderers
const renderProductName = ({ value, onClick }: CellRendererProps) => (
  <div className='font-medium'>
    <ProductLink
      productName={value}
      onClick={() => onClick?.(value)}
      size="sm"
      className="whitespace-nowrap"
    />
  </div>
)

const renderPrice = ({ value }: CellRendererProps) => (
  <div className='font-semibold text-green-600 whitespace-nowrap'>
    {formatCurrency(value)}
  </div>
)

const renderStatus = ({ value }: CellRendererProps) => {
  const isActive = value ?? true
  return (
    <StatusBadge
      status={isActive ? 'active' : 'inactive'}
      size="sm"
      showIcon={true}
      className="whitespace-nowrap"
    />
  )
}

const renderCategory = ({ value }: CellRendererProps) => (
  <div className='text-sm text-gray-600 whitespace-nowrap'>
    {value || 'Uncategorized'}
  </div>
)

const renderSKU = ({ value, row }: CellRendererProps) => (
  <div className='font-medium'>
    <div className='text-sm text-gray-600 font-mono whitespace-nowrap'>
      {value || 'N/A'}
    </div>
  </div>
)

const renderUOM = ({ value }: CellRendererProps) => (
  <div className='text-sm text-gray-600 whitespace-nowrap'>
    {value || 'N/A'}
  </div>
)

const renderDescription = ({ value }: CellRendererProps) => (
  <div className='text-sm text-gray-600 whitespace-nowrap'>
    {value || 'No description available'}
  </div>
)

const renderDate = ({ value }: CellRendererProps) => (
  <div className='text-sm text-gray-600 whitespace-nowrap'>
    {value ? new Date(value).toLocaleDateString() : 'N/A'}
  </div>
)

const renderStockCount = ({ value }: CellRendererProps) => (
  <div className='text-sm font-semibold text-primary-600 whitespace-nowrap'>
    {value || 0}
  </div>
)

const renderSupplier = ({ value }: CellRendererProps) => (
  <div className='text-sm text-gray-600 whitespace-nowrap'>
    {value || 'N/A'}
  </div>
)

const renderActions = ({ 
  row, 
  onEdit, 
  onToggleStatus, 
  onDelete, 
  selectedItems = [] 
}: CellRendererProps) => {
  const isActive = row.original.is_active ?? true
  const hasMultipleSelections = selectedItems.length > 1
  
  const actions: ActionItem[] = [
    {
      label: 'Edit Product',
      icon: <EditIcon className="h-4 w-4" />,
      onClick: () => onEdit?.(row.original)
    },
    {
      label: isActive ? 'Mark as Inactive' : 'Mark as Active',
      icon: isActive ? <XCircleIcon className="h-4 w-4" /> : <CheckCircleIcon className="h-4 w-4" />,
      onClick: () => onToggleStatus?.(row.original)
    },
    {
      label: 'Delete Product',
      icon: <TrashIcon className="h-4 w-4" />,
      onClick: () => onDelete?.(row.original),
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
      {/* Import SmartTableActionPopover dynamically to avoid circular imports */}
      {React.createElement(
        require('@/components/Shared/Table/SmartTableActionPopover').default,
        { actions: disabledActions, rowData: row.original }
      )}
    </div>
  )
}

// Main cell renderer function
export const renderCell = (props: CellRendererProps) => {
  const { renderType } = props
  
  switch (renderType) {
    case 'productName':
      return renderProductName(props)
    case 'price':
      return renderPrice(props)
    case 'status':
      return renderStatus(props)
    case 'category':
      return renderCategory(props)
    case 'sku':
      return renderSKU(props)
    case 'uom':
      return renderUOM(props)
    case 'description':
      return renderDescription(props)
    case 'date':
      return renderDate(props)
    case 'stockCount':
      return renderStockCount(props)
    case 'supplier':
      return renderSupplier(props)
    case 'actions':
      return renderActions(props)
    default:
      return <div>{props.value}</div>
  }
}

// Column configuration interface
interface ColumnConfig {
  header: string
  accessorKey: string
  renderType: CellRenderType
  enableSorting?: boolean
}

// Generate columns from configuration
export const generateColumns = (
  configs: ColumnConfig[],
  handlers: {
    onProductClick?: (data: Product) => void
    onEdit?: (data: Product) => void
    onToggleStatus?: (data: Product) => void
    onDelete?: (data: Product) => void
    selectedItems?: Product[]
  }
): ColumnDef<Product>[] => {
  return configs.map(config => ({
    header: config.header,
    accessorKey: config.accessorKey,
    cell: ({ row }) => {
      const value = row.getValue(config.accessorKey)
      const props: CellRendererProps = {
        value,
        row,
        renderType: config.renderType,
        onClick: config.renderType === 'productName' ? handlers.onProductClick : undefined,
        onEdit: handlers.onEdit,
        onToggleStatus: handlers.onToggleStatus,
        onDelete: handlers.onDelete,
        selectedItems: handlers.selectedItems
      }
      
      return renderCell(props)
    },
    enableSorting: config.enableSorting ?? true
  }))
}

// Predefined column configurations
export const PRODUCT_LIST_COLUMNS: ColumnConfig[] = [
  {
    header: 'Product Name',
    accessorKey: 'product_name',
    renderType: 'productName'
  },
  {
    header: 'Price',
    accessorKey: 'price',
    renderType: 'price'
  },
  {
    header: 'Status',
    accessorKey: 'is_active',
    renderType: 'status'
  },
  {
    header: 'Category',
    accessorKey: 'category',
    renderType: 'category'
  },
  {
    header: 'SKU',
    accessorKey: 'sku',
    renderType: 'sku'
  },
  {
    header: 'UOM',
    accessorKey: 'uom',
    renderType: 'uom'
  },
  {
    header: 'Description',
    accessorKey: 'description',
    renderType: 'description'
  },
  {
    header: 'Created Date',
    accessorKey: 'created_at',
    renderType: 'date'
  },
  {
    header: 'Updated Date',
    accessorKey: 'updated_at',
    renderType: 'date'
  },
  {
    header: 'Stock Count',
    accessorKey: 'stock_count',
    renderType: 'stockCount'
  },
  {
    header: 'Supplier',
    accessorKey: 'supplier',
    renderType: 'supplier'
  },
  {
    header: 'Actions',
    accessorKey: 'actions',
    renderType: 'actions',
    enableSorting: false
  }
]

// Utility functions for specific operations
export const ProductListUtils = {
  // Get column by render type
  getColumnByType: (columns: ColumnConfig[], renderType: CellRenderType) => 
    columns.find(col => col.renderType === renderType),
  
  // Filter columns by render types
  getColumnsByTypes: (columns: ColumnConfig[], renderTypes: CellRenderType[]) =>
    columns.filter(col => renderTypes.includes(col.renderType)),
  
  // Create custom column configuration
  createColumn: (header: string, accessorKey: string, renderType: CellRenderType, enableSorting = true): ColumnConfig => ({
    header,
    accessorKey,
    renderType,
    enableSorting
  }),
  
  // Reorder columns
  reorderColumns: (columns: ColumnConfig[], order: CellRenderType[]): ColumnConfig[] => {
    const columnMap = new Map(columns.map(col => [col.renderType, col]))
    return order.map(renderType => columnMap.get(renderType)).filter(Boolean) as ColumnConfig[]
  }
}