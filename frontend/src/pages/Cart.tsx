import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Cart.css'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }

  const handleClearCart = () => {
    if (window.confirm('确定要清空购物车吗？')) {
      clearCart()
    }
  }

  const handleCheckout = () => {
    alert('结算功能即将推出！')
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>购物车</h1>
          <div className="empty-cart">
            <p>购物车是空的</p>
            <Link to="/products" className="btn-primary">去购物</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>购物车</h1>
          <button onClick={handleClearCart} className="btn-clear">清空购物车</button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="item-image" />

                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p className="item-price">¥{item.price}</p>
                </div>

                <div className="item-quantity">
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                    className="qty-btn"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={item.stock}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
                    className="qty-input"
                  />
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    className="qty-btn"
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>

                <div className="item-total">
                  <p>¥{(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="btn-remove"
                >
                  删除
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>订单摘要</h2>
            <div className="summary-row">
              <span>商品总数:</span>
              <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} 件</span>
            </div>
            <div className="summary-row total">
              <span>总计:</span>
              <span className="total-price">¥{totalPrice.toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout} className="btn-checkout">
              去结算
            </button>
            <Link to="/products" className="btn-continue">
              继续购物
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
