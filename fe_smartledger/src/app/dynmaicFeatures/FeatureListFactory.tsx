"use client"

import { memo, useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SmartLoadingSpinner } from '@/components/Shared/Loader/SmartLoadingSpinner'

// Dynamic feature list component registry
const FEATURE_LIST_REGISTRY = {
  product: () => import('@/app/screens/features/product/list'),
} as const

export type FeatureListKey = keyof typeof FEATURE_LIST_REGISTRY

// Feature list factory - dynamically loads the appropriate component
export const FeatureListFactory = memo(function FeatureListFactory({ 
  featureKey,
  sector
}: { 
  featureKey: string
  sector: string
}) {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadComponent = async () => {
      setLoading(true)
      
      if (featureKey in FEATURE_LIST_REGISTRY) {
        try {
          const module = await FEATURE_LIST_REGISTRY[featureKey as FeatureListKey]()
          setComponent(() => module.default)
        } catch (error) {
          console.error(`Failed to load ${featureKey} list component:`, error)
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
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <SmartLoadingSpinner size="md" />
      </div>
    )
  }

  if (Component) {
    const props = { sector, featureKey }
    return <Component {...props} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{featureKey.charAt(0).toUpperCase() + featureKey.slice(1)} List</CardTitle>
        <CardDescription>Sector: {sector}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">List component for {featureKey} feature coming soon...</p>
      </CardContent>
    </Card>
  )
})
