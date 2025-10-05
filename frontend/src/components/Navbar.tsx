import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import './Navbar.css'

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth()
  const { totalItems } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">电商平台</Link>
        <ul className="nav-links">
          <li><Link to="/">首页</Link></li>
          <li><Link to="/products">商品</Link></li>
          <li className="cart-link-wrapper">
            <Link to="/cart">购物车</Link>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </li>
          <li><Link to="/api-test" className="api-test-link">🧪 API测试</Link></li>
          {user ? (
            <>
              <li><span className="user-name">👤 {user.name}</span></li>
              {isAdmin && <li><Link to="/admin">管理后台</Link></li>}
              <li><button onClick={handleLogout} className="logout-btn">退出</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">登录</Link></li>
              <li><Link to="/register">注册</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
