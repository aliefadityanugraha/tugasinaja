import { Request, Response } from 'express'
import * as taskService from '../services/taskService'
import { AuthenticatedRequest } from '../middleware/authMiddleware'

export const createTask = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { title, description, category, points, dueDate } = req.body
        console.log(title, description, category, points, dueDate);

        if (!req.user?.id) {
            return res.status(401).json({ error: 'User tidak terautentikasi' })
        }

        const task = await taskService.createTask({
            title,
            description,
            category,
            points,
            dueDate: new Date(dueDate),
            createdBy: req.user.id,
        })

        res.status(201).json(task)
        console.log("POST | http://localhost:"+process.env.PORT+"/api/tasks")

    } catch (err: any) {
        res.status(500).json({ error: 'Gagal membuat tugas', details: err.message })
    }
}

export const getAllTasks = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ error: 'User tidak terautentikasi' })
        }

        const tasks = await taskService.getAllTasks()

        res.status(200).json(tasks)
        console.log("GET | http://localhost:"+process.env.PORT+"/api/tasks")

    } catch (err) {
        res.status(500).json({ error: 'Gagal mengambil tugas' })
    }
}

export const getTaskById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ error: 'User tidak terautentikasi' })
        }

        const { id } = req.params
        const task = await taskService.getTaskById(id)

        if (!task) return res.status(404).json({ error: 'Tugas tidak ditemukan' })

        res.status(200).json(task)
        console.log("GET | http://localhost:"+process.env.PORT+"/api/tasks/:id")

    } catch (err) {
        res.status(500).json({ error: 'Gagal mengambil tugas' })
    }
}

export const deleteTask = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ error: 'User tidak terautentikasi' })
        }

        const { id } = req.params
        await taskService.deleteTask(id)

        res.json({ message: 'Tugas berhasil dihapus' })
        console.log("DELETE | http://localhost:"+process.env.PORT+"/api/tasks")

    } catch (err) {
        res.status(500).json({ error: 'Gagal menghapus tugas' })
    }
}
