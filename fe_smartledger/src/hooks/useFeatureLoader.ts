import { useState, useCallback } from 'react'
import { featureRegistry, FeatureKey } from '../config/feature-registry'

export const useFeatureLoader = (sectorId: string) => {
  const [loadedFeatures, setLoadedFeatures] = useState<Set<string>>(new Set())
  const [loadingFeatures, setLoadingFeatures] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)
  
  const loadFeature = useCallback(async (featureKey: string) => {
    if (loadedFeatures.has(featureKey)) return
    
    setLoadingFeatures(prev => new Set(prev).add(featureKey))
    setError(null)
    
    try {
      if (featureKey in featureRegistry) {
        const module = await featureRegistry[featureKey as FeatureKey]()
        setLoadedFeatures(prev => new Set(prev).add(featureKey))
      } else {
        throw new Error(`Feature "${featureKey}" not found in registry`)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load feature')
    } finally {
      setLoadingFeatures(prev => {
        const next = new Set(prev)
        next.delete(featureKey)
        return next
      })
    }
  }, [loadedFeatures])
  
  const unloadFeature = useCallback((featureKey: string) => {
    setLoadedFeatures(prev => {
      const next = new Set(prev)
      next.delete(featureKey)
      return next
    })
  }, [])
  
  const isFeatureLoaded = useCallback((featureKey: string) => {
    return loadedFeatures.has(featureKey)
  }, [loadedFeatures])
  
  const isFeatureLoading = useCallback((featureKey: string) => {
    return loadingFeatures.has(featureKey)
  }, [loadingFeatures])
  
  return {
    loadFeature,
    unloadFeature,
    isFeatureLoaded,
    isFeatureLoading,
    loadedFeatures,
    loadingFeatures,
    error,
  }
}
