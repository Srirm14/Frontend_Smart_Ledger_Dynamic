// Server-side sector service
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

export function getSectorById(sectorId: string): Sector | null {
  return defaultSectors.find(sector => sector.id === sectorId) || null
}

export function getDefaultSector(): Sector {
  return defaultSectors[0] // petrolBunk
}

export function getAllSectors(): Sector[] {
  return defaultSectors
}
