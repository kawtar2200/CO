import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Navbar from './Components/Navbar/Navbar/Navbar';
import Header from './Components/Header/Header';
import Product from './Components/Product';
import Home from './Components/Home';
import { Footer } from './Components/Footer';
import LoginSignup from './Components/LoginSignup';
import Cart from './Components/Cart';
import Jewerly from './Components/Jewerly';
import WomenC from './Components/WomenC';
import MenC from './Components/MenC';
import Detail from './Components/Detail';
import Checkout from './Components/Checkout';  

import ListOrders from './Admin/Order'
import Admin from './Admin/admin';
import AddProductForm from './Admin/addProducts';
import SalesChart from './Admin/chart';
import Sidebar from './Admin/SideBar';
import Homes from './Admin/home';
import Headers from './Admin/Header';
import ListProducts from './Admin/ListProducts';
import Customers from './Admin/Customers';

// Styles


function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [cart, setCart] = useState([]);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const isAdminRoute = window.location.pathname.startsWith('/admin');

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      {/* Display Login Signup Modal */}
      {showLogin && <LoginSignup setShowLogin={setShowLogin} />}

      {/* Display Navbar and Footer only for non-admin routes */}
      {!isAdminRoute && <Navbar setShowLogin={setShowLogin} cart={cart} />}
      
      <div className={isAdminRoute ? 'admin-container' :null}>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
          <Route path="/products" element={<Product cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/product/:productId" element={<Detail cart={cart} setCart={setCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} clearCart={() => setCart([])} />} />
          <Route path="/Jewerly" element={<Jewerly />} />
          <Route path="/WomenC" element={<WomenC />} />
          <Route path="/MenC" element={<MenC />} />
          
          {/* Admin Routes */}
          
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/add-product" element={<AddProductForm />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/list-products" element={<ListProducts />} />
          <Route path="/admin/orders" element={<ListOrders />} />
          <Route path="/admin/chart" element={<SalesChart />} />
         
        </Routes>
      </div>

      {!isAdminRoute && <Footer />}
    </Router>
  );
}

export default App;
