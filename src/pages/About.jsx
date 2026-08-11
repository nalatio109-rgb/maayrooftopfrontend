import "../styles/About.css";

const benefits = [
  {
    icon: "cup",
    title: "Nguyên Liệu Tươi",
    text: "Chọn lọc nguyên liệu tươi ngon mỗi ngày, an toàn và chất lượng.",
  },
  {
    icon: "heart",
    title: "Công Thức Độc Quyền",
    text: "Công thức được nghiên cứu riêng, tạo nên hương vị riêng biệt.",
  },
  {
    icon: "star",
    title: "Phục Vụ Từ Trái Tim",
    text: "Đặt khách hàng làm trung tâm, phục vụ bằng sự chân thành.",
  },
];

const team = [
  {
    name: "Nguyễn Hoàng Nam",
    role: "Barista Trưởng",
    img: "/images/team-1.jpg",
  },
  {
    name: "Trần Thảo Vy",
    role: "Quản Lý Vận Hành",
    img: "/images/team-2.jpg",
  },
  {
    name: "Lê Minh Quân",
    role: "Pha Chế Sáng Tạo",
    img: "/images/team-3.jpg",
  },
];

function LineIcon({ type }) {
  if (type === "cup") {
    return (
      <svg viewBox="0 0 48 48">
        <path d="M14 19h17v10a8 8 0 0 1-8 8h-1a8 8 0 0 1-8-8V19Z" />
        <path d="M31 22h4a4 4 0 0 1 0 8h-4" />
        <path d="M15 39h18" />
        <path d="M19 14c-2-3 2-5 0-8" />
        <path d="M25 14c-2-3 2-5 0-8" />
      </svg>
    );
  }

  if (type === "heart") {
    return (
      <svg viewBox="0 0 48 48">
        <path d="M24 38S10 29 10 18a7 7 0 0 1 13-4 7 7 0 0 1 13 4c0 11-12 18-12 18Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48">
      <path d="m24 8 4.7 9.5 10.5 1.5-7.6 7.4 1.8 10.5L24 32l-9.4 4.9 1.8-10.5L8.8 19l10.5-1.5L24 8Z" />
    </svg>
  );
}

export default function About() {
  return (
    <main className="about-wrap">
      <section className="about-card">
        {/* Background Decorative SVGs */}
        <div className="background-decorations">
          <svg className="map-line" viewBox="0 0 650 640">
            <path d="M43 477 C105 440 130 493 188 454 C247 413 304 428 354 460 C416 501 470 488 601 444" />
            <path d="M45 326 C115 300 146 326 207 292 C283 248 333 306 378 261 C418 221 398 174 449 149" />
            <path d="M179 528 C229 502 253 520 302 499 C364 471 413 499 481 473" />
          </svg>
        </div>

        <div className="top-section top-section-spacing">
          <div className="story">
            <div className="story-header">
              <div className="story-title-wrap">
                <h2 className="story-title">MAAY ROOFTOP</h2>
                <svg viewBox="0 0 130 50" className="story-title-svg">
                  <path d="M8 36h104c9 0 12-13 3-17-4-12-19-15-28-7C79 0 58 4 55 20c-10-7-26-2-28 10H8" />
                </svg>
              </div>
              <span className="story-tags">Rooftop • Coffee • Chill • Đà Nẵng</span>
            </div>

            <h3 className="story-subtitle">Một góc nhỏ trên cao,<br />nơi Đà Nẵng chậm lại một chút.</h3>

            <p className="story-desc">
              Một không gian vừa đủ chill và thoáng đãng để bạn nhâm nhi ly cà phê, trò chuyện cùng bạn bè hay đơn giản là tận hưởng sự bình yên, ngắm nhìn thành phố trôi qua mỗi ngày.
            </p>

            <div className="story-highlights">
              <span>☀️ View sân bay</span>
              <span>🥤 Đồ uống</span>
              <span>🌿 Không gian xanh</span>
            </div>
          </div>

          <div className="top-right" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <div className="story-photo" style={{ marginTop: '0', margin: '0' }}>
              <img src="/images/our-story.png" alt="Maay Rooftop Building" />
            </div>
          </div>
        </div>

        <section className="memories-section">
          <div className="section-label view-label">
            <span>⌖</span>
            Góc Kỷ Niệm
          </div>

          <div className="view-content memories-grid">
            <div className="view-photo memories-photo">
              <img src="/images/maay-corner.png" alt="Maay Coffee Moments Memories" style={{ objectPosition: 'center 90%' }} />
            </div>

            <div className="view-copy">
              <div className="memories-subtitle">
                Memories
              </div>
              <h2 className="memories-title">
                Góc Nhỏ
                <br />
                Thanh Xuân
              </h2>
              <p style={{ marginTop: '20px', fontSize: '17px' }}>
                Nơi lưu giữ những nụ cười rạng rỡ. Ánh sáng tự nhiên và góc decor mộc mạc tại Maay sẽ giúp bạn có những bức ảnh thật thơ và đầy cảm xúc.
              </p>
            </div>
          </div>
        </section>

        <section className="benefit-box">
          <div className="section-label vision-title">
            <span>⌖</span>
            Tầm Nhìn
          </div>

          <div className="benefits-grid">
            {benefits.map((item, index) => (
              <div className="benefit-item" key={item.title}>
                <div className="benefit-icon">
                  <LineIcon type={item.icon} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>

                {index !== benefits.length - 1 && <i className="divider" />}
              </div>
            ))}
          </div>
        </section>

        <section className="view-box">
          <div className="section-label view-label">
            <span>⌖</span>
            Không Gian Rooftop
          </div>

          <div className="view-content">
            <div className="view-copy">
              <h2>360°</h2>
              <h3>
                Tầm Nhìn
                <br />
                Toàn Cảnh Đà Nẵng
              </h3>
              <p>
                Từ Maay Rooftop, thu trọn vẻ đẹp của thành phố – sông Hàn lấp
                lánh, những cây cầu rực rỡ và bầu trời rực sắc hoàng hôn.
              </p>
            </div>

            <div className="view-photo">
              <img src="/images/view-rooftop-da-nang.jpg" alt="Maay rooftop" />
              <div className="photo-logo">
                <b>maay</b>
                <span>rooftop cafe</span>
              </div>
            </div>
          </div>
        </section>



        <div className="cta-wrapper">
          <div className="cta">
            <h2>Hãy Đến Và Cảm Nhận</h2>
            <button>Đặt Bàn Ngay →</button>
          </div>

          <svg className="bottom-cup" viewBox="0 0 80 100">
            <path d="M20 22h40l-6 62H26L20 22Z" />
            <path d="M17 22h46" />
            <path d="M28 36h24" />
            <path d="M31 50h18" />
            <path d="M27 84h28" />
            <path d="M20 13c10 7 29 7 40 0" />
          </svg>

          <svg className="bottom-leaf" viewBox="0 0 120 90">
            <path d="M11 77C24 40 54 17 98 11 83 50 55 75 11 77Z" />
            <path d="M11 77c33-20 58-39 87-66" />
            <path d="M38 60 32 36M59 46 53 25M78 31 75 17" />
          </svg>
        </div>
      </section>
    </main>
  );
}
