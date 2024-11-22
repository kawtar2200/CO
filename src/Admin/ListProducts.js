import React, { useEffect, useState } from 'react';
import Headers from './Header';
import Sidebar from './SideBar';
import { FaPlusCircle, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import './admin.css';
import * as XLSX from 'xlsx'; 
import { useNavigate } from 'react-router-dom';

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3004/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleAddProduct = () => {
    navigate('/admin/add-product');
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3004/products/${id}`, {
      method: 'DELETE',
    }).then(() => setProducts(products.filter((product) => product.id !== id)));
  };

  const handleEdit = (id) => {
    alert(`Edit functionality for product ${id} coming soon!`);
  };

  const handleView = (id) => {
    const product = products.find((prod) => prod.id === id);
    alert(`Product details: \n${JSON.stringify(product, null, 2)}`);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(products); 
    const wb = XLSX.utils.book_new(); 
    XLSX.utils.book_append_sheet(wb, ws, 'Products'); 

    
    XLSX.writeFile(wb, 'users_data.xlsx');
  };

  return (
    <div className="grid-container">
      <Headers />
      <Sidebar />
      <div className="main-container">
        <div className="btn-add">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
          <button onClick={handleAddProduct} className='add-pro'  >
            <FaPlusCircle /> Add Product
          </button>
          <button   className='add-pro' 
          onClick={exportToExcel} 
        >
          Import Data to Excel
        </button>
        
        </div>

       
        

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <img src={product.image} className="img-pro" alt={product.title} />
                </td>
                <td>{product.title}</td>
                <td>{product.price} $</td>
                <td>{product.category}</td>
                <td>
                  <FaEye
                    style={{ color: 'blue', marginLeft: '20px', cursor: 'pointer' }}
                    onClick={() => handleView(product.id)}
                  />
                  <FaEdit
                    style={{ color: 'gray', marginLeft: '20px', cursor: 'pointer' }}
                    onClick={() => handleEdit(product.id)}
                  />
                  <FaTrash
                    style={{ color: 'red', marginLeft: '20px', cursor: 'pointer' }}
                    onClick={() => handleDelete(product.id)}
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

export default ListProducts;
