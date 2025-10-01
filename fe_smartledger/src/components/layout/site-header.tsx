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

export function SiteHeader() {
  const pathname = usePathname()
  const { activeSector } = useSectorStore()
  
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
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={`/${activeSector.id}`}>
                Smart Ledger
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{pageName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Right side - Search and User actions */}
      <div className="flex items-center gap-4 ml-auto px-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="sm">
          <Bell className="h-4 w-4" />
        </Button>

        {/* User menu */}
        <div className="flex items-center gap-2">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-gray-900">
              {localStorage.getItem('username') || 'User'}
            </p>
            <p className="text-xs text-gray-500">{activeSector.name}</p>
          </div>
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}