import express from 'express'
import { login, refreshToken, logout, getCurrentUser, getRolePermissionsEndpoint } from '../controllers/authController'
import { authenticateToken } from '../middleware/authMiddleware'

const router = express.Router()

router.post('/login', login as express.RequestHandler)
router.post('/refresh-token', refreshToken as express.RequestHandler)
router.post('/logout', logout as express.RequestHandler)
router.get('/me', authenticateToken as express.RequestHandler, getCurrentUser as express.RequestHandler)
router.get('/permissions', authenticateToken as express.RequestHandler, getRolePermissionsEndpoint as express.RequestHandler)

export default router
