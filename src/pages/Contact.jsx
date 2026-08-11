import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contactInfo || !formData.message) {
      toast.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    setLoading(true);
    try {
      await axios.post(import.meta.env.VITE_API_URL.replace(/\/+$/, '') + '/api/contacts', formData);
      toast.success('Gửi lời nhắn thành công! Chúng tôi sẽ sớm liên hệ với bạn.');
      setFormData({ name: '', contactInfo: '', message: '' });
    } catch (error) {
      console.error('Lỗi khi gửi liên hệ:', error);
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="contact-wrap">
      <section className="contact-card">
        <ToastContainer />
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-title">
              <h1>Liên Hệ Với Chúng Tôi</h1>
              <p>
                Maay Rooftop Coffee luôn lắng nghe và trân trọng mọi ý kiến đóng góp từ bạn.
                Hãy liên hệ với chúng tôi qua các kênh dưới đây hoặc để lại lời nhắn nhé!
              </p>
            </div>

            <div className="contact-info-list">
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="info-text">
                  <h3>Địa Chỉ</h3>
                  <p>146 - 147 Lê Duy Đình, Đà Nẵng</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div className="info-text">
                  <h3>Hotline</h3>
                  <p>091 700 77 77</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div className="info-text">
                  <h3>Giờ Mở Cửa</h3>
                  <p>07:00 - 22:30 (Mỗi ngày)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <div className="contact-form-box">
              <h2>Gửi Lời Nhắn</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Họ và Tên</label>
                  <input type="text" id="name" placeholder="Ví dụ: Nguyễn Văn A" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="contactInfo">Số điện thoại / Email</label>
                  <input type="text" id="contactInfo" placeholder="Để chúng tôi có thể liên lạc với bạn" value={formData.contactInfo} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Lời Nhắn</label>
                  <textarea id="message" placeholder="Bạn muốn chia sẻ điều gì với Maay..." value={formData.message} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Đang gửi...' : 'Gửi Cho Chúng Tôi →'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
