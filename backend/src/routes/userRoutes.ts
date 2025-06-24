import express from 'express'
import * as userController from '../controllers/userController'
import { authenticateToken, requireAdmin, requireAnyRole } from '../middleware/authMiddleware'

const router = express.Router()

// Route untuk register (tidak memerlukan authentication)
router.post('/register', userController.registerUser as express.RequestHandler)

// Route yang memerlukan authentication
router.use(authenticateToken as express.RequestHandler)

// Route yang memerlukan role ADMIN
router.get('/', requireAdmin as express.RequestHandler, userController.getUsers as express.RequestHandler)

export default router