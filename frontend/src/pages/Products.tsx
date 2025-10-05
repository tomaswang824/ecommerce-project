import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import './Products.css'

interface Product {
  _id: string
  name: string
  price: number
  description: string
  image: string
  stock: number
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products')
      setProducts(response.data)
    } catch (error) {
      console.error('获取商品失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="products-page">
      <div className="container">
        <h1>所有商品</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="搜索商品..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p>加载中...</p>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
