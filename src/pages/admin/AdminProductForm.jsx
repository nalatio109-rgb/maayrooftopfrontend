import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Save, X } from 'lucide-react';

export default function AdminProductForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    desc: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('desc', formData.desc);
      if (imageFile) {
        data.append('image', imageFile);
      }

      const response = await fetch(import.meta.env.VITE_API_URL + '/api/menu', {
        method: 'POST',
        body: data // fetch automatically sets the correct Content-Type with boundary for FormData
      });

      if (response.ok) {
        alert('Đã lưu sản phẩm thành công!');
        navigate('/admin/products');
      } else {
        alert('Có lỗi xảy ra khi lưu sản phẩm.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Không thể kết nối đến máy chủ.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Thêm Sản Phẩm Mới</h1>
      </div>

      <div className="admin-form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên Sản Phẩm</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control" 
              placeholder="Nhập tên sản phẩm..." 
              required 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="form-group">
              <label>Giá (VNĐ)</label>
              <input 
                type="number" 
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-control" 
                placeholder="Ví dụ: 39" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Danh Mục</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-control" 
                required
              >
                <option value="">-- Chọn danh mục --</option>
                <option value="Trà Sữa Nguyên Bản">Trà sữa nguyên bản</option>
                <option value="Trà Sữa Đặc Sản">Trà sữa đặc sản</option>
                <option value="Matcha">Matcha</option>
                <option value="Trà Hoa Quả">Trà hoa quả</option>
                <option value="Cafes">Cafes</option>
                <option value="Topping">Topping</option>
                <option value="Coldbrew">Coldbrew</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Hình Ảnh (Tải lên từ máy tính)</label>
            <input 
              type="file" 
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="form-control" 
            />
          </div>

          <div className="form-group">
            <label>Mô tả ngắn</label>
            <textarea 
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className="form-control" 
              placeholder="Nhập mô tả sản phẩm..."
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="admin-btn" disabled={isSubmitting}>
              <Save size={18} /> {isSubmitting ? 'Đang lưu...' : 'Lưu Sản Phẩm'}
            </button>
            <Link to="/admin/products" className="admin-btn secondary">
              <X size={18} /> Hủy Bỏ
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
