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
import { petrolBunkFeatures } from '@/config/sectors/petrolBunk/features'
import { departmentalStoreFeatures } from '@/config/sectors/departmentalStore/features'
import { pharmacyFeatures } from '@/config/sectors/pharmacy/features'
import { getAvailableFeatures } from '@/app/features/feature-factory'

// Feature data with icons
const featureIcons = {
  sales: ShoppingCart,
  inventory: Package,
  credit: CreditCard,
  tally: BarChart3,
} as const

// Feature configurations by sector
const sectorFeatures = {
  petrolBunk: petrolBunkFeatures,
  departmentalStore: departmentalStoreFeatures,
  pharmacy: pharmacyFeatures,
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
  
  // Get all features defined in the current sector's features configuration
  const sectorFeatureConfig = sectorFeatures[activeSector.id as keyof typeof sectorFeatures]
  const allSectorFeatures = Object.keys(sectorFeatureConfig || {}).filter(featureKey => {
    const feature = sectorFeatureConfig?.[featureKey as keyof typeof sectorFeatureConfig]
    return feature && feature.enabled === true
  })
  console.log('All Sector Features:', allSectorFeatures)

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
              {(() => {
                // Get all features that are defined in the current sector's features configuration
                const sectorFeatureConfig = sectorFeatures[activeSector.id as keyof typeof sectorFeatures]
                const allSectorFeatures = Object.keys(sectorFeatureConfig || {}).filter(featureKey => {
                  const feature = sectorFeatureConfig?.[featureKey as keyof typeof sectorFeatureConfig]
                  return feature && feature.enabled === true
                })
                
                return allSectorFeatures.map((featureId) => {
                  const IconComponent = getFeatureIcon(featureId)
                  const isEnabled = enabledFeatures.includes(featureId)
                  const featurePath = `/${activeSector.id}/${featureId}`
                  
                  // Get feature details from the sector's features configuration
                  const featureConfig = sectorFeatureConfig?.[featureId as keyof typeof sectorFeatureConfig]
                  
                  const featureName = featureConfig?.name || featureId.charAt(0).toUpperCase() + featureId.slice(1)
                  const featureDescription = featureConfig?.description || ''
                  
                  return (
                    <SidebarMenuItem key={featureId}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={pathname === featurePath}
                        disabled={!isEnabled}
                        className={!isEnabled ? 'opacity-50 cursor-not-allowed' : ''}
                      >
                        <Link 
                          href={isEnabled ? featurePath : '#'} 
                          title={isEnabled ? featureDescription : `${featureName} is not available for ${activeSector.name}`}
                          onClick={(e) => !isEnabled && e.preventDefault()}
                        >
                          <IconComponent className="mr-2 h-4 w-4" />
                          {featureName}
                          {!isEnabled && <span className="ml-auto text-xs text-muted-foreground">(Disabled)</span>}
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