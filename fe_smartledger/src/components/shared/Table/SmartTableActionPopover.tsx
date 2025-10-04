import React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, ToggleLeft, Trash2, CheckCircle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ActionItem {
  label: string
  icon?: React.ReactNode
  onClick: () => void
  variant?: 'default' | 'destructive'
  showSeparator?: boolean
}

export interface SmartTableActionPopoverProps {
  actions: ActionItem[]
  rowData?: any
}

const SmartTableActionPopover = ({ actions, rowData }: SmartTableActionPopoverProps) => {
  const getDefaultIcon = (label: string) => {
    const lowerLabel = label.toLowerCase()
    if (lowerLabel.includes('edit') || lowerLabel.includes('modify')) {
      return <Edit className="h-4 w-4" />
    }
    if (lowerLabel.includes('inactive') || lowerLabel.includes('mark as inactive')) {
      return <XCircle className="h-4 w-4" />
    }
    if (lowerLabel.includes('active') || lowerLabel.includes('mark as active')) {
      return <CheckCircle className="h-4 w-4" />
    }
    if (lowerLabel.includes('delete') || lowerLabel.includes('remove')) {
      return <Trash2 className="h-4 w-4" />
    }
    return null
  }

  const handleActionClick = (action: ActionItem, event: React.MouseEvent) => {
    event.stopPropagation()
    action.onClick()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-white border border-gray-200 shadow-lg rounded-lg"
      >
        {actions.map((action, index) => (
          <React.Fragment key={index}>
            {action.showSeparator && index > 0 && <DropdownMenuSeparator />}
            <DropdownMenuItem
              onClick={(e: React.MouseEvent) => handleActionClick(action, e)}
              className={cn(
                "flex items-center px-3 py-2 cursor-pointer",
                action.variant === 'destructive' 
                  ? 'text-red-600 focus:text-red-600 hover:bg-red-50' 
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              {action.icon || getDefaultIcon(action.label)}
              <span className="ml-2 text-sm font-medium">{action.label}</span>
            </DropdownMenuItem>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SmartTableActionPopover
