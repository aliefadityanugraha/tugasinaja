import express from 'express'
import * as userController from '../controllers/userController'

const router = express.Router()

router.post('/register', userController.registerUser as express.RequestHandler)
router.get('/', userController.getUsers as express.RequestHandler)

export default router