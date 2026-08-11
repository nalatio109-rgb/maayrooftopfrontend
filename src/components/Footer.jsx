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
        <p>🕘 7h-22h30</p>
        <p>Thứ 2 – Chủ nhật</p>
      </div>

      <div className="footerCol">
        <h3>KẾT NỐI VỚI CHÚNG TÔI</h3>
        <div className="socials">
          <a href="https://www.facebook.com/maayrooftop" target="_blank" rel="noopener noreferrer">f</a>
          <a href="https://www.tiktok.com/@maayrooftop.43?lang=vi-VN" target="_blank" rel="noopener noreferrer">♪</a>
          <a href="https://zalo.me/0917007777" target="_blank" rel="noopener noreferrer">Z</a>
        </div>
      </div>

      <div className="copyright">
        © 2026 MAAY COFFEE – ĐÀ NẴNG. Tất cả quyền được bảo lưu tại <a href="https://latio.vn/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>Latio</a>.
      </div>
    </footer>
  );
}

export default Footer;
