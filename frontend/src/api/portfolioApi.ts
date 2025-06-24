import api from './axios'

export enum PortfolioType {
  TULISAN = "tulisan",
  VIDEO = "video",
  GAMBAR = "gambar",
  PODCAST = "podcast"
}


interface   Portfolio {
    userId: string,
    title: string,
    type: PortfolioType,
    fileUrl: string,
    description: string
}

export const getAllPortfolio = async () => {
    try {
        const res = await api.get('/portfolios')
        return res.data
    } catch (error) {
        console.error('Error fetching portfolio:', error)
        throw error
    }
}

export const getPortfolioById = async (id: string) => {
    const res = await api.get(`/portfolios/${id}`)
    return res.data
}

export const createPortfolio = async (portfolio: Portfolio) => {
    try {
        const res = await api.post('/portfolios', portfolio)
        return res.data
    } catch (error) {
        console.error('Error creating portfolio:', error)
        throw error
    }
}

export const updatePortfolio = async (id: string, portfolio: Portfolio) => {
    const res = await api.put(`/portfolios/${id}`, portfolio)
    return res.data
}

export const deletePortfolio = async (id: string) => {
    const res = await api.delete(`/portfolios/${id}`)
    return res.data
}
