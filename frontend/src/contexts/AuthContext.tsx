import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { login as loginApi, logout as logoutApi, getCurrentUser, getRolePermissions } from '../api/authApi'
import type { LoginRequest, UserInfo, RolePermissions } from '../api/authApi'

interface AuthContextType {
  user: UserInfo | null
  permissions: RolePermissions | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [permissions, setPermissions] = useState<RolePermissions | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        try {
          const userData = await getCurrentUser()
          const permissionsData = await getRolePermissions()
          
          setUser(userData.user)
          setPermissions(permissionsData)
        } catch (error) {
          console.error('Auth check failed:', error)
          localStorage.removeItem('accessToken')
          localStorage.removeItem('user')
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await loginApi(credentials)
      
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      setUser(response.user)
      setPermissions({
        role: response.user.role,
        roleDisplayName: response.user.roleDisplayName,
        permissions: response.user.permissions
      })
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await logoutApi()
    } catch (error) {
      console.error('Logout API failed:', error)
    } finally {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      setUser(null)
      setPermissions(null)
    }
  }

  const refreshUser = async () => {
    try {
      const userData = await getCurrentUser()
      const permissionsData = await getRolePermissions()
      
      setUser(userData.user)
      setPermissions(permissionsData)
    } catch (error) {
      console.error('Refresh user failed:', error)
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    permissions,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 