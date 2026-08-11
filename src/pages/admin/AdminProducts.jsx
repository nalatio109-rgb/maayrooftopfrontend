import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', price: '', category: '', desc: '', status: '' });
  const [editImageFile, setEditImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProducts = () => {
    setLoading(true);
    fetch(import.meta.env.VITE_API_URL + '/api/menu')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/menu/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
      } else {
        alert('Lỗi khi xóa sản phẩm');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối máy chủ');
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditFormData({
      name: product.name,
      price: product.price.toString().replace('K', ''),
      category: product.category,
      desc: product.desc || '',
      status: product.status || 'Còn hàng'
    });
    setEditImageFile(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append('name', editFormData.name);
      data.append('price', editFormData.price);
      data.append('category', editFormData.category);
      data.append('desc', editFormData.desc);
      data.append('status', editFormData.status);
      if (editImageFile) {
        data.append('image', editImageFile);
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/menu/${editingProduct._id}`, {
        method: 'PUT',
        body: data
      });

      if (res.ok) {
        const updatedProduct = await res.json();
        setProducts(products.map(p => p._id === updatedProduct._id ? updatedProduct : p));
        setEditingProduct(null);
      } else {
        alert('Lỗi khi cập nhật sản phẩm');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối máy chủ');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Quản lý Sản phẩm</h1>
        <Link to="/admin/product/add" className="admin-btn">
          <Plus size={18} /> Thêm Sản phẩm
        </Link>
      </div>

      <div className="admin-table-card">
        {loading ? (
          <p style={{ padding: '20px', textAlign: 'center' }}>Đang tải dữ liệu...</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên Sản phẩm</th>
                <th>Danh mục</th>
                <th>Giá (VNĐ)</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id || p.id || Math.random()}>
                  <td>#{p.customId || p.id || '...'}</td>
                  <td><strong>{p.name}</strong></td>
                  <td>{p.category}</td>
                  <td>{p.price}</td>
                  <td>
                    <span className={`status-badge ${p.status === 'Hết hàng' ? 'pending' : 'completed'}`}>
                      {p.status || 'Còn hàng'}
                    </span>
                  </td>
                  <td>
                    <div className="admin-action-icons">
                      <Edit2 
                        size={18} 
                        className="action-icon edit" 
                        title="Sửa" 
                        onClick={() => handleEditClick(p)} 
                      />
                      <Trash2 
                        size={18} 
                        className="action-icon delete" 
                        title="Xóa" 
                        onClick={() => handleDelete(p._id)} 
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.5)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff', width: '90%', maxWidth: '500px', borderRadius: '16px', 
            padding: '25px', position: 'relative', maxHeight: '90vh', overflowY: 'auto'
          }}>
            <button 
              onClick={() => setEditingProduct(null)}
              style={{
                position: 'absolute', top: '15px', right: '15px', 
                background: 'none', border: 'none', cursor: 'pointer', color: '#555'
              }}
            >
              <X size={24} />
            </button>
            
            <h2 style={{marginTop: 0, color: '#1a3a29', borderBottom: '1px solid #eee', paddingBottom: '15px'}}>
              Sửa Sản Phẩm: {editingProduct.name}
            </h2>
            
            <form onSubmit={handleEditSubmit} className="checkout-form" style={{marginTop: '20px'}}>
              <div className="form-group" style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold'}}>Tên sản phẩm</label>
                <input 
                  type="text" 
                  value={editFormData.name} 
                  onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                  required 
                  style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd'}}
                />
              </div>
              
              <div className="form-group" style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold'}}>Giá (vd: 39)</label>
                <input 
                  type="number" 
                  value={editFormData.price} 
                  onChange={(e) => setEditFormData({...editFormData, price: e.target.value})}
                  required 
                  style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd'}}
                />
              </div>

              <div className="form-group" style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold'}}>Danh mục</label>
                <select 
                  value={editFormData.category}
                  onChange={(e) => setEditFormData({...editFormData, category: e.target.value})}
                  required
                  style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd'}}
                >
                  <option value="Trà Sữa Nguyên Bản">Trà Sữa Nguyên Bản</option>
                  <option value="Trà Sữa Đặc Sản">Trà Sữa Đặc Sản</option>
                  <option value="Matcha">Matcha</option>
                  <option value="Trà Hoa Quả">Trà Hoa Quả</option>
                  <option value="Cà Phê">Cà Phê</option>
                  <option value="Topping">Topping</option>
                  <option value="Coldbrew">Coldbrew</option>
                </select>
              </div>

              <div className="form-group" style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold'}}>Hình Ảnh (Bỏ trống nếu không đổi)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setEditImageFile(e.target.files[0])}
                  style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd'}}
                />
              </div>

              <div className="form-group" style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold'}}>Mô tả</label>
                <textarea 
                  value={editFormData.desc}
                  onChange={(e) => setEditFormData({...editFormData, desc: e.target.value})}
                  required
                  style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd'}}
                />
              </div>

              <div className="form-group" style={{marginBottom: '20px'}}>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold'}}>Trạng thái</label>
                <select 
                  value={editFormData.status}
                  onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                  style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd'}}
                >
                  <option value="Còn hàng">Còn hàng</option>
                  <option value="Hết hàng">Hết hàng</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                style={{
                  width: '100%', padding: '12px', background: '#1a3a29', color: '#fff', 
                  border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'
                }}
              >
                {isSubmitting ? 'Đang lưu...' : 'Lưu Thay Đổi'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
