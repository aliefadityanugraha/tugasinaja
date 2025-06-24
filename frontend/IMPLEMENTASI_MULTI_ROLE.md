# IMPLEMENTASI SISTEM LOGIN MULTI-ROLE DI FRONTEND

## Overview

Sistem login multi-role telah diimplementasikan dengan lengkap di frontend menggunakan React, TypeScript, dan Context API. Sistem ini mendukung 3 role utama: **STUDENT**, **TEACHER**, dan **ADMIN** dengan permission-based access control.

## Struktur Implementasi

### 1. Authentication Context (`AuthContext.tsx`)

**Lokasi**: `src/contexts/AuthContext.tsx`

**Fitur**:
- State management untuk user authentication
- Auto-login dengan token refresh
- Permission management
- Loading states

**Key Functions**:
```typescript
const { user, permissions, isAuthenticated, isLoading, login, logout, refreshUser } = useAuth()
```

### 2. API Integration (`authApi.ts`)

**Lokasi**: `src/api/authApi.ts`

**Endpoints**:
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user info
- `GET /auth/permissions` - Get role permissions
- `POST /auth/refresh-token` - Refresh access token

### 3. Permission System

#### Hook: `usePermissions.ts`
**Lokasi**: `src/hooks/usePermissions.ts`

**Fitur**:
- Role-based checks (`isStudent()`, `isTeacher()`, `isAdmin()`)
- Permission-based checks (`hasPermission()`, `hasAllPermissions()`)
- Specific permission checks (`canViewTasks()`, `canCreateTasks()`, dll)

#### Components: `RoleBasedElement.tsx`
**Lokasi**: `src/components/RoleBasedElement.tsx`

**Components**:
- `RoleBasedElement` - Generic role/permission-based rendering
- `StudentOnly` - Render only for students
- `TeacherOnly` - Render only for teachers
- `AdminOnly` - Render only for admins
- `TeacherOrAdminOnly` - Render for teachers and admins
- `WithPermission` - Render based on specific permission
- `WithAnyPermission` - Render if user has any of the specified permissions

### 4. Route Protection (`ProtectedRoute.tsx`)

**Lokasi**: `src/components/ProtectedRoute.tsx`

**Fitur**:
- Authentication check
- Role-based access control
- Permission-based access control
- Loading states
- Error handling

**Usage**:
```typescript
<ProtectedRoute requiredRoles={['TEACHER', 'ADMIN']} requiredPermissions={['canCreateTasks']}>
  <Component />
</ProtectedRoute>
```

## Role Permissions

### STUDENT Permissions
- `canViewTasks` - Melihat daftar tugas
- `canSubmitTasks` - Mengumpulkan tugas
- `canViewOwnPortfolio` - Melihat portfolio sendiri
- `canCreatePortfolio` - Membuat portfolio
- `canViewOwnSubmissions` - Melihat pengumpulan sendiri
- `canViewOwnProfile` - Melihat profil sendiri
- `canUpdateOwnProfile` - Mengupdate profil sendiri

### TEACHER Permissions
- `canViewTasks` - Melihat daftar tugas
- `canCreateTasks` - Membuat tugas baru
- `canEditTasks` - Mengedit tugas
- `canDeleteTasks` - Menghapus tugas
- `canViewAllSubmissions` - Melihat semua pengumpulan
- `canGradeSubmissions` - Menilai pengumpulan
- `canViewAllPortfolios` - Melihat semua portfolio
- `canViewAllProfiles` - Melihat semua profil
- `canManageStudents` - Mengelola data siswa

### ADMIN Permissions
- Semua permission TEACHER
- `canManageTeachers` - Mengelola data guru
- `canManageUsers` - Mengelola semua user
- `canManageSystem` - Mengelola sistem
- `canViewAnalytics` - Melihat analytics

## Implementasi UI Components

### 1. Login Form (`login-form.tsx`)

**Fitur**:
- Form validation
- Error handling
- Loading states
- Redirect after login
- Integration dengan AuthContext

### 2. Navigation Sidebar (`app-sidebar.tsx`)

**Fitur**:
- Dynamic menu berdasarkan role
- Permission-based menu items
- User info display
- Role-specific navigation

### 3. User Menu (`nav-user.tsx`)

**Fitur**:
- User profile display
- Role information
- Logout functionality
- Navigation to settings

### 4. Dashboard (`HomePage.tsx`)

**Fitur**:
- Role-specific welcome messages
- Dynamic statistics
- Quick actions berdasarkan permissions
- Role-specific content sections

## Usage Examples

### 1. Protecting Routes
```typescript
// In AppRouter.tsx
<Route path="/tasks" element={
  <ProtectedRoute requiredRoles={['STUDENT', 'TEACHER', 'ADMIN']}>
    <TaskPage />
  </ProtectedRoute>
} />

<Route path="/admin" element={
  <ProtectedRoute requiredRoles={['ADMIN']}>
    <AdminPage />
  </ProtectedRoute>
} />
```

