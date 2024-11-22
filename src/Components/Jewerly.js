import React from 'react';

import Jewelry from './Jewelry.png'
const Jewerly = () => {
  return (
    <div
      className="home"
      style={{
        marginTop:'20px',
        marginTbottom:'-20px',
        backgroundImage: `url(${Jewelry})`,
        height: '55vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
     
      
    </div>
  )
}

export default Jewerly