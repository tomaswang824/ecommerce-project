import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './models/Product.js'
import User from './models/User.js'

dotenv.config()

const products = [
  {
    name: 'iPhone 15 Pro',
    description: '全新 A17 Pro 芯片，钛金属设计，专业级相机系统',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1592286927505-72ad5b174d0f?w=300&h=300&fit=crop',
    category: '手机',
    stock: 50
  },
  {
    name: 'MacBook Pro 14',
    description: 'M3 芯片，14英寸 Liquid Retina XDR 显示屏',
    price: 14999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
    category: '电脑',
    stock: 30
  },
  {
    name: 'iPad Air',
    description: 'M1 芯片，10.9英寸 Liquid Retina 显示屏',
    price: 4799,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop',
    category: '平板',
    stock: 40
  },
  {
    name: 'AirPods Pro',
    description: '主动降噪，空间音频，无线充电盒',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=300&h=300&fit=crop',
    category: '耳机',
    stock: 100
  },
  {
    name: 'Apple Watch Series 9',
    description: 'S9 芯片，全天候视网膜显示屏，健康监测',
    price: 3199,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&h=300&fit=crop',
    category: '手表',
    stock: 60
  },
  {
    name: 'Magic Keyboard',
    description: '无线蓝牙键盘，可充电设计，简洁美观',
    price: 899,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop',
    category: '配件',
    stock: 80
  }
]

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)

    // 清空数据
    await Product.deleteMany()
    await User.deleteMany()

    // 创建管理员用户
    await User.create({
      name: '管理员',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    })

    // 导入商品数据
    await Product.insertMany(products)

    console.log('数据导入成功!')
    process.exit()
  } catch (error) {
    console.error(`错误: ${error.message}`)
    process.exit(1)
  }
}

importData()
