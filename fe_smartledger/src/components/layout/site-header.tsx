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
} from '@/components/ui/sidebar'
import { Bell, Search, User } from 'lucide-react'
import { useSectorStore } from '@/store/sector-store'
import { SectorSelector } from './sector-selector'
import { ThemeToggle } from './theme-toggle'
import { useTheme } from '@/hooks/use-theme'

export function SiteHeader() {
  const pathname = usePathname()
  const { activeSector } = useSectorStore()
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
              <BreadcrumbLink href={`/${activeSector.id}`} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                Smart Ledger
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900 dark:text-gray-100">{pageName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Right side - Search and User actions */}
      <div className="flex items-center gap-4 ml-auto px-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent w-64"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell className="h-4 w-4" />
        </Button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User menu */}
        <div className="flex items-center gap-2">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {localStorage.getItem('username') || 'User'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{activeSector.name}</p>
          </div>
          <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}