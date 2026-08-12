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
            Đang tải...
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
              <div className="productCard horizontal" key={item._id || item.id}>
                <div className="cardBgDecor"></div>
                <div className="productImage">
                  <img src={item.img || item.image} alt={item.name} onError={(e) => { e.target.src = '/images/espresso.png'; }} />
                </div>

                <div className="productInfo">
                  <div className="titleWrap">
                    <span className="leafIcon">🌿</span>
                    <h4>{item.name}</h4>
                  </div>

                  <div className="priceWrap">
                    <span className="sparkle left">✨</span>
                    <div className="price">{formatPrice(item.price)}</div>
                  </div>

                  <div className="productDesc">
                    <span className="descIcon">🌱</span> {item.desc}
                  </div>

                  <button className="orderBtn" onClick={() => addToCart(item)}>
                    <span className="cartIcon">🛒</span> Đặt ngay
                  </button>
                </div>
              </div>
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
