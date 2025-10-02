import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { petrolBunkSettings } from '@/config/sectors/petrolBunk/settings'
import { departmentalStoreSettings } from '@/config/sectors/departmentalStore/settings'
import { pharmacySettings } from '@/config/sectors/pharmacy/settings'
import { petrolBunkFeatures } from '@/config/sectors/petrolBunk/features'
import { departmentalStoreFeatures } from '@/config/sectors/departmentalStore/features'
import { pharmacyFeatures } from '@/config/sectors/pharmacy/features'

export interface Sector {
  id: string
  name: string
  icon: string
  currency: string
  defaultTaxRate: number
  features: readonly string[]
  settings: Record<string, any>
}

export interface SectorStore {
  // State
  activeSector: Sector
  availableSectors: Sector[]
  
  // Actions
  setActiveSector: (sectorId: string) => void
  addCustomSector: (sector: Omit<Sector, 'id'>) => void
  updateSectorSettings: (sectorId: string, settings: Record<string, any>) => void
  
  // Computed
  getEnabledFeatures: () => readonly string[]
  getSectorSettings: () => Record<string, any>
}

// Default sectors configuration - using features from features.ts files
const defaultSectors: Sector[] = [
  {
    id: 'petrolBunk',
    name: petrolBunkSettings.name,
    icon: petrolBunkSettings.icon,
    currency: petrolBunkSettings.currency,
    defaultTaxRate: petrolBunkSettings.defaultTaxRate,
    features: Object.keys(petrolBunkFeatures) as readonly string[],
    settings: petrolBunkSettings,
  },
  {
    id: 'departmentalStore',
    name: departmentalStoreSettings.name,
    icon: departmentalStoreSettings.icon,
    currency: departmentalStoreSettings.currency,
    defaultTaxRate: departmentalStoreSettings.defaultTaxRate,
    features: Object.keys(departmentalStoreFeatures) as readonly string[],
    settings: departmentalStoreSettings,
  },
  {
    id: 'pharmacy',
    name: pharmacySettings.name,
    icon: pharmacySettings.icon,
    currency: pharmacySettings.currency,
    defaultTaxRate: pharmacySettings.defaultTaxRate,
    features: Object.keys(pharmacyFeatures) as readonly string[],
    settings: pharmacySettings,
  },
]

export const useSectorStore = create<SectorStore>()(
  persist(
    (set, get) => ({
      // Initial state - default to pharmacy
      activeSector: defaultSectors.find(s => s.id === 'pharmacy') || defaultSectors[2], // pharmacy
      availableSectors: defaultSectors,

      // Actions
      setActiveSector: (sectorId: string) => {
        const sector = get().availableSectors.find(s => s.id === sectorId)
        if (sector) {
          set({ activeSector: sector })
        }
      },

      addCustomSector: (sectorData: Omit<Sector, 'id'>) => {
        const newSector: Sector = {
          id: `custom_${Date.now()}`,
          ...sectorData,
        }
        set(state => ({
          availableSectors: [...state.availableSectors, newSector],
          activeSector: newSector,
        }))
      },

      updateSectorSettings: (sectorId: string, settings: Record<string, any>) => {
        set(state => ({
          availableSectors: state.availableSectors.map(sector =>
            sector.id === sectorId
              ? { ...sector, settings: { ...sector.settings, ...settings } }
              : sector
          ),
          activeSector: state.activeSector.id === sectorId
            ? { ...state.activeSector, settings: { ...state.activeSector.settings, ...settings } }
            : state.activeSector,
        }))
      },

      // Computed getters
      getEnabledFeatures: () => {
        const activeSector = get().activeSector
        // Get features from the features.ts file and filter only enabled ones
        let enabledFeatures: readonly string[] = []
        
        if (activeSector.id === 'petrolBunk') {
          enabledFeatures = Object.keys(petrolBunkFeatures).filter(
            key => petrolBunkFeatures[key as keyof typeof petrolBunkFeatures].enabled
          ) as readonly string[]
        } else if (activeSector.id === 'departmentalStore') {
          enabledFeatures = Object.keys(departmentalStoreFeatures).filter(
            key => departmentalStoreFeatures[key as keyof typeof departmentalStoreFeatures].enabled
          ) as readonly string[]
        } else if (activeSector.id === 'pharmacy') {
          enabledFeatures = Object.keys(pharmacyFeatures).filter(
            key => pharmacyFeatures[key as keyof typeof pharmacyFeatures].enabled
          ) as readonly string[]
        }
        
        return enabledFeatures
      },

      getSectorSettings: () => {
        return get().activeSector.settings
      },
    }),
    {
      name: 'sector-store',
      version: 2, // Increment version to clear old data
      migrate: (persistedState: any, version: number) => {
        // Force pharmacy as default on migration
        if (version < 2) {
          return {
            ...persistedState,
            activeSector: defaultSectors.find(s => s.id === 'pharmacy') || defaultSectors[2],
          }
        }
        return persistedState
      },
      partialize: (state) => ({
        activeSector: state.activeSector,
        availableSectors: state.availableSectors,
      }),
    }
  )
)