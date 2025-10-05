import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()

// 连接数据库
connectDB()

// 中间件
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 路由
app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.json({ message: '欢迎使用电商平台 API' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`)
})
