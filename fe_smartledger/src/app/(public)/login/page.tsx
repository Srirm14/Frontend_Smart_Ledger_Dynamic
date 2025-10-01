'use client'

import React from 'react'
import { useFormilyBuilder, FormilySchema } from '@/hooks/useFormilyBuilder'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

// Comprehensive login form schema with all input types
const loginSchema: FormilySchema = {
  type: 'object',
  name: 'loginForm',
  'x-component': 'object',
  properties: {
    // Basic Text Inputs
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
        {
          min: 3,
          message: 'Username must be at least 3 characters',
        },
      ],
    },
    email: {
      type: 'string',
      name: 'email',
      title: 'Email Address',
      'x-component': 'x-input',
      'x-component-props': {
        placeholder: 'Enter your email',
        type: 'email',
      },
      'x-validator': [
        {
          required: true,
          message: 'Email is required',
        },
        {
          email: true,
          message: 'Please enter a valid email address',
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
        {
          min: 8,
          message: 'Password must be at least 8 characters',
        },
      ],
    },
    confirmPassword: {
      type: 'string',
      name: 'confirmPassword',
      title: 'Confirm Password',
      'x-component': 'x-input',
      'x-component-props': {
        placeholder: 'Confirm your password',
        type: 'password',
      },
      'x-validator': [
        {
          required: true,
          message: 'Please confirm your password',
        },
      ],
      'x-reactions': [
        {
          dependencies: ['password'],
          fulfill: {
            state: {
              validator: [
                {
                  required: true,
                  message: 'Please confirm your password',
                },
                {
                  custom: (value: string, rule: any, ctx: any) => {
                    const password = ctx.form.values.password
                    if (value !== password) {
                      return 'Passwords do not match'
                    }
                    return true
                  },
                },
              ],
            },
          },
        },
      ],
    },

    // Number Inputs
    age: {
      type: 'number',
      name: 'age',
      title: 'Age',
      'x-component': 'x-input',
      'x-component-props': {
        placeholder: 'Enter your age',
        type: 'number',
        min: 18,
        max: 100,
      },
      'x-validator': [
        {
          required: true,
          message: 'Age is required',
        },
        {
          min: 18,
          message: 'You must be at least 18 years old',
        },
        {
          max: 100,
          message: 'Age cannot exceed 100',
        },
      ],
    },
    phoneNumber: {
      type: 'string',
      name: 'phoneNumber',
      title: 'Phone Number',
      'x-component': 'x-input',
      'x-component-props': {
        placeholder: '+1 (555) 123-4567',
        type: 'tel',
      },
      'x-validator': [
        {
          required: true,
          message: 'Phone number is required',
        },
        {
          pattern: /^\+?[\d\s\-\(\)]+$/,
          message: 'Please enter a valid phone number',
        },
      ],
    },

    // Textarea
    bio: {
      type: 'string',
      name: 'bio',
      title: 'Bio',
      'x-component': 'x-textarea',
      'x-component-props': {
        placeholder: 'Tell us about yourself...',
        rows: 4,
      },
      'x-validator': [
        {
          max: 500,
          message: 'Bio cannot exceed 500 characters',
        },
      ],
    },

    // Select Dropdown
    country: {
      type: 'string',
      name: 'country',
      title: 'Country',
      'x-component': 'x-select',
      'x-component-props': {
        placeholder: 'Select your country',
        options: [
          { value: 'us', label: 'United States' },
          { value: 'ca', label: 'Canada' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'au', label: 'Australia' },
          { value: 'de', label: 'Germany' },
          { value: 'fr', label: 'France' },
          { value: 'jp', label: 'Japan' },
          { value: 'in', label: 'India' },
        ],
      },
      'x-validator': [
        {
          required: true,
          message: 'Please select your country',
        },
      ],
    },

    // Radio Group
    gender: {
      type: 'string',
      name: 'gender',
      title: 'Gender',
      'x-component': 'x-radio-group',
      'x-component-props': {
        options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
          { value: 'prefer-not-to-say', label: 'Prefer not to say' },
        ],
      },
      'x-validator': [
        {
          required: true,
          message: 'Please select your gender',
        },
      ],
    },

    // Checkbox
    termsAccepted: {
      type: 'boolean',
      name: 'termsAccepted',
      title: 'I accept the terms and conditions',
      'x-component': 'x-checkbox',
      'x-validator': [
        {
          required: true,
          message: 'You must accept the terms and conditions',
        },
      ],
    },
    newsletter: {
      type: 'boolean',
      name: 'newsletter',
      title: 'Subscribe to newsletter',
      'x-component': 'x-checkbox',
      'x-component-props': {
        defaultChecked: false,
      },
    },

    // Autocomplete
    skills: {
      type: 'string',
      name: 'skills',
      title: 'Primary Skill',
      'x-component': 'x-autocomplete',
      'x-component-props': {
        placeholder: 'Search for your skill...',
        options: [
          { value: 'javascript', label: 'JavaScript' },
          { value: 'typescript', label: 'TypeScript' },
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue.js' },
          { value: 'angular', label: 'Angular' },
          { value: 'nodejs', label: 'Node.js' },
          { value: 'python', label: 'Python' },
          { value: 'java', label: 'Java' },
          { value: 'csharp', label: 'C#' },
          { value: 'php', label: 'PHP' },
          { value: 'ruby', label: 'Ruby' },
          { value: 'go', label: 'Go' },
          { value: 'rust', label: 'Rust' },
          { value: 'swift', label: 'Swift' },
          { value: 'kotlin', label: 'Kotlin' },
        ],
      },
      'x-validator': [
        {
          required: true,
          message: 'Please select your primary skill',
        },
      ],
    },

    // Conditional Field (shows when country is 'us')
    state: {
      type: 'string',
      name: 'state',
      title: 'State',
      'x-component': 'x-select',
      'x-component-props': {
        placeholder: 'Select your state',
        options: [
          { value: 'ca', label: 'California' },
          { value: 'ny', label: 'New York' },
          { value: 'tx', label: 'Texas' },
          { value: 'fl', label: 'Florida' },
          { value: 'il', label: 'Illinois' },
        ],
      },
      'x-hidden': true,
      'x-reactions': [
        {
          dependencies: ['country'],
          fulfill: {
            state: {
              visible: '{{$deps[0] === "us"}}',
            },
          },
        },
      ],
    },

    // Read-only field
    userId: {
      type: 'string',
      name: 'userId',
      title: 'User ID',
      'x-component': 'x-input',
      'x-component-props': {
        placeholder: 'Auto-generated',
        readOnly: true,
      },
      'x-read-pretty': true,
      'x-reactions': [
        {
          dependencies: ['username'],
          fulfill: {
            state: {
              value: '{{$deps[0] ? "user_" + $deps[0].toLowerCase() : ""}}',
            },
          },
        },
      ],
    },
  },
}

