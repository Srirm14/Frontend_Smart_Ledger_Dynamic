import React from 'react'
import SmartTableExample from '@/components/shared/SmartTableExample'

export default function TestTablePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Smart Table Test Page
        </h1>
        <SmartTableExample />
      </div>
    </div>
  )
}
