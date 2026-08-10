import React, { useState, useEffect } from "react";

function AirplaneIcon({ className = "", style = {} }) {
  return (
    <svg
      className={className}
      style={style}
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

function CloudIcon({ className = "", style = {} }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <path
        d="M73.5,33.5 A24,24 0 0,0 28,40.2 A16,16 0 1,0 32,71.5 H73.5 A19,19 0 0,0 73.5,33.5 Z"
        fill="white"
        opacity="0.9"
      />
    </svg>
  );
}

export default function HeroSection({ scrollToMenu }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = Math.max(1 - scrollY / 500, 0);

  return (
    <section className="hero-section">
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        background: `
          radial-gradient(ellipse at 50% 70%, #ffffff 0%, transparent 40%),
          radial-gradient(circle at 28% 20%, #fff59c 0, transparent 30%),
          radial-gradient(circle at 74% 17%, #c5ffff 0, transparent 35%),
          linear-gradient(110deg, #ffd632 0%, #fff194 42%, #4bd9e8 100%)
        `,
        opacity: opacity,
      }} />

      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        opacity: opacity * 0.16,
        backgroundImage: `
          radial-gradient(#ffffff 1px, transparent 1px),
          radial-gradient(#ffffff 1px, transparent 1px)
        `,
        backgroundPosition: '0 0, 16px 16px',
        backgroundSize: '32px 32px'
      }} />

      {/* Wavy top divider */}
      <div style={{ position: "absolute", top: "-1px", left: 0, width: "100%", overflow: "hidden", lineHeight: 0, zIndex: 1 }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: "relative", display: "block", width: "calc(100% + 1.3px)", height: "35px" }}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>

      <div className="sun-glow" />
      <div className="blue-glow" />

      {/* Wavy bottom divider */}
      <div style={{ position: "absolute", bottom: "-1px", left: 0, width: "100%", overflow: "hidden", lineHeight: 0, zIndex: 1, transform: "rotate(180deg)" }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: "relative", display: "block", width: "calc(100% + 1.3px)", height: "35px" }}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="var(--paper)"></path>
        </svg>
      </div>

      <div className="hero-inner">
        <CloudIcon className="cloud-left" style={{ position: "absolute", bottom: "-20px", left: "-2%", width: "160px", zIndex: 10 }} />
        <CloudIcon className="cloud-right" style={{ position: "absolute", bottom: "-20px", right: "-2%", width: "140px", zIndex: 10 }} />

        {/* Extra cloud like in screenshot */}
        <CloudIcon style={{ position: "absolute", top: "10%", right: "5%", width: "80px", opacity: 0.8 }} />

        {/* Top left plane and dash */}
        <AirplaneIcon className="plane" style={{ position: "absolute", top: "15%", left: "18%", width: "35px", transform: "rotate(-10deg)", color: "rgba(0,0,0,0.6)" }} />
        <svg style={{ position: "absolute", top: "17%", left: "10%", width: "60px", pointerEvents: "none" }} viewBox="0 0 100 20">
          <path d="M0 15 Q 50 15, 100 5" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="2" strokeDasharray="5 5" />
        </svg>

        {/* Top right plane and curved dash */}
        <AirplaneIcon className="plane" style={{ position: "absolute", top: "12%", right: "15%", width: "40px", transform: "rotate(30deg)", color: "#111" }} />
        <svg style={{ position: "absolute", top: "15%", right: "18%", width: "180px", pointerEvents: "none", zIndex: 1 }} viewBox="0 0 200 150">
          <path d="M10 140 Q 80 20, 190 10" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="2" strokeDasharray="5 5" />
        </svg>

        {/* Sparkles */}
        <div className="spark-decor" style={{ top: "30%", left: "10%", fontSize: "20px" }}>✧</div>
        <div className="spark-decor" style={{ top: "25%", left: "32%", fontSize: "24px", color: "rgba(0,0,0,0.8)" }}>✦</div>
        <div className="spark-decor" style={{ top: "35%", right: "20%", fontSize: "16px" }}>✧</div>

        {/* Right side sparkles around cup */}
        <div className="spark-decor" style={{ top: "50%", right: "8%", fontSize: "18px", transform: "rotate(15deg)" }}>\</div>
        <div className="spark-decor" style={{ top: "45%", right: "4%", fontSize: "18px", transform: "rotate(-15deg)" }}>/</div>
        <div className="spark-decor" style={{ top: "65%", right: "5%", fontSize: "18px", transform: "rotate(35deg)" }}>-</div>
        <div className="spark-decor" style={{ top: "60%", right: "10%", fontSize: "18px", transform: "rotate(-25deg)" }}>/</div>


        <div className="hand-note note-left" style={{ top: "18%", left: "8%" }}>
          Chill
          <br />
          trên mây
          <div className="note-underline"></div>
        </div>

        <div className="hand-note note-right" style={{ top: "25%", right: "3%" }}>
          Hẹn nhau
          <br />
          trên mái nhé!
          <div className="note-underline"></div>
        </div>

        <img
          src="/images/ly-ca-phe-nong.png"
          alt="Cà phê Maay"
          className="floating-cup hot-cup"
          style={{ width: "clamp(90px, 15vw, 130px)", top: "38%", left: "10%" }}
        />

        <img
          src="/images/ly-ca-phe-lanh.png"
          alt="Cold brew Maay"
          className="floating-cup cold-cup"
          style={{ width: "clamp(90px, 15vw, 130px)", top: "40%", right: "6%" }}
        />

        <div className="hero-content">
          <img
            src="/images/logo-maay-black.png"
            alt="Maay Rooftop Đà Nẵng"
            className="main-logo"
            style={{ width: "clamp(280px, 45vw, 450px)", marginBottom: "-45px" }}
          />

          <h1 style={{ position: "relative", display: "inline-block", margin: "5px 0" }}>
            CHÀO MỪNG <br /> ĐẾN VỚI <br /> MAAY COFFEE
            <svg style={{ position: "absolute", top: "-15px", right: "75px", width: "25px" }} viewBox="0 0 30 30">
              <path d="M5 25 L15 5 M15 25 L25 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </h1>

          <div style={{ position: "relative", display: "inline-block", margin: "2px 0 10px" }}>
            {/* Left dashes */}
            <svg style={{ position: "absolute", top: "2px", left: "-25px", width: "15px" }} viewBox="0 0 20 20">
              <path d="M15 0 L5 20 M20 5 L10 20" stroke="rgba(0,0,0,0.6)" strokeWidth="2" strokeLinecap="round" />
            </svg>

            <p className="hero-subtitle" style={{ margin: 0, position: "relative" }}>
              Mỗi ngụm là một chuyến bay
              {/* Subtitle curved underline */}
              <svg style={{ position: "absolute", bottom: "-12px", left: "-5%", width: "110%", height: "15px" }} viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 10 Q 50 20, 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </p>

            {/* Right dashes */}
            <svg style={{ position: "absolute", top: "-5px", right: "-25px", width: "15px" }} viewBox="0 0 20 20">
              <path d="M5 0 L15 20 M0 5 L10 20" stroke="rgba(0,0,0,0.6)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          
          <button className="primary-button" onClick={scrollToMenu}>
            Khám Phá Ngay <span>↓</span>
          </button>
        </div>
      </div>

      <div className="paper-wave" />
    </section>
  );
}
