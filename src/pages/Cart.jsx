import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', note: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        customerName: formData.name,
        phone: formData.phone,
        note: formData.note,
        items: cart.map(item => ({
          name: item.name,
          price: item.price.toString(),
          quantity: item.quantity,
          image: item.img || item.image
        })),
        totalAmount: cartTotal
      };

      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        setSuccess(true);
        clearCart();
      } else {
        alert('Có lỗi xảy ra, vui lòng thử lại sau.');
      }
    } catch (err) {
      console.error('Order submission error:', err);
      alert('Lỗi kết nối đến máy chủ.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (priceStr) => {
    if (!priceStr) return '';
    let val = priceStr.toString().replace(/k/i, '').trim();
    if (!isNaN(val) && val !== '') {
      return Number(val).toLocaleString('vi-VN') + 'đ';
    }
    return priceStr;
  };

  if (success) {
    return (
      <div className="cart-page-success">
        <CheckCircle size={80} color="#2e8b57" />
        <h2>Đặt Hàng Thành Công!</h2>
        <p>Cảm ơn bạn đã tin tưởng. Nhân viên Maay sẽ liên hệ để xác nhận đơn hàng trong giây lát.</p>
        <Link to="/thuc-don" className="back-to-menu-btn">Quay lại Thực Đơn</Link>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      <div className="cart-page-header">
        <div className="header-overlay"></div>
        <h1>GIỎ HÀNG CỦA BẠN</h1>
      </div>

      <div className="cart-page-container">
        {cart.length === 0 ? (
          <div className="cart-empty-state">
            <img src="/images/espresso.png" alt="Empty Cart" className="empty-cart-img" />
            <h2>Giỏ hàng đang trống</h2>
            <p>Khám phá các món nước đặc trưng của Maay và chọn cho mình một ly thật ngon nhé!</p>
            <Link to="/thuc-don" className="browse-menu-btn">Khám phá thực đơn</Link>
          </div>
        ) : (
          <div className="cart-content-grid">
            {/* Left Column: Cart Items */}
            <div className="cart-items-section">
              <div className="cart-items-header">
                <h3>Chi tiết đơn hàng ({cart.length} món)</h3>
              </div>
              
              <div className="cart-items-list">
                {cart.map((item, index) => {
                  const uniqueKey = item._id || item.id || item.name;
                  return (
                    <div key={uniqueKey} className="cart-item-card">
                      <div className="item-image-wrapper">
                        <img src={item.img || item.image || '/images/espresso.png'} alt={item.name} />
                      </div>
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p className="item-category">{item.desc || 'Hương vị đậm đà'}</p>
                        <p className="item-price">{formatPrice(item.price)}</p>
                      </div>
                      <div className="item-actions">
                        <div className="qty-control">
                          <button type="button" onClick={() => updateQuantity(uniqueKey, item.quantity - 1)}><Minus size={16}/></button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(uniqueKey, item.quantity + 1)}><Plus size={16}/></button>
                        </div>
                        <button type="button" className="remove-item-btn" onClick={() => removeFromCart(uniqueKey)}>
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link to="/thuc-don" className="continue-shopping">
                <ArrowLeft size={16} /> Tiếp tục chọn món
              </Link>
            </div>

            {/* Right Column: Checkout Form */}
            <div className="checkout-section">
              <div className="checkout-card">
                <h3>Thông Tin Đặt Hàng</h3>
                <form onSubmit={handleSubmit} className="checkout-form">
                  <div className="form-group">
                    <label>Họ và Tên</label>
                    <input 
                      type="text" 
                      placeholder="Nhập tên của bạn" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Số Điện Thoại</label>
                    <input 
                      type="tel" 
                      placeholder="0912345678" 
                      required 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Ghi chú (Tùy chọn)</label>
                    <textarea 
                      rows="3" 
                      placeholder="Ghi chú thêm về món ăn (ví dụ: ít đá, ít đường...)"
                      value={formData.note}
                      onChange={(e) => setFormData({...formData, note: e.target.value})}
                    ></textarea>
                  </div>
                  
                  <div className="order-summary">
                    <div className="summary-row">
                      <span>Tạm tính</span>
                      <span>{cartTotal.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="summary-row">
                      <span>Phí giao hàng</span>
                      <span>Liên hệ</span>
                    </div>
                    <div className="summary-row total">
                      <span>Tổng cộng</span>
                      <span className="total-amount">{cartTotal.toLocaleString('vi-VN')}đ</span>
                    </div>
                  </div>

                  <button type="submit" className="place-order-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Đang Xử Lý...' : 'Xác Nhận Đặt Hàng'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
