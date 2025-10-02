// API-specific types for consistent data handling

export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: Date
}

export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url: string
  data?: any
  headers?: Record<string, string>
  timeout?: number
  retries?: number
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresAt: Date
}

export interface LoginRequest {
  username: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  user: User
  tokens: AuthTokens
  permissions: string[]
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  confirmPassword: string
  businessType?: string
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetConfirm {
  token: string
  newPassword: string
  confirmPassword: string
}
