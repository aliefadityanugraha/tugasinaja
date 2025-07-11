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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCurrentUser = exports.getUsers = exports.registerUser = void 0;
const userService = __importStar(require("../services/userService"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, role, password } = req.body;
        const existingUser = yield userService.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email sudah terdaftar' });
        }
        const user = yield userService.createUser({ name, email, role: role, password });
        res.status(201).json({ message: 'User created successfully', user });
        console.log("POST | http://localhost:" + process.env.PORT + "/api/users/register");
    }
    catch (err) {
        res.status(500).json({ error: 'Gagal membuat USER', details: err.message });
    }
});
exports.registerUser = registerUser;
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService.getAllUsers();
        res.json(users);
        console.log("GET | http://localhost:" + process.env.PORT + "/api/users");
    }
    catch (err) {
        res.status(500).json({ error: 'Gagal mengambil data USER' });
    }
});
exports.getUsers = getUsers;
const updateCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { name, avatarUrl } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Nama wajib diisi' });
        }
        const updatedUser = yield userService.updateUserById(userId, { name, avatarUrl });
        res.json({
            message: 'Profil berhasil diupdate',
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                avatarUrl: updatedUser.avatarUrl,
                createdAt: updatedUser.createdAt
            }
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Gagal update profil', details: err.message });
    }
});
exports.updateCurrentUser = updateCurrentUser;
