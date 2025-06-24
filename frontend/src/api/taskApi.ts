import api from './axios'

interface Task {
  title: string
  description: string
  category: string
  points: number
  dueDate: string
}

export const getAllTasks = async () => {
  const res = await api.get('/tasks')
  return res.data
}

export const getTaskById = async (id: string) => {
  const res = await api.get(`/tasks/${id}`)
  return res.data
}

export const createTask = async (taskData: Task) => {
  const res = await api.post('/tasks', taskData)
  return res.data
}