'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useParams } from 'next/navigation'
import { useSectorStore } from '@/store/sector-store'

export default function FeaturePage() {
  const params = useParams()
  const feature = params.feature as string
  const { activeSector, getEnabledFeatures } = useSectorStore()
  const enabledFeatures = getEnabledFeatures()

  // Check if feature is enabled for this sector
  if (!enabledFeatures.includes(feature)) {
    return (
      <div className="col-span-full">
        <Card>
          <CardHeader>
            <CardTitle>Feature Not Available</CardTitle>
            <CardDescription>This feature is not enabled for {activeSector.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Please select an available feature from the sidebar.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getFeatureContent = () => {
    switch (feature) {
      case 'sales':
        return {
          title: 'Sales Management',
          description: 'Manage your sales transactions and customer orders',
          stats: [
            { label: "Today's Sales", value: "₹0", subtext: "0 transactions", color: "text-green-600" },
            { label: "This Month", value: "₹0", subtext: "0 transactions", color: "text-blue-600" },
            { label: "Total Customers", value: "0", subtext: "registered customers", color: "text-purple-600" }
          ]
        }
      case 'inventory':
        return {
          title: 'Inventory Management',
          description: 'Track and manage your inventory levels',
          stats: [
            { label: "Total Items", value: "0", subtext: "products", color: "text-blue-600" },
            { label: "Low Stock", value: "0", subtext: "items", color: "text-orange-600" },
            { label: "Total Value", value: "₹0", subtext: "worth of inventory", color: "text-green-600" }
          ]
        }
      case 'credit':
        return {
          title: 'Credit Management',
          description: 'Manage customer credit accounts and payments',
          stats: [
            { label: "Outstanding Credit", value: "₹0", subtext: "pending payments", color: "text-red-600" },
            { label: "Credit Customers", value: "0", subtext: "active accounts", color: "text-blue-600" },
            { label: "Overdue", value: "₹0", subtext: "overdue amount", color: "text-orange-600" }
          ]
        }
      case 'tally':
        return {
          title: 'Tally Integration',
          description: 'Connect and sync with Tally accounting software',
          stats: [
            { label: "Connection Status", value: "❌", subtext: "Not connected", color: "text-red-600" },
            { label: "Last Sync", value: "--", subtext: "Never synced", color: "text-gray-600" },
            { label: "Sync Status", value: "--", subtext: "No data", color: "text-gray-600" }
          ]
        }
      default:
        return {
          title: 'Feature',
          description: 'Feature content',
          stats: []
        }
    }
  }

  const content = getFeatureContent()

  return (
    <div className="space-y-6">
      <div className="col-span-full">
        <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
        <p className="text-gray-600 mt-2">{content.description}</p>
        <p className="text-sm text-gray-500 mt-1">
          Active Sector: <span className="font-semibold">{activeSector.name}</span>
        </p>
      </div>

      {content.stats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.subtext}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>{content.title} Features</CardTitle>
          <CardDescription>Available {content.title.toLowerCase()} management tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">{content.title} management features coming soon...</p>
            <p className="text-sm text-gray-400 mt-2">
              This will include {content.title.toLowerCase()} tools and reporting for {activeSector.name}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
