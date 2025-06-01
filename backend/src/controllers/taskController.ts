import { Request, Response } from 'express'
import * as taskService from '../services/taskService'

interface AuthenticatedRequest extends Request {
    user?: {
        id?: string;
    };
}

export const createTask = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { title, description, category, points, dueDate } = req.body
        console.log(title, description, category, points, dueDate);

        // const createdBy = req.user?.id;
        const createdBy = "f29eb2e8-fd65-4b25-a151-73761ded979b";

        const task = await taskService.createTask({
            title,
            description,
            category,
            points,
            dueDate: new Date(dueDate),
            createdBy,
        })

        res.status(201).json(task)
    } catch (err: any) {
        res.status(500).json({ error: 'Gagal membuat tugas', details: err.message })
    }
}

export const getAllTasks = async (_req: Request, res: Response) => {
    try {
        const tasks = await taskService.getAllTasks()
        res.json(tasks)
    } catch (err) {
        res.status(500).json({ error: 'Gagal mengambil tugas' })
    }
}

export const getTaskById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const task = await taskService.getTaskById(id)

        if (!task) return res.status(404).json({ error: 'Tugas tidak ditemukan' })

        res.json(task)
    } catch (err) {
        res.status(500).json({ error: 'Gagal mengambil tugas' })
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await taskService.deleteTask(id)
        res.json({ message: 'Tugas berhasil dihapus' })
    } catch (err) {
        res.status(500).json({ error: 'Gagal menghapus tugas' })
    }
}
