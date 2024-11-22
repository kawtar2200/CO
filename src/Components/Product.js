import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';

const Product = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; 

  useEffect(() => {
    fetch('http://localhost:3004/products')
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  const addItemToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const navigate = useNavigate();

  const datail = (product) => {
    console.log("Navigating to Detail with product:", product);
    navigate('/Detail', { state: { prod: product } });
  };

 
  const nextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={{marginBottom:"100px"}}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  <h1 style={{ marginTop: '20px', fontWeight: "bold", fontSize: "30px"  }}>
    Feature Products
  </h1>
  <div style={{ marginTop: '10px', borderBottom: '5px solid  rgb(79, 61, 39) ', width: '100px',marginBottom:"50px" }}></div>
</div>


      <div className='Products' style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', margin: '20px 59px' }}>
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} addItemToCart={addItemToCart} onClick={() => datail(product)} />
        ))}
      </div>
      <div className="pagination" style={{  display: "flex", justifyContent:'center', alignItems: "center" }}>
        <button onClick={prevPage} disabled={currentPage === 1} style={{ margin: '0 5px' }}>Previous</button>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(products.length / productsPerPage)} style={{ margin: '0 5px' }}>Next</button>
      </div>
    </div>
  );
};

export default Product;
