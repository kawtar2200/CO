import React from 'react';
import Product from '../Product';
import home from './home.png'
import image from './image.jpg'; // Assure-toi que le chemin est correct

const Header = () => {
  return (
    <div
      className="header"
      style={{
        backgroundImage: `url(${home})`,
        height: '90vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
     
      
    </div>
  );
};

export default Header;
