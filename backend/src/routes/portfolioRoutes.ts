import express from 'express'
import * as controller from '../controllers/portfolioController'
import { authenticateToken, requireTeacherOrAdmin, requireAnyRole } from '../middleware/authMiddleware'

const router = express.Router()

router.use(authenticateToken as express.RequestHandler)

router.post('/', controller.createPortfolio as express.RequestHandler)
router.get('/', controller.getAllPortfolios as express.RequestHandler)
router.get('/user/:userId', controller.getPortfoliosByUser as express.RequestHandler)
router.delete('/:portfolioId', controller.deletePortfolio as express.RequestHandler)

export default router