import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

import taskRoutes from './routes/taskRoutes'
import userRoutes from './routes/userRoutes'
import taskSubmissionRoutes from './routes/taskSubmissionRoutes'
import portfolioRoutes from './routes/portfolioRoutes'
import authRoutes from './routes/authRoutes'
import prisma from './models/prisma'

dotenv.config()

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

async function checkDatabaseConnection() {
  try {
    await prisma.$connect()
    console.log('Database connection successful')
  } catch (error) {
    console.error('Database connection failed:', error)
    process.exit(1)
  }
}

app.get('/', (_req, res) => {
  res.json({ message: `Backend Service listening on port http://localhost:${process.env.PORT}` })
  console.log("GET | http://localhost:"+process.env.PORT)
})

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)
app.use('/api/submissions', taskSubmissionRoutes)
app.use('/api/portfolios', portfolioRoutes)

const PORT = process.env.PORT || 4000

checkDatabaseConnection().then(() => {
  app.listen(PORT, () => console.log(`Server listening on port http://localhost:${process.env.PORT}`))
})
