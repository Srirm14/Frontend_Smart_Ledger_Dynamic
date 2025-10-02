import React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, ToggleLeft, Trash2 } from 'lucide-react'

export interface ActionItem {
  label: string
  icon?: React.ReactNode
  onClick: () => void
  variant?: 'default' | 'destructive'
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
    if (lowerLabel.includes('inactive') || lowerLabel.includes('active') || lowerLabel.includes('toggle')) {
      return <ToggleLeft className="h-4 w-4" />
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
          size="sm"
          className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg"
      >
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={(e: React.MouseEvent) => handleActionClick(action, e)}
            className={`flex items-center space-x-2 px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
              action.variant === 'destructive' 
                ? 'text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300' 
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            {action.icon || getDefaultIcon(action.label)}
            <span className="text-sm font-medium">{action.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SmartTableActionPopover
