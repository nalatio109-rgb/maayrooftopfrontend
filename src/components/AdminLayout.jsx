import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Coffee, ShoppingBag, MessageSquare, PlusCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/Admin.css';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const playTingSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1000, ctx.currentTime); 
    osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    console.log('Audio error:', e);
  }
};

export default function AdminLayout() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  useEffect(() => {
    const socket = io('http://localhost:5000');
    
    socket.on('new_order', (order) => {
      playTingSound();
      toast.success(`Đơn hàng mới từ ${order.customerName} - ${order.totalAmount.toLocaleString('vi-VN')}đ`, {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });

    socket.on('new_contact', (contact) => {
      playTingSound();
      toast.info(`Tin nhắn mới từ ${contact.name}`, {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-container">
      <ToastContainer />
      <aside className="admin-sidebar">
        <div className="admin-logo" onClick={() => navigate('/')} style={{ textAlign: 'center' }}>
          <img src="/images/logo-maay-black.png" alt="Maay Rooftop" style={{ width: '140px', objectFit: 'contain' }} />
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin" end className={({isActive}) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}>
            <LayoutDashboard size={20} />
            <span>Tổng quan</span>
          </NavLink>
          <NavLink to="/admin/products" className={({isActive}) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}>
            <Coffee size={20} />
            <span>Sản phẩm</span>
          </NavLink>
          <NavLink to="/admin/product/add" className={({isActive}) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}>
            <PlusCircle size={20} />
            <span>Thêm sản phẩm</span>
          </NavLink>
          <NavLink to="/admin/orders" className={({isActive}) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}>
            <ShoppingBag size={20} />
            <span>Đơn hàng</span>
          </NavLink>
          <NavLink to="/admin/contacts" className={({isActive}) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}>
            <MessageSquare size={20} />
            <span>Liên hệ</span>
          </NavLink>
        </nav>
        <div className="admin-logout" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Đăng xuất</span>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-user-info">
            <div className="avatar">{user?.name ? user.name.charAt(0).toUpperCase() : 'A'}</div>
            <span>{user?.name || 'Admin User'}</span>
          </div>
        </header>
        <div className="admin-content-wrap">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
