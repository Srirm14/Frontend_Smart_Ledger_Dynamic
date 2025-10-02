'use client'

import { useSectorStore } from '@/store/sector-store'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Building2,
  Store,
  Pill,
  Wrench,
} from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'

// Sector icons mapping
const sectorIcons = {
  Building2,
  Store,
  Pill,
  Wrench,
} as const

interface SectorSelectorProps {
  className?: string
  variant?: 'default' | 'compact' | 'sidebar-header' | 'sidebar-header-collapsed'
}

export function SectorSelector({ className = '', variant = 'default' }: SectorSelectorProps) {
  const { activeSector, availableSectors, setActiveSector, getEnabledFeatures } = useSectorStore()
  const { isDark } = useTheme()

  const getSectorIcon = (iconName: string) => {
    const IconComponent = sectorIcons[iconName as keyof typeof sectorIcons] || Building2
    return IconComponent
  }

  const CurrentSectorIcon = getSectorIcon(activeSector.icon)
  const enabledFeatures = getEnabledFeatures()

  // Debug logging
  console.log('SectorSelector - activeSector:', activeSector)
  console.log('SectorSelector - availableSectors:', availableSectors)

  if (variant === 'sidebar-header') {
    return (
      <Select value={activeSector.id} onValueChange={setActiveSector}>
        <SelectTrigger className={`w-full border-0 bg-transparent p-0 h-auto hover:bg-gray-50 dark:hover:bg-gray-800 rounded cursor-pointer ${className}`}>
          <div className="flex items-center gap-2 px-2 py-2 w-full">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <CurrentSectorIcon className="h-4 w-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Smart Ledger</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">{activeSector.name}</span>
                <span className="text-xs text-muted-foreground">• {enabledFeatures.length} features</span>
              </div>
            </div>
          </div>
        </SelectTrigger>
         <SelectContent className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg">
           {availableSectors.map((sector) => {
             const SectorIcon = getSectorIcon(sector.icon)
             return (
               <SelectItem 
                 key={sector.id} 
                 value={sector.id}
                 className="hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-50 dark:focus:bg-gray-800 cursor-pointer"
               >
                 <div className="flex items-center py-2">
                   <SectorIcon className="mr-3 h-4 w-4 text-gray-600 dark:text-gray-400" />
                   <span className="text-gray-900 dark:text-gray-100 font-medium">{sector.name}</span>
                 </div>
               </SelectItem>
             )
           })}
         </SelectContent>
      </Select>
    )
  }

  if (variant === 'sidebar-header-collapsed') {
    return (
      <Select value={activeSector.id} onValueChange={setActiveSector}>
        <SelectTrigger className={`w-auto border-0 bg-transparent p-0 h-auto hover:cursor-pointer [&>svg]:hidden ${className}`}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <CurrentSectorIcon className="h-4 w-4" />
          </div>
        </SelectTrigger>
         <SelectContent className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg">
           {availableSectors.map((sector) => {
             const SectorIcon = getSectorIcon(sector.icon)
             return (
               <SelectItem 
                 key={sector.id} 
                 value={sector.id}
                 className="hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-50 dark:focus:bg-gray-800 cursor-pointer"
               >
                 <div className="flex items-center py-2">
                   <SectorIcon className="mr-3 h-4 w-4 text-gray-600 dark:text-gray-400" />
                   <span className="text-gray-900 dark:text-gray-100 font-medium">{sector.name}</span>
                 </div>
               </SelectItem>
             )
           })}
         </SelectContent>
      </Select>
    )
  }

  if (variant === 'compact') {
    return (
      <Select value={activeSector.id} onValueChange={setActiveSector}>
        <SelectTrigger className={`w-auto border-0 bg-transparent p-1 h-auto hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer ${className}`}>
          <div className="flex items-center gap-1">
            <CurrentSectorIcon className="h-3 w-3" />
            <SelectValue placeholder="Select sector" />
          </div>
        </SelectTrigger>
         <SelectContent className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg">
           {availableSectors.map((sector) => {
             const SectorIcon = getSectorIcon(sector.icon)
             return (
               <SelectItem 
                 key={sector.id} 
                 value={sector.id}
                 className="hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-50 dark:focus:bg-gray-800 cursor-pointer"
               >
                 <div className="flex items-center py-2">
                   <SectorIcon className="mr-3 h-4 w-4 text-gray-600 dark:text-gray-400" />
                   <span className="text-gray-900 dark:text-gray-100 font-medium">{sector.name}</span>
                 </div>
               </SelectItem>
             )
           })}
         </SelectContent>
      </Select>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <CurrentSectorIcon className="h-4 w-4 text-muted-foreground" />
      <Select value={activeSector.id} onValueChange={setActiveSector}>
        <SelectTrigger className="w-auto border-0 bg-transparent p-0 h-auto">
          <SelectValue placeholder="Select sector" />
        </SelectTrigger>
         <SelectContent className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg">
           {availableSectors.map((sector) => {
             const SectorIcon = getSectorIcon(sector.icon)
             return (
               <SelectItem 
                 key={sector.id} 
                 value={sector.id}
                 className="hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-50 dark:focus:bg-gray-800 cursor-pointer"
               >
                 <div className="flex items-center py-2">
                   <SectorIcon className="mr-3 h-4 w-4 text-gray-600 dark:text-gray-400" />
                   <span className="text-gray-900 dark:text-gray-100 font-medium">{sector.name}</span>
                 </div>
               </SelectItem>
             )
           })}
         </SelectContent>
      </Select>
    </div>
  )
}
