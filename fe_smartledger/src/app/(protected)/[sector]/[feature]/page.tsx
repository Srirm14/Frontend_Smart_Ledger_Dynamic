'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SmartLoadingSpinner } from '@/components/Shared/Loader/SmartLoadingSpinner'

export default function FeaturePage() {
  const router = useRouter()
  const params = useParams()
  const sectorId = params.sector as string
  const featureId = params.feature as string

  useEffect(() => {
    // Redirect to the feature list page
    router.push(`/${sectorId}/${featureId}/list`)
  }, [router, sectorId, featureId])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <SmartLoadingSpinner size="md" className="mb-4" />
      </div>
    </div>
  )
}
