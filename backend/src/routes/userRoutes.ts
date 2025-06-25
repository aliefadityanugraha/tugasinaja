import express from 'express'
import { registerUser, getUsers, updateCurrentUser } from '../controllers/userController'
import { authenticateToken, requireAdmin, requireAnyRole } from '../middleware/authMiddleware'

const router = express.Router()

// Route untuk register (tidak memerlukan authentication)
router.post('/register', registerUser as express.RequestHandler)

// Route yang memerlukan authentication
router.use(authenticateToken as express.RequestHandler)

// Route yang memerlukan role ADMIN
router.get('/', requireAdmin as express.RequestHandler, getUsers as express.RequestHandler)

// Route untuk update profile sendiri
router.put('/me', authenticateToken as express.RequestHandler, updateCurrentUser as express.RequestHandler)

export default router