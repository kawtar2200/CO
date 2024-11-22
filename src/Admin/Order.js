import React, { useEffect, useState } from 'react';
import Headers from './Header';
import Sidebar from './SideBar';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import './admin.css';
import * as XLSX from 'xlsx'; 
import { useNavigate } from 'react-router-dom';

const ListOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3004/orders') 
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);

  const handleView = (id) => {
    const order = orders.find((ord) => ord.id === id);
    alert(`Order details: \n${JSON.stringify(order, null, 2)}`);
  };

  const handleEdit = (id) => {
    alert(`Edit functionality for order ${id} coming soon!`);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3004/orders/${id}`, {
      method: 'DELETE',
    }).then(() => setOrders(orders.filter((order) => order.id !== id)));
  };

  // Search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const filteredOrders = orders.filter((order) =>
    order.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(orders); 
    const wb = XLSX.utils.book_new(); 
    XLSX.utils.book_append_sheet(wb, ws, 'Orders'); 
    XLSX.writeFile(wb, 'orders_data.xlsx');
  };

  return (
    <div className="grid-container">
      <Headers />
      <Sidebar />
      <div className="main-container">
        <h2>Orders</h2>
        <div className="btn-add">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className='add-pro' onClick={exportToExcel}>
            Import Data to Excel
          </button>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Total Amount</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user.name}</td>
                <td>{order.totalAmount} $</td>
                <td>{order.user.phone}</td>
                <td>{order.user.address}</td>
                <td>
                  <FaEye
                    style={{ color: 'blue', marginLeft: '20px', cursor: 'pointer' }}
                    onClick={() => handleView(order.id)}
                  />
                  <FaEdit
                    style={{ color: 'gray', marginLeft: '20px', cursor: 'pointer' }}
                    onClick={() => handleEdit(order.id)}
                  />
                  <FaTrash
                    style={{ color: 'red', marginLeft: '20px', cursor: 'pointer' }}
                    onClick={() => handleDelete(order.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListOrders;
