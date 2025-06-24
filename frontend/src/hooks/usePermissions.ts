import { useAuth } from '@/contexts/AuthContext'

export const usePermissions = () => {
  const { user, permissions } = useAuth()

  const hasRole = (requiredRoles: ('STUDENT' | 'TEACHER' | 'ADMIN')[]) => {
    if (!user) return false
    return requiredRoles.includes(user.role)
  }

  const hasPermission = (permission: string) => {
    if (!permissions?.permissions) return false
    return permissions.permissions[permission] === true
  }

  const hasAnyPermission = (permissionList: string[]) => {
    return permissionList.some(permission => hasPermission(permission))
  }

  const hasAllPermissions = (permissionList: string[]) => {
    return permissionList.every(permission => hasPermission(permission))
  }

  const isStudent = () => hasRole(['STUDENT'])
  const isTeacher = () => hasRole(['TEACHER'])
  const isAdmin = () => hasRole(['ADMIN'])
  const isTeacherOrAdmin = () => hasRole(['TEACHER', 'ADMIN'])

  // Common permission checks
  const canViewTasks = () => hasPermission('canViewTasks')
  const canCreateTasks = () => hasPermission('canCreateTasks')
  const canEditTasks = () => hasPermission('canEditTasks')
  const canDeleteTasks = () => hasPermission('canDeleteTasks')
  const canSubmitTasks = () => hasPermission('canSubmitTasks')
  const canViewAllSubmissions = () => hasPermission('canViewAllSubmissions')
  const canGradeSubmissions = () => hasPermission('canGradeSubmissions')
  const canViewOwnPortfolio = () => hasPermission('canViewOwnPortfolio')
  const canViewAllPortfolios = () => hasPermission('canViewAllPortfolios')
  const canCreatePortfolio = () => hasPermission('canCreatePortfolio')
  const canManageStudents = () => hasPermission('canManageStudents')
  const canManageTeachers = () => hasPermission('canManageTeachers')
  const canManageUsers = () => hasPermission('canManageUsers')
  const canManageSystem = () => hasPermission('canManageSystem')
  const canViewAnalytics = () => hasPermission('canViewAnalytics')

  return {
    // User info
    user,
    permissions,
    role: user?.role,
    roleDisplayName: user?.roleDisplayName,
    
    // Role checks
    hasRole,
    isStudent,
    isTeacher,
    isAdmin,
    isTeacherOrAdmin,
    
    // Permission checks
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    
    // Specific permission checks
    canViewTasks,
    canCreateTasks,
    canEditTasks,
    canDeleteTasks,
    canSubmitTasks,
    canViewAllSubmissions,
    canGradeSubmissions,
    canViewOwnPortfolio,
    canViewAllPortfolios,
    canCreatePortfolio,
    canManageStudents,
    canManageTeachers,
    canManageUsers,
    canManageSystem,
    canViewAnalytics,
  }
} 