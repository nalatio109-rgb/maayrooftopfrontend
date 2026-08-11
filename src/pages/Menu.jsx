import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Menu.css';

const categories = ["Tất Cả", "Trà Sữa Nguyên Bản", "Trà Sữa Đặc Sản", "Matcha", "Trà Hoa Quả", "Cà Phê", "Topping", "Coldbrew"];

export default function Menu() {
  const [activeTab, setActiveTab] = useState("Tất Cả");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL.replace(/\/+$/, '') + '/api/menu');
        const data = await res.json();
        setMenuItems(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch menu", err);
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredItems = activeTab === "Tất Cả" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeTab);

  return (
    <div className="menu-page-light">
      <div className="menu-header-light">
        <div className="header-bg-overlay"></div>
        
        <div className="stamp-badge">
          <img src="/images/logo-maay-black.png" alt="Maay Rooftop" className="badge-logo" />
        </div>

        <div className="header-content-light">
          <h1 className="main-title">THỰC ĐƠN</h1>
          <h2 className="sub-title">Khám Phá Hương Vị Đặc Trưng</h2>
          
          <div className="divider-wrapper">
            <div className="divider-line-gold"></div>
            <svg className="airplane-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f5a623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </div>

          <div className="category-tabs">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`tab-btn ${activeTab === cat ? 'active' : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section className="menu-grid-light">
        {loading ? (
          <div style={{ color: '#1a3a29', gridColumn: '1 / -1', textAlign: 'center', fontSize: '20px', padding: '50px' }}>
            Đang tải thực đơn từ máy chủ...
          </div>
        ) : (
          filteredItems.map(item => {
            const formatPrice = (priceStr) => {
              if (!priceStr) return '';
              let val = priceStr.toString().replace(/k/i, '').trim();
              if (!isNaN(val) && val !== '') {
                return Number(val).toLocaleString('vi-VN') + 'đ';
              }
              return priceStr;
            };

            return (
              <article className="product-card-light" key={item._id || item.id}>
                <div className="product-img-wrap">
                  <img src={item.img || item.image} alt={item.name} onError={(e) => { e.target.src = '/images/espresso.png'; }} />
                </div>
                <div className="product-info-area">
                  <h3 className="product-name">
                    <span role="img" aria-label="leaf" style={{fontSize: '14px', marginBottom: '2px', marginRight: '4px'}}>🌿</span>
                    {item.name}
                  </h3>
                  
                  <div className="product-price-wrap">
                    <span role="img" aria-label="sparkle" style={{fontSize: '18px', marginRight: '4px'}}>✨</span>
                    <div className="product-price">{formatPrice(item.price)}</div>
                  </div>

                  <div className="product-desc-pill">
                    <span role="img" aria-label="plant" style={{fontSize: '12px', marginRight: '4px'}}>🌱</span>
                    <span className="product-desc-text">{item.desc}</span>
                  </div>

                  <button 
                    className="order-btn-icon" 
                    onClick={() => addToCart(item)} 
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    Đặt ngay
                  </button>
                </div>
              </article>
            );
          })
        )}
      </section>

      {/* Bottom Banner with Wave */}
      <div className="menu-footer-banner">
        <svg className="wave-divider" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 C320,120 420,0 720,60 C1020,120 1120,0 1440,60 L1440,120 L0,120 Z" fill="#1a3a29"></path>
        </svg>
        <div className="banner-content">
          <span className="banner-logo">Maay Rooftop</span>
          <span className="banner-text">— Thơm Ngon · Đậm Vị · Giá Siêu Hời</span>
        </div>
      </div>
    </div>
  );
}
