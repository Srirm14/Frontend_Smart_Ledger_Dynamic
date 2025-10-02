"use client"

import { memo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { FeatureDetailsFactory } from '@/app/features/feature-details-factory'

// Dynamic Feature Details Page
const FeatureDetailsPage = memo(function FeatureDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { sector, feature, id } = params as { sector: string; feature: string; id: string }

  const handleBack = () => {
    // Navigate back to the feature page (e.g., /petrolBunk/product)
    router.push(`/${sector}/${feature}`)
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="p-2" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{feature.charAt(0).toUpperCase() + feature.slice(1)} Details</h1>
          <p className="text-gray-600 mt-2">View and manage {feature} details</p>
        </div>
      </div>

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
