import { renderHook, act } from '@testing-library/react'
import { useNetworkStatus } from './use-network-status'

// Mock navigator.onLine
const mockNavigator = {
  onLine: true,
}

Object.defineProperty(window, 'navigator', {
  value: mockNavigator,
  writable: true,
})

describe('useNetworkStatus', () => {
  beforeEach(() => {
    mockNavigator.onLine = true
  })

  it('should return initial online status', () => {
    const { result } = renderHook(() => useNetworkStatus())
    
    expect(result.current.isOnline).toBe(true)
    expect(result.current.isOffline).toBe(false)
  })

  it('should update status when going offline', () => {
    const { result } = renderHook(() => useNetworkStatus())
    
    act(() => {
      mockNavigator.onLine = false
      window.dispatchEvent(new Event('offline'))
    })
    
    expect(result.current.isOnline).toBe(false)
    expect(result.current.isOffline).toBe(true)
    expect(result.current.lastOfflineTime).toBeInstanceOf(Date)
  })

  it('should update status when coming back online', () => {
    const { result } = renderHook(() => useNetworkStatus())
    
    // First go offline
    act(() => {
      mockNavigator.onLine = false
      window.dispatchEvent(new Event('offline'))
    })
    
    // Then come back online
    act(() => {
      mockNavigator.onLine = true
      window.dispatchEvent(new Event('online'))
    })
    
    expect(result.current.isOnline).toBe(true)
    expect(result.current.isOffline).toBe(false)
    expect(result.current.lastOnlineTime).toBeInstanceOf(Date)
  })
})
