'use client'

import { usePathname } from 'next/navigation'
import { useSectorStore } from '@/store/sector-store'

export function SmartFooter() {
  const pathname = usePathname()
  const { activeSector } = useSectorStore()
  
  const currentYear = new Date().getFullYear()

  return (
    <footer className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 px-4 py-4">
      <div className="flex items-center justify-between w-full">
        {/* Left side - Copyright and Company */}
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <span>© {currentYear} Smart Ledger</span>
          <span>•</span>
          <span>Powered by Vyzify</span>
        </div>
        
        {/* Center - Current Sector */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Current Sector:</span>
          <span className="font-medium text-primary-600 dark:text-primary-400">
            {activeSector?.name || 'Unknown'}
          </span>
        </div>
        
        {/* Right side - Version and Status */}
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <span>Version 1.0.0</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Online</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
