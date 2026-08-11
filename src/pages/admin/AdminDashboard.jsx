import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, MessageSquare, Clock, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dismissedIds, setDismissedIds] = useState(() => {
    return JSON.parse(localStorage.getItem('dismissedDashboardIds') || '[]');
  });
  const navigate = useNavigate();

  const handleDismiss = (id) => {
    const newDismissed = [...dismissedIds, id];
    setDismissedIds(newDismissed);
    localStorage.setItem('dismissedDashboardIds', JSON.stringify(newDismissed));
    
    // Ẩn ngay lập tức khỏi giao diện
    setRecentOrders(prev => prev.filter(order => order._id !== id));
    setRecentContacts(prev => prev.filter(contact => contact._id !== id));
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [ordersRes, contactsRes] = await Promise.all([
          axios.get(import.meta.env.VITE_API_URL.replace(/\/+$/, '') + '/api/orders'),
          axios.get(import.meta.env.VITE_API_URL.replace(/\/+$/, '') + '/api/contacts')
        ]);
        
        const today = new Date().toDateString();
        
        // Lọc những dữ liệu trong ngày hôm nay và chưa bị ẩn
        const todayOrders = ordersRes.data.filter(order => 
          new Date(order.createdAt).toDateString() === today && !dismissedIds.includes(order._id)
        );
        const todayContacts = contactsRes.data.filter(contact => 
          new Date(contact.createdAt).toDateString() === today && !dismissedIds.includes(contact._id)
        );
        
        setRecentOrders(todayOrders);
        setRecentContacts(todayContacts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <h1>Tổng Quan</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '20px' }}>
        {recentOrders.length === 0 && recentContacts.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 40px', background: 'white', borderRadius: '20px', color: '#1a3a29', border: '1px solid #e0ede5', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)' }}>
            <div style={{ width: '80px', height: '80px', background: '#eef7f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
              <Check size={40} color="#1a3a29" />
            </div>
            <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Tuyệt vời!</h2>
            <p style={{ color: '#555', fontSize: '16px' }}>Bạn đã xử lý xong tất cả thông báo của ngày hôm nay.</p>
          </div>
        )}

        {/* Đơn hàng mới nhất */}
        {recentOrders.length > 0 && (
          <div className="admin-table-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0, fontSize: '20px', color: '#1a3a29' }}>
                <ShoppingBag size={24} color="#f5a623" /> Đơn hàng gần đây
              </h2>
              <button className="admin-btn secondary" onClick={() => navigate('/admin/orders')} style={{ padding: '6px 12px', fontSize: '14px' }}>
                Xem tất cả
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {recentOrders.map(order => (
                <div key={order._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#fdfbf7', borderRadius: '12px', border: '1px solid #e0ede5' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#1a3a29', marginBottom: '5px' }}>
                      {order.customerName} - {order.phone}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#666' }}>
                      <Clock size={14} /> {new Date(order.createdAt).toLocaleString('vi-VN')}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <div style={{ fontWeight: 'bold', color: '#f5a623' }}>
                      {order.totalAmount.toLocaleString('vi-VN')}đ
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span className={`status-badge ${order.status === 'pending' ? 'new' : 'completed'}`} style={{ fontSize: '11px', padding: '4px 8px' }}>
                        {order.status === 'pending' ? 'Mới' : 'Hoàn thành'}
                      </span>
                      <button 
                        onClick={() => handleDismiss(order._id)}
                        style={{ background: '#e0ede5', color: '#1a3a29', border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
                        <Check size={12} /> Đã nhận
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Liên hệ mới nhất */}
        {recentContacts.length > 0 && (
          <div className="admin-table-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0, fontSize: '20px', color: '#1a3a29' }}>
                <MessageSquare size={24} color="#f5a623" /> Liên hệ gần đây
              </h2>
              <button className="admin-btn secondary" onClick={() => navigate('/admin/contacts')} style={{ padding: '6px 12px', fontSize: '14px' }}>
                Xem tất cả
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {recentContacts.map(contact => (
                <div key={contact._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#fdfbf7', borderRadius: '12px', border: '1px solid #e0ede5' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#1a3a29', marginBottom: '5px' }}>
                      {contact.name}
                    </div>
                    <div style={{ fontSize: '14px', color: '#444', marginBottom: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                      {contact.message}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#666' }}>
                      <Clock size={14} /> {new Date(contact.createdAt).toLocaleString('vi-VN')}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <span className={`status-badge ${contact.status === 'Chưa đọc' ? 'new' : 'completed'}`} style={{ fontSize: '11px', padding: '4px 8px' }}>
                      {contact.status}
                    </span>
                    <button 
                      onClick={() => handleDismiss(contact._id)}
                      style={{ background: '#e0ede5', color: '#1a3a29', border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
                      <Check size={12} /> Đã nhận
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
