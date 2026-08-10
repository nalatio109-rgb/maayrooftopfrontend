import React from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card" style={{ backgroundColor: product.bgColor || '#fdf7e1' }}>
      
      {/* Decorative airplane doodles for the card background */}
      <div className="doodle-plane top-right">✈️</div>
      <div className="doodle-star bottom-left">✨</div>

      <div className="product-image-container">
        {/* Placeholder for top-down coffee image */}
        <div className="coffee-cup-placeholder">
          <div className="coffee-inner"></div>
        </div>
      </div>
      
      <h3 className="product-name">{product.name}</h3>
      
      {/* Yellow ticket for price */}
      <div className="price-ticket">
        <div className="ticket-info">
          <span className="ticket-label">MAAY AIRLINES</span>
          <div className="ticket-route">
            <div className="route-from">
              <span>FROM</span>
              <strong>DA NANG</strong>
            </div>
            <span className="route-icon">✈️</span>
            <div className="route-price">
              <strong>{product.price}</strong>
            </div>
          </div>
        </div>
        <div className="ticket-barcode">
          <div className="barcode-lines"></div>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
