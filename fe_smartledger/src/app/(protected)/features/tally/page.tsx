import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function TallyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tally Integration</h1>
        <p className="text-gray-600 mt-2">Connect and sync with Tally accounting software</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Connection Status</CardTitle>
            <CardDescription>Tally connection status</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">❌</p>
            <p className="text-sm text-gray-500">Not connected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Last Sync</CardTitle>
            <CardDescription>Last synchronization</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-600">--</p>
            <p className="text-sm text-gray-500">Never synced</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sync Status</CardTitle>
            <CardDescription>Data synchronization</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-600">--</p>
            <p className="text-sm text-gray-500">No data</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tally Features</CardTitle>
          <CardDescription>Available Tally integration tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">Tally integration features coming soon...</p>
            <p className="text-sm text-gray-400 mt-2">This will include data synchronization, accounting integration, and financial reporting</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
