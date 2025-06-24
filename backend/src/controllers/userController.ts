import { Request, Response } from 'express'
import * as userService from '../services/userService'
import { Role } from '@prisma/client'

export const registerUser = async (req: Request, res: Response) => {
  try {

    const { name, email, role, password } = req.body

    const existingUser = await userService.getUserByEmail(email)
    if (existingUser) {
      return res.status(400).json({ error: 'Email sudah terdaftar' })
    }

    const user = await userService.createUser({ name, email, role: role as Role, password })

    res.status(201).json({ message: 'User created successfully', user })
    console.log("POST | http://localhost:"+process.env.PORT+"/api/users/register")

  } catch (err: any) {
    res.status(500).json({ error: 'Gagal membuat USER', details: err.message })
  }
}

export const getUsers = async (_req: Request, res: Response) => {
  try {

    const users = await userService.getAllUsers()

    res.json(users)
    console.log("GET | http://localhost:"+process.env.PORT+"/api/users")

  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data USER' })
  }
}