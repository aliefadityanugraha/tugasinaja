import api from './axios'

export const getAllTasks = async () => {
  const res = await api.get('/tasks')
  return res.data
}

export const getTaskById = async (id: number) => {
  const res = await api.get(`/tasks/${id}`)
  return res.data
}

export const createTask = async (taskData: {
  title: string
  description: string
  category: string
  points: number
  dueDate: string
}) => {
  const res = await api.post('/tasks', taskData)
  return res.data
}