'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    const storedUsername = localStorage.getItem('username')
    
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    
    setUsername(storedUsername || 'User')
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('username')
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Smart Ledger Dashboard</h1>
            <p className="text-gray-600">Welcome back, {username}!</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales</CardTitle>
              <CardDescription>Manage your sales transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Sales</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
              <CardDescription>Track your inventory levels</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Manage Inventory</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>View business analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Generate Reports</Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline">Add New Sale</Button>
                <Button variant="outline">Update Inventory</Button>
                <Button variant="outline">View Customers</Button>
                <Button variant="outline">Settings</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
