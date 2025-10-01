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
    features: (() => {
      const features = Object.keys(petrolBunkFeatures) as readonly string[]
      console.log('PetrolBunk features loaded:', features)
      return features
    })(),
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
      // Initial state - default to petrol bunk
      activeSector: defaultSectors[0], // petrolBunk
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
        return get().activeSector.features
      },

      getSectorSettings: () => {
        return get().activeSector.settings
      },
    }),
    {
      name: 'sector-store',
      partialize: (state) => ({
        activeSector: state.activeSector,
        availableSectors: state.availableSectors,
      }),
    }
  )
)