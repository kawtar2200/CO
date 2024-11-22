import React, { useEffect, useState } from 'react';
import Headers from './Header';
import Sidebar from './SideBar';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import './admin.css';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx'; // Import xlsx library

const Customers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3004/users') 
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);

  const handleView = (id) => {
    const user = users.find((use) => use.id === id);
    alert(`User details: \n${JSON.stringify(user, null, 2)}`);
  };

  const handleEdit = (id) => {
    alert(`Edit functionality for order ${id} coming soon!`);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3004/users/${id}`, {
      method: 'DELETE',
    }).then(() => setUsers(users.filter((user) => user.id !== id)));
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(users); 
    const wb = XLSX.utils.book_new(); 
    XLSX.utils.book_append_sheet(wb, ws, 'Users'); 

    
    XLSX.writeFile(wb, 'users_data.xlsx');
  };

  return (
    <div className="grid-container">
      <Headers />
      <Sidebar />
      <div className="main-container">
        <h2>Users</h2>
        <button 
          onClick={exportToExcel} 
          style={{
            marginBottom: '20px', 
            padding: '10px 20px', 
            backgroundColor: 'black', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer'
          }}
        >
          Import Data to Excel
        </button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.address}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <FaEye
                    style={{ color: 'blue', marginLeft: '20px', cursor: 'pointer' }}
                    onClick={() => handleView(user.id)}
                  />
                  <FaEdit
                    style={{ color: 'gray', marginLeft: '20px', cursor: 'pointer' }}
                    onClick={() => handleEdit(user.id)}
                  />
                  <FaTrash
                    style={{ color: 'red', marginLeft: '20px', cursor: 'pointer' }}
                    onClick={() => handleDelete(user.id)}
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

export default Customers;
