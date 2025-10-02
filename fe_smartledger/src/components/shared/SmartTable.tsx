import React, { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ChevronsUpDown, CheckCircle, XCircle } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table"
import { Skeleton } from "@/components/ui/skeleton"

export interface Column<T = any> {
  key: string
  label: string
  icon?: React.ReactNode
  sortable?: boolean
  render?: (value: any, row: T) => React.ReactNode
  className?: string
  header?: string
  accessorKey?: string
  cell?: (info: any) => React.ReactNode
}

export interface SmartTableProps<T = any> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  emptyTitle?: string
  emptyDescription?: string
  emptyActionLabel?: string
  onEmptyAction?: () => void
  
  currentPage?: number
  itemsPerPage?: number
  onPageChange?: (page: number) => void
  onItemsPerPageChange?: (itemsPerPage: number) => void
  showPageInfo?: boolean

  onRowClick?: (row: T) => void
  isRowClickable?: boolean
  getRowClassName?: (row: T) => string
  startAndEndColPin?: boolean
  isRowDisabled?: (row: T) => boolean
  disabledTooltip?: string
  hideDefaultSorting?: boolean

  onRowAction?: (action: string, row: T) => void

  tableHeight?: string | number
  className?: string
}

const TableEmptyState = ({ 
  title, 
  description, 
  actionLabel, 
  onAction 
}: {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}) => (
  <div className="flex flex-col items-center justify-center py-12 px-6">
    <div className="text-center">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline">
          {actionLabel}
        </Button>
      )}
    </div>
  </div>
)

