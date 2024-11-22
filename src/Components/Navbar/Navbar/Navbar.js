import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import '../Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ setShowLogin,cart }) => {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0); 
  return (
    <nav className="navbar navbar-expand-lg bg-white fixed-top shadow-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">MerShop.</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/MenC">Men's clothing</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/WomenC">Women's clothing</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Jewerly ">Jewelery</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>

          <div className='icons'>
            <CiSearch style={{ color: 'black' }} />
            <Link to='/cart'>
            <div style={{ position: 'relative' }}>
            <IoCartOutline style={{ color: 'black' }} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-8px',
                    background: ' rgb(79, 61, 39)',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '5px 10px',
                    fontSize: '10px',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </div>
           
            </Link>
            <button className='nav-btn' onClick={() => setShowLogin(true)}>Signup</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
