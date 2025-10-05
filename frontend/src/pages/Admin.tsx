import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Admin.css'

interface Product {
  _id: string
  name: string
  price: number
  description: string
  image: string
  stock: number
  category: string
}

const Admin = () => {
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    stock: 0
  })

  useEffect(() => {
    if (!user || !isAdmin) {
      alert('无权访问，请使用管理员账号登录')
      navigate('/login')
      return
    }
    fetchProducts()
  }, [user, isAdmin, navigate])

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    try {
      if (editingProduct) {
        await axios.put(`/api/products/${editingProduct._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
        alert('商品更新成功!')
      } else {
        await axios.post('/api/products', formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
        alert('商品创建成功!')
      }

      setShowForm(false)
      setEditingProduct(null)
      setFormData({ name: '', description: '', price: 0, image: '', category: '', stock: 0 })
      fetchProducts()
    } catch (error) {
      alert('操作失败')
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个商品吗？')) return

    const token = localStorage.getItem('token')
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('商品已删除')
      fetchProducts()
    } catch (error) {
      alert('删除失败')
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingProduct(null)
    setFormData({ name: '', description: '', price: 0, image: '', category: '', stock: 0 })
  }

  if (loading) return <div className="container"><p>加载中...</p></div>

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>🛠️ 管理员后台</h1>
          <button className="btn-add" onClick={() => setShowForm(true)}>
            ➕ 添加商品
          </button>
        </div>

        {showForm && (
          <div className="modal-overlay" onClick={resetForm}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>{editingProduct ? '编辑商品' : '添加商品'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>商品名称</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>描述</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>价格</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>库存</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>分类</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>图片URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    {editingProduct ? '更新' : '创建'}
                  </button>
                  <button type="button" className="btn-cancel" onClick={resetForm}>
                    取消
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="products-table">
          <table>
            <thead>
              <tr>
                <th>图片</th>
                <th>名称</th>
                <th>分类</th>
                <th>价格</th>
                <th>库存</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>
                    <img src={product.image} alt={product.name} className="product-thumb" />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>¥{product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(product)}>
                      编辑
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(product._id)}>
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Admin
