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
import { petrolBunkSettings } from '@/config/sectors/petrolBunk/settings'
import { departmentalStoreSettings } from '@/config/sectors/departmentalStore/settings'
import { pharmacySettings } from '@/config/sectors/pharmacy/settings'
import { getAvailableFeatures } from '@/app/features/feature-factory'
import { getFeatureDisplayName } from '@/config/feature-registry'

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

// Sector settings by sector
const sectorSettings = {
  petrolBunk: petrolBunkSettings,
  departmentalStore: departmentalStoreSettings,
  pharmacy: pharmacySettings,
} as const

// Sector icons
const sectorIcons = {
  Building2,
  Store,
  Pill,
  Wrench,
} as const

export function AppSidebar() {
  const pathname = usePathname()
  const { activeSector, availableSectors, setActiveSector, getEnabledFeatures } = useSectorStore()
  
  const enabledFeatures = getEnabledFeatures()
  
  // Debug logging
  console.log('Active Sector:', activeSector.name)
  console.log('Enabled Features:', enabledFeatures)
  
  // Use only the enabled features from the store
  const sectorFeatures = enabledFeatures
  console.log('Sector Features (Enabled Only):', sectorFeatures)

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('username')
    window.location.href = '/login'
  }

  const getSectorIcon = (iconName: string) => {
    const IconComponent = sectorIcons[iconName as keyof typeof sectorIcons] || Building2
    return IconComponent
  }

  const getFeatureIcon = (featureId: string) => {
    const IconComponent = featureIcons[featureId as keyof typeof featureIcons] || ShoppingCart
    return IconComponent
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Smart Ledger</span>
            <span className="truncate text-xs text-muted-foreground">
              {activeSector.name} • {enabledFeatures.length} features
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>All Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sectorFeatures.map((featureId) => {
                const IconComponent = getFeatureIcon(featureId)
                const featurePath = `/${activeSector.id}/${featureId}`
                
                // Get feature display name from feature registry
                const featureName = getFeatureDisplayName(featureId as any)
                
                return (
                  <SidebarMenuItem key={featureId}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={pathname === featurePath}
                    >
                      <Link 
                        href={featurePath} 
                        title={`${featureName} for ${activeSector.name}`}
                      >
                        <IconComponent className="mr-2 h-4 w-4" />
                        {featureName}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-600 hover:text-red-700"
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