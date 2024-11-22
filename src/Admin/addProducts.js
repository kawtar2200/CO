import React, { useState } from 'react';
import Headers from './Header';
import './admin.css';
import Sidebar from './SideBar';
import { useNavigate } from 'react-router-dom';

const AddProductForm = ({ onProductAdded }) => {
  const navigate=useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    image: '',
    category: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!productData.name || !productData.price || !productData.quantity) {
      alert('Please fill in all required fields.');
      return;
    }

    const newProduct = {
      ...productData,
      price: parseFloat(productData.price),
      quantity: parseInt(productData.quantity),
    };

    try {
      const response = await fetch('http://localhost:3004/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        alert('Product added successfully!');
        setProductData({
          name: '',
          description: '',
          price: '',
          quantity: '',
          image: '',
          category: '',

        }); 
        navigate('/admin/list-products')
       
      } else {
        alert('Error adding product.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="grid-container">
      <Headers />
      <Sidebar />
      <div className="main-container">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Price ($):</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              required
              min="0"
            />
          </div>
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={productData.quantity}
              onChange={handleInputChange}
              required
              min="1"
            />
          </div>
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              name="image"
              value={productData.image}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
