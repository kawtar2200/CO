import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import './admin.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = () => {
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
    
    const groupedData = orders.reduce((acc, order) => {
      const date = new Date(order.date).toLocaleDateString(); 
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += order.totalAmount;
      return acc;
    }, {});

    // Convert grouped data into arrays for labels and sales amounts
    const dates = Object.keys(groupedData);
    const salesAmounts = Object.values(groupedData);

    setChartData({
      labels: dates,
      datasets: [
        {
          label: 'Sales Amount',
          data: salesAmounts,
          fill: true,
          borderColor: 'rgb(79, 61, 39)',
          backgroundColor: 'rgb(79, 61, 39)',
          tension: 0.4,
          pointBackgroundColor: '#fff',
          pointBorderColor: 'rgba(75, 192, 192, 1)',
          pointBorderWidth: 2,
          pointRadius: 4,
          borderWidth: 2,
        },
      ],
    });
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Arial, sans-serif',
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: $${context.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return `$${value}`;
          },
        },
        grid: {
          color: '#e5e5e5',
        },
      },
      x: {
        grid: {
          color: '#e5e5e5',
        },
      },
    },
    layout: {
      padding: 20,
    },
  };

  if (loading) {
    return <div>Loading sales data...</div>;
  }

  if (orders.length === 0) {
    return <div>No sales data available.</div>;
  }

  return (
    <div style={{ width: '70%', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Sales Overview</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SalesChart;
