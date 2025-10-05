import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import './Home.css'

interface Product {
  _id: string
  name: string
  price: number
  description: string
  image: string
  stock: number
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products?limit=6')
      setProducts(response.data)
    } catch (error) {
      console.error('获取商品失败:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>欢迎来到我们的电商平台</h1>
          <p>发现您喜欢的商品</p>
          <Link to="/products">
            <button className="btn-hero">立即购物</button>
          </Link>
        </div>
      </section>

      <section className="featured-products">
        <div className="container">
          <h2>热门商品</h2>
          {loading ? (
            <p>加载中...</p>
          ) : (
            <div className="products-grid">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
