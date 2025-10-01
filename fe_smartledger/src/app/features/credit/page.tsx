import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { memo } from 'react'

function CreditPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Credit Management</h1>
        <p className="text-gray-600 mt-2">Manage customer credit accounts and payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Outstanding Credit</CardTitle>
            <CardDescription>Total credit given</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">₹0</p>
            <p className="text-sm text-gray-500">pending payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credit Customers</CardTitle>
            <CardDescription>Customers with credit accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-500">active accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overdue</CardTitle>
            <CardDescription>Overdue payments</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">₹0</p>
            <p className="text-sm text-gray-500">overdue amount</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Credit Features</CardTitle>
          <CardDescription>Available credit management tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">Credit management features coming soon...</p>
            <p className="text-sm text-gray-400 mt-2">This will include credit account management, payment tracking, and credit reports</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default memo(CreditPage)
