import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface SmartFooterProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  itemsPerPageOptions?: number[]
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
  className?: string
  showItemsPerPage?: boolean
  showPageInfo?: boolean
}

const SmartFooter: React.FC<SmartFooterProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  itemsPerPageOptions = [10, 25, 50, 100],
  onPageChange,
  onItemsPerPageChange,
  className,
  showItemsPerPage = true,
  showPageInfo = true,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handleItemsPerPageChange = (value: string) => {
    onItemsPerPageChange(parseInt(value))
  }

  return (
    <div className={cn('flex items-center justify-between px-4 py-3 border-t border-gray-200', className)}>
      {/* Left side - Items info and per page selector */}
      <div className="flex items-center space-x-4">
        {showPageInfo && (
          <span className="text-sm text-gray-700">
            Showing {startItem} to {endItem} of {totalItems} results
          </span>
        )}
        
        {showItemsPerPage && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Show</span>
            <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {itemsPerPageOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Right side - Pagination controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousPage}
          disabled={currentPage <= 1}
          className="flex items-center space-x-1"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>

        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNumber: number
            
            if (totalPages <= 5) {
              pageNumber = i + 1
            } else if (currentPage <= 3) {
              pageNumber = i + 1
            } else if (currentPage >= totalPages - 2) {
              pageNumber = totalPages - 4 + i
            } else {
              pageNumber = currentPage - 2 + i
            }

            return (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPageChange(pageNumber)}
                className="w-8 h-8 p-0"
              >
                {pageNumber}
              </Button>
            )
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          className="flex items-center space-x-1"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default SmartFooter
