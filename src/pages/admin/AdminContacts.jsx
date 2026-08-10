import React, { useState, useEffect } from 'react';
import { Mail, Trash2, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/contacts');
      setContacts(res.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Lỗi khi tải danh sách liên hệ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    
    const socket = io('http://localhost:5000');
    socket.on('new_contact', (newContact) => {
      setContacts(prev => [newContact, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa liên hệ này?')) {
      try {
        await axios.delete(`http://localhost:5000/api/contacts/${id}`);
        setContacts(contacts.filter(c => c._id !== id));
        toast.success('Xóa thành công!');
      } catch (error) {
        console.error('Error deleting contact:', error);
        toast.error('Lỗi khi xóa');
      }
    }
  };

  const handleMarkAsReplied = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/contacts/${id}/status`, { status: 'Đã phản hồi' });
      setContacts(contacts.map(c => c._id === id ? res.data : c));
      toast.success('Đã đánh dấu là đã phản hồi!');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Lỗi khi cập nhật trạng thái');
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Tin Nhắn Liên Hệ</h1>
      </div>

      <div className="admin-table-card">
        {loading ? (
          <p style={{ padding: '20px', textAlign: 'center' }}>Đang tải...</p>
        ) : contacts.length === 0 ? (
          <p style={{ padding: '20px', textAlign: 'center' }}>Chưa có tin nhắn liên hệ nào.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Khách Hàng</th>
                <th>Liên Hệ</th>
                <th>Lời Nhắn</th>
                <th>Ngày Gửi</th>
                <th>Trạng Thái</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c._id}>
                  <td><strong>{c.name}</strong></td>
                  <td>{c.contactInfo}</td>
                  <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={c.message}>
                    {c.message}
                  </td>
                  <td>{new Date(c.createdAt).toLocaleDateString('vi-VN')} {new Date(c.createdAt).toLocaleTimeString('vi-VN')}</td>
                  <td>
                    <span className={`status-badge ${c.status === 'Chưa đọc' ? 'new' : 'completed'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-action-icons">
                      {c.status === 'Chưa đọc' && (
                        <CheckCircle 
                          size={18} 
                          className="action-icon edit" 
                          title="Đánh dấu đã phản hồi" 
                          onClick={() => handleMarkAsReplied(c._id)}
                        />
                      )}
                      <Trash2 
                        size={18} 
                        className="action-icon delete" 
                        title="Xóa" 
                        onClick={() => handleDelete(c._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
