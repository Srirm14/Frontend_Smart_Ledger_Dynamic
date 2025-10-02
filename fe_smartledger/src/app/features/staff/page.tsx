import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { memo } from 'react'

// Optimized staff management page
const StaffPage = memo(function StaffPage() {
  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
        <p className="text-gray-600 mt-2">Manage your team members and their roles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Staff</CardTitle>
            <CardDescription>Active team members</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-500">employees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Today</CardTitle>
            <CardDescription>Staff present today</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-500">present</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Roles</CardTitle>
            <CardDescription>Different staff roles</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">0</p>
            <p className="text-sm text-gray-500">roles</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Features</CardTitle>
          <CardDescription>Available staff management tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">Staff management features coming soon...</p>
            <p className="text-sm text-gray-400 mt-2">This will include employee records, role management, and attendance tracking</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
})

export default StaffPage
