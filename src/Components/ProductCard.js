import { useNavigate } from 'react-router-dom';
import'./ProductCard.css'
const ProductCard = ({ product, addItemToCart }) => {
  const navigate = useNavigate();
  
  return (
    <div className='product-card' onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>
      <img src={product.image} className='product-image' alt={product.title} />
      <div className='titleProduct' s>
        {product.title}
      </div>
      <div className="product-rating">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={`star ${index < product.rating.rate ? 'filled' : ''}`}>★</span>
          ))}
        </div>
       <div>{product.price}$</div>
      <button 
        onClick={(e) => {
          e.stopPropagation(); 
          addItemToCart(product);
        }}
        className='add-to-cart-btn'
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
