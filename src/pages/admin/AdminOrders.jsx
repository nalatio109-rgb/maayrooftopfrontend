import React, { useState, useEffect } from 'react';
import { Eye, CheckCircle, X } from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_API_URL.replace(/\/+$/, '') + '/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleApprove = async (id) => {
    if (!window.confirm('Xác nhận duyệt đơn hàng này?')) return;
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL.replace(/\/+$/, '')}/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Hoàn thành' })
      });
      
      if (res.ok) {
        setOrders(orders.map(o => o._id === id ? { ...o, status: 'Hoàn thành' } : o));
      } else {
        alert('Có lỗi xảy ra khi duyệt đơn');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối');
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')} ${d.toLocaleDateString('vi-VN')}`;
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Quản lý Đơn Hàng</h1>
      </div>

      <div className="admin-table-card">
        {loading ? (
          <div style={{padding: '20px', textAlign: 'center'}}>Đang tải dữ liệu...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã Đơn</th>
                <th>Khách Hàng</th>
                <th>SĐT</th>
                <th>Thời Gian</th>
                <th>Tổng Tiền</th>
                <th>Trạng Thái</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>Chưa có đơn hàng nào</td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr key={o._id}>
                    <td><strong>{o._id.substring(o._id.length - 6).toUpperCase()}</strong></td>
                    <td>{o.customerName}</td>
                    <td>{o.phone}</td>
                    <td>{formatDate(o.createdAt)}</td>
                    <td style={{color: '#f5a623', fontWeight: 'bold'}}>{o.totalAmount.toLocaleString('vi-VN')}đ</td>
                    <td>
                      <span className={`status-badge ${
                        o.status === 'Mới' ? 'new' : 
                        o.status === 'Hoàn thành' ? 'completed' : 'pending'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                    <td>
                      <div className="admin-action-icons">
                        <Eye 
                          size={18} 
                          className="action-icon edit" 
                          title="Xem chi tiết" 
                          onClick={() => setSelectedOrder(o)}
                        />
                        {o.status === 'Mới' && (
                          <CheckCircle 
                            size={18} 
                            className="action-icon delete" 
                            style={{color: '#2e8b57'}} 
                            title="Duyệt đơn" 
                            onClick={() => handleApprove(o._id)}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.5)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff', width: '90%', maxWidth: '500px', borderRadius: '16px', 
            padding: '25px', position: 'relative'
          }}>
            <button 
              onClick={() => setSelectedOrder(null)}
              style={{
                position: 'absolute', top: '15px', right: '15px', 
                background: 'none', border: 'none', cursor: 'pointer', color: '#555'
              }}
            >
              <X size={24} />
            </button>
            
            <h2 style={{marginTop: 0, color: '#1a3a29', borderBottom: '1px solid #eee', paddingBottom: '15px'}}>
              Chi Tiết Đơn Hàng #{selectedOrder._id.substring(selectedOrder._id.length - 6).toUpperCase()}
            </h2>
            
            <div style={{margin: '20px 0'}}>
              <p><strong>Khách hàng:</strong> {selectedOrder.customerName}</p>
              <p><strong>SĐT:</strong> {selectedOrder.phone}</p>
              <p><strong>Ngày đặt:</strong> {formatDate(selectedOrder.createdAt)}</p>
              <p><strong>Ghi chú:</strong> <span style={{color: '#d32f2f'}}>{selectedOrder.note || 'Không có ghi chú'}</span></p>
            </div>
            
            <h3 style={{fontSize: '16px', color: '#1a3a29', marginBottom: '10px'}}>Danh sách món ({selectedOrder.items.length})</h3>
            <div style={{background: '#f9f9f9', borderRadius: '8px', padding: '15px', maxHeight: '200px', overflowY: 'auto'}}>
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '10px'}}>
                  <div>
                    <strong style={{display: 'block'}}>{item.name}</strong>
                    <span style={{fontSize: '13px', color: '#666'}}>Số lượng: {item.quantity}</span>
                  </div>
                  <strong style={{color: '#f5a623'}}>{Number(item.price).toLocaleString('vi-VN')}đ</strong>
                </div>
              ))}
            </div>
            
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '15px', borderTop: '2px solid #eee'}}>
              <strong style={{fontSize: '18px'}}>Tổng Cộng:</strong>
              <strong style={{fontSize: '22px', color: '#f5a623'}}>{selectedOrder.totalAmount.toLocaleString('vi-VN')}đ</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
