"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleHierarchy = exports.getRoleDisplayName = exports.getRolePermissions = exports.validateRole = exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const generateTokens = (user) => {
    const accessToken = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'aplikasie-learning', { expiresIn: '1m' });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET || 'aplikasie-learning', { expiresIn: '7d' });
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
const validateRole = (userRole, allowedRoles) => {
    return allowedRoles.includes(userRole);
};
exports.validateRole = validateRole;
const getRolePermissions = (role) => {
    const permissions = {
        [client_1.Role.STUDENT]: {
            canViewTasks: true,
            canSubmitTasks: true,
            canCreateTasks: false,
            canViewOwnPortfolio: true,
            canCreatePortfolio: true,
            canViewOwnSubmissions: true,
            canViewOwnProfile: true,
            canUpdateOwnProfile: true,
        },
        [client_1.Role.TEACHER]: {
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
        [client_1.Role.ADMIN]: {
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
exports.getRolePermissions = getRolePermissions;
const getRoleDisplayName = (role) => {
    const roleNames = {
        [client_1.Role.STUDENT]: 'Siswa',
        [client_1.Role.TEACHER]: 'Guru',
        [client_1.Role.ADMIN]: 'Administrator'
    };
    return roleNames[role] || 'Unknown';
};
exports.getRoleDisplayName = getRoleDisplayName;
const getRoleHierarchy = (role) => {
    const hierarchy = {
        [client_1.Role.STUDENT]: 1,
        [client_1.Role.TEACHER]: 2,
        [client_1.Role.ADMIN]: 3
    };
    return hierarchy[role] || 0;
};
exports.getRoleHierarchy = getRoleHierarchy;