const TableDataPagination = ({ 
  currentPage, 
  totalItems, 
  pageSize, 
  onPageChange,
  onPageSizeChange 
}: {
  currentPage: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}) => {
  const totalPages = Math.ceil(totalItems / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center space-x-4">
        <div className="flex-1 text-sm text-gray-500 dark:text-gray-400">
          Showing {startIndex + 1} to {endIndex} of {totalItems} results
        </div>

        <Select
          value={pageSize.toString()}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger className="w-[100px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
            <SelectValue placeholder={`Show ${pageSize}`} />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
            {[5, 10, 20, 30, 40, 50].map((size) => (
              <SelectItem 
                key={size} 
                value={size.toString()}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
              >
                Show {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="h-8 w-8 p-0 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex w-[100px] items-center justify-center text-sm font-medium text-gray-900 dark:text-gray-50">
          Page {currentPage} of {totalPages}
        </div>

        <Button
          variant="outline"
          className="h-8 w-8 p-0 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

const SmartTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  emptyTitle = "No data available",
  emptyDescription = "No records found",
  emptyActionLabel,
  onEmptyAction,
  
  currentPage = 1,
  itemsPerPage = 10,
  onPageChange = () => {},
  onItemsPerPageChange = () => {},
  showPageInfo = true,

  onRowClick,
  isRowClickable = false,
  getRowClassName,
  startAndEndColPin = false,
  isRowDisabled = () => false,
  disabledTooltip = "",
  hideDefaultSorting = false,

  onRowAction,

  tableHeight = '600px',
  className,
}: SmartTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [internalPage, setInternalPage] = useState(currentPage)
  const [internalPageSize, setInternalPageSize] = useState(itemsPerPage)

  const paginatedData = useMemo(() => {
    const startIndex = (internalPage - 1) * internalPageSize
    const endIndex = startIndex + internalPageSize
    return data.slice(startIndex, endIndex)
  }, [data, internalPage, internalPageSize])

  const tableColumns = useMemo(() => {
    const baseColumns = columns.map((column) => ({
      id: column.key,
      accessorKey: column.accessorKey || column.key,
      header: column.header || column.label,
      cell: column.cell || (({ getValue, row }) => {
        const value = getValue()
    
    if (column.render) {
          return column.render(value, row.original)
    }

    if (column.key === 'status') {
      const isActive = value === 'Active' || value === true
      return (
        <div className="flex items-center space-x-2 text-left">
          {isActive ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
          <span className={cn('text-sm', isActive ? 'text-green-700' : 'text-red-700')}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      )
    }

    if (column.key === 'price' && typeof value === 'number') {
      return <span className="font-medium text-left">₹{value.toFixed(2)}</span>
    }

    return <span className="text-left">{value}</span>
      }),
      enableSorting: column.sortable !== false,
      className: column.className,
    }))

    return baseColumns
  }, [columns, onRowAction])

  const table = useReactTable({
    data: paginatedData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })

  const isEmpty = !loading && data.length === 0

  const handlePageChange = (newPage: number) => {
    setInternalPage(newPage)
    onPageChange(newPage)
  }

  const handlePageSizeChange = (newSize: number) => {
    setInternalPageSize(newSize)
    setInternalPage(1)
    onItemsPerPageChange(newSize)
  }

  return (
    <div className={cn('w-full space-y-6', className)}>
      <div 
        className="w-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col overflow-hidden"
        style={{ height: tableHeight }}
      >

        {isEmpty ? (
          <TableEmptyState 
            title={emptyTitle}
            description={emptyDescription}
            actionLabel={emptyActionLabel}
            onAction={onEmptyAction}
          />
        ) : (
          <div className="relative overflow-hidden flex-1 flex flex-col h-full">
            <div className="relative z-10 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup: any) => (
                    <TableRow key={headerGroup.id} className="bg-gray-50 dark:bg-gray-800">
                      {headerGroup.headers.map((header: any, index: number) => {
                        const isFirstColumn = index === 0;
                        const isLastColumn = index === headerGroup.headers.length - 1;
                        const columnClassName = cn(
                          "py-3 px-4 whitespace-nowrap text-left",
                          isFirstColumn && startAndEndColPin && "sticky left-0 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg z-20",
                          isLastColumn && startAndEndColPin && "sticky right-0 bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-lg z-20"
                        );

                        return (
                    <TableHead
                            key={header.id}
                            className={columnClassName}
                          >
                            {header.isPlaceholder ? null : (
                              <div
                                className={`flex items-center font-semibold text-gray-900 dark:text-gray-100 text-left ${
                                  header.column.getCanSort() && !hideDefaultSorting ? "cursor-pointer select-none hover:text-black dark:hover:text-white" : ""
                                }`}
                                onClick={header.column.getCanSort() && !hideDefaultSorting ? header.column.getToggleSortingHandler() : undefined}
                              >
                                {(() => {
                                  const column = columns.find(col => col.key === header.column.id)
                                  return (
                                    <>
                                      {column?.icon && <span className="mr-2">{column.icon}</span>}
                                      {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                      )}
                                      {header.column.getCanSort() && !hideDefaultSorting && (
                                        <ChevronsUpDown className="ml-1.5 h-4 w-4 text-gray-600 dark:text-gray-400" />
                                      )}
                                    </>
                                  )
                                })()}
                      </div>
                            )}
                    </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
              </Table>
            </div>
            
            <div className="relative overflow-y-auto overflow-x-hidden flex-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800" style={{ height: 'calc(100% - 120px)' }}>
              <Table>
              <TableBody>
                {loading ? (
                    <>
                      {Array(8)
                        .fill(0)
                        .map((_, idx) => (
                          <TableRow key={idx}>
                            {tableColumns.map((_, cellIdx) => (
                              <TableCell key={cellIdx}>
                                <Skeleton className="h-5 w-[100px] bg-gray-100 dark:bg-gray-800" />
                              </TableCell>
                      ))}
                          </TableRow>
                        ))}
                    </>
                  ) : table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row: any, rowIndex: number) => {
                      const isDisabled = isRowDisabled(row.original);
                      const rowContent = (
                        <TableRow
                          key={row.id}
                          className={cn(
                            "border-b border-gray-100 dark:border-gray-800 transition-colors group hover:bg-gray-50 dark:hover:bg-gray-800",
                            isRowClickable && !isDisabled && "cursor-pointer active:bg-gray-100 dark:active:bg-gray-700",
                            isDisabled && "opacity-60 cursor-not-allowed",
                            rowIndex === table.getRowModel().rows.length - 1 && "last:border-b-0",
                            getRowClassName && getRowClassName(row.original)
                          )}
                          onClick={() => !isDisabled && isRowClickable && onRowClick?.(row.original)}
                        >
                          {row.getVisibleCells().map((cell: any, cellIndex: number) => {
                            const isFirstColumn = cellIndex === 0;
                            const isLastColumn = cellIndex === row.getVisibleCells().length - 1;
                            const columnClassName = cn(
                              "py-3 px-4 whitespace-nowrap text-gray-900 dark:text-gray-100 text-left",
                              isFirstColumn && startAndEndColPin && "sticky left-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg z-10",
                              isLastColumn && startAndEndColPin && "sticky right-0 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 shadow-lg z-10",
                              isRowClickable && !isDisabled && isFirstColumn &&
                                "font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:underline"
                            );

                            return (
                              <TableCell
                                key={cell.id}
                                className={columnClassName}
                              >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                            );
                          })}
                    </TableRow>
                      );

                      return isDisabled && disabledTooltip ? (
                        <TooltipProvider key={row.id}>
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                              {rowContent}
                            </TooltipTrigger>
                            <TooltipContent 
                              side="top" 
                              align="center"
                              sideOffset={5}
                              className="bg-gray-900 text-white px-3 py-1.5 text-sm rounded-md shadow-lg z-50"
                            >
                              <p>{disabledTooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        rowContent
                      );
                    })
                  ) : null}
              </TableBody>
              </Table>
            </div>
          </div>
        )}

        {showPageInfo && data.length > 0 && (
          <TableDataPagination
            currentPage={internalPage}
            totalItems={data.length}
            pageSize={internalPageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>
    </div>
  )
}

export default SmartTable
