# Sistem Login Multi-Role

## Overview
Sistem ini mendukung 3 role utama:
- **STUDENT** (Siswa)
- **TEACHER** (Guru) 
- **ADMIN** (Administrator)

## Backend Implementation

### 1. Database Schema
```prisma
enum Role {
  STUDENT
  TEACHER
  ADMIN
}

model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  role      Role
  avatarUrl String?
  createdAt DateTime @default(now())
}
```

### 2. Middleware Authentication
File: `backend/src/middleware/authMiddleware.ts`

```typescript
// Verifikasi JWT token
export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction)

// Role-based access control
export const requireRole = (allowedRoles: Role[]) => (req: AuthenticatedRequest, res: Response, next: NextFunction)

// Convenience middleware
export const requireStudent = requireRole([Role.STUDENT])
export const requireTeacher = requireRole([Role.TEACHER])
export const requireAdmin = requireRole([Role.ADMIN])
export const requireTeacherOrAdmin = requireRole([Role.TEACHER, Role.ADMIN])
export const requireAnyRole = requireRole([Role.STUDENT, Role.TEACHER, Role.ADMIN])
```

### 3. Role Permissions
File: `backend/src/services/authService.ts`

```typescript
// Permissions untuk setiap role
const permissions = {
  STUDENT: {
    canViewTasks: true,
    canSubmitTasks: true,
    canViewOwnPortfolio: true,
    canCreatePortfolio: true,
    canViewOwnSubmissions: true,
    canViewOwnProfile: true,
    canUpdateOwnProfile: true,
  },
  TEACHER: {
    canViewTasks: true,
    canCreateTasks: true,
    canEditTasks: true,
    canDeleteTasks: true,
    canViewAllSubmissions: true,
    canGradeSubmissions: true,
    canViewAllPortfolios: true,
    canViewAllProfiles: true,
    canManageStudents: true,
  },
  ADMIN: {
    // Semua permission TEACHER +
    canManageTeachers: true,
    canManageUsers: true,
    canManageSystem: true,
    canViewAnalytics: true,
  }
}
```

### 4. API Endpoints

#### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh-token` - Refresh access token
- `GET /api/auth/me` - Get current user info (requires auth)
- `GET /api/auth/permissions` - Get role permissions (requires auth)

#### Tasks (dengan role-based access)
- `GET /api/tasks` - Get all tasks (all roles)
- `GET /api/tasks/:id` - Get task by ID (all roles)
- `POST /api/tasks` - Create task (TEACHER, ADMIN only)
- `DELETE /api/tasks/:id` - Delete task (TEACHER, ADMIN only)

#### Users (dengan role-based access)
- `POST /api/users/register` - Register new user (public)
- `GET /api/users` - Get all users (ADMIN only)

## Frontend Implementation

### 1. Authentication Context
File: `frontend/src/contexts/AuthContext.tsx`

```typescript
const { user, permissions, isAuthenticated, login, logout } = useAuth()
```

### 2. Protected Routes
File: `frontend/src/components/ProtectedRoute.tsx`

```typescript
// Route untuk semua role
<ProtectedRoute>
  <Component />
</ProtectedRoute>

// Route untuk role tertentu
<ProtectedRoute requiredRoles={['TEACHER', 'ADMIN']}>
  <Component />
</ProtectedRoute>

// Route dengan permission tertentu
<ProtectedRoute requiredPermissions={['canCreateTasks']}>
  <Component />
</ProtectedRoute>

// Convenience components
<TeacherRoute>
  <TeacherComponent />
</TeacherRoute>

<AdminRoute>
  <AdminComponent />
</AdminRoute>
```

### 3. API Integration
File: `frontend/src/api/authApi.ts`

```typescript
// Login
const response = await login({ email, password })
// Response: { accessToken, user: { role, permissions, ... } }

// Get current user
const { user } = await getCurrentUser()

// Get permissions
const { permissions } = await getRolePermissions()
```

## Usage Examples

### 1. Backend Route Protection
```typescript
// tasks.ts
router.use(authenticateToken)
router.post('/', requireTeacherOrAdmin, createTask)
router.get('/', requireAnyRole, getAllTasks)
```

### 2. Frontend Route Protection
```typescript
// AppRouter.tsx
<Route 
  path="/admin" 
  element={
    <AdminRoute>
      <AdminPage />
    </AdminRoute>
  } 
/>
```

### 3. Conditional Rendering
```typescript
const { user, permissions } = useAuth()

// Render berdasarkan role
{user?.role === 'ADMIN' && <AdminPanel />}

// Render berdasarkan permission
{permissions?.permissions.canCreateTasks && <CreateTaskButton />}
```

### 4. API Calls dengan Token
```typescript
// Token otomatis ditambahkan oleh axios interceptor
const tasks = await taskApi.getAllTasks()
```

## Security Features

1. **JWT Token Management**
   - Access token (15 menit)
   - Refresh token (7 hari, httpOnly cookie)
   - Automatic token refresh

2. **Role-Based Access Control**
   - Middleware validation
   - Permission-based access
   - Hierarchical role system

3. **Frontend Protection**
   - Protected routes
   - Automatic redirect to login
   - Permission-based UI rendering

## Testing

### 1. Create Test Users
```sql
-- Student
INSERT INTO User (id, name, email, password, role) 
VALUES ('student-1', 'John Student', 'student@test.com', 'password', 'STUDENT');

-- Teacher  
INSERT INTO User (id, name, email, password, role)
VALUES ('teacher-1', 'Jane Teacher', 'teacher@test.com', 'password', 'TEACHER');

-- Admin
INSERT INTO User (id, name, email, password, role)
VALUES ('admin-1', 'Admin User', 'admin@test.com', 'password', 'ADMIN');
```

### 2. Test API Endpoints
```bash
# Login sebagai student
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@test.com","password":"password"}'

# Test protected endpoint
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Best Practices

1. **Always validate permissions on both frontend and backend**
2. **Use middleware for route protection**
3. **Implement proper error handling for unauthorized access**
4. **Store sensitive data in httpOnly cookies**
5. **Use TypeScript for type safety**
6. **Implement proper logging for security events** 