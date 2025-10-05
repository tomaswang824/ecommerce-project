import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

// 生成 JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

// 注册
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // 检查用户是否已存在
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: '用户已存在' })
    }

    // 创建新用户
    const user = await User.create({
      name,
      email,
      password
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      })
    }
  } catch (error) {
    res.status(500).json({ message: '服务器错误' })
  }
})

// 登录
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // 查找用户
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      })
    } else {
      res.status(401).json({ message: '邮箱或密码错误' })
    }
  } catch (error) {
    res.status(500).json({ message: '服务器错误' })
  }
})

export default router
