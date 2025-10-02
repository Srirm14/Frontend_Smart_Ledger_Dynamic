import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { petrolBunkSettings } from '@/config/sectors/petrolBunk/settings'
import { departmentalStoreSettings } from '@/config/sectors/departmentalStore/settings'
import { pharmacySettings } from '@/config/sectors/pharmacy/settings'
import { petrolBunkFeatures } from '@/config/sectors/petrolBunk/features'
import { departmentalStoreFeatures } from '@/config/sectors/departmentalStore/features'
import { pharmacyFeatures } from '@/config/sectors/pharmacy/features'
import { SectorDefinition, AISuggestion, SectorMigration } from '@/types'
// Direct API calls to server-side endpoints

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
  customSectors: Sector[]
  aiSuggestions: AISuggestion[]
  migrations: SectorMigration[]
  isLoading: boolean
  error: string | null
  
  // Actions
  setActiveSector: (sectorId: string) => void
  addCustomSector: (sector: Sector) => void
  updateSectorSettings: (sectorId: string, settings: Record<string, any>) => void
  syncWithBackend: () => Promise<void>
  applyAISuggestion: (suggestionId: string) => Promise<void>
  generateAISuggestions: (prompt: string) => Promise<void>
  
  // Computed
  getEnabledFeatures: () => readonly string[]
  getSectorSettings: () => Record<string, any>
  getAllSectors: () => Sector[]
  getAISuggestions: (sectorId?: string) => AISuggestion[]
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
      customSectors: [],
      aiSuggestions: [],
      migrations: [],
      isLoading: false,
      error: null,

      // Actions
      setActiveSector: (sectorId: string) => {
        const allSectors = [...get().availableSectors, ...get().customSectors]
        const sector = allSectors.find(s => s.id === sectorId)
        if (sector) {
          set({ activeSector: sector })
          // Sync with backend
          get().syncWithBackend()
        }
      },

      addCustomSector: (sectorData: Sector) => {
        const newSector: Sector = {
          ...sectorData,
        }
        set(state => ({ 
          customSectors: [...state.customSectors, newSector],
          activeSector: newSector,
        }))
        // Sync with backend
        get().syncWithBackend()
      },

      updateSectorSettings: (sectorId: string, settings: Record<string, any>) => {
        set(state => ({
          availableSectors: state.availableSectors.map(sector =>
            sector.id === sectorId
              ? { ...sector, settings: { ...sector.settings, ...settings } }
              : sector
          ),
          customSectors: state.customSectors.map(sector =>
            sector.id === sectorId
              ? { ...sector, settings: { ...sector.settings, ...settings } }
              : sector
          ),
          activeSector: state.activeSector.id === sectorId
            ? { ...state.activeSector, settings: { ...state.activeSector.settings, ...settings } }
            : state.activeSector,
        }))
        // Sync with backend
        get().syncWithBackend()
      },

      syncWithBackend: async () => {
        try {
          set({ isLoading: true, error: null })
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 100))
          
          set({ 
            isLoading: false
          })
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Sync failed' 
          })
        }
      },

      applyAISuggestion: async (suggestionId: string) => {
        try {
          set({ isLoading: true, error: null })
          
          const suggestion = get().aiSuggestions.find(s => s.timestamp.toString() === suggestionId)
          if (!suggestion) {
            throw new Error('Suggestion not found')
          }

          const response = await fetch('/api/ai/apply-suggestion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ suggestionId, suggestion })
          })

          if (!response.ok) {
            throw new Error('Failed to apply AI suggestion')
          }

          const result = await response.json()
          
          // Update local state
          set(state => ({
            aiSuggestions: state.aiSuggestions.map(s => 
              s.timestamp.toString() === suggestionId 
                ? { ...s, applied: true }
                : s
            ),
            isLoading: false
          }))

          // Refresh sector data
          get().syncWithBackend()
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to apply suggestion' 
          })
        }
      },

      generateAISuggestions: async (prompt: string) => {
        try {
          set({ isLoading: true, error: null })
          
          const response = await fetch('/api/ai/generate-suggestions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              prompt, 
              activeSector: get().activeSector,
              context: 'sector-optimization'
            })
          })

          if (!response.ok) {
            throw new Error('Failed to generate AI suggestions')
          }

          const suggestions: AISuggestion[] = await response.json()
          
          set(state => ({
            aiSuggestions: [...state.aiSuggestions, ...suggestions],
            isLoading: false
          }))
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to generate suggestions' 
          })
        }
      },

      // Computed getters
      getEnabledFeatures: () => {
        const activeSector = get().activeSector
        
        // Check if this is a custom sector with user-selected features
        if (activeSector.settings?.customFeatures) {
          return activeSector.settings.customFeatures as readonly string[]
        }
        
        // For predefined sectors, get features from config files
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
        } else {
          // For other custom sectors, use the features array directly
          enabledFeatures = activeSector.features
        }
        
        return enabledFeatures
      },

      getSectorSettings: () => {
        return get().activeSector.settings
      },

      getAllSectors: () => {
        return [...get().availableSectors, ...get().customSectors]
      },

      getAISuggestions: (sectorId?: string) => {
        const suggestions = get().aiSuggestions
        if (sectorId) {
          return suggestions.filter(s => s.type === 'sector' || s.type === 'feature')
        }
        return suggestions
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