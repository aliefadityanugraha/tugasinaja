import prisma from '../models/prisma'
import { TaskCategory } from '@prisma/client'

export const createTask = async (data: {
    title: string
    description: string
    category: TaskCategory
    points: number
    dueDate: Date
    createdBy: string
}) => {
    return await prisma.task.create({ data })
}

export const getAllTasks = async () => {
    return await prisma.task.findMany({
        orderBy: { dueDate: 'asc' },
        include: { creator: { select: { name: true, role: true } } },
    })
}

export const getTaskById = async (id: string) => {
    return await prisma.task.findUnique({ where: { id } })
}

export const deleteTask = async (id: string) => {
    return await prisma.task.delete({ where: { id } })
}
