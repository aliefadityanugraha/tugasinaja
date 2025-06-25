import jwt from 'jsonwebtoken';
import type { User } from '@prisma/client';
import { Role } from '@prisma/client';

export const generateTokens = (user: User) => {
    const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || 'aplikasie-learning',
        { expiresIn: '1m' }
    );

    const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET || 'aplikasie-learning',
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
};

export const validateRole = (userRole: Role, allowedRoles: Role[]): boolean => {
    return allowedRoles.includes(userRole);
};

export const getRolePermissions = (role: Role) => {
    const permissions = {
        [Role.STUDENT]: {
            canViewTasks: true,
            canSubmitTasks: true,
            canCreateTasks: false,
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

export const getRoleDisplayName = (role: Role): string => {
    const roleNames = {
        [Role.STUDENT]: 'Siswa',
        [Role.TEACHER]: 'Guru',
        [Role.ADMIN]: 'Administrator'
    };

    return roleNames[role] || 'Unknown';
};

export const getRoleHierarchy = (role: Role): number => {
    const hierarchy = {
        [Role.STUDENT]: 1,
        [Role.TEACHER]: 2,
        [Role.ADMIN]: 3
    };

    return hierarchy[role] || 0;
};