### 2. Conditional Rendering
```typescript
// Using RoleBasedElement
<TeacherOrAdminOnly>
  <Button onClick={createTask}>Buat Tugas</Button>
</TeacherOrAdminOnly>

<WithPermission permission="canGradeSubmissions">
  <GradeSubmissionForm />
</WithPermission>
```

### 3. Permission Checks in Components
```typescript
const { canCreateTasks, isAdmin } = usePermissions()

if (canCreateTasks()) {
  // Show create task button
}

if (isAdmin()) {
  // Show admin features
}
```

### 4. API Calls with Authentication
```typescript
// API calls automatically include auth headers
const tasks = await getTasks() // Uses axios interceptor
```

## Security Features

### 1. Token Management
- Access token (15 minutes)
- Refresh token (7 days)
- Automatic token refresh
- Secure cookie storage for refresh tokens

### 2. Route Protection
- Client-side route protection
- Server-side validation (backend)
- Permission-based access control

### 3. Error Handling
- Authentication errors
- Permission denied errors
- Network errors
- Token expiration handling

## State Management

### Authentication State
```typescript
interface AuthState {
  user: UserInfo | null
  permissions: RolePermissions | null
  isAuthenticated: boolean
  isLoading: boolean
}
```

### User Information
```typescript
interface UserInfo {
  id: string
  email: string
  name: string
  role: 'STUDENT' | 'TEACHER' | 'ADMIN'
  roleDisplayName: string
  permissions: { [key: string]: boolean }
  avatarUrl?: string
  createdAt: string
}
```

## Testing the Implementation

### 1. Login Flow
1. Navigate to `/auth/login`
2. Enter valid credentials
3. Should redirect to dashboard
4. Check if user info and permissions are loaded

### 2. Role-Based Access
1. Login as different roles
2. Verify menu items change
3. Verify dashboard content changes
4. Test route protection

### 3. Permission-Based Features
1. Test conditional rendering
2. Verify API access
3. Test protected routes

## Troubleshooting

### Common Issues

1. **Token Expired**
   - Check if refresh token is working
   - Verify cookie settings

2. **Permission Not Working**
   - Check if permissions are loaded
   - Verify role assignment
   - Check backend permission logic

3. **Route Protection Issues**
   - Verify ProtectedRoute implementation
   - Check role/permission requirements
   - Ensure AuthContext is properly wrapped

### Debug Tools

1. **Browser DevTools**
   - Check localStorage for tokens
   - Monitor network requests
   - Check console for errors

2. **React DevTools**
   - Inspect AuthContext state
   - Check component props
   - Monitor re-renders

## Best Practices

1. **Always use ProtectedRoute for sensitive pages**
2. **Use RoleBasedElement for conditional rendering**
3. **Check permissions before API calls**
4. **Handle loading states properly**
5. **Provide fallback UI for unauthorized access**
6. **Use TypeScript for type safety**
7. **Implement proper error boundaries**

## Future Enhancements

1. **Real-time permission updates**
2. **Advanced role hierarchies**
3. **Permission caching**
4. **Audit logging**
5. **Multi-factor authentication**
6. **Session management**
7. **Permission analytics**

## Ringkasan Implementasi Sistem Login Multi-Role

Saya telah berhasil mengimplementasikan sistem login multi-role yang lengkap di frontend dengan fitur-fitur berikut:

### ✅ **Komponen yang Telah Diimplementasikan:**

1. **Authentication System**
   - `AuthContext.tsx` - State management untuk authentication
   - `authApi.ts` - API integration dengan backend
   - `login-form.tsx` - Form login yang terintegrasi
   - `LoginPage.tsx` - Halaman login dengan redirect logic

2. **Permission System**
   - `usePermissions.ts` - Custom hook untuk permission checks
   - `RoleBasedElement.tsx` - Components untuk conditional rendering
   - `ProtectedRoute.tsx` - Route protection dengan role/permission checks

3. **UI Components**
   - `app-sidebar.tsx` - Dynamic navigation berdasarkan role
   - `nav-user.tsx` - User menu dengan logout functionality
   - `HomePage.tsx` - Dashboard dengan content berdasarkan role
   - `MainLayouts.tsx` - Layout dengan authentication checks

4. **Security Features**
   - Token management (access & refresh tokens)
   - Route protection
   - Permission-based access control
   - Error handling

### 🔧 **Cara Penggunaan:**

1. **Login**: Navigate ke `/auth/login`
2. **Route Protection**: Wrap routes dengan `ProtectedRoute`
3. **Conditional Rendering**: Gunakan `RoleBasedElement` components
4. **Permission Checks**: Gunakan `usePermissions` hook

### 📁 **Struktur File:**

```
frontend/src/
├── contexts/AuthContext.tsx
├── api/authApi.ts
├── hooks/usePermissions.ts
├── components/
│   ├── login-form.tsx
│   ├── ProtectedRoute.tsx
│   ├── RoleBasedElement.tsx
│   ├── app-sidebar.tsx
│   └── nav-user.tsx
├── pages/
│   ├── LoginPage.tsx
│   └── HomePage.tsx
└── routes/AppRouter.tsx 