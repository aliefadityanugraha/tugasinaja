import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';

export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        role: Role;
    };
}

// Middleware untuk verifikasi JWT token
export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Format Authorization salah' })
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
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'aplikasie-learning');
        req.user = { id: decoded.id, role: decoded.role };
        // console.log("DECODE TOKEN", decoded)
        next();
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token kadaluwarsa' });
        }
        return res.status(403).json({ message: 'Token tidak valid' });
    }
};

export const requireRole = (allowedRoles: Role[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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

// Middleware khusus untuk setiap role
export const requireStudent = requireRole([Role.STUDENT]);
export const requireTeacher = requireRole([Role.TEACHER]);
export const requireAdmin = requireRole([Role.ADMIN]);
export const requireTeacherOrAdmin = requireRole([Role.TEACHER, Role.ADMIN]);
export const requireAnyRole = requireRole([Role.STUDENT, Role.TEACHER, Role.ADMIN]); 