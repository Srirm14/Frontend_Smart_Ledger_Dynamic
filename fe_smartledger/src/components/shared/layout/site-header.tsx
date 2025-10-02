'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
// Removed unused imports
import { useSectorStore } from '@/store/sector-store'
import { SectorSelector } from './sector-selector'
import { SmartDatePicker } from '@/components/shared/DatePicker/smartDatePicker'
import { useTheme } from '@/hooks/use-theme'

export function SiteHeader() {
  const pathname = usePathname()
  const { activeSector } = useSectorStore()
  const { toggleSidebar } = useSidebar()
  const { isDark } = useTheme()
  
  // Get current page name from pathname
  const getPageName = (path: string) => {
    if (path.includes('/sales')) return 'Sales'
    if (path.includes('/inventory')) return 'Inventory'
    if (path.includes('/credit')) return 'Credit'
    if (path.includes('/tally')) return 'Tally'
    return activeSector.name
  }

  const pageName = getPageName(pathname)

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4 bg-gray-200 dark:bg-gray-700"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink 
                href={`/${activeSector.id}`} 
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  toggleSidebar()
                }}
              >
                Smart Ledger
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage 
                className="text-gray-900 dark:text-gray-100 cursor-pointer"
                onClick={toggleSidebar}
              >
                {pageName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Right side - Search and User actions */}
      <div className="flex items-center gap-4 ml-auto px-4">
        <SmartDatePicker placeholder="Select date" />
      </div>
    </header>
  )
}