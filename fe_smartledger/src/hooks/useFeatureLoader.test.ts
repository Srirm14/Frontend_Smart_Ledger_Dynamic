import { renderHook, act } from '@testing-library/react'
import { useFeatureLoader } from './useFeatureLoader'

// Mock the feature registry
jest.mock('../config/feature-registry', () => ({
  featureRegistry: {
    sales: jest.fn(() => Promise.resolve({ default: () => null })),
    inventory: jest.fn(() => Promise.resolve({ default: () => null })),
    chat: jest.fn(() => Promise.resolve({ default: () => null })),
  },
}))

describe('useFeatureLoader Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize with empty loaded features', () => {
    const { result } = renderHook(() => useFeatureLoader('petrolBunk'))
    
    expect(result.current.loadedFeatures).toEqual(new Set())
    expect(result.current.loadingFeatures).toEqual(new Set())
  })

  it('should load feature successfully', async () => {
    const { result } = renderHook(() => useFeatureLoader('petrolBunk'))
    
    await act(async () => {
      await result.current.loadFeature('sales')
    })

    expect(result.current.loadedFeatures.has('sales')).toBe(true)
    expect(result.current.loadingFeatures.has('sales')).toBe(false)
  })

  it('should handle loading state correctly', async () => {
    const { result } = renderHook(() => useFeatureLoader('petrolBunk'))
    
    act(() => {
      result.current.loadFeature('sales')
    })

    expect(result.current.loadingFeatures.has('sales')).toBe(true)
  })

  it('should not reload already loaded features', async () => {
    const { result } = renderHook(() => useFeatureLoader('petrolBunk'))
    
    // Load feature first time
    await act(async () => {
      await result.current.loadFeature('sales')
    })

    // Try to load again
    await act(async () => {
      await result.current.loadFeature('sales')
    })

    // Should only be called once
    expect(result.current.loadedFeatures.has('sales')).toBe(true)
  })

  it('should handle multiple features loading', async () => {
    const { result } = renderHook(() => useFeatureLoader('petrolBunk'))
    
    await act(async () => {
      await Promise.all([
        result.current.loadFeature('sales'),
        result.current.loadFeature('inventory'),
        result.current.loadFeature('chat'),
      ])
    })

    expect(result.current.loadedFeatures.has('sales')).toBe(true)
    expect(result.current.loadedFeatures.has('inventory')).toBe(true)
    expect(result.current.loadedFeatures.has('chat')).toBe(true)
  })
})
