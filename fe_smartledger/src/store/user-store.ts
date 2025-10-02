import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, UserPreferences } from '@/types'
// Direct API calls to server-side endpoints

interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

interface UserStore {
  // State
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  
  // Actions
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  updatePreferences: (preferences: Partial<UserPreferences>) => void
  refreshToken: () => Promise<void>
  syncWithBackend: () => Promise<void>
  
  // Computed
  hasPermission: (permission: string) => boolean
  getCustomizations: () => Record<string, any>
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (username: string, password: string) => {
        try {
          set({ isLoading: true, error: null })
          
          const response = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
          })
          const data = await response.json()
          
          set({
            user: data.user,
            tokens: data.tokens,
            isAuthenticated: true,
            isLoading: false
          })

          // Store in localStorage for compatibility
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('username', data.user.username)
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed',
            isAuthenticated: false
          })
          throw error
        }
      },

      logout: () => {
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
          error: null
        })
        
        // Clear localStorage
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('username')
        
        // Redirect to login
        window.location.href = '/login'
      },

      updateUser: (updates: Partial<User>) => {
        set(state => ({
          user: state.user ? { ...state.user, ...updates } : null
        }))
        
        // Sync with backend
        get().syncWithBackend()
      },

      updatePreferences: (preferences: Partial<UserPreferences>) => {
        set(state => ({
          user: state.user ? {
            ...state.user,
            preferences: { ...state.user.preferences, ...preferences }
          } : null
        }))
        
        // Sync with backend
        get().syncWithBackend()
      },

      refreshToken: async () => {
        try {
          const tokens = get().tokens
          if (!tokens) return

          const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: tokens.refreshToken })
          })

          if (!response.ok) {
            throw new Error('Token refresh failed')
          }

          const data = await response.json()
          
          set({ tokens: data.tokens })
        } catch (error) {
          // If refresh fails, logout user
          get().logout()
        }
      },

      syncWithBackend: async () => {
        try {
          const user = get().user
          const tokens = get().tokens
          
          if (!user || !tokens) return

          const response = await fetch('/api/user/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${tokens.accessToken}`
            },
            body: JSON.stringify({ user })
          })

          if (!response.ok) {
            throw new Error('Sync failed')
          }

          const data = await response.json()
          
          set({ user: data.user })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Sync failed' 
          })
        }
      },

      // Computed getters
      hasPermission: (permission: string) => {
        const user = get().user
        if (!user) return false
        
        // Check user role and permissions
        if (user.role === 'admin') return true
        
        // Add more permission logic here
        return false
      },

      getCustomizations: () => {
        const user = get().user
        return user?.preferences?.customizations || {}
      }
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)