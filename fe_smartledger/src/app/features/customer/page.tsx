import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { memo } from 'react'

// Optimized customer management page
const CustomerPage = memo(function CustomerPage() {
  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customer</h1>
        <p className="text-gray-600 mt-2">Manage your customer relationships and data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Customers</CardTitle>
            <CardDescription>Registered customers</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-500">customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Customers</CardTitle>
            <CardDescription>Customers with recent activity</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-500">active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credit Customers</CardTitle>
            <CardDescription>Customers with credit accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">0</p>
            <p className="text-sm text-gray-500">credit accounts</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Features</CardTitle>
          <CardDescription>Available customer management tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">Customer management features coming soon...</p>
            <p className="text-sm text-gray-400 mt-2">This will include customer profiles, contact management, and purchase history</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
})

export default CustomerPage
