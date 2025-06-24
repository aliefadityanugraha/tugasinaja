"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRolePermissionsEndpoint = exports.getCurrentUser = exports.logout = exports.refreshToken = exports.login = void 0;
const userService = __importStar(require("../services/userService"));
const authService_1 = require("../services/authService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email dan password wajib diisi" });
            return;
        }
        const existingUser = yield userService.getUserByEmail(email);
        if (!existingUser) {
            res.status(404).json({ message: "Email tidak ditemukan" });
            return;
        }
        // const isMatch = await bcrypt.compare(password, existingUser.password)
        // if (!isMatch) {
        //     res.status(401).json({ message: "Password salah" })
        //     return
        // }
        if (existingUser.password != password) {
            res.status(401).json({ message: "Password salah" });
            return;
        }
        const { accessToken, refreshToken } = (0, authService_1.generateTokens)(existingUser);
        const permissions = (0, authService_1.getRolePermissions)(existingUser.role);
        const roleDisplayName = (0, authService_1.getRoleDisplayName)(existingUser.role);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            message: "Login berhasil",
            accessToken,
            user: {
                id: existingUser.id,
                email: existingUser.email,
                name: existingUser.name,
                role: existingUser.role,
                roleDisplayName,
                permissions
            }
        });
        console.log("POST | http://localhost:" + process.env.PORT + "/api/auth/login");
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
});
exports.login = login;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            res.status(401).json({ message: "Refresh token tidak ditemukan" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET || 'refresh_secret');
        const user = yield userService.getUserById(decoded.id);
        if (!user) {
            res.status(404).json({ message: "User tidak ditemukan" });
            return;
        }
        const { accessToken, refreshToken: newRefreshToken } = (0, authService_1.generateTokens)(user);
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({ accessToken });
        console.log("POST | http://localhost:" + process.env.PORT + "/api/auth/refresh-token");
    }
    catch (err) {
        console.error("Refresh token error:", err);
        res.status(403).json({ message: "Token tidak valid atau sudah kedaluwarsa" });
    }
});
exports.refreshToken = refreshToken;
const logout = (req, res) => {
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        res.status(200).json({ message: "Logout berhasil" });
        console.log("POST | http://localhost:" + process.env.PORT + "/api/auth/logout");
    }
    catch (err) {
        console.error("Logout error:", err);
        res.status(500).json({ message: "Terjadi kesalahan saat logout" });
    }
};
exports.logout = logout;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ message: "User tidak terautentikasi" });
            return;
        }
        const user = yield userService.getUserById(req.user.id);
        if (!user) {
            res.status(404).json({ message: "User tidak ditemukan" });
            return;
        }
        const permissions = (0, authService_1.getRolePermissions)(user.role);
        const roleDisplayName = (0, authService_1.getRoleDisplayName)(user.role);
        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                roleDisplayName,
                permissions,
                avatarUrl: user.avatarUrl,
                createdAt: user.createdAt
            }
        });
        console.log("GET | http://localhost:" + process.env.PORT + "/api/auth/me");
    }
    catch (error) {
        console.error("Get current user error:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
});
exports.getCurrentUser = getCurrentUser;
const getRolePermissionsEndpoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ message: "User tidak terautentikasi" });
            return;
        }
        const permissions = (0, authService_1.getRolePermissions)(req.user.role);
        const roleDisplayName = (0, authService_1.getRoleDisplayName)(req.user.role);
        res.status(200).json({
            role: req.user.role,
            roleDisplayName,
            permissions
        });
        console.log("GET | http://localhost:" + process.env.PORT + "/api/auth/permissions");
    }
    catch (error) {
        console.error("Get permissions error:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
});
exports.getRolePermissionsEndpoint = getRolePermissionsEndpoint;
