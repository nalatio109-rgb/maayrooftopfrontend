import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footerLogo">
        <img src="/images/logo-maay-black.png" alt="Maay Coffee Rooftop Logo" style={{ width: '150px', objectFit: 'contain' }} />
      </div>

      <div className="footerCol">
        <h3>MAAY COFFEE – ĐÀ NẴNG</h3>
        <p>📍 146-148 Lê Duy Đình, Đà Nẵng</p>
        <p>📞 091 700 77 77</p>
        <p>✉️ info@maaycoffee.vn</p>
      </div>

      <div className="footerCol">
        <h3>GIỜ MỞ CỬA</h3>
        <p>🕘 17:00 – 24:00</p>
        <p>Thứ 2 – Chủ nhật</p>
      </div>

      <div className="footerCol">
        <h3>KẾT NỐI VỚI CHÚNG TÔI</h3>
        <div className="socials">
          <a href="#">f</a>
          <a href="#">◎</a>
          <a href="#">♪</a>
          <a href="#">Z</a>
        </div>
      </div>

      <div className="copyright">
        © 2026 MAAY COFFEE – ĐÀ NẴNG. Tất cả quyền được bảo lưu tại <a href="https://latio.vn/" target="_blank" rel="noopener noreferrer">Latio</a>.
      </div>
    </footer>
  );
}

export default Footer;
