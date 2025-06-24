import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRoles?: ('STUDENT' | 'TEACHER' | 'ADMIN')[]
  requiredPermissions?: string[]
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
  requiredPermissions = []
}) => {
  const { user, permissions, isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check role requirements
  if (requiredRoles.length > 0 && user && !requiredRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Akses Ditolak</h1>
          <p className="text-gray-600">
            Anda tidak memiliki izin untuk mengakses halaman ini.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Role yang diperlukan: {requiredRoles.join(', ')}
          </p>
        </div>
      </div>
    )
  }

  // Check permission requirements
  if (requiredPermissions.length > 0 && permissions) {
    const hasAllPermissions = requiredPermissions.every(
      permission => permissions.permissions[permission]
    )

    if (!hasAllPermissions) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Akses Ditolak</h1>
            <p className="text-gray-600">
              Anda tidak memiliki izin yang diperlukan untuk mengakses halaman ini.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Permission yang diperlukan: {requiredPermissions.join(', ')}
            </p>
          </div>
        </div>
      )
    }
  }

  return <>{children}</>
}

// Convenience components for specific roles
export const StudentRoute: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRoles={['STUDENT']}>{children}</ProtectedRoute>
)

export const TeacherRoute: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRoles={['TEACHER']}>{children}</ProtectedRoute>
)

export const AdminRoute: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRoles={['ADMIN']}>{children}</ProtectedRoute>
)

export const TeacherOrAdminRoute: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRoles={['TEACHER', 'ADMIN']}>{children}</ProtectedRoute>
) 