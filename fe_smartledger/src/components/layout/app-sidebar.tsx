'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Building2,
  Store,
  Pill,
  Wrench,
} from 'lucide-react'
import { useSectorStore } from '@/store/sector-store'
import { getFeatureDisplayName } from '@/config/feature-registry'
import { SectorSelector } from './sector-selector'
import { useTheme } from '@/hooks/use-theme'

// Feature data with icons
const featureIcons = {
  product: ShoppingCart,
  sales: ShoppingCart,
  inventory: Package,
  staff: Building2,
  customer: Building2,
  credit: CreditCard,
  cashflow: BarChart3,
  tally: BarChart3,
  reports: BarChart3,
} as const


export function AppSidebar() {
  const pathname = usePathname()
  const { activeSector, getEnabledFeatures } = useSectorStore()
  const { isDark } = useTheme()
  
  const enabledFeatures = getEnabledFeatures()
  
  // Get enabled features for current sector
  const sectorFeatures = enabledFeatures

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('username')
    window.location.href = '/login'
  }


  const getFeatureIcon = (featureId: string) => {
    const IconComponent = featureIcons[featureId as keyof typeof featureIcons] || ShoppingCart
    return IconComponent
  }

  return (
    <Sidebar 
      className="bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-700"
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-gray-200 dark:border-gray-700 bg-primary/5 dark:bg-primary/10 h-16 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
        <div className="group-data-[collapsible=icon]:hidden flex items-center h-full">
          <SectorSelector variant="sidebar-header" />
        </div>
        <div className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center">
          <SectorSelector variant="sidebar-header-collapsed" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
            <SidebarMenu className="space-y-1 px-2 group-data-[collapsible=icon]:px-0">
              {sectorFeatures.map((featureId) => {
                const IconComponent = getFeatureIcon(featureId)
                const featurePath = `/${activeSector.id}/${featureId}`
                
                // Get feature display name from feature registry
                const featureName = getFeatureDisplayName(featureId as any)
                
                const isActive = pathname === featurePath
                
                return (
                  <SidebarMenuItem key={featureId} className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      tooltip={{
                        children: `${featureName} for ${activeSector.name}`,
                        className: "bg-black dark:bg-gray-800 text-white dark:text-gray-100 border border-gray-200 dark:border-gray-700 shadow-lg"
                      }}
                        className={`
                          hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600
                          ${isActive ? 'bg-primary-100 dark:bg-primary-800 border border-primary dark:border-primary shadow-sm hover:border-primary-500 hover:bg-primary-200 dark:hover:bg-primary-700 data-[active=true]:!bg-primary-100 dark:data-[active=true]:!bg-primary-800' : 'border border-transparent'}
                          rounded-lg transition-all duration-200
                          group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:mx-auto
                        `}
                    >
                      <Link 
                        href={featurePath} 
                        title={`${featureName} for ${activeSector.name}`}
                        className={`
                          flex items-center px-3 py-2 rounded-lg w-full
                          group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0 group-data-[collapsible=icon]:h-full group-data-[collapsible=icon]:w-full
                          ${isActive 
                            ? 'text-primary dark:text-primary' 
                            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                          }
                        `}
                      >
                        <IconComponent className={`
                          mr-2 h-4 w-4 group-data-[collapsible=icon]:mr-0
                          ${isActive 
                            ? 'text-primary dark:text-primary' 
                            : 'text-gray-600 dark:text-gray-400'
                          }
                        `} />
                        <span className={`
                          group-data-[collapsible=icon]:hidden
                          ${isActive 
                            ? 'text-primary dark:text-primary' 
                            : 'text-gray-700 dark:text-gray-300'
                          }
                        `}>
                          {featureName}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 dark:border-gray-700 group-data-[collapsible=icon]:px-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={{
              children: "Settings",
              className: "bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-lg"
            }}>
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent hover:border-primary/30 dark:hover:border-primary/50 transition-all duration-200 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:mx-auto"
              >
                <Settings className="mr-2 h-4 w-4 text-gray-600 dark:text-gray-400 group-data-[collapsible=icon]:mr-0" />
                <span className="group-data-[collapsible=icon]:hidden">Settings</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={{
              children: "Logout",
              className: "bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-lg"
            }}>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 border border-transparent hover:border-red-300 dark:hover:border-red-600 transition-all duration-200 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:mx-auto"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4 group-data-[collapsible=icon]:mr-0" />
                <span className="group-data-[collapsible=icon]:hidden">Logout</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}