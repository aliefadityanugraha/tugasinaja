import prisma from '../models/prisma'
import { PortfolioType } from '@prisma/client'

export const createPortfolio = async (data: {
  title: string
  description: string
//   link: string
  userId: string
  type: PortfolioType
  fileUrl: string
}) => {
  return await prisma.portfolio.create({
    data: {
      title: data.title,
      description: data.description,
      type: data.type,
      fileUrl: data.fileUrl,
      user: { connect: { id: data.userId } }
    },
    include: {
      user: { select: { name: true } }
    }
  })
}

export const getAllPortfolios = async () => {
  return await prisma.portfolio.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { name: true } }
    }
  })
}

export const getPortfoliosByUser = async (userId: string) => {
  return await prisma.portfolio.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  })
}
