import express from 'express'
import Product from '../models/Product.js'
import { protect, admin } from '../middleware/auth.js'

const router = express.Router()

// 模拟商品数据
const mockProducts = [
  {
    _id: '1',
    name: 'iPhone 15 Pro',
    description: '全新 A17 Pro 芯片，钛金属设计，专业级相机系统',
    price: 8999,
    image: 'https://via.placeholder.com/300/0000FF/FFFFFF?text=iPhone+15+Pro',
    category: '手机',
    stock: 50
  },
  {
    _id: '2',
    name: 'MacBook Pro 14',
    description: 'M3 芯片，14英寸 Liquid Retina XDR 显示屏',
    price: 14999,
    image: 'https://via.placeholder.com/300/008000/FFFFFF?text=MacBook+Pro',
    category: '电脑',
    stock: 30
  },
  {
    _id: '3',
    name: 'iPad Air',
    description: 'M1 芯片，10.9英寸 Liquid Retina 显示屏',
    price: 4799,
    image: 'https://via.placeholder.com/300/FF0000/FFFFFF?text=iPad+Air',
    category: '平板',
    stock: 40
  },
  {
    _id: '4',
    name: 'AirPods Pro',
    description: '主动降噪，空间音频，无线充电盒',
    price: 1999,
    image: 'https://via.placeholder.com/300/FFA500/FFFFFF?text=AirPods+Pro',
    category: '耳机',
    stock: 100
  },
  {
    _id: '5',
    name: 'Apple Watch Series 9',
    description: 'S9 芯片，全天候视网膜显示屏，健康监测',
    price: 3199,
    image: 'https://via.placeholder.com/300/800080/FFFFFF?text=Apple+Watch',
    category: '手表',
    stock: 60
  },
  {
    _id: '6',
    name: 'Magic Keyboard',
    description: '无线蓝牙键盘，可充电设计，简洁美观',
    price: 899,
    image: 'https://via.placeholder.com/300/808080/FFFFFF?text=Magic+Keyboard',
    category: '配件',
    stock: 80
  }
]

// 获取所有商品
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0
    const products = await Product.find({}).limit(limit).sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: '服务器错误' })
  }
})

// 获取单个商品
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: '商品不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: '服务器错误' })
  }
})

// 创建商品（需要管理员权限）
router.post('/', protect, admin, async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body

    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      stock
    })

    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: '服务器错误' })
  }
})

// 更新商品（需要管理员权限）
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
      product.name = name || product.name
      product.description = description || product.description
      product.price = price || product.price
      product.image = image || product.image
      product.category = category || product.category
      product.stock = stock !== undefined ? stock : product.stock

      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404).json({ message: '商品不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: '服务器错误' })
  }
})

// 删除商品（需要管理员权限）
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      await product.deleteOne()
      res.json({ message: '商品已删除' })
    } else {
      res.status(404).json({ message: '商品不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: '服务器错误' })
  }
})

export default router
