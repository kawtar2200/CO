import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Cart.css';

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate(); 

  const removeItemFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');  
  };

  return (
    <div style={{ margin: '20px 50px' }}>
      <h1 style={{ marginTop: '100px', textAlign: 'center' }}>Shopping Cart</h1>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className='cart'>
              <img src={item.image} className='img-cart' />
              <p>{item.title}</p>
              <p> ${item.price * item.quantity}</p>
              <div>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className='btn'>-</button>
                {item.quantity}
                <button className='btn' onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>

              <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
            </div>
          ))
        )}
      </div>
      <div>
        <h2>Total: ${calculateTotal()}</h2>
        <button onClick={handleProceedToCheckout} disabled={cart.length === 0}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
