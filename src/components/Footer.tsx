import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-bold text-lg">
                DS
              </div>
              <span className="font-bold text-lg">Drone Services</span>
            </div>
            <p className="text-white/70 text-sm mb-4">
              Chuyên cung cấp dịch vụ drone chuyên nghiệp, sửa chữa và nhập khẩu thiết bị bay không người lái.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="font-bold text-lg mb-4">Thông tin liên hệ</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/gioi-thieu" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Hitek Flycam
                  <div>Hotline: (+84) 28 99 95 95 88</div>
                  <div>Email: contact@hitek.com.vn</div>
                </Link>
              </li>
              <li>
                <Link to="/gioi-thieu" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Chief Executive Officer (Mr. Khôi)
                  <div>Hotline: (+84) 777 50 50 30</div>
                  <div>Email: khoitran@hitek.com.vn</div>
                </Link>
              </li>
              <li>
                <Link to="/gioi-thieu" className="text-white/70 hover:text-primary transition-colors text-sm">
                  General Manager (Ms. Trang)
                  <div>Hotline: (+84) 346 124 230</div>
                  <div>Email: trangvo@hitek.com.vn</div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Dịch vụ</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dich-vu/sua-chua-drone" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Sửa chữa Drone
                </Link>
              </li>
              <li>
                <Link to="/dich-vu/drone-trac-dia" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Drone Trắc địa
                </Link>
              </li>
              <li>
                <Link to="/dich-vu/drone-van-chuyen" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Drone Vận chuyển
                </Link>
              </li>
              <li>
                <Link to="/dich-vu/phep-bay" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Dịch vụ Phép bay
                </Link>
              </li>
              <li>
                <Link to="/dich-vu/nhap-khau" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Nhập khẩu Drone
                </Link>
              </li>
              <li>
                <Link to="/dich-vu/nhap-khau" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Quay flycam
                </Link>
              </li>
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="font-bold text-lg mb-4">Điều khoản</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dich-vu/sua-chua-drone" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Điều khoản chung
                </Link>
              </li>
              <li>
                <Link to="/dich-vu/drone-trac-dia" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link to="/dich-vu/drone-van-chuyen" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Chính sách an toàn bay
                </Link>
              </li>
              <li>
                <Link to="/dich-vu/phep-bay" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Điều khoản xin phép bay
                </Link>
              </li>
              <li>
                <Link to="/dich-vu/nhap-khau" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Nhập khẩu Drone
                </Link>
              </li>
              <li>
                <Link to="/dich-vu/nhap-khau" className="text-white/70 hover:text-primary transition-colors text-sm">
                  Quay flycam
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Connect with us */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bold text-lg">Kết nối với chúng tôi</span>
            </div>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/50">
          <p>© 2024 Drone Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
