'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useSectorStore } from '@/store/sector-store'
import { useRouter } from 'next/navigation'
import { Building2, MessageSquare, CheckCircle } from 'lucide-react'

export default function OnboardingPage() {
  const [step, setStep] = useState<'sectors' | 'setup' | 'complete'>('sectors')
  const [selectedSector, setSelectedSector] = useState<string>('')
  const [customPrompt, setCustomPrompt] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const { addCustomSector, activeSector } = useSectorStore()
  const router = useRouter()
  
  const [sectors, setSectors] = useState<Array<{id: string, name: string, icon: any, description: string}>>([])
  
  useEffect(() => {
    const loadSectors = async () => {
      try {
        const response = await fetch('/api/sectors', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
        const data = await response.json()
        const sectorsData = data.sectors.map((sector: any) => ({
          id: sector.id,
          name: sector.name,
          icon: Building2, // Default icon
          description: `${sector.name} management`
        }))
        setSectors(sectorsData)
      } catch (error) {
        console.error('Failed to load sectors:', error)
      }
    }
    loadSectors()
  }, [])

  const allFeatures = [
    { id: 'product', name: 'Product Management', description: 'Manage products and pricing' },
    { id: 'sales', name: 'Sales Management', description: 'Track sales and revenue' },
    { id: 'inventory', name: 'Inventory Management', description: 'Manage stock levels' },
    { id: 'staff', name: 'Staff Management', description: 'Employee management' },
    { id: 'customer', name: 'Customer Management', description: 'Customer relationships' },
    { id: 'credit', name: 'Credit Management', description: 'Credit tracking' },
    { id: 'cashflow', name: 'Cash Flow Management', description: 'Track daily cash flow' },
    { id: 'tally', name: 'Tally Integration', description: 'Sync with Tally software' },
    { id: 'reports', name: 'Reports & Analytics', description: 'Business insights' },
  ]

  // Simplified AI prompt handling
  const handleAIPrompt = async () => {
    if (customPrompt.trim()) {
      try {
        const response = await fetch('/api/onboarding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: customPrompt })
        })
        const data = await response.json()
        setAiResponse(data.reasoning)
        setSelectedFeatures(data.suggestedFeatures.map((f: any) => f.id))
      } catch (error) {
        // Fallback to simple mock
        setAiResponse("Based on your business needs, I recommend starting with core features: Sales Management, Inventory Management, and Reports & Analytics.")
        setSelectedFeatures(['sales', 'inventory', 'reports'])
      }
    }
  }

  const handleSectorSelect = async (sectorId: string) => {
    setSelectedSector(sectorId)
    setStep('setup')
    
    // Get enabled features for selected sector from API
    try {
      const response = await fetch('/api/sectors', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json()
      const sector = data.sectors.find((s: any) => s.id === sectorId)
      if (sector) {
        const enabledFeatures = Object.keys(sector.features).filter(
          key => sector.features[key].enabled
        )
        setSelectedFeatures(enabledFeatures)
      } else {
        setSelectedFeatures(['sales', 'inventory']) // Fallback
      }
    } catch (error) {
      console.error('Failed to load features:', error)
      setSelectedFeatures(['sales', 'inventory']) // Fallback
    }
  }

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    )
  }

  const handleCreateLedger = async () => {
    if (selectedFeatures.length > 0) {
      try {
        let sectorName = 'Custom Business'
        let isAiGenerated = false
        let aiPrompt = ''

        if (selectedSector) {
          // For predefined sectors
          sectorName = sectors.find(s => s.id === selectedSector)?.name || 'Custom Business'
        } else {
          // For AI-generated sectors - extract business type from AI response
          const aiSuggestion = aiResponse.toLowerCase()
          if (aiSuggestion.includes('bakery')) {
            sectorName = 'Bakery'
          } else if (aiSuggestion.includes('restaurant')) {
            sectorName = 'Restaurant'
          } else if (aiSuggestion.includes('retail') || aiSuggestion.includes('store')) {
            sectorName = 'Retail Store'
          } else if (aiSuggestion.includes('pharmacy')) {
            sectorName = 'Pharmacy'
          } else {
            sectorName = 'Custom Business'
          }
          isAiGenerated = true
          aiPrompt = customPrompt
        }

        // Call API to create custom sector
        const response = await fetch('/api/sectors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sectorId: selectedSector,
            sectorName: sectorName,
            selectedFeatures,
            aiGenerated: isAiGenerated,
            aiPrompt: aiPrompt
          })
        })
        const data = await response.json()

        if (data.success) {
          // Create a URL-friendly sector ID (clean name only)
          const sectorName = data.sector.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
          
          // Add to sector store with custom features
          addCustomSector({
            id: sectorName,
            name: data.sector.name,
            icon: data.sector.icon,
            currency: data.sector.currency,
            defaultTaxRate: data.sector.defaultTaxRate,
            features: selectedFeatures,
            settings: {
              ...data.sector.settings,
              customFeatures: selectedFeatures
            }
          })
          
          setStep('complete')
        }
      } catch (error) {
        console.error('Failed to create ledger:', error)
        // Fallback to local creation
        let sectorName = selectedSector 
          ? sectors.find(s => s.id === selectedSector)?.name || 'Custom Business'
          : 'Custom Business'
        
        // For AI-generated sectors in fallback, extract business type
        if (!selectedSector && aiResponse) {
          const aiSuggestion = aiResponse.toLowerCase()
          if (aiSuggestion.includes('bakery')) {
            sectorName = 'Bakery'
          } else if (aiSuggestion.includes('restaurant')) {
            sectorName = 'Restaurant'
          } else if (aiSuggestion.includes('retail') || aiSuggestion.includes('store')) {
            sectorName = 'Retail Store'
          } else if (aiSuggestion.includes('pharmacy')) {
            sectorName = 'Pharmacy'
          }
        }
        
        // Create a URL-friendly sector ID (clean name only)
        const urlFriendlyName = sectorName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        
        addCustomSector({
          id: urlFriendlyName,
          name: sectorName,
          icon: 'Building2',
          currency: 'INR',
          defaultTaxRate: 18,
          features: selectedFeatures,
          settings: {
            name: sectorName,
            icon: 'Building2',
            currency: 'INR',
            defaultTaxRate: 18,
            businessType: selectedSector || 'custom',
            customFeatures: selectedFeatures,
            aiGenerated: !selectedSector,
            aiPrompt: customPrompt,
          }
        })
        
        setStep('complete')
      }
    }
  }

  const handleStartApp = () => {
    // Set authentication status for the user
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('username', 'User')
    
    // Use the active sector from the store (the custom sector that was created)
    router.push(`/${activeSector.id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to Smart Ledger
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Choose your business type or describe your needs with AI
          </p>
        </div>

        {step === 'sectors' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Default Sectors */}
            <Card>
              <CardHeader>
                <CardTitle>Choose from Popular Business Types</CardTitle>
                <CardDescription>
                  Select a pre-configured sector for your business
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sectors.map((sector) => {
                  const IconComponent = sector.icon
                  return (
                    <div
                      key={sector.id}
                      className="p-4 border rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      onClick={() => handleSectorSelect(sector.id)}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {sector.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {sector.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* AI Chat Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  AI-Powered Setup
          </CardTitle>
                <CardDescription>
                  Describe your business and get AI recommendations
          </CardDescription>
        </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="customPrompt">Describe your business</Label>
                  <Textarea
                    id="customPrompt"
                    placeholder="e.g., I run a bakery that sells bread, cakes, and coffee. I need to track sales, manage inventory, and handle staff scheduling."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button onClick={handleAIPrompt} className="w-full">
                  Get AI Recommendations
                </Button>
                
                {aiResponse && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                      AI Recommendations:
                    </h4>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      {aiResponse}
                    </p>
                    <div className="mt-3">
                      <Button 
                        size="sm" 
                        onClick={() => setStep('setup')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Use These Recommendations
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'setup' && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Customize Your Features</CardTitle>
              <CardDescription>
                Review and modify the recommended features for your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {allFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedFeatures.includes(feature.id)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => handleFeatureToggle(feature.id)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {selectedFeatures.includes(feature.id) && (
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      )}
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {feature.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep('sectors')}>
                  Back
            </Button>
            <Button 
                  onClick={handleCreateLedger} 
                  disabled={selectedFeatures.length === 0}
                  className="flex-1"
                >
                  Create My Ledger ({selectedFeatures.length} features)
            </Button>
          </div>
            </CardContent>
          </Card>
        )}

        {step === 'complete' && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">🎉 Setup Complete!</CardTitle>
              <CardDescription className="text-center">
                Your Smart Ledger is ready to use
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You've selected {selectedFeatures.length} features:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {selectedFeatures.map(featureId => {
                    const feature = allFeatures.find(f => f.id === featureId)
                    return (
                      <span
                        key={featureId}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                      >
                        {feature?.name}
                      </span>
                    )
                  })}
                </div>
          </div>
              <Button onClick={handleStartApp} className="w-full" size="lg">
                Start Using Smart Ledger
              </Button>
        </CardContent>
      </Card>
        )}
      </div>
    </div>
  )
}