import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Smart Ledger
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your AI-powered business management platform
          </p>
        </div>

        {/* Main Choice Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Existing User */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">👤</span>
                </div>
                Existing User
              </CardTitle>
              <CardDescription>
                Already have an account? Sign in to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/login" className="block">
                <Button className="w-full" size="lg">
                  Sign In
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* New User */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">🚀</span>
                </div>
                New User
              </CardTitle>
              <CardDescription>
                Get started with AI-powered onboarding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/onboarding" className="block">
                <Button variant="outline" className="w-full" size="lg">
                  Start Onboarding
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Preview */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            What you can do with Smart Ledger:
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {['Sales Management', 'Inventory Tracking', 'Staff Management', 'Reports & Analytics', 'AI Insights'].map((feature) => (
              <span
                key={feature}
                className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
