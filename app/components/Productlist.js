import React from 'react';
import '../error.css';


const ProductList = ({ addToOrder, products }) => {
  if (!products || !Array.isArray(products)) {
   
    return <div className="error-message">No products available.</div>;
  }

  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map((product, index) => (
          <div className="card" key={index} onClick={() => addToOrder(product)}>
            <div className="content">
              <div className="name">{product.name}</div>
              <div className="handle">{product.picture}</div>
              <div className="title">Price: ${product.price}</div>
            </div>
            <div className="dots orange-dots"></div>
            <div className="dots pink-dots"></div>
          </div>
        ))
      ) : (
        <div className="no-products">No products to display.</div>
      )}
    </div>
  );
};

export default ProductList;
