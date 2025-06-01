import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import taskRoutes from './routes/taskRoutes'
import userRoutes from './routes/userRoutes'
import taskSubmissionRoutes from './routes/taskSubmissionRoutes'
import portfolioRoutes from './routes/portfolioRoutes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.send('Backend aktif')
})
app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)
app.use('/api/submissions', taskSubmissionRoutes)
app.use('/api/portfolios', portfolioRoutes)


const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server listening on port http://localhost:${process.env.PORT}`))
