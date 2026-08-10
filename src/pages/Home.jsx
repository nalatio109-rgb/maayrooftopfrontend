import React from "react";
import "./maay-landing.css";
import HeroSection from "../components/HeroSection";

const menuItems = [
  {
    id: 1,
    name: "Bạc Xỉu Mây",
    price: "45.000đ",
    image: "/images/bac-xiu-may.png",
    route: "MAAY AIRLINES",
  },
  {
    id: 2,
    name: "Espresso Đà Nẵng",
    price: "35.000đ",
    image: "/images/espresso.png",
    route: "MAAY AIRLINES",
  },
  {
    id: 3,
    name: "Cold Brew Hoàng Hôn",
    price: "55.000đ",
    image: "/images/cold-brew.png",
    route: "MAAY AIRLINES",
  },
];

function AirplaneIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <path
        d="M58 8 35 27 15 20l-5 5 16 12-9 11 6 3 13-9 10 14 5-3-6-20L61 13c3-4 1-8-3-5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MenuCard({ item }) {
  return (
    <article className="menu-card">
      <div className="menu-image-wrap">
        <img src={item.image} alt={item.name} className="menu-image" />
        <span className="spark spark-one">✦</span>
        <span className="spark spark-two">♡</span>
      </div>

      <h3>{item.name}</h3>

      <div className="ticket">
        <div className="ticket-info">
          <span>{item.route}</span>
          <strong>
            FROM
            <br />
            DA NANG
          </strong>
        </div>

        <div className="ticket-plane">
          <AirplaneIcon />
        </div>

        <div className="ticket-price">{item.price}</div>
      </div>
    </article>
  );
}

export default function MaayLanding() {
  const scrollToMenu = () => {
    document
      .getElementById("menu")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="maay-page">
      <HeroSection scrollToMenu={scrollToMenu} />

      <section className="menu-section" id="menu">
        <div className="menu-heading">
          <span>MENU CỦA MAAY</span>
          <AirplaneIcon />
        </div>

        <div className="menu-grid">
          {menuItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="rooftop-section">
        <div className="light-string" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>

        <div className="rooftop-image">
          <img
            src="/images/view-rooftop-da-nang.jpg"
            alt="View thành phố Đà Nẵng từ Maay Rooftop"
          />
        </div>

        <div className="rooftop-content">
          <span className="quote-mark">“</span>

          <h2>
            Ngồi trên mái nhà,
            <br />
            nhâm nhi và ngắm
            <br />
            thành phố
          </h2>

          <button className="order-button">
            ORDER NOW <span>→</span>
          </button>

          <span className="heart-line">♡</span>
          <span className="small-cloud">☁</span>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">
          <img
            src="/images/logo-maay-white.png"
            alt="Maay Rooftop"
          />
        </div>

        <p className="footer-slogan">
          Cà phê ngon
          <br />
          view xịn
          <br />
          chill hết mình!
        </p>

        <div className="footer-social">
          <span>KẾT NỐI VỚI MAAY</span>

          <div className="social-list">
            <a href="/" aria-label="Facebook">
              f
            </a>
            <a href="/" aria-label="Instagram">
              ◎
            </a>
            <a href="/" aria-label="TikTok">
              ♪
            </a>
            <a href="/" aria-label="Địa điểm">
              ●
            </a>
          </div>

          <small>— ROOFTOP · ĐÀ NẴNG —</small>
        </div>
      </footer>
    </main>
  );
}
