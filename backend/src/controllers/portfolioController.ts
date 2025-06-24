import { Request, Response } from 'express'
import * as portfolioService from '../services/portfolioService'

export const createPortfolio = async (req: Request, res: Response) => {
  try {
    const { title, description, userId, type, fileUrl } = req.body

    console.log(title, description, userId, type, fileUrl)

    if (!title || !description || !userId || !type || !fileUrl) {
      return res.status(400).json({ error: 'Data tidak lengkap' })
    }


    const portfolio = await portfolioService.createPortfolio({ title, description, userId, type, fileUrl })
    
    res.status(201).json(portfolio)
    console.log("POST | http://localhost:"+process.env.PORT+"/api/portfolios")

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Gagal menambahkan portofolio' })
  }
}

export const getAllPortfolios = async (_req: Request, res: Response) => {
  try {

    const portfolios = await portfolioService.getAllPortfolios()

    res.status(200).json(portfolios)
    console.log("GET | http://localhost:"+process.env.PORT+"/api/portfolios")

  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data portofolio' })
  }
}

export const getPortfoliosByUser = async (req: Request, res: Response) => {
  try {

    const { userId } = req.params
    const portfolios = await portfolioService.getPortfoliosByUser(userId)

    res.json(portfolios)
    console.log("GET | http://localhost:"+process.env.PORT+"/api/portfolios/:id")

  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil portofolio USER' })
  }
}

export const updatePortfolio = async (req: Request, res: Response) => {
  try {
    const { portfolioId } = req.params;
    const { title, description, type, fileUrl } = req.body;

    if (!title && !description && !type && !fileUrl) {
      return res.status(400).json({ error: 'Tidak ada data yang diupdate' });
    }

    const updatedPortfolio = await portfolioService.updatePortfolio(portfolioId, { title, description, type, fileUrl });

    if (!updatedPortfolio) {
      return res.status(404).json({ error: 'Portofolio tidak ditemukan' });
    }

    res.status(200).json(updatedPortfolio);
    console.log("PUT | http://localhost:"+process.env.PORT+"/api/portfolios")

  } catch (err) {
    res.status(500).json({ error: 'Gagal mengupdate portofolio' });
  }
};

export const deletePortfolio = async (req: Request, res: Response) => {
  try {
    const { portfolioId } = req.params;

    const deleted = await portfolioService.deletePortfolio(portfolioId);

    if (!deleted) {
      return res.status(404).json({ error: 'Portofolio tidak ditemukan' });
    }

    res.status(200).json({ message: 'Portofolio berhasil dihapus' });
    console.log("DELETE | http://localhost:"+process.env.PORT+"/api/portfolios")

  } catch (err) {
    res.status(500).json({ error: 'Gagal menghapus portofolio' });
  }
};

