'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { AppSidebar } from '@/components/shared/layout/app-sidebar'
import { SiteHeader } from '@/components/shared/layout/site-header'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { useSectorStore } from '@/store/sector-store'

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
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full max-w-full overflow-hidden">
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-hidden">
          <div className="flex-1 w-full max-w-full overflow-hidden">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
