import { Request, Response } from 'express'
import * as portfolioService from '../services/portfolioService'

export const createPortfolio = async (req: Request, res: Response) => {
  try {
    const { title, description, userId, type, fileUrl } = req.body

    if (!title || !description || !userId || !type || !fileUrl) {
      return res.status(400).json({ error: 'Data tidak lengkap' })
    }

    const portfolio = await portfolioService.createPortfolio({ title, description, userId, type, fileUrl })
    
    res.status(201).json(portfolio)
  } catch (err) {
    res.status(500).json({ error: 'Gagal menambahkan portofolio' })
  }
}

export const getAllPortfolios = async (_req: Request, res: Response) => {
  try {
    const portfolios = await portfolioService.getAllPortfolios()
    res.json(portfolios)
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data portofolio' })
  }
}

export const getPortfoliosByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const portfolios = await portfolioService.getPortfoliosByUser(userId)
    res.json(portfolios)
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil portofolio USER' })
  }
}
