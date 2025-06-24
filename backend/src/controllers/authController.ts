import { Request, Response } from 'express'
import * as userService from '../services/userService'
import { generateTokens, getRolePermissions, getRoleDisplayName } from '../services/authService'
import { authenticateToken, AuthenticatedRequest } from '../middleware/authMiddleware'
import jwt from 'jsonwebtoken'

export const login = async (req : Request, res: Response): Promise<void> => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json({ message: "Email dan password wajib diisi" })
            return
        }

        const existingUser = await userService.getUserByEmail(email)

        if (!existingUser) {
            res.status(404).json({ message: "Email tidak ditemukan" })
            return
        }

        // const isMatch = await bcrypt.compare(password, existingUser.password)
        // if (!isMatch) {
        //     res.status(401).json({ message: "Password salah" })
        //     return
        // }

        if(existingUser.password != password) {
            res.status(401).json({ message: "Password salah" })
            return
        }

        const { accessToken, refreshToken } = generateTokens(existingUser)
        const permissions = getRolePermissions(existingUser.role)
        const roleDisplayName = getRoleDisplayName(existingUser.role)

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

        console.log("POST | http://localhost:"+process.env.PORT+"/api/auth/login")

    } catch (error) {
        console.error("Login error:", error)
        res.status(500).json({ message: "Terjadi kesalahan pada server" })
    }
}

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.cookies.refreshToken

        if (!token) {
            res.status(401).json({ message: "Refresh token tidak ditemukan" })
            return
        }

        const decoded: any = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'refresh_secret')
        const user = await userService.getUserById(decoded.id)

        if (!user) {
            res.status(404).json({ message: "User tidak ditemukan" })
            return
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user)

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ accessToken })
        console.log("POST | http://localhost:"+process.env.PORT+"/api/auth/refresh-token")

    } catch (err) {
        console.error("Refresh token error:", err)
        res.status(403).json({ message: "Token tidak valid atau sudah kedaluwarsa" })
    }
}

export const logout = (req: Request, res: Response): void => {
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(200).json({ message: "Logout berhasil" })
        console.log("POST | http://localhost:"+process.env.PORT+"/api/auth/logout")

    } catch (err) {
        console.error("Logout error:", err)
        res.status(500).json({ message: "Terjadi kesalahan saat logout" })
    }
}

export const getCurrentUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "User tidak terautentikasi" })
            return
        }

        const user = await userService.getUserById(req.user.id)
        if (!user) {
            res.status(404).json({ message: "User tidak ditemukan" })
            return
        }

        const permissions = getRolePermissions(user.role)
        const roleDisplayName = getRoleDisplayName(user.role)

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
        })

        console.log("GET | http://localhost:"+process.env.PORT+"/api/auth/me")

    } catch (error) {
        console.error("Get current user error:", error)
        res.status(500).json({ message: "Terjadi kesalahan pada server" })
    }
}

export const getRolePermissionsEndpoint = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "User tidak terautentikasi" })
            return
        }

        const permissions = getRolePermissions(req.user.role)
        const roleDisplayName = getRoleDisplayName(req.user.role)

        res.status(200).json({
            role: req.user.role,
            roleDisplayName,
            permissions
        })

        console.log("GET | http://localhost:"+process.env.PORT+"/api/auth/permissions")

    } catch (error) {
        console.error("Get permissions error:", error)
        res.status(500).json({ message: "Terjadi kesalahan pada server" })
    }
}