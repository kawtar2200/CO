import React from 'react'
import Header from './Header/Header'
import Product from './Product'
import { Footer } from './Footer'

const Home = ({ cart, setCart }) => {
  return (
    <div>
      <Header />
      <Product cart={cart} setCart={setCart} />  
    </div>
  );
};

export default Home;
