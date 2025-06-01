import express from 'express'
import * as controller from '../controllers/taskSubmissionController'

const router = express.Router()

router.post('/', controller.submitTask as express.RequestHandler)
router.get('/', controller.getAllSubmissions as express.RequestHandler)
router.get('/task/:taskId', controller.getSubmissionsByTask as express.RequestHandler)

export default router