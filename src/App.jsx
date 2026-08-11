import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import "./App.css";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";

import AdminLayout from "./components/AdminLayout";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminDashboard from "./pages/admin/AdminDashboard";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Cart from "./pages/Cart";

const features = [
  {
    icon: "☕",
    title: "HƯƠNG VỊ ĐẬM ĐÀ",
    desc: "Cà phê rang xay nguyên chất, pha chế chuẩn gu, thơm ngon khó quên.",
  },
  {
    icon: "🥤",
    title: "ĐỒ UỐNG TƯƠI NGON",
    desc: "Menu đa dạng từ cà phê, trà trái cây đến đá xay mát lạnh.",
  },
  {
    icon: "🎁",
    title: "ƯU ĐÃI HẤP DẪN",
    desc: "Nhiều combo tiết kiệm, khuyến mãi mỗi ngày cho khách hàng thân thiết.",
  },
];

// Hardcoded products removed in favor of API
function Features() {
  return (
    <section className="features">
      {features.map((item) => (
        <div className="featureCard" key={item.title}>
          <div className="featureIcon">{item.icon}</div>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      ))}
    </section>
  );
}

import { useCart } from "./context/CartContext";

function Products() {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL + '/api/menu');
        const data = await res.json();
        // Lấy 5 sản phẩm mới nhất làm nổi bật
        setFeaturedProducts(data.reverse().slice(0, 5)); 
      } catch (err) {
        console.error("Failed to fetch featured menu", err);
      }
    };
    fetchMenu();
  }, []);

  const handleOrderClick = (item) => {
    addToCart(item);
  };

  const formatPrice = (priceStr) => {
    if (!priceStr) return '';
    let val = priceStr.toString().replace(/k/i, '').trim();
    if (!isNaN(val) && val !== '') {
      return Number(val).toLocaleString('vi-VN') + 'đ';
    }
    return priceStr;
  };

  return (
    <section className="products">
      <div className="sectionTitle">
        <span></span>
        <h2>DỊCH VỤ NỔI BẬT</h2>
        <span></span>
      </div>

      <Link to="/thuc-don" className="viewAllBtn" style={{ textDecoration: 'none', width: 'fit-content' }}>Xem tất cả dịch vụ →</Link>

      <div className="productWrap">
        <div className="productList">
          {featuredProducts.map((item) => (
            <div className="productCard horizontal" key={item._id || item.name}>
              <div className="cardBgDecor"></div>
              <div className="productImage">
                <img src={item.img || item.image} alt={item.name} onError={(e) => { e.target.src = '/images/espresso.png'; }} />
              </div>

              <div className="productInfo">
                <div className="titleWrap">
                  <span className="leafIcon">🌿</span>
                  <h4>{item.name}</h4>
                </div>

                <div className="priceWrap">
                  <span className="sparkle left">✨</span>
                  <div className="price">{formatPrice(item.price)}</div>
                </div>

                <div className="productDesc">
                  <span className="descIcon">🌱</span> {item.desc}
                </div>

                <button className="orderBtn" onClick={() => handleOrderClick(item)}>
                  <span className="cartIcon">🛒</span> Đặt ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function Home() {
  return (
    <>
      <div className="floating-leaves-bg">
        <span className="leaf-anim leaf1">🍃</span>
        <span className="leaf-anim leaf2">🌿</span>
        <span className="leaf-anim leaf3">🌱</span>
        <span className="leaf-anim leaf4">🍃</span>
        <span className="leaf-anim leaf5">🌿</span>
      </div>
      <Hero />
      <Features />
      <Products />
    </>
  );
}



import { CartProvider } from "./context/CartContext";

const routeOrder = {
  '/': 0,
  '/thuc-don': 1,
  '/gioi-thieu': 2,
  '/lien-he': 3
};

function AnimatedRoutes() {
  const location = useLocation();
  const [transition, setTransition] = React.useState({
    path: location.pathname,
    direction: 'left-to-right'
  });

  if (location.pathname !== transition.path) {
    const prevIndex = routeOrder[transition.path] || 0;
    const currentIndex = routeOrder[location.pathname] || 0;
    
    setTransition({
      path: location.pathname,
      direction: currentIndex > prevIndex ? 'left-to-right' : 'right-to-left'
    });
  }
  
  return (
    <div key={location.pathname} className={`page-transition ${transition.direction}`}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/gioi-thieu" element={<About />} />
        <Route path="/thuc-don" element={<Menu />} />
        <Route path="/lien-he" element={<Contact />} />
        <Route path="/gio-hang" element={<Cart />} />
      </Routes>
    </div>
  );
}

function PublicApp() {
  const location = useLocation();
  const hideFooter = location.pathname === '/thuc-don';
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
  
  return (
    <main className="page">
      <Navbar />
      <AnimatedRoutes />
      {!hideFooter && <Footer />}
    </main>
  );
}

function ScrollToTop() {
  const location = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/admin" element={<ProtectedRoute roleRequired="admin"><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="product/add" element={<AdminProductForm />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="contacts" element={<AdminContacts />} />
            </Route>
            
            <Route path="/*" element={<PublicApp />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
