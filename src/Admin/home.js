import React, { useEffect, useState } from 'react';
import './admin.css';
import { BsFillArchiveFill,BsCart3, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import Chart from './chart';
import Pie from './pie';

const Home = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    customers: 0,
    orders: 0,
  });

 
  useEffect(() => {
    const fetchStats = async () => {
      try {
        
        const productsResponse = await fetch('http://localhost:3004/products');
        const productsData = await productsResponse.json();

       
        const ordersResponse = await fetch('http://localhost:3004/orders');
        const ordersData = await ordersResponse.json();

        const categoriesSet = new Set(productsData.map((product) => product.category));
        const customersCount = 33; 

        setStats({
          products: productsData.length,
          categories: categoriesSet.size,
          customers: customersCount, 
          orders: ordersData.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h4>Products</h4>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{stats.products}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h4>Categories</h4>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>{stats.categories}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h4>Customers</h4>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{stats.customers}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h4>Orders</h4>
            <BsCart3 className='card_icon' />
          </div>
          <h1>{stats.orders}</h1>
        </div>
      </div>

      <div className='charts'>
        <Chart className="chart" />
        <Pie className="pie" />
      </div>
    </div>
  );
};

export default Home;
