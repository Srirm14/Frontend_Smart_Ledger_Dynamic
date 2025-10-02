"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { memo, useState } from 'react'
import { Trash2, User, Mail, Phone, MapPin } from 'lucide-react'

// Mock data for demonstration
const mockCustomers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', address: '123 Main St', status: 'Active', createdAt: 'Sep 17 2025, 12:00 AM', creditLimit: 5000 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', address: '456 Oak Ave', status: 'Active', createdAt: 'Sep 18 2025, 12:00 AM', creditLimit: 3000 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1234567892', address: '789 Pine Rd', status: 'Inactive', createdAt: 'Sep 19 2025, 12:00 AM', creditLimit: 2000 },
]

interface CustomerDetailsProps {
  customerId: string
  onBack?: () => void
}

const CustomerDetails = memo(function CustomerDetails({ customerId, onBack }: CustomerDetailsProps) {
  const [selectedDate, setSelectedDate] = useState('2025-10-02')

  // Find the customer by ID
  const customer = mockCustomers.find(c => c.id.toString() === customerId)

  if (!customer) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500">Customer not found</p>
        </CardContent>
      </Card>
    )
  }

  const handleDelete = () => {
    console.log('Delete customer:', customer.id)
  }

  return (
    <div className="w-full">
      {/* Customer Information Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Customer Information</CardTitle>
          <Button variant="destructive" size="sm" className="flex items-center space-x-2" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Customer Name</Label>
                <p className="text-lg font-semibold text-gray-900">{customer.name}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Email</Label>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <p className="text-lg text-gray-900">{customer.email}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Phone</Label>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <p className="text-lg text-gray-900">{customer.phone}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Status</Label>
                <Select defaultValue={customer.status}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Address</Label>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <p className="text-lg text-gray-900">{customer.address}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Credit Limit</Label>
                <p className="text-lg font-semibold text-gray-900">₹{customer.creditLimit.toLocaleString()}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700">Created At</Label>
                <p className="text-lg text-gray-900">{customer.createdAt}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
})

export default CustomerDetails

