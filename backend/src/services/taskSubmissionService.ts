import prisma from '../models/prisma'

export const submitTask = async (data: {
  taskId: string
  userId: string
  content: string
}) => {
  return await prisma.taskSubmission.create({
    data: {
      taskId: data.taskId,
      userId: data.userId,
      status: 'belum',
      completionNote: data.content,
    },
    include: {
      task: true,
      user: { select: { name: true, role: true } }
    }
  })
}

export const getAllSubmissions = async () => {
  return await prisma.taskSubmission.findMany({
    orderBy: { submittedAt: 'desc' },
    include: {
      user: { select: { name: true, role: true } },
      task: { select: { title: true, category: true } }
    }
  })
}

export const getSubmissionsByTask = async (taskId: string) => {
  return await prisma.taskSubmission.findMany({
    where: { taskId },
    include: {
      user: { select: { name: true } }
    }
  })
}
