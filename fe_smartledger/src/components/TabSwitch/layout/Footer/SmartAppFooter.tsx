'use client'

import { memo } from 'react'
import { useSectorStore } from '@/store/sector-store'
import { useNetworkStatus } from '@/hooks'

interface SmartAppFooterProps {
  className?: string
}

export const SmartAppFooter = memo(function SmartAppFooter({ className = '' }: SmartAppFooterProps) {
  const { activeSector } = useSectorStore()
  const { isOnline, lastOnlineTime, isSupported } = useNetworkStatus()
  
  const currentYear = new Date().getFullYear()

  const getStatusColor = () => {
    if (!isSupported) return 'bg-gray-400'
    return isOnline ? 'bg-green-500' : 'bg-red-500'
  }

  const getStatusText = () => {
    if (!isSupported) return 'Unknown'
    return isOnline ? 'Online' : 'Offline'
  }

  const formatLastOnlineTime = () => {
    try {
      if (!lastOnlineTime || isOnline) return null
      
      const now = new Date()
      const diffInMinutes = Math.floor((now.getTime() - lastOnlineTime.getTime()) / (1000 * 60))
      
      if (diffInMinutes < 1) return 'Just now'
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`
      
      const diffInHours = Math.floor(diffInMinutes / 60)
      if (diffInHours < 24) return `${diffInHours}h ago`
      
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    } catch (error) {
      console.warn('Error formatting last online time:', error)
      return 'Unknown'
    }
  }

  return (
    <footer className={`flex-shrink-0 border-t border-gray-200 dark:border-gray-700 px-4 py-4 ${className}`}>
      <div className="flex items-center justify-between w-full">
        {/* Left side - Copyright and Company */}
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <span>© {currentYear} Smart Ledger</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Powered by Vyzify</span>
        </div>
        
        {/* Center - Current Sector */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="hidden md:inline">Sector:</span>
          <span className="font-medium text-primary-600 dark:text-primary-400 truncate max-w-32">
            {activeSector?.name || 'Unknown'}
          </span>
        </div>
        
        {/* Right side - Version and Status */}
        <div className="flex items-center space-x-2 sm:space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <span className="hidden lg:inline">Version 3.0.0</span>
          <div className="flex items-center space-x-1">
            <div 
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${getStatusColor()}`}
              title={!isSupported ? 'Network status not supported' : (isOnline ? 'Connected' : `Last seen ${formatLastOnlineTime()}`)}
            />
            <span className="text-xs sm:text-sm">{getStatusText()}</span>
          </div>
        </div>
      </div>
    </footer>
  )
})
