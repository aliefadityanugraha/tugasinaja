import express from 'express'
import * as taskController from '../controllers/taskController'

const router = express.Router()

router.post('/', taskController.createTask as express.RequestHandler)
router.get('/', taskController.getAllTasks as express.RequestHandler)
router.get('/:id', taskController.getTaskById as express.RequestHandler)
router.delete('/:id', taskController.deleteTask as express.RequestHandler)

export default router
