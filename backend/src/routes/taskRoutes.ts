import express from 'express'
import * as taskController from '../controllers/taskController'
import { authenticateToken, requireTeacherOrAdmin, requireAnyRole } from '../middleware/authMiddleware'

const router = express.Router()

// Semua route memerlukan authentication
router.use(authenticateToken as express.RequestHandler)

// Route yang memerlukan role TEACHER atau ADMIN
router.post('/', requireTeacherOrAdmin as express.RequestHandler, taskController.createTask as express.RequestHandler)
router.delete('/:id', requireTeacherOrAdmin as express.RequestHandler, taskController.deleteTask as express.RequestHandler)

// Route yang bisa diakses semua role
router.get('/', requireAnyRole as express.RequestHandler, taskController.getAllTasks as express.RequestHandler)
router.get('/:id', requireAnyRole as express.RequestHandler, taskController.getTaskById as express.RequestHandler)

export default router
