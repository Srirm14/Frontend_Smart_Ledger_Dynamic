import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export interface TabItem {
  id: string
  label: string
  icon?: React.ReactNode
  content: React.ReactNode
}

export interface SmartTabProps {
  tabs: TabItem[]
  defaultTab?: string
  className?: string
  headerClassName?: string
  contentClassName?: string
  onTabChange?: (tabId: string) => void
}

const SmartTab: React.FC<SmartTabProps> = ({
  tabs,
  defaultTab,
  className,
  headerClassName,
  contentClassName,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange?.(tabId)
  }

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content

  return (
    <div className={cn('w-full', className)}>
      {/* Tab Header */}
      <div className={cn('flex space-x-1 border-b border-gray-200 mb-6', headerClassName)}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              'flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors',
              'border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300',
              activeTab === tab.id
                ? 'text-blue-600 border-blue-600 bg-blue-50'
                : 'text-gray-500'
            )}
          >
            {tab.icon && <span className="text-lg">{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={cn('min-h-[400px]', contentClassName)}>
        {activeTabContent}
      </div>
    </div>
  )
}

export default SmartTab
