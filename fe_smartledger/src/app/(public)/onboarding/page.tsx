'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useFormilyBuilder, FormilySchema } from '@/hooks/useFormilyBuilder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

// Sector selection schema
const onboardingSchema: FormilySchema = {
  type: 'object',
  name: 'onboardingForm',
  properties: {
    businessName: {
      type: 'string',
      name: 'businessName',
      title: 'Business Name',
      'x-component': 'x-input',
      'x-component-props': {
        placeholder: 'Enter your business name',
        type: 'text',
      },
      'x-validator': [
        {
          required: true,
          message: 'Business name is required',
        },
      ],
    },
    sector: {
      type: 'string',
      name: 'sector',
      title: 'Business Sector',
      'x-component': 'x-select',
      'x-component-props': {
        placeholder: 'Select your business sector',
        options: [
          { value: 'petrolBunk', label: 'Petrol Bunk' },
          { value: 'departmentalStore', label: 'Departmental Store' },
          { value: 'pharmacy', label: 'Pharmacy' },
          { value: 'customUserSector', label: 'Custom Business' },
        ],
      },
      'x-validator': [
        {
          required: true,
          message: 'Please select your business sector',
        },
      ],
    },
    businessType: {
      type: 'string',
      name: 'businessType',
      title: 'Business Type',
      'x-component': 'x-radio-group',
      'x-component-props': {
        options: [
          { value: 'retail', label: 'Retail' },
          { value: 'wholesale', label: 'Wholesale' },
          { value: 'service', label: 'Service' },
          { value: 'manufacturing', label: 'Manufacturing' },
        ],
      },
      'x-validator': [
        {
          required: true,
          message: 'Please select your business type',
        },
      ],
    },
    location: {
      type: 'string',
      name: 'location',
      title: 'Business Location',
      'x-component': 'x-input',
      'x-component-props': {
        placeholder: 'Enter your business location',
        type: 'text',
      },
      'x-validator': [
        {
          required: true,
          message: 'Business location is required',
        },
      ],
    },
    description: {
      type: 'string',
      name: 'description',
      title: 'Business Description',
      'x-component': 'x-textarea',
      'x-component-props': {
        placeholder: 'Describe your business...',
        rows: 3,
      },
    },
    termsAccepted: {
      type: 'boolean',
      name: 'termsAccepted',
      title: 'I agree to the terms and conditions',
      'x-component': 'x-checkbox',
      'x-validator': [
        {
          required: true,
          message: 'You must accept the terms and conditions',
        },
      ],
    },
  },
}

export default function OnboardingPage() {
  const router = useRouter()
  
  const { form, FormProvider } = useFormilyBuilder({
    schema: onboardingSchema,
    initialValues: {
      termsAccepted: false,
    },
    onSubmit: (values) => {
      console.log('Onboarding completed with values:', values)
      
      // Store sector selection in localStorage or context
      localStorage.setItem('selectedSector', values.sector)
      localStorage.setItem('businessInfo', JSON.stringify(values))
      
      // Redirect to dashboard based on selected sector
      router.push('/dashboard')
    },
    onValuesChange: (values) => {
      console.log('Onboarding form values changed:', values)
    },
  })

  const handleSubmit = () => {
    form.submit()
  }

  const handleSkip = () => {
    // Skip onboarding and go to dashboard
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Welcome to Smart Ledger Dynamic
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Let's set up your business profile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormProvider />
          
          <Separator />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleSubmit}
              className="flex-1 sm:flex-none"
              size="lg"
            >
              Complete Setup
            </Button>
            <Button 
              onClick={handleSkip}
              variant="outline"
              className="flex-1 sm:flex-none"
              size="lg"
            >
              Skip for Now
            </Button>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Available Business Sectors:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <strong>Petrol Bunk:</strong> Fuel station management</li>
              <li>• <strong>Departmental Store:</strong> Retail inventory management</li>
              <li>• <strong>Pharmacy:</strong> Medical supply management</li>
              <li>• <strong>Custom Business:</strong> Configure your own sector</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
