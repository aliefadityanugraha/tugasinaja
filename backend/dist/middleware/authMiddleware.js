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
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))) {
        return res.status(401).json({ message: 'Format Authorization salah' });
    }
    const token = authHeader && authHeader.split(' ')[1];
    // console.log("AUTH HEADER", authHeader)
    // console.log("TOKEN", token)
    if (!token) {
        return res.status(401).json({ message: 'Access token tidak ditemukan' });
    }
    // try {
    //     const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'aplikasie-learning');
    //     req.user = {
    //         id: decoded.id,
    //         role: decoded.role
    //     };
    //     console.log("DECODE TOKEN", decoded)
    //     next();
    // } catch (error) {
    //     return res.status(403).json({ message: 'Token tidak valid atau sudah kedaluwarsa' });
    // }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'aplikasie-learning');
        req.user = { id: decoded.id, role: decoded.role };
        // console.log("DECODE TOKEN", decoded)
        next();
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token kadaluwarsa' });
        }
        return res.status(403).json({ message: 'Token tidak valid' });
    }
};
exports.authenticateToken = authenticateToken;
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
