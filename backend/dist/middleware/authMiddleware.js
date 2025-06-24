"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAnyRole = exports.requireTeacherOrAdmin = exports.requireAdmin = exports.requireTeacher = exports.requireStudent = exports.requireRole = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
// Middleware untuk verifikasi JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    if (!token) {
        return res.status(401).json({ message: 'Access token tidak ditemukan' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'access_secret');
        req.user = {
            id: decoded.id,
            role: decoded.role
        };
        next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Token tidak valid atau sudah kedaluwarsa' });
    }
};
exports.authenticateToken = authenticateToken;
// Middleware untuk role-based access control
const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'User tidak terautentikasi' });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Akses ditolak. Role tidak diizinkan.',
                requiredRoles: allowedRoles,
                userRole: req.user.role
            });
        }
        next();
    };
};
exports.requireRole = requireRole;
// Middleware khusus untuk setiap role
exports.requireStudent = (0, exports.requireRole)([client_1.Role.STUDENT]);
exports.requireTeacher = (0, exports.requireRole)([client_1.Role.TEACHER]);
exports.requireAdmin = (0, exports.requireRole)([client_1.Role.ADMIN]);
exports.requireTeacherOrAdmin = (0, exports.requireRole)([client_1.Role.TEACHER, client_1.Role.ADMIN]);
exports.requireAnyRole = (0, exports.requireRole)([client_1.Role.STUDENT, client_1.Role.TEACHER, client_1.Role.ADMIN]);
