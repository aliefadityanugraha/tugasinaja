import jwt from 'jsonwebtoken';
import type { User } from '@prisma/client';
import { Role } from '@prisma/client';

export const generateTokens = (user: User) => {
    const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || 'access_secret',
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET || 'refresh_secret',
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
};

// Fungsi untuk validasi role
export const validateRole = (userRole: Role, allowedRoles: Role[]): boolean => {
    return allowedRoles.includes(userRole);
};

// Fungsi untuk mendapatkan role permissions
export const getRolePermissions = (role: Role) => {
    const permissions = {
        [Role.STUDENT]: {
            canViewTasks: true,
            canSubmitTasks: true,
            canViewOwnPortfolio: true,
            canCreatePortfolio: true,
            canViewOwnSubmissions: true,
            canViewOwnProfile: true,
            canUpdateOwnProfile: true,
        },
        [Role.TEACHER]: {
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
        [Role.ADMIN]: {
            canViewTasks: true,
            canCreateTasks: true,
            canEditTasks: true,
            canDeleteTasks: true,
            canViewAllSubmissions: true,
            canGradeSubmissions: true,
            canViewAllPortfolios: true,
            canViewAllProfiles: true,
            canManageStudents: true,
            canManageTeachers: true,
            canManageUsers: true,
            canManageSystem: true,
            canViewAnalytics: true,
        }
    };

    return permissions[role] || {};
};

// Fungsi untuk mendapatkan role display name
export const getRoleDisplayName = (role: Role): string => {
    const roleNames = {
        [Role.STUDENT]: 'Siswa',
        [Role.TEACHER]: 'Guru',
        [Role.ADMIN]: 'Administrator'
    };

    return roleNames[role] || 'Unknown';
};

// Fungsi untuk mendapatkan role hierarchy level
export const getRoleHierarchy = (role: Role): number => {
    const hierarchy = {
        [Role.STUDENT]: 1,
        [Role.TEACHER]: 2,
        [Role.ADMIN]: 3
    };

    return hierarchy[role] || 0;
};
