import { Link } from 'react-router-dom'
import './ProductCard.css'

interface Product {
  _id: string
  name: string
  price: number
  description: string
  image: string
  stock: number
}

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        <div className="product-footer">
          <span className="price">¥{product.price}</span>
          <Link to={`/products/${product._id}`}>
            <button className="btn-primary">查看详情</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