export default function LoginPage() {
  const { form, FormProvider } = useFormilyBuilder({
    schema: loginSchema,
    initialValues: {
      newsletter: false,
      userId: '',
    },
  })

  const handleSubmit = () => {
    form.submit((values) => {
      console.log('Form submitted with values:', values)
      alert('Form submitted successfully! Check console for values.')
    })
  }

  const handleReset = () => {
    form.reset()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Smart Ledger Dynamic
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Comprehensive Login Form - All Input Types Demo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormProvider />
          
          <Separator />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleSubmit}
              className="flex-1 sm:flex-none"
              size="lg"
            >
              Create Account
            </Button>
            <Button 
              onClick={handleReset}
              variant="outline"
              className="flex-1 sm:flex-none"
              size="lg"
            >
              Reset Form
            </Button>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Form Features Demonstrated:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Text inputs (username, email, password, phone)</li>
              <li>• Number inputs with min/max validation</li>
              <li>• Textarea with character limits</li>
              <li>• Select dropdowns with options</li>
              <li>• Radio button groups</li>
              <li>• Checkboxes (required and optional)</li>
              <li>• Autocomplete with search functionality</li>
              <li>• Conditional fields (State shows only for US)</li>
              <li>• Read-only fields with auto-generation</li>
              <li>• Form reactions and dependencies</li>
              <li>• Comprehensive validation rules</li>
              <li>• Real-time form value changes</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
