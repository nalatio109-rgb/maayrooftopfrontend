import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';

const menuItems = [
  { name: "Trang Chủ", path: "/" },
  { name: "Menu", path: "/thuc-don" },
  { name: "Giới Thiệu", path: "/gioi-thieu" },
  { name: "Liên Hệ", path: "/lien-he" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !isScrolled;

  return (
    <header className={`custom-navbar ${isScrolled ? 'scrolled' : ''} ${isTransparent ? 'transparent' : ''}`}>
      <div className="navbar-logo">
        <img src="/images/logo-maay-black.png" alt="Maay Rooftop" />
      </div>

      {/* Desktop Links */}
      <nav className="navbar-links">
        {menuItems.map((item, index) => (
          <Link to={item.path} key={index} className="nav-item">
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Links Dropdown */}
      <div className={`mobile-menu-dropdown ${isMobileMenuOpen ? 'open' : ''}`}>
        {menuItems.map((item, index) => (
          <Link to={item.path} key={index} className="mobile-nav-item">
            {item.name}
          </Link>
        ))}
      </div>

      <div className="navbar-actions" style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
        
        {/* Hamburger Icon for Mobile */}
        <button 
          className={`hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="bar" style={{background: isTransparent && !isMobileMenuOpen ? '#fff' : '#1a3a29'}}></span>
          <span className="bar" style={{background: isTransparent && !isMobileMenuOpen ? '#fff' : '#1a3a29'}}></span>
          <span className="bar" style={{background: isTransparent && !isMobileMenuOpen ? '#fff' : '#1a3a29'}}></span>
        </button>

        <Link to="/gio-hang" className="cart-icon-container" style={{position: 'relative', cursor: 'pointer', padding: '5px', textDecoration: 'none'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: isTransparent ? '#fff' : '#1a3a29'}}>
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {cartCount > 0 && (
            <span style={{position: 'absolute', top: '0', right: '-5px', background: '#f5a623', color: '#1a3a29', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '11px', fontWeight: 'bold'}}>
              {cartCount}
            </span>
          )}
        </Link>

        {isAuthenticated ? (
          <div className="navbar-user-info" ref={dropdownRef} onClick={() => setShowDropdown(!showDropdown)}>
            <span className="user-greeting">
              Xin chào, {user?.name}
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '5px', color: isTransparent ? '#fff' : '#1a3a29', transition: 'transform 0.2s', transform: showDropdown ? 'rotate(180deg)' : 'rotate(0)'}}>
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            
            {showDropdown && (
              <div className="user-dropdown">
                <button className="dropdown-logout-btn" onClick={(e) => { e.stopPropagation(); logout(); }}>
                  Đăng Xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="navbar-user-info" ref={dropdownRef} onClick={() => setShowDropdown(!showDropdown)} style={{ padding: '8px 12px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: isTransparent ? '#fff' : '#1a3a29'}}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            
            {showDropdown && (
              <div className="user-dropdown">
                <Link to="/login" className="dropdown-logout-btn" style={{color: '#1a3a29', textDecoration: 'none'}}>
                  Đăng Nhập
                </Link>
                <Link to="/register" className="dropdown-logout-btn" style={{color: '#1a3a29', textDecoration: 'none', borderTop: '1px solid #eee', borderRadius: '0 0 8px 8px'}}>
                  Đăng Ký
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
