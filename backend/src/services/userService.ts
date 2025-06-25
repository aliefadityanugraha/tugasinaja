import prisma from '../models/prisma'
import { Role } from '@prisma/client'

export const createUser = async (data: {
  name: string
  email: string
  role: Role
  password: string
}) => {
  return await prisma.user.create({ data: {
    name: data.name,
    email: data.email,
    role: data.role,
    password: data.password,
  } })
}

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })
}

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email }
  })
}

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id }
  })
}

export const updateUserById = async (id: string, data: { name: string, avatarUrl?: string }) => {
  return await prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      avatarUrl: data.avatarUrl,
    },
  });
}
