import React from 'react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="heroOverlay"></div>

      <div className="heroContent">
        <div className="heroText">
          <h1>
            CHÀO MỪNG <br />
            ĐẾN VỚI <br />
            MAAY COFFEE
          </h1>

          <p className="slogan">Thơm Ngon – Đậm Vị – Giá Siêu Hời</p>

          <div className="heroBenefits">
            <div>
              <span>🌱</span>
              <p>Nguyên liệu tươi ngon</p>
            </div>
            <div>
              <span>🧋</span>
              <p>Công thức độc quyền</p>
            </div>
            <div>
              <span>❤️</span>
              <p>Phục vụ từ trái tim</p>
            </div>
          </div>

          <button className="mainBtn">Khám Phá Ngay →</button>
        </div>


      </div>
    </section>
  );
}
