'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from 'lucide-react'
import Image from 'next/image'

import type { ColumnDef, PaginationState, SortingState, ColumnMeta } from '@tanstack/react-table'

// Extend ColumnMeta to include our custom sticky property
declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    sticky?: 'left' | 'right'
  }
}
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {  TableCell, TableHead,  TableRow } from '@/components/ui/table'

import { SmartLoadingSpinner } from '@/components/Shared'

import { usePagination } from '@/hooks/use-pagination'
import type { SmartTableProps } from '@/types/table'

import { cn } from '@/lib/utils'

function SmartTable<T>({
  data,
  columns,
  pageSize = 10,
  enableSorting = true,
  enableSelection = true,
  enablePagination = true,
  onRowSelect,
  onSortChange,
  onPaginationChange,
  loading = false,
  emptyTitle = 'No data available',
  emptyMessage = 'There are no items to display at the moment.',
  className,
  rowContainerHeight,
  children,
  paginationConfig = {
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 50],
    showPageSizeSelector: true,
    showPageInfo: true,
    paginationItemsToDisplay: 5
  },
}: SmartTableProps<T>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize
  })

  const [sorting, setSorting] = useState<SortingState>([])
  const [selectedRows, setSelectedRows] = useState<T[]>([])

  // Enhanced columns with selection if enabled
  const enhancedColumns: ColumnDef<T>[] = [
    ...(enableSelection
      ? [
            {
            id: 'select',
            header: ({ table }) => (
              <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                aria-label='Select all'
              />
            ),
            cell: ({ row }) => (
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={value => row.toggleSelected(!!value)}
                aria-label='Select row'
              />
            ),
            size: 28,
            enableSorting: false,
            meta: {
              sticky: 'left'
            }
          } as ColumnDef<T>
        ]
      : []),
    ...columns
  ]

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    onSortingChange: (updaterOrValue) => {
      setSorting(updaterOrValue)
      const newSorting = typeof updaterOrValue === 'function' ? updaterOrValue(sorting) : updaterOrValue
      onSortChange?.(newSorting)
    },
    enableSortingRemoval: false,
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    onPaginationChange: (updaterOrValue) => {
      setPagination(updaterOrValue)
      const newPagination = typeof updaterOrValue === 'function' ? updaterOrValue(pagination) : updaterOrValue
      onPaginationChange?.(newPagination)
    },
    state: {
      sorting: enableSorting ? sorting : undefined,
      pagination: enablePagination ? pagination : undefined
    },
    enableRowSelection: enableSelection,
    enableMultiRowSelection: enableSelection
  })

  // Handle row selection changes
  useEffect(() => {
    const selected = table.getFilteredSelectedRowModel().rows.map(row => row.original)
    setSelectedRows(selected)
    onRowSelect?.(selected)
  }, [table.getFilteredSelectedRowModel().rows, onRowSelect])


  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage: enablePagination ? table.getState().pagination.pageIndex + 1 : 1,
    totalPages: enablePagination ? table.getPageCount() : 1,
    paginationItemsToDisplay: paginationConfig.paginationItemsToDisplay || 5
  })

  // Auto-detect if we should use flex-based sizing - optimized with useCallback
  const shouldUseFlexSizing = useCallback(() => {
    // If rowContainerHeight is explicitly provided, use it
    if (rowContainerHeight) {
      return rowContainerHeight === 'h-full'
    }
    
    // Auto-detect: if className contains flex or height classes, use flex sizing
    if (className && (className.includes('flex') || className.includes('h-full') || className.includes('h-['))) {
      return true
    }
    
    // Default: use responsive max-height
    return false
  }, [rowContainerHeight, className])

  // Determine height class based on auto-detection or explicit prop - optimized with useCallback
  const getHeightClass = useCallback(() => {
    if (rowContainerHeight === 'h-full' || shouldUseFlexSizing()) {
      return 'h-full'
    }
    if (rowContainerHeight) {
      return rowContainerHeight
    }
    return 'max-h-[60vh]'
  }, [rowContainerHeight, shouldUseFlexSizing])

  const useFlexSizing = useMemo(() => shouldUseFlexSizing(), [shouldUseFlexSizing])
  const heightClass = useMemo(() => getHeightClass(), [getHeightClass])

  // Default empty state component using the SVG from assets
  const DefaultEmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full py-12">
      <div className="w-64 h-64 mb-6">
        <Image 
          src={'/assets/illustrations/EmptyState/smartTableEmptyState.svg'}
          alt="Empty table state"
          width={256}
          height={256}
          className="object-contain"
          priority
        />
      </div>
      <div className="text-center">
        <h3 className="text-md font-semibold text-gray-600 mb-2">{emptyTitle}</h3>
        <p className="text-sm font-normal text-gray-500">{emptyMessage}</p>
      </div>
    </div>
  )

  return (
    <div className={cn('w-full space-y-4', useFlexSizing ? 'flex flex-col h-full' : '', className)}>

      {/* Loading State - Show loader instead of entire table */}
      {loading ? (
        <div className={cn('rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden w-full max-w-full h-screen', useFlexSizing ? 'flex-1 flex flex-col' : '', heightClass)}>
          <div className="flex items-center justify-center h-full">
            <SmartLoadingSpinner size="md" className="py-0" />
          </div>
        </div>
      ) : data.length === 0 ? (
        /* Empty State - Show empty state instead of entire table */
        <div className={cn('rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden w-full max-w-full h-screen', useFlexSizing ? 'flex-1 flex flex-col' : '', heightClass)}>
          {children ? children : <DefaultEmptyState />}
        </div>
      ) : (
        /* Table Container with Single Scroll Container */
        <div className={cn('rounded-lg border bg-white shadow-sm overflow-hidden w-full max-w-full', useFlexSizing ? 'flex-1 flex flex-col' : '')}>
          {/* Single Scroll Container - handles both horizontal and vertical scroll */}
          <div className={cn('overflow-auto w-full scrollbar-thin', heightClass, useFlexSizing ? 'flex-1' : '')}>
            <table className='w-full table-auto min-w-full border-collapse'>
              {/* Header */}
              <thead className='bg-gray-50'>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id} className='hover:bg-transparent'>
                    {headerGroup.headers.map(header => {
                      return (
                        <TableHead 
                          key={header.id} 
                          className={cn(
                            'h-12 font-semibold text-gray-900 border-l border-r border-b first:border-l-0 last:border-r-0 px-4 text-left whitespace-nowrap sticky top-0 z-10 bg-gray-50 rounded-lg  ',
                            header.column.columnDef.meta?.sticky === 'left' && 'sticky left-0 z-[99999]'
                          )}
                          style={header.column.columnDef.meta?.sticky === 'left' ? {
                            position: 'sticky',
                            top: 0,
                            left: 0,
                            zIndex: 99999
                          } : undefined}
                          data-sticky={header.column.columnDef.meta?.sticky}
                        >
                          {header.isPlaceholder ? null : header.column.getCanSort() ? (
                            <div
                              className={cn(
                                'group flex h-full cursor-pointer items-center justify-between gap-2 select-none hover:bg-gray-100 px-2 py-2 rounded transition-colors'
                              )}
                              onClick={header.column.getToggleSortingHandler()}
                              onKeyDown={e => {
                                if (header.column.getCanSort() && (e.key === 'Enter' || e.key === ' ')) {
                                  e.preventDefault()
                                  header.column.getToggleSortingHandler()?.(e)
                                }
                              }}
                              tabIndex={header.column.getCanSort() ? 0 : undefined}
                            >
                              <span className='flex-1 truncate'>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                              </span>
                              <div className='opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0'>
                                {{
                                  asc: <ChevronUpIcon className='shrink-0 text-gray-600' size={16} aria-hidden='true' />,
                                  desc: <ChevronDownIcon className='shrink-0 text-gray-600' size={16} aria-hidden='true' />
                                }[header.column.getIsSorted() as string] ?? (
                                  <div className='flex flex-col'>
                                    <ChevronUpIcon className='shrink-0 text-gray-400 -mb-1' size={12} aria-hidden='true' />
                                    <ChevronDownIcon className='shrink-0 text-gray-400' size={12} aria-hidden='true' />
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className='px-2 py-2 truncate'>
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </div>
                          )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </thead>
              
              {/* Body */}
              <tbody className='bg-white'>
                {table.getRowModel().rows.map((row, index) => (
                  <TableRow 
                    key={row.id} 
                    data-state={row.getIsSelected() && 'selected'}
                    className={cn(
                      'hover:bg-primary-100 transition-colors',
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50',
                      row.getIsSelected() && 'bg-primary-100 border-primary-200'
                    )}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell 
                        key={cell.id}
                        className={cn(
                          'px-4 py-3 text-sm text-left whitespace-nowrap border-l border-r border-b first:border-l-0 last:border-r-0',
                          cell.column.columnDef.meta?.sticky === 'left' && 'sticky left-0 z-[99998] bg-white'
                        )}
                        style={cell.column.columnDef.meta?.sticky === 'left' ? {
                          position: 'sticky',
                          left: 0,
                          zIndex: 99998,
                          backgroundColor: 'white'
                        } : undefined}
                        data-sticky={cell.column.columnDef.meta?.sticky}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </tbody>
            </table>
          </div>

      {/* Integrated Pagination Footer */}
      {enablePagination && (
        <div className={cn('bg-gray-50 border-t border-gray-200 px-4 py-3', useFlexSizing ? 'flex-shrink-0' : '')}>
          <div className='flex items-center justify-between gap-3 max-sm:flex-col'>
            {paginationConfig.showPageInfo && (
              <div className='flex-1 text-sm whitespace-nowrap flex items-center gap-4'>
                <p className='text-gray-600' aria-live='polite'>
                  Showing page <span className='font-semibold text-gray-900'>{enablePagination ? table.getState().pagination.pageIndex + 1 : 1}</span> of{' '}
                  <span className='font-semibold text-gray-900'>{enablePagination ? table.getPageCount() : 1}</span>
                  <span className='ml-2 text-gray-500'>
                    ({table.getFilteredRowModel().rows.length} total items)
                  </span>
                </p>
                {selectedRows.length > 0 && (
                  <p className='text-black font-medium'>
                    Total selected: {selectedRows.length}
                  </p>
                )}
              </div>
            )}

            <div className='grow flex justify-center'>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      size='sm'
                      variant='outline'
                      className='disabled:pointer-events-none disabled:opacity-50 h-8'
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                      aria-label='Go to previous page'
                    >
                      <ChevronLeftIcon size={16} aria-hidden='true' />
                      <span className='ml-1 hidden sm:inline'>Previous</span>
                    </Button>
                  </PaginationItem>

                  {showLeftEllipsis && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {pages.map(page => {
                    const isActive = page === (enablePagination ? table.getState().pagination.pageIndex + 1 : 1)

                    return (
                      <PaginationItem key={page}>
                        <Button
                          size='sm'
                          variant={isActive ? 'default' : 'outline'}
                          className='h-8 w-8'
                          onClick={() => enablePagination && table.setPageIndex(page - 1)}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {page}
                        </Button>
                      </PaginationItem>
                    )
                  })}

                  {showRightEllipsis && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <Button
                      size='sm'
                      variant='outline'
                      className='disabled:pointer-events-none disabled:opacity-50 h-8'
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                      aria-label='Go to next page'
                    >
                      <span className='mr-1 hidden sm:inline'>Next</span>
                      <ChevronRightIcon size={16} aria-hidden='true' />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            {paginationConfig.showPageSizeSelector && (
              <div className='flex flex-1 justify-end'>
                <Select
                  value={enablePagination ? table.getState().pagination.pageSize.toString() : '10'}
                  onValueChange={value => {
                    enablePagination && table.setPageSize(Number(value))
                  }}
                >
                  <SelectTrigger id='results-per-page' className='w-fit whitespace-nowrap h-8' aria-label='Results per page'>
                    <SelectValue placeholder='Select number of results' />
                  </SelectTrigger>
                  <SelectContent className='bg-white border border-gray-200 shadow-lg'>
                    {paginationConfig.pageSizeOptions?.map(size => (
                      <SelectItem key={size} value={size.toString()} className='bg-white hover:bg-gray-50'>
                        {size} per page
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
        )}
      </div>
      )}
    </div>
  )
}

export { SmartTable }
export default SmartTable
