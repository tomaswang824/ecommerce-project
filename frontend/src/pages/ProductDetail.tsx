import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import './ProductDetail.css'

interface Product {
  _id: string
  name: string
  price: number
  description: string
  image: string
  stock: number
  category: string
}

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart: addToCartContext } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`)
      setProduct(response.data)
    } catch (error) {
      console.error('获取商品详情失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return

    // 添加指定数量的商品到购物车
    for (let i = 0; i < quantity; i++) {
      addToCartContext({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        stock: product.stock
      })
    }

    // 询问用户是否跳转到购物车
    const goToCart = window.confirm(`已添加 ${quantity} 件商品到购物车！\n\n是否前往购物车查看？`)
    if (goToCart) {
      navigate('/cart')
    }
  }

  if (loading) return <div className="container"><p>加载中...</p></div>
  if (!product) return <div className="container"><p>商品不存在</p></div>

  return (
    <div className="product-detail">
      <div className="container">
        <div className="detail-grid">
          <div className="image-section">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="info-section">
            <h1>{product.name}</h1>
            <p className="category">分类: {product.category}</p>
            <p className="price">¥{product.price}</p>
            <p className="description">{product.description}</p>
            <p className="stock">库存: {product.stock} 件</p>

            <div className="quantity-section">
              <label>数量:</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            <button
              className="btn-add-cart"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? '缺货' : '加入购物车'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
