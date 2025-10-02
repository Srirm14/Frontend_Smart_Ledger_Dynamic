import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Rocket } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-6">
            Smart Ledger
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your AI-powered business management platform
          </p>
        </div>

        {/* Main Choice Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Existing User */}
          <Link href="/login" className="block">
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-gray-200 hover:border-primary-300 bg-white group">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-4 text-2xl font-bold text-black group-hover:text-primary-600 transition-colors">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                    <User className="w-6 h-6 text-white group-hover:text-white transition-colors" />
                  </div>
                  Existing User
                </CardTitle>
                <CardDescription className="text-black text-lg mt-2 group-hover:text-primary-600 transition-colors">
                  Already have an account? Sign in to continue
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-black font-medium text-md group-hover:text-primary-600 transition-colors">
                  Sign In →
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* New User */}
          <Link href="/onboarding" className="block">
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-gray-200 hover:border-primary-300 bg-white group">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-4 text-2xl font-bold text-black group-hover:text-primary-600 transition-colors">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                    <Rocket className="w-6 h-6 text-white group-hover:text-white transition-colors" />
                  </div>
                  New User
                </CardTitle>
                <CardDescription className="text-black text-lg mt-2 group-hover:text-primary-600 transition-colors">
                  Get started with AI-powered onboarding
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-black font-medium text-md group-hover:text-primary-600 transition-colors">
                  Start Onboarding →
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Features Preview */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-black mb-6">
            What you can do with Smart Ledger:
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Dashboard', 'Inventory', 'Staff', 'Reports', 'AI Insights'].map((feature) => (
              <span
                key={feature}
                className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 border border-gray-200 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-colors"
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
