"use client"

import { memo, useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SmartLoadingSpinner } from '@/components/Shared/Loader/SmartLoadingSpinner'

// Dynamic feature details component registry
const FEATURE_DETAILS_REGISTRY = {
  product: () => import('@/app/screens/features/product/details'),
} as const

export type FeatureDetailsKey = keyof typeof FEATURE_DETAILS_REGISTRY

// Feature details factory - dynamically loads the appropriate component
export const FeatureDetailsFactory = memo(function FeatureDetailsFactory({ 
  featureKey,
  itemId,
  onBack
}: { 
  featureKey: string
  itemId: string
  onBack: () => void
}) {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadComponent = async () => {
      setLoading(true)
      
      if (featureKey in FEATURE_DETAILS_REGISTRY) {
        try {
          const module = await FEATURE_DETAILS_REGISTRY[featureKey as FeatureDetailsKey]()
          setComponent(() => module.default)
        } catch (error) {
          console.error(`Failed to load ${featureKey} details component:`, error)
          setComponent(null)
        }
      } else {
        setComponent(null)
      }
      
      setLoading(false)
    }

    loadComponent()
  }, [featureKey])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <SmartLoadingSpinner size="sm" className="py-0" />
            <span className="ml-2 text-gray-500">Loading {featureKey} details...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (Component) {
    const props = {
      productId: itemId,
      onBack
    }
    return <Component {...props} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{featureKey.charAt(0).toUpperCase() + featureKey.slice(1)} Details</CardTitle>
        <CardDescription>ID: {itemId}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Details component for {featureKey} feature coming soon...</p>
      </CardContent>
    </Card>
  )
})
