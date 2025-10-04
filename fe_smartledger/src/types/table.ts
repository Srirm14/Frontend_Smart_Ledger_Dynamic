import type { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table'
import type { ReactNode } from 'react'

export interface TableConfig<T> {
  data: T[]
  columns: ColumnDef<T>[]
  pageSize?: number
  enableSorting?: boolean
  enableSelection?: boolean
  enablePagination?: boolean
  onRowSelect?: (selectedRows: T[]) => void
  onSortChange?: (sorting: SortingState) => void
  onPaginationChange?: (pagination: PaginationState) => void
  loading?: boolean
  emptyMessage?: string
  className?: string
  rowContainerHeight?: string
  children?: ReactNode
}

export interface PaginationConfig {
  pageSize: number
  pageSizeOptions?: number[]
  showPageSizeSelector?: boolean
  showPageInfo?: boolean
  paginationItemsToDisplay?: number
}

export interface TableAction<T> {
  label: string
  icon?: React.ReactNode
  onClick: (row: T) => void
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  disabled?: (row: T) => boolean
}

export interface BulkAction<T> {
  label: string
  icon?: React.ReactNode
  onClick: (selectedRows: T[]) => void
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  disabled?: (selectedRows: T[]) => boolean
}

export interface SmartTableProps<T> extends TableConfig<T> {
  emptyTitle?: string
  emptyMessage?: string
  paginationConfig?: PaginationConfig
  actions?: TableAction<T>[]
  bulkActions?: BulkAction<T>[]
  searchable?: boolean
  searchPlaceholder?: string
  onSearch?: (query: string) => void
}
