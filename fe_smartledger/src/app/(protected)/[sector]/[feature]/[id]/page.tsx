"use client"

import { memo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FeatureDetailsFactory } from '@/app/dynmaicFeatures/FeatureDetailsFactory'

// Dynamic Feature Details Page
const FeatureDetailsPage = memo(function FeatureDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { sector, feature, id } = params as { sector: string; feature: string; id: string }

  const handleBack = () => {
    // Navigate back to the feature list page (e.g., /petrolBunk/product/list)
    router.push(`/${sector}/${feature}/list`)
  }

  return (
    <div className="w-full space-y-6">
      {/* Dynamic Feature Details */}
      <FeatureDetailsFactory 
        featureKey={feature}
        itemId={id}
        onBack={handleBack}
      />
    </div>
  )
})

export default FeatureDetailsPage
