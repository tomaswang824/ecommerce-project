import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '请输入商品名称'],
    trim: true
  },
  description: {
    type: String,
    required: [true, '请输入商品描述']
  },
  price: {
    type: Number,
    required: [true, '请输入商品价格'],
    min: 0
  },
  image: {
    type: String,
    required: [true, '请上传商品图片'],
    default: 'https://via.placeholder.com/300'
  },
  category: {
    type: String,
    required: [true, '请选择商品分类'],
    trim: true
  },
  stock: {
    type: Number,
    required: [true, '请输入库存数量'],
    min: 0,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Product = mongoose.model('Product', productSchema)

export default Product
