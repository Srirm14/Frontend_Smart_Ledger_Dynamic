import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getSectorById, getDefaultSector } from '@/services/sector-server'
import { FeatureFactory, isFeatureAvailable, type FeatureKey } from '@/app/features/feature-factory'
import { memo } from 'react'

// Memoized feature renderer - ultra-fast switching
const FeatureRenderer = memo(function FeatureRenderer({ 
  feature, 
  sectorName 
}: { 
  feature: string
  sectorName: string 
}) {
  // Ultra-fast feature validation and rendering
  if (isFeatureAvailable(feature)) {
    return <FeatureFactory featureKey={feature} />
  }

  // Fallback for unknown features
  return (
    <div className="space-y-6">
      <div className="col-span-full">
        <h1 className="text-3xl font-bold text-gray-900">Feature Not Found</h1>
        <p className="text-gray-600 mt-2">This feature is not available for {sectorName}</p>
      </div>
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Feature Not Found</CardTitle>
          <CardDescription>This feature is not available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">Feature not found or not implemented</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
})

// Server-side component
export default async function FeaturePage({ 
  params 
}: { 
  params: Promise<{ sector: string; feature: string }> 
}) {
  const { sector, feature } = await params
  
  // Get sector data from server-side service
  const activeSector = getSectorById(sector) || getDefaultSector()
  
  // Check if feature exists in registry
  const isValidFeature = isFeatureAvailable(feature)
  
  // Check if feature is enabled for this sector
  const isFeatureEnabled = activeSector.features.includes(feature)

  if (!isValidFeature || !isFeatureEnabled) {
    return (
      <div className="col-span-full">
        <Card>
          <CardHeader>
            <CardTitle>Feature Not Available</CardTitle>
            <CardDescription>
              {!isValidFeature 
                ? 'This feature is not available' 
                : `This feature is not enabled for ${activeSector.name}`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Please select an available feature from the sidebar.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <FeatureRenderer feature={feature} sectorName={activeSector.name} />
}