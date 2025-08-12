import  express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import profileRoutes from './routes/profile.js'
import chatRoutes from './routes/chat.js'

const app = express()
const PORT = process.env.PORT || 3005

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/chat', chatRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
 