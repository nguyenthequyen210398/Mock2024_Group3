function Footer() {

    return(
        <footer>
        <div className="footer-container">
          <div className="footer-section">
            <h4>Liên hệ</h4>
            <p>Địa chỉ: Số 123, Đường ABC, Thành phố XYZ</p>
            <p>Email: contact@example.com</p>
            <p>Điện thoại: +84 123 456 789</p>
          </div>
          <div className="footer-section">
            <h4>Thông tin</h4>
            <p>Về chúng tôi</p>
            <p>Điều khoản sử dụng</p>
            <p>Chính sách bảo mật</p>
          </div>
          <div className="footer-section">
            <h4>Liên kết nhanh</h4>
            <ul>
              <li><a href="/">Trang chủ</a></li>
              <li><a href="/phim-dang-chieu">Phim đang chiếu</a></li>
              <li><a href="/phim-sap-chieu">Phim sắp chiếu</a></li>
              <li><a href="/lien-he">Liên hệ</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Tên công ty. Bảo lưu mọi quyền.</p>
        </div>
      </footer>
    )
}

export default Footer;