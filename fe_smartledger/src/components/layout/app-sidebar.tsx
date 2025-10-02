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
    <Sidebar className="bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-700">
      <SidebarHeader className="border-b border-gray-200 dark:border-gray-700">
        <SectorSelector variant="sidebar-header" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 dark:text-gray-400 font-semibold text-sm uppercase tracking-wide px-3 py-2">Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {sectorFeatures.map((featureId) => {
                const IconComponent = getFeatureIcon(featureId)
                const featurePath = `/${activeSector.id}/${featureId}`
                
                // Get feature display name from feature registry
                const featureName = getFeatureDisplayName(featureId as any)
                
                const isActive = pathname === featurePath
                
                return (
                  <SidebarMenuItem key={featureId}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      className={`
                        hover:bg-gray-100 dark:hover:bg-gray-800 
                        ${isActive ? 'bg-primary/10 dark:bg-primary/20 border border-primary/30 dark:border-primary/50' : ''}
                        rounded-lg transition-all duration-200
                      `}
                    >
                      <Link 
                        href={featurePath} 
                        title={`${featureName} for ${activeSector.name}`}
                        className={`
                          flex items-center px-3 py-2 rounded-lg w-full
                          ${isActive 
                            ? 'text-primary dark:text-primary' 
                            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                          }
                        `}
                      >
                        <IconComponent className={`
                          mr-2 h-4 w-4 
                          ${isActive 
                            ? 'text-primary dark:text-primary' 
                            : 'text-gray-600 dark:text-gray-400'
                          }
                        `} />
                        <span className={`
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

      <SidebarFooter className="border-t border-gray-200 dark:border-gray-700">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button variant="ghost" className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
                <Settings className="mr-2 h-4 w-4 text-gray-600 dark:text-gray-400" />
                Settings
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}