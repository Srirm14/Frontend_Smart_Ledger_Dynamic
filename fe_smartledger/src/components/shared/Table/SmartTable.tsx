'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from 'lucide-react'

import type { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table'
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

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
  emptyMessage = 'No results found.',
  className,
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
            enableSorting: false
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
    currentPage: table.getState().pagination.pageIndex + 1,
    totalPages: table.getPageCount(),
    paginationItemsToDisplay: paginationConfig.paginationItemsToDisplay || 5
  })

  return (
    <div className={cn('w-full space-y-4', className)}>

      {/* Table Container with Single Scroll Container */}
      <div className='rounded-lg border bg-white shadow-sm overflow-hidden w-full max-w-full'>
        {/* Single Scroll Container - handles both horizontal and vertical scroll */}
        <div className='max-h-[60vh] overflow-auto w-full scrollbar-thin'>
          <table className='w-full table-auto min-w-full border-collapse'>
            {/* Header */}
            <thead className='bg-gray-50'>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className='hover:bg-transparent'>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead 
                        key={header.id} 
                        className='h-12 bg-gray-50 font-semibold text-gray-900 border-l border-r border-b first:border-l-0 last:border-r-0 px-4 text-left whitespace-nowrap sticky top-0 z-10'
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={enhancedColumns.length} className='h-32 text-center'>
                    <div className='flex items-center justify-center'>
                      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
                      <span className='ml-3 text-gray-600'>Loading...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
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
                        className='px-4 py-3 text-sm text-left whitespace-nowrap border-l border-r border-b first:border-l-0 last:border-r-0'
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={enhancedColumns.length} className='h-32 text-center text-gray-500'>
                    <div className='flex flex-col items-center justify-center'>
                      <div className='text-lg font-medium mb-2'>{emptyMessage}</div>
                      <div className='text-sm text-gray-400'>No data available to display</div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </tbody>
          </table>
        </div>

        {/* Integrated Pagination Footer */}
        {enablePagination && (
          <div className='bg-gray-50 border-t border-gray-200 px-4 py-3'>
            <div className='flex items-center justify-between gap-3 max-sm:flex-col'>
              {paginationConfig.showPageInfo && (
                <div className='flex-1 text-sm whitespace-nowrap flex items-center gap-4'>
                  <p className='text-gray-600' aria-live='polite'>
                    Showing page <span className='font-semibold text-gray-900'>{table.getState().pagination.pageIndex + 1}</span> of{' '}
                    <span className='font-semibold text-gray-900'>{table.getPageCount()}</span>
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
                      const isActive = page === table.getState().pagination.pageIndex + 1

                      return (
                        <PaginationItem key={page}>
                          <Button
                            size='sm'
                            variant={isActive ? 'default' : 'outline'}
                            className='h-8 w-8'
                            onClick={() => table.setPageIndex(page - 1)}
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
                    value={table.getState().pagination.pageSize.toString()}
                    onValueChange={value => {
                      table.setPageSize(Number(value))
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
    </div>
  )
}

export { SmartTable }
export default SmartTable
