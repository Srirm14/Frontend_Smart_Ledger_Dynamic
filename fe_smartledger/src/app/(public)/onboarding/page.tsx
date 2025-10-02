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
    { id: 'product', name: 'Product', description: 'Manage products and pricing' },
    { id: 'dashboard', name: 'Dashboard', description: 'Track sales and revenue' },
    { id: 'inventory', name: 'Inventory', description: 'Manage stock levels' },
    { id: 'staff', name: 'Staff', description: 'Employee management' },
    { id: 'customer', name: 'Customer', description: 'Customer relationships' },
    { id: 'credit', name: 'Credit', description: 'Credit tracking' },
    { id: 'cashflow', name: 'Cashflow', description: 'Track daily cash flow' },
    { id: 'tally', name: 'Tally', description: 'Sync with Tally software' },
    { id: 'reports', name: 'Reports', description: 'Business insights' },
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
        setAiResponse("Based on your business needs, I recommend starting with core features: Dashboard, Inventory, and Reports.")
        setSelectedFeatures(['dashboard', 'inventory', 'reports'])
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
        setSelectedFeatures(['dashboard', 'inventory']) // Fallback
      }
    } catch (error) {
      console.error('Failed to load features:', error)
      setSelectedFeatures(['dashboard', 'inventory']) // Fallback
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
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to Smart Ledger
            </h1>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto">
              Choose your business type or describe your needs with AI to get started
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">

        {step === 'sectors' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Default Sectors */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  Choose from Popular Business Types
                </CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  Select a pre-configured sector for your business
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sectors.map((sector) => {
                  const IconComponent = sector.icon
                  return (
                    <div
                      key={sector.id}
                      className="p-6 border border-gray-200 rounded-xl cursor-pointer hover:border-primary-300 hover:bg-primary-50 hover:shadow-md transition-all duration-200 group"
                      onClick={() => handleSectorSelect(sector.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                          <IconComponent className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg mb-1">
                            {sector.name}
                          </h3>
                          <p className="text-gray-600">
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
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900 mb-2">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-primary-600" />
                  </div>
                  AI-Powered Setup
                </CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  Describe your business and get AI recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="customPrompt" className="text-gray-900 font-medium text-base mb-3 block">
                    Describe your business
                  </Label>
                  <Textarea
                    id="customPrompt"
                    placeholder="e.g., I run a bakery that sells bread, cakes, and coffee. I need to track sales, manage inventory, and handle staff scheduling."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    rows={4}
                    className="border-gray-300 focus:border-primary-500 focus:ring-primary-500 rounded-lg"
                  />
                </div>
                <Button 
                  onClick={handleAIPrompt} 
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Get AI Recommendations
                </Button>
                
                {aiResponse && (
                  <div className="p-6 bg-primary-50 border border-primary-200 rounded-xl">
                    <h4 className="font-semibold text-primary-800 mb-3 text-lg">
                      AI Recommendations:
                    </h4>
                    <p className="text-primary-700 mb-4">
                      {aiResponse}
                    </p>
                    <Button 
                      size="sm" 
                      onClick={() => setStep('setup')}
                      className="bg-primary-600 hover:bg-primary-700 text-white"
                    >
                      Use These Recommendations
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'setup' && (
          <Card className="max-w-5xl mx-auto shadow-lg border-0 bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Customize Your Features
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">
                Review and modify the recommended features for your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {allFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    className={`p-6 border rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedFeatures.includes(feature.id)
                        ? 'border-primary-300 bg-primary-50 shadow-md'
                        : 'border-gray-200 hover:border-primary-200 hover:shadow-sm'
                    }`}
                    onClick={() => handleFeatureToggle(feature.id)}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      {selectedFeatures.includes(feature.id) && (
                        <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg mb-2">
                          {feature.name}
                        </h3>
                        <p className="text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  onClick={() => setStep('sectors')}
                  className="px-8 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleCreateLedger} 
                  disabled={selectedFeatures.length === 0}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 disabled:bg-gray-300"
                >
                  Create My Ledger ({selectedFeatures.length} features)
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'complete' && (
          <Card className="max-w-3xl mx-auto shadow-lg border-0 bg-white">
            <CardHeader className="pb-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary-600" />
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  Setup Complete!
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  Your Smart Ledger is ready to use
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-6 text-lg">
                  You've selected {selectedFeatures.length} features:
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {selectedFeatures.map(featureId => {
                    const feature = allFeatures.find(f => f.id === featureId)
                    return (
                      <span
                        key={featureId}
                        className="px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                      >
                        {feature?.name}
                      </span>
                    )
                  })}
                </div>
              </div>
              <Button 
                onClick={handleStartApp} 
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-4 text-lg rounded-lg"
                size="lg"
              >
                Start Using Smart Ledger
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}