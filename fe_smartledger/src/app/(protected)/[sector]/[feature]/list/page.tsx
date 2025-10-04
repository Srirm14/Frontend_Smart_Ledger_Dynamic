"use client"

import { memo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FeatureListFactory } from '@/app/dynmaicFeatures/FeatureListFactory'
// Dynamic Feature List Page
const FeatureListPage = memo(function FeatureListPage() {
  const params = useParams()
  const router = useRouter()
  const { sector, feature } = params as { sector: string; feature: string }

  const handleBack = () => {
    // Navigate back to the sector page
    router.push(`/${sector}`)
  }

  return (
    <div className="w-full space-y-6">
      {/* Dynamic Feature List */}
      <FeatureListFactory
        featureKey={feature}
        sector={sector}
      />
    </div>
  )
})

export default FeatureListPage
