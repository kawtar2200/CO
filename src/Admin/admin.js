import React from 'react';
import Sidebar from './SideBar.js';
import Homes from './home.js';
import Headers from './Header';
import './admin.css';

const Admin = () => {
  return (
    <div className="grid-container ">
      <Headers />
      <Sidebar />
      
        <Homes />
      </div>
   
  );
};

export default Admin;
