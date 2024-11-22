import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import './admin.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

const CategoryPieChart = () => {
  const [orders, setOrders] = useState([]);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3004/orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
          prepareChartData(data);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);


  const prepareChartData = (orders) => {
    const categoryTotals = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!categoryTotals[item.category]) {
          categoryTotals[item.category] = 0;
        }
        categoryTotals[item.category] += item.price * item.quantity ;
      });
    });

    setChartData({
      labels: Object.keys(categoryTotals), 
      datasets: [
        {
          data: Object.values(categoryTotals), 
          backgroundColor: ['#92705F', '#625D5D', '#FFCE56', '#8BC34A', '#FF5722'], // Pie slice colors
          hoverBackgroundColor: ['#FF6384AA', '#36A2EBAA', '#FFCE56AA', '#8BC34AAA', '#FF5722AA'],
        },
      ],
    });
  };

  
  if (loading) {
    return <div>Loading sales data...</div>;
  }

  if (orders.length === 0) {
    return <div>No sales data available.</div>;
  }

  return (
    <div style={{ width: '60%', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Sales by Category</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default CategoryPieChart;
