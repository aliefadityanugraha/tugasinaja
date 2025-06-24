import api from './axios'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  accessToken: string
  user: {
    id: string
    email: string
    name: string
    role: 'STUDENT' | 'TEACHER' | 'ADMIN'
    roleDisplayName: string
    permissions: {
      [key: string]: boolean
    }
    createdAt: string
  }
}

export interface UserInfo {
  id: string
  email: string
  name: string
  role: 'STUDENT' | 'TEACHER' | 'ADMIN'
  roleDisplayName: string
  permissions: {
    [key: string]: boolean
  }
  avatarUrl?: string
  createdAt: string
}

export interface RolePermissions {
  role: 'STUDENT' | 'TEACHER' | 'ADMIN'
  roleDisplayName: string
  permissions: {
    [key: string]: boolean
  }
}

// Login
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', credentials)
  return response.data
}

// Logout
export const logout = async (): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>('/auth/logout')
  return response.data
}

// Get current user info
export const getCurrentUser = async (): Promise<{ user: UserInfo }> => {
  const response = await api.get<{ user: UserInfo }>('/auth/me')
  return response.data
}

// Get role permissions
export const getRolePermissions = async (): Promise<RolePermissions> => {
  const response = await api.get<RolePermissions>('/auth/permissions')
  return response.data
}

// Refresh token
export const refreshToken = async (): Promise<{ accessToken: string }> => {
  const response = await api.post<{ accessToken: string }>('/auth/refresh-token')
  return response.data
} 