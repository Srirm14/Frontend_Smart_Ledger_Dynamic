'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSectorStore } from '@/store/sector-store'
import { SmartLoadingSpinner } from '@/components/Shared/Loader/SmartLoadingSpinner'

export default function SectorPage() {
  const router = useRouter()
  const params = useParams()
  const sectorId = params.sector as string
  const { activeSector, getEnabledFeatures } = useSectorStore()

  useEffect(() => {
    // Redirect to first feature of the sector
    const enabledFeatures = getEnabledFeatures()
    if (enabledFeatures.length > 0) {
      const firstFeature = enabledFeatures[0]
      router.push(`/${sectorId}/${firstFeature}`)
    }
  }, [router, sectorId, getEnabledFeatures])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <SmartLoadingSpinner size="md" className="mb-4" />
        <p className="text-gray-600">Redirecting to {activeSector.name}...</p>
      </div>
    </div>
  )
}
