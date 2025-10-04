'use client'

import { useState, useEffect, useCallback } from 'react'

interface NetworkStatus {
  isOnline: boolean
  isOffline: boolean
  connectionType: string | null
  effectiveType: string | null
  downlink: number | null
  rtt: number | null
  lastOnlineTime: Date | null
  lastOfflineTime: Date | null
  isSupported: boolean
}

export function useNetworkStatus(): NetworkStatus {
  const [isOnline, setIsOnline] = useState<boolean>(true)
  const [connectionType, setConnectionType] = useState<string | null>(null)
  const [effectiveType, setEffectiveType] = useState<string | null>(null)
  const [downlink, setDownlink] = useState<number | null>(null)
  const [rtt, setRtt] = useState<number | null>(null)
  const [lastOnlineTime, setLastOnlineTime] = useState<Date | null>(null)
  const [lastOfflineTime, setLastOfflineTime] = useState<Date | null>(null)
  const [isSupported, setIsSupported] = useState<boolean>(false)

  const updateConnectionInfo = useCallback(() => {
    try {
      if ('connection' in navigator && navigator.connection) {
        const connection = (navigator as any).connection
        setConnectionType(connection?.type || null)
        setEffectiveType(connection?.effectiveType || null)
        setDownlink(connection?.downlink || null)
        setRtt(connection?.rtt || null)
      }
    } catch (error) {
      console.warn('Network connection API not supported:', error)
      setConnectionType(null)
      setEffectiveType(null)
      setDownlink(null)
      setRtt(null)
    }
  }, [])

  const handleOnline = useCallback(() => {
    setIsOnline(true)
    setLastOnlineTime(new Date())
    updateConnectionInfo()
  }, [updateConnectionInfo])

  const handleOffline = useCallback(() => {
    setIsOnline(false)
    setLastOfflineTime(new Date())
  }, [])

  const handleConnectionChange = useCallback(() => {
    updateConnectionInfo()
  }, [updateConnectionInfo])

  useEffect(() => {
    try {
      // Check if navigator.onLine is supported
      if (typeof navigator !== 'undefined' && 'onLine' in navigator) {
        setIsSupported(true)
        setIsOnline(navigator.onLine)
        updateConnectionInfo()
        
        // Add event listeners
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)
        
        // Add connection change listener if supported
        if ('connection' in navigator && navigator.connection) {
          const connection = (navigator as any).connection
          connection?.addEventListener('change', handleConnectionChange)
        }
      } else {
        setIsSupported(false)
        setIsOnline(true) // Default to online if not supported
      }
    } catch (error) {
      console.warn('Network status detection not supported:', error)
      setIsSupported(false)
      setIsOnline(true) // Default to online
    }

    // Cleanup
    return () => {
      try {
        if (isSupported) {
          window.removeEventListener('online', handleOnline)
          window.removeEventListener('offline', handleOffline)
          
          if ('connection' in navigator && navigator.connection) {
            const connection = (navigator as any).connection
            connection?.removeEventListener('change', handleConnectionChange)
          }
        }
      } catch (error) {
        console.warn('Event listener cleanup failed:', error)
      }
    }
  }, [handleOnline, handleOffline, handleConnectionChange, updateConnectionInfo, isSupported])

  return {
    isOnline,
    isOffline: !isOnline,
    connectionType,
    effectiveType,
    downlink,
    rtt,
    lastOnlineTime,
    lastOfflineTime,
    isSupported,
  }
}