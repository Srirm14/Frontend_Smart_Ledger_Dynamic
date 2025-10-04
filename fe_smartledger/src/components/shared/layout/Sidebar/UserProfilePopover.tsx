'use client'

import { User, Settings, LogOut, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useSectorStore } from '@/store/sector-store'

interface UserProfilePopoverProps {
  children: React.ReactNode
}

export function UserProfilePopover({ children }: UserProfilePopoverProps) {
  const { activeSector } = useSectorStore()

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('username')
    window.location.href = '/login'
  }

  const handleViewProfile = () => {
    // TODO: Implement view profile functionality
    console.log('View Profile clicked')
  }

  const handleSettings = () => {
    // TODO: Implement settings functionality
    console.log('Settings clicked')
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-56 p-1" align="end">
        <div className="space-y-1">

          {/* View Profile */}
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 h-9 px-3"
            onClick={handleViewProfile}
          >
            <User className="mr-2 h-4 w-4" />
            View Profile
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 h-9 px-3"
            onClick={handleSettings}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>

          {/* Logout */}
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 h-9 px-3"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
