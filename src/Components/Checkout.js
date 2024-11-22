import React, { useState } from 'react';
import './Checkout.css';

const Checkout = ({ cart, clearCart }) => {
  const [orderStatus, setOrderStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    address: '',
    phone: '',
    country: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const order = {
        items: cart,
        totalAmount: calculateTotal(),
        date: new Date().toISOString(),
        user: userDetails,
      };

      const response = await fetch('http://localhost:3004/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        setOrderStatus('Order placed successfully!');
        clearCart();
      } else {
        setOrderStatus('Failed to place order. Please try again.');
      }
    } catch (error) {
      setOrderStatus('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const validateForm = () => {
    return userDetails.name && userDetails.address && userDetails.phone && userDetails.country;
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-content">
        <form className="user-form">
          <h2>Shipping Information:</h2>
          <div className="form-field">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
              className="form-input"
            />
          </div>
          <div className="form-field">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={userDetails.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
              required
              className="form-input"
            />
          </div>
          <div className="form-field">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              required
              className="form-input"
            />
          </div>
          <div className="form-field">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={userDetails.country}
              onChange={handleInputChange}
              placeholder="Enter your country"
              required
              className="form-input"
            />
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={loading || !validateForm()}
            className="place-order-btn"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
          {orderStatus && <p className="order-status">{orderStatus}</p>}
        </form>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <p style={{margin:"30px 0px"}}>Number of Items: {cart.length}</p>
          <hr/>
          <p style={{paddingBottom:'50px'}}>Total: ${calculateTotal().toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
