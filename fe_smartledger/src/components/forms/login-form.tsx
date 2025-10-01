'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useFormilyBuilder, FormilySchema } from "@/hooks/formily"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Simple login schema with just username and password
const loginSchema: FormilySchema = {
  type: 'object',
  name: 'loginForm',
  'x-component': 'object',
  properties: {
    username: {
      type: 'string',
      name: 'username',
      title: 'Username',
      'x-component': 'x-input',
      'x-component-props': {
        placeholder: 'Enter your username',
        type: 'text',
      },
      'x-validator': [
        {
          required: true,
          message: 'Username is required',
        },
      ],
    },
    password: {
      type: 'string',
      name: 'password',
      title: 'Password',
      'x-component': 'x-input',
      'x-component-props': {
        placeholder: 'Enter your password',
        type: 'password',
      },
      'x-validator': [
        {
          required: true,
          message: 'Password is required',
        },
      ],
    },
  },
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const { form, FormProvider } = useFormilyBuilder({
    schema: loginSchema,
    initialValues: {
      username: '',
      password: '',
    },
  })

  const handleSubmit = async () => {
    setIsLoading(true)
    
    try {
      const values = form.values
      
      // Check credentials
      if (values.username === 'test' && values.password === 'test123') {
        // Store auth state
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('username', values.username)
        
        // Redirect to default sector (petrolBunk)
        router.push('/petrolBunk')
      } else {
        alert('Invalid username or password. Try: test / test123')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to Smart Ledger</CardTitle>
          <CardDescription>
            Enter your credentials below to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <FormProvider />
            
            <div className="flex flex-col gap-3">
              <Button 
                type="button" 
                className="w-full"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>
            
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Demo credentials: <strong>test</strong> / <strong>test123</strong>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
