import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Sector {
  id: string
  name: string
  features: string[]
  isCustom: boolean
  settings?: Record<string, any>
}

export interface CustomSector extends Sector {
  isCustom: true
  description?: string
  createdBy: string
  createdAt: string
}

interface SectorStore {
  activeSector: string | null
  availableSectors: Sector[]
  isLoading: boolean
  error: string | null
  
  // Actions
  setActiveSector: (sectorId: string) => Promise<void>
  addCustomSector: (sector: CustomSector) => void
  removeSector: (sectorId: string) => void
  refreshSectors: () => Promise<void>
  clearError: () => void
}

export const useSectorStore = create<SectorStore>()(
  persist(
    (set, get) => ({
      activeSector: null,
      availableSectors: [],
      isLoading: false,
      error: null,

      setActiveSector: async (sectorId: string) => {
        set({ isLoading: true, error: null })
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500))
          set({ activeSector: sectorId, isLoading: false })
        } catch (error) {
          set({ error: 'Failed to switch sector', isLoading: false })
        }
      },

      addCustomSector: (sector: CustomSector) => {
        set(state => ({
          availableSectors: [...state.availableSectors, sector]
        }))
      },

      removeSector: (sectorId: string) => {
        set(state => ({
          availableSectors: state.availableSectors.filter(s => s.id !== sectorId),
          activeSector: state.activeSector === sectorId ? null : state.activeSector
        }))
      },

      refreshSectors: async () => {
        set({ isLoading: true, error: null })
        try {
          // Simulate API call to fetch sectors
          await new Promise(resolve => setTimeout(resolve, 1000))
          set({ isLoading: false })
        } catch (error) {
          set({ error: 'Failed to refresh sectors', isLoading: false })
        }
      },

      clearError: () => {
        set({ error: null })
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
