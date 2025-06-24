import React from 'react'
import { usePermissions } from '@/hooks/usePermissions'

interface RoleBasedElementProps {
  children: React.ReactNode
  requiredRoles?: ('STUDENT' | 'TEACHER' | 'ADMIN')[]
  requiredPermissions?: string[]
  fallback?: React.ReactNode
}

export const RoleBasedElement: React.FC<RoleBasedElementProps> = ({
  children,
  requiredRoles = [],
  requiredPermissions = [],
  fallback = null
}) => {
  const { hasRole, hasAllPermissions } = usePermissions()

  // Check role requirements
  if (requiredRoles.length > 0 && !hasRole(requiredRoles)) {
    return <>{fallback}</>
  }

  // Check permission requirements
  if (requiredPermissions.length > 0 && !hasAllPermissions(requiredPermissions)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// Convenience components for specific roles
export const StudentOnly: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({ 
  children, 
  fallback 
}) => (
  <RoleBasedElement requiredRoles={['STUDENT']} fallback={fallback}>
    {children}
  </RoleBasedElement>
)

export const TeacherOnly: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({ 
  children, 
  fallback 
}) => (
  <RoleBasedElement requiredRoles={['TEACHER']} fallback={fallback}>
    {children}
  </RoleBasedElement>
)

export const AdminOnly: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({ 
  children, 
  fallback 
}) => (
  <RoleBasedElement requiredRoles={['ADMIN']} fallback={fallback}>
    {children}
  </RoleBasedElement>
)

export const TeacherOrAdminOnly: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({ 
  children, 
  fallback 
}) => (
  <RoleBasedElement requiredRoles={['TEACHER', 'ADMIN']} fallback={fallback}>
    {children}
  </RoleBasedElement>
)

// Permission-based components
export const WithPermission: React.FC<{ 
  permission: string
  children: React.ReactNode
  fallback?: React.ReactNode 
}> = ({ permission, children, fallback }) => (
  <RoleBasedElement requiredPermissions={[permission]} fallback={fallback}>
    {children}
  </RoleBasedElement>
)

export const WithAnyPermission: React.FC<{ 
  permissions: string[]
  children: React.ReactNode
  fallback?: React.ReactNode 
}> = ({ permissions, children, fallback }) => {
  const { hasAnyPermission } = usePermissions()
  
  if (!hasAnyPermission(permissions)) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
} 