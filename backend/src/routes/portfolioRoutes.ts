import express from 'express'
import * as controller from '../controllers/portfolioController'

const router = express.Router()

router.post('/', controller.createPortfolio as express.RequestHandler)
router.get('/', controller.getAllPortfolios as express.RequestHandler)
router.get('/user/:userId', controller.getPortfoliosByUser as express.RequestHandler)

export default router