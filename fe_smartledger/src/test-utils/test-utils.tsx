import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Mock data for tests
export const mockSectors = [
  {
    id: 'petrolBunk',
    name: 'Petrol Bunk',
    features: ['sales', 'inventory', 'credit'],
    isCustom: false,
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    features: ['sales', 'inventory', 'prescription'],
    isCustom: false,
  },
  {
    id: 'departmentalStore',
    name: 'Departmental Store',
    features: ['sales', 'inventory', 'tally'],
    isCustom: false,
  },
]

export const mockUser = {
  id: 'user-123',
  email: 'test@example.com',
  name: 'Test User',
  sectors: mockSectors,
  preferences: {
    theme: 'light',
    language: 'en',
  },
}

export const mockFeatures = {
  sales: {
    name: 'Sales Management',
    components: ['SalesForm', 'SalesReports', 'SalesDashboard'],
  },
  inventory: {
    name: 'Inventory Management',
    components: ['InventoryList', 'StockReports', 'InventoryDashboard'],
  },
  chat: {
    name: 'Chat & AI Assistant',
    components: ['ChatPanel', 'AIAssistant', 'ChatHistory'],
  },
}
