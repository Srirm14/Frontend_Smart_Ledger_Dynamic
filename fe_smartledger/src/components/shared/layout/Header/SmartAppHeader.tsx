'use client'

import { usePathname } from 'next/navigation'
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
import { SmartDatePicker } from '@/components/Shared/DatePicker/smartDatePicker'
import { useTheme } from '@/hooks/use-theme'

export function SmartAppHeader() {
  const pathname = usePathname()
  const { activeSector } = useSectorStore()
  const { toggleSidebar } = useSidebar()
  const { isDark } = useTheme()
  
  // Parse pathname to get breadcrumb segments
  const getBreadcrumbSegments = (path: string) => {
    const segments = path.split('/').filter(Boolean)
    const breadcrumbs = []
    
    // Add sector name (first segment)
    if (segments.length > 0) {
      breadcrumbs.push({
        name: activeSector.name,
        href: `/${segments[0]}`,
        isActive: segments.length === 1
      })
    }
    
    // Add feature name (second segment)
    if (segments.length > 1) {
      const featureName = segments[1].charAt(0).toUpperCase() + segments[1].slice(1)
      breadcrumbs.push({
        name: featureName,
        href: `/${segments[0]}/${segments[1]}`,
        isActive: segments.length === 2
      })
    }
    
    // Add detail page (third segment)
    if (segments.length > 2) {
      breadcrumbs.push({
        name: `Details`,
        href: `/${segments[0]}/${segments[1]}/${segments[2]}`,
        isActive: true
      })
    }
    
    return breadcrumbs
  }

  const breadcrumbSegments = getBreadcrumbSegments(pathname)

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-[99999999]">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4 bg-gray-200 dark:bg-gray-700"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbSegments.map((segment, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {segment.isActive ? (
                    <BreadcrumbPage className="text-gray-900 dark:text-gray-100">
                      {segment.name}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink 
                      href={segment.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer"
                    >
                      {segment.name}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
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