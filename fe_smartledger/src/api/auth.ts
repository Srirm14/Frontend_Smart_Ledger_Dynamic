// Server-side authentication API endpoints
import { NextRequest, NextResponse } from 'next/server'

// User login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Mock authentication - in real app, verify credentials
    if (username && password) {
      const mockUser = {
        id: '1',
        username: username,
        email: `${username}@example.com`,
        role: 'admin' as const,
        preferences: {
          theme: 'light' as const,
          language: 'en',
          timezone: 'UTC',
          notifications: {
            email: true,
            push: true,
            inApp: true,
            frequency: 'instant' as const
          },
          customizations: {}
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const mockTokens = {
        accessToken: 'mock_access_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now(),
        expiresIn: 3600
      }

      return NextResponse.json({
        success: true,
        user: mockUser,
        tokens: mockTokens,
        message: 'Login successful'
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    )
  }
}
