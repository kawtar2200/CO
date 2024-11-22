import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import'./Detail.css'
;
const Detail = ({ cart, setCart }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
   
    fetch(`http://localhost:3004/products/${productId}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [productId]);

  
  const addItemToCart = () => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className='card-detail' >
      <div>
      <img src={product.image} alt={product.title}  />

      </div>
      <div className='info-detail'>
        <h1 >{product.title}</h1>
        <div className="product-rating">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={`star ${index < product.rating.rate ? 'filled' : ''}`}>★</span>
          ))}
        </div>
        <p >${product.price}</p>
        <h6>Description:</h6>
        <p> {product.description}</p>
     
       
          <button  className='btn-detail'
            onClick={addItemToCart}
          >
            Add to Cart
          </button>
          
        </div>
      </div>
    
  );
};

export default Detail;
