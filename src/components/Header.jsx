import { Link } from 'react-router-dom'
import '../styles/Header.css'

const Header = () => {
  return (
    <header className="header header-bg">
      <div className="container header-content">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="Maay Rooftop Logo" className="logo-img" />
          <div className="logo-text-fallback">
            <div className="logo-text">maay</div>
            <div className="logo-subtext">— ROOFTOP —</div>
          </div>
        </Link>
        <nav className="nav-links">
          <Link to="/">Trang chủ</Link>
          <Link to="/cau-chuyen-thuong-hieu">Câu chuyện thương hiệu</Link>
          <Link to="/thuc-don">Thực đơn</Link>
          <Link to="/nhuong-quyen">Nhượng quyền</Link>
          <Link to="/cua-hang">Cửa hàng</Link>
          <Link to="/tin-tuc">Tin tức</Link>
          <Link to="/lien-he">Liên hệ</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
