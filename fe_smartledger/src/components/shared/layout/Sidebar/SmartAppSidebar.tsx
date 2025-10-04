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
  Box,
  Briefcase,
  IndianRupee,
  Users,
  UsersRound,
  Banknote,
  BarChart3,
  Settings,
  Building2,
  Store,
  Pill,
  Wrench,
  MoreVertical,
} from 'lucide-react'
import { useSectorStore } from '@/store/sector-store'
import { getFeatureDisplayName } from '@/config/feature-registry'
import { SectorSelector } from '@/components/Shared/Layout/Sidebar/SectorSelector'
import { UserProfilePopover } from '@/components/Shared/Layout/Sidebar/UserProfilePopover'
import { useTheme } from '@/hooks/use-theme'

// Feature data with icons
const featureIcons = {
  product: ShoppingCart,
  dashboard: LayoutDashboard,
  inventory: Box,
  staff: UsersRound,
  customer: Users,
  credit: IndianRupee,
  cashflow: Banknote,
  tally: Briefcase,
  reports: BarChart3,
} as const


export function SmartAppSidebar() {
  const pathname = usePathname()
  const { activeSector, getEnabledFeatures } = useSectorStore()
  const { isDark } = useTheme()
  
  const enabledFeatures = getEnabledFeatures()
  
  // Get enabled features for current sector
  const sectorFeatures = enabledFeatures

  // Removed handleLogout - now handled in UserProfilePopover


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
              {(() => {
                // Always show Dashboard first if it's enabled
                const sortedFeatures = [...sectorFeatures].sort((a, b) => {
                  if (a === 'dashboard') return -1
                  if (b === 'dashboard') return 1
                  return 0
                })
                
                return sortedFeatures.map((featureId) => {
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
                })
              })()}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

              <SidebarFooter className="border-t border-gray-200 dark:border-gray-700 group-data-[collapsible=icon]:px-0">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <UserProfilePopover>
                      <SidebarMenuButton asChild tooltip={{
                        children: "Profile & Settings",
                        className: "bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-lg"
                      }}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent hover:border-primary/30 dark:hover:border-primary/50 transition-all duration-200 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:mx-auto"
                        >
                          {/* Avatar - always show */}
                          <div className="flex items-center justify-center size-6 rounded-full bg-primary text-white text-base font-semibold mr-2 group-data-[collapsible=icon]:mr-0 group-data-[collapsible=icon]:size-6 group-data-[collapsible=icon]:text-base flex-shrink-0">
                            {(localStorage.getItem('username') || 'U').charAt(0).toUpperCase()}
                          </div>
                          <span className="group-data-[collapsible=icon]:hidden flex-1 truncate">{localStorage.getItem('username') || 'User'}</span>
                          {/* Triple dot menu */}
                          <MoreVertical className="h-4 w-4 text-gray-400 dark:text-gray-500 group-data-[collapsible=icon]:hidden flex-shrink-0" />
                        </Button>
                      </SidebarMenuButton>
                    </UserProfilePopover>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
    </Sidebar>
  )
}