'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { SmartAppSidebar } from '@/components/Shared/Layout/Sidebar/SmartAppSidebar'
import { SmartAppHeader } from '@/components/Shared/Layout/Header/SmartAppHeader'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { useSectorStore } from '@/store/sector-store'
import { SmartLoadingSpinner } from '@/components/Shared/Loader/SmartLoadingSpinner'

export default function SectorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const params = useParams()
  const sectorId = params.sector as string
  const { setActiveSector, availableSectors, customSectors, getAllSectors } = useSectorStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    // Set active sector based on URL - check both available and custom sectors
    const allSectors = getAllSectors()
    const sector = allSectors.find(s => s.id === sectorId)
    if (sector) {
      setActiveSector(sectorId)
    } else {
      // Redirect to default sector if invalid
      router.push('/petrolBunk')
      return
    }
    
    setIsLoading(false)
  }, [router, sectorId, setActiveSector, getAllSectors])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SmartLoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <SidebarProvider>
      <SmartAppSidebar />
      <SidebarInset className="flex flex-col h-screen min-w-0 overflow-hidden">
        <SmartAppHeader />
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1 min-w-0 overflow-hidden">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
