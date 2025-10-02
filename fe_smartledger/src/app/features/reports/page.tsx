import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { memo } from 'react'

// Optimized reports page
const ReportsPage = memo(function ReportsPage() {
  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-2">Generate comprehensive business reports and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Reports</CardTitle>
            <CardDescription>Sales performance analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-500">reports generated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Reports</CardTitle>
            <CardDescription>Stock and inventory analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-500">reports available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Reports</CardTitle>
            <CardDescription>Financial performance insights</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">0</p>
            <p className="text-sm text-gray-500">reports ready</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Features</CardTitle>
          <CardDescription>Available reporting and analytics tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">Reporting features coming soon...</p>
            <p className="text-sm text-gray-400 mt-2">This will include sales analytics, inventory reports, financial summaries, and custom report generation</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
})

export default ReportsPage
