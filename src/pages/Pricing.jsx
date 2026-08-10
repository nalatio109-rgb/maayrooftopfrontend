import '../styles/Pricing.css'

const menuData = {
  traSuaNguyenBan: [
    { name: 'Hồng trà đậm vị', price: '25' },
    { name: 'Trà sữa Oolong Khói', price: '25' },
    { name: 'Trà Gạo rang Nhật', price: '25' },
    { name: 'Trà Oolong Nướng', price: '25' },
    { name: 'Trà oolong Camellia', price: '25' },
  ],
  traSuaDacSan: [
    { name: 'Hồng trà Shan tuyết Trân châu', price: '35' },
    { name: 'Oolong Khói B\'lao Tây Nguyên', price: '35' },
    { name: 'Oolong Camellia Kem bắp', price: '35' },
    { name: 'Trà gạo rang Nhật kem trứng', price: '35' },
    { name: 'Oolong Nướng sốt khoai lang tím', price: '35' },
  ],
  matcha: [
    { name: 'Matcha Latte', price: '39' },
    { name: 'Matcha Xoài', price: '45' },
    { name: 'Matcha kem Muối', price: '45' },
    { name: 'Matcha đậu đỏ', price: '45' },
    { name: 'Matcha Hạt dẻ cười', price: '45' },
  ],
  traHoaQua: [
    { name: 'Trà Lựu Nho xanh', price: '35' },
    { name: 'Trà Dưa lưới nhiệt đới', price: '35' },
    { name: 'Trà Yuzu Bưởi Hồng', price: '35' },
    { name: 'Trà Xoài Afonso', price: '35' },
    { name: 'Trà Oolong sen vàng', price: '45' },
  ],
  cafe: [
    { name: 'Café Đen máy', price: '20' },
    { name: 'Café sữa máy', price: '20' },
    { name: 'Café đen Sài Gòn', price: '25' },
    { name: 'Café sữa Sài Gòn', price: '25' },
    { name: 'Café Muối Huế', price: '35' },
  ],
  coldbrew: [
    { name: 'Coldbrew Chanh vàng', price: '45' },
    { name: 'Coldbrew Dâu Ổi', price: '45' },
    { name: 'Coldbrew Quýt', price: '45' },
  ]
}

const MenuCategory = ({ title, items }) => (
  <div className="menu-category glass-panel">
    <h3 className="category-title">{title}</h3>
    <ul className="menu-list">
      {items.map((item, index) => (
        <li key={index} className="menu-item">
          <span className="item-name">{item.name}</span>
          <span className="item-dots"></span>
          <span className="item-price">{item.price}</span>
        </li>
      ))}
    </ul>
  </div>
)

const Pricing = () => {
  return (
    <div className="pricing-page section container">
      <div className="menu-header">
        <h2 className="section-title">MENU</h2>
      </div>
      
      <div className="menu-grid">
        <MenuCategory title="TRÀ SỮA NGUYÊN BẢN" items={menuData.traSuaNguyenBan} />
        <MenuCategory title="TRÀ SỮA ĐẶC SẢN" items={menuData.traSuaDacSan} />
        <MenuCategory title="MATCHA" items={menuData.matcha} />
        <MenuCategory title="TRÀ HOA QUẢ" items={menuData.traHoaQua} />
        <MenuCategory title="CAFÉ" items={menuData.cafe} />
        <MenuCategory title="COLDBREW" items={menuData.coldbrew} />
      </div>
    </div>
  )
}

export default Pricing
