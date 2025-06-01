import { Request, Response } from 'express'
import * as submissionService from '../services/taskSubmissionService'

export const submitTask = async (req: Request, res: Response) => {
  try {
    const { taskId, userId, content } = req.body

    if (!taskId || !userId || !content) {
      return res.status(400).json({ error: 'Data tidak lengkap' })
    }

    const submission = await submissionService.submitTask({ taskId, userId, content })
    res.status(201).json(submission)
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengumpulkan tugas' })
  }
}

export const getAllSubmissions = async (_req: Request, res: Response) => {
  try {
    const submissions = await submissionService.getAllSubmissions()
    res.json(submissions)
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data pengumpulan' })
  }
}

export const getSubmissionsByTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params
    const submissions = await submissionService.getSubmissionsByTask(taskId)
    res.json(submissions)
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data tugas' })
  }
}
