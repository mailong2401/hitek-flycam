import { Wrench, MapPin, Package, FileCheck, Import, Video, Calendar, User, ArrowRight, Network, AppWindowMac, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import image1 from "@/assets/bg_cut/flycam1.jpg"
import image2 from '@/assets/bg_cut/flycam2.jpg';
import image3 from '@/assets/bg_cut/flycam3.jpg';
import image4 from '@/assets/bg_cut/flycam4.jpg';
import image5 from '@/assets/bg_cut/flycam5.jpg';
import buy from '@/assets/services/icon1/buy.png'
import map from '@/assets/services/icon1/map.png';
import delivery from '@/assets/services/icon1/delivery.png';
import camera from '@/assets/services/icon1/camera.png';
import listence from '@/assets/services/icon1/listence.png';
import repair from '@/assets/services/icon1/repair.png';

import tech from '@/assets/services/icon2/tech.png'
import group from '@/assets/services/icon2/group.png';
import app from '@/assets/services/icon2/app.png';
import security from '@/assets/services/icon2/security.png';
import engineer from '@/assets/services/icon2/engineer.png';
import fix from '@/assets/services/icon2/fix.png';

// Tạo mapping giữa service và route
const serviceRoutes = {
  "Sửa chữa drone": "/services/drone-repair",
  "Drone trắc địa": "/services/surveying-drone", 
  "Drone vận chuyển": "/services/delivery-drone",
  "Dịch vụ Phép bay.": "/services/flight-permit-service",
  "Nhập khẩu Drone.": "/services/drone-import",
  "Quay flycam": "/services/drone-filming"
};
const iconServices = [
  { icon: repair, label: "Sửa chữa drone" },
  { icon: map, label: "Drone trắc địa" },
  { icon: delivery, label: "Drone vận chuyển" },
  { icon: listence, label: "Dịch vụ phép bay" },
  { icon: buy, label: "Nhập khẩu drone" },
  { icon: camera, label: "Quay flycam" },
];

const serviceCards = [
  {
    title: "01",
    description: "Sửa chữa drone",
    detail: "Dịch vụ sửa chữa drone chuyên nghiệp, nhanh chóng và uy tín"
  },
  {
    title: "02", 
    description: "Drone trắc địa",
    detail: "Cung cấp giải pháp drone trắc địa chính xác cao"
  },
  {
    title: "03",
    description: "Drone vận chuyển", 
    detail: "Dịch vụ vận chuyển bằng drone tiện lợi và hiệu quả"
  },
  {
    title: "04",
    description: "Dịch vụ Phép bay.",
    detail: "Tư vấn và xin giấy phép bay chuyên nghiệp"
  },
  {
    title: "05",
    description: "Nhập khẩu Drone.",
    detail: "Nhập khẩu drone chính hãng với giá cả cạnh tranh"
  },
];

const detailedServices = [
  {
    icon: tech,
    title: "Công nghệ tiên phong",
    description: "Tích hợp AI, RTK, Lidar, GPS thời gian thực trong mọi giải pháp bay. Đem lại dữ liệu chính xác, vận hành an toàn và hiệu suất vượt trội.",
  },
  {
    icon: engineer,
    title: "Đội ngũ chuyên gia",
    description: "Kỹ sư, phi công và kỹ thuật viên được đào tạo bài bản, đảm bảo chuyên môn cao và quy trình kỹ thuật chuẩn quốc tế.",
  },
  {
    icon: fix,
    title: "Dịch vụ trọn gói",
    description: "Từ xin phép – bay – bảo trì – nhập khẩu – bàn giao dữ liệu, Hitek Flycam đồng hành cùng khách hàng ở mọi giai đoạn của dự án.",
  },
  {
    icon: security,
    title: "An toàn pháp lý",
    description: "Tất cả chuyến bay đều được cấp phép hợp pháp và bảo hiểm đầy đủ, đảm bảo tuân thủ quy định của Bộ Quốc phòng và cơ quan quản lý.",
  },
  {
    icon: group,
    title: "Hệ sinh thái Hitek Group",
    description: "Là thành viên của tập đoàn công nghệ Hitek Group, Hitek Flycam thừa hưởng hạ tầng mạnh, năng lực AI & chất lượng quốc tế.",
  },
  {
    icon: app,
    title: "Ứng dụng đa nghành",
    description: "Từ truyền thông – xây dựng – nông nghiệp – logistics, Hitek Flycam thiết kế giải pháp Drone tùy chỉnh cho từng mục tiêu kinh doanh.",
  },
];

// Dữ liệu mới cho các khối
const projects = [
  {
    id: 1,
    title: "Khảo sát địa hình dự án cao tốc Bắc - Nam",
    category: "Trắc địa & Khảo sát",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=600&q=80",
    description: "Sử dụng drone DJI Matrice 350 RTK thu thập dữ liệu địa hình với độ chính xác cm"
  },
  {
    id: 2,
    title: "Quay phim quảng cáo resort 5 sao",
    category: "Quay Phim & Media",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80",
    description: "Sản xuất video marketing chất lượng 8K với drone DJI Inspire 3"
  },
  {
    id: 3,
    title: "Giám sát thi công dự án điện gió",
    category: "Giám sát & Bảo trì",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80",
    description: "Giám sát tiến độ và an toàn thi công bằng drone tự động hóa"
  },
  {
    id: 4,
    title: "Vận chuyển y tế khẩn cấp",
    category: "Vận chuyển & Logistics",
    image: "https://images.unsplash.com/photo-1488462104523-514bea5f99b3?q=80&w=1178&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Vận chuyển thuốc và thiết bị y tế đến vùng sâu vùng xa"
  }
];

const clients = [
  {
    id: 1,
    name: "Tập đoàn Vingroup",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=200&q=80",
    project: "Giám sát thi công dự án bất động sản",
    feedback: "Hitek Flycam cung cấp giải pháp drone chuyên nghiệp, giúp chúng tôi tiết kiệm 40% thời gian giám sát."
  },
  {
    id: 2,
    name: "Tổng công ty Điện lực EVN",
    logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=200&q=80",
    project: "Kiểm tra đường dây điện cao thế",
    feedback: "Dịch vụ an toàn, chuyên nghiệp và đáp ứng mọi yêu cầu kỹ thuật khắt khe."
  },
  {
    id: 3,
    name: "Bộ Giao thông Vận tải",
    logo: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&w=200&q=80",
    project: "Khảo sát địa hình các dự án giao thông",
    feedback: "Đối tác tin cậy trong việc cung cấp dữ liệu địa hình chính xác cho các dự án trọng điểm."
  },
  {
    id: 4,
    name: "Công ty CP Dược phẩm Vinfa",
    logo: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=200&q=80",
    project: "Vận chuyển thuốc khẩn cấp",
    feedback: "Giải pháp vận chuyển drone giúp chúng tôi tiếp cận các khu vực khó khăn nhanh chóng."
  }
];

const news = [
  {
    id: 1,
    title: "Xu hướng ứng dụng Drone trong nông nghiệp thông minh 2024",
    excerpt: "Khám phá cách drone đang cách mạng hóa ngành nông nghiệp với công nghệ phun thuốc tự động và giám sát cây trồng.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
    date: "15/12/2024",
    author: "Admin",
    category: "Công nghệ"
  },
  {
    id: 2,
    title: "Hitek Flycam ra mắt dịch vụ Drone Show chuyên nghiệp",
    excerpt: "Trình diễn light show bằng drone với quy mô 500 drone, mang đến trải nghiệm visual ấn tượng cho sự kiện.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80",
    date: "10/12/2024",
    author: "Tech Team",
    category: "Sự kiện"
  },
  {
    id: 3,
    title: "Hướng dẫn xin giấy phép bay drone tại Việt Nam 2024",
    excerpt: "Cập nhật quy trình và thủ tục xin giấy phép bay drone mới nhất theo quy định của Bộ Quốc phòng.",
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80",
    date: "05/12/2024",
    author: "Legal Team",
    category: "Pháp lý"
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background">

      {/* 5 Icons Section */}
      <section className="py-16 bg-light-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {iconServices.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-6 bg-pure-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {/* Sửa thành: */}
                <img 
                  src={service.icon} 
                  alt={service.label}
                  className="w-20 h-20 object-contain"
                />
                </div>
                <p className="text-center font-semibold text-pure-black">{service.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Text Block with Title Left, Content Right */}
      <section className="py-16 bg-pure-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex">
              <div className="w-1 h-30 bg-vibrant-red mr-6 rounded-full" />
              <div>
                <h2 className="text-4xl font-bold text-pure-black mb-4">
                  Hitek Flycam
                </h2>
                <p className="text-lg text-pure-black mb-4">
                  Cung cấp dịch vụ chuyên nghiệp <br />
                  & Giải pháp toàn diện về Drone
                </p>
                <Link to="/gioi-thieu">
                  <div className="flex items-center text-vibrant-red font-semibold cursor-pointer hover:underline group">
                    Tìm hiểu thêm
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </div>
            </div>
            <div className="space-y-4 text-pure-black">
              <p>
                <span className="font-bold">Hitek Flycam </span>
                là thương hiệu trực thuộc 
                <span className="font-bold"> Hitek Group JSC </span>
                – tập đoàn công nghệ uy tín tiên phong trong lĩnh vực 
                Drone Show tại Việt Nam. Chúng tôi cung cấp 
                <span className="font-bold"> giải pháp Drone toàn diện cho mọi nhu cầu </span>
                – từ quay phim, khảo sát địa hình, 
                vận chuyển, sửa chữa, đến xin giấy phép bay và nhập khẩu Drone 
                chuyên dụng.
              </p>
              <p>
                Với nền tảng công nghệ vững chắc từ hệ sinh thái 
                Hitek Group, Hitek Flycam cam kết mang đến độ chính xác, an toàn 
                và hiệu quả vượt trội cho từng dự án.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Interactive Cards Section */}
      <section className="py-16 bg-light-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-pure-black">
            Chúng tôi cung cấp các giải pháp
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-1">
            {serviceCards.map((card, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl aspect-[3/4] cursor-pointer"
              >
                <img
                  src={[image1, image2, image3, image4, image5][index]}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay ban đầu */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent flex items-end p-6">
                  <div className="w-full">
                    <div className="transition-all duration-300 group-hover:opacity-0">
                      <h3 className="text-pure-white font-bold text-6xl mb-3 text-left">{card.title}</h3>
                      <p className="text-pure-white text-2xl font-bold text-left mb-4">{card.description}</p>
                      <div className="w-10 h-10 border border-gray-300 bg-transparent rounded-sm flex items-center justify-center hover:border-gray-400 transition-colors duration-200">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overlay khi hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="absolute inset-0 bg-vibrant-red opacity-0 group-hover:opacity-70 transition-all duration-300" />
                  <div className="relative w-full space-y-4 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                    <div className="text-left">
                      <h3 className="text-pure-white font-bold text-6xl mb-3">{card.title}</h3>
                      <p className="text-pure-white text-2xl font-bold mb-2">{card.description}</p>
                      <p className="text-pure-white text-sm mb-6 leading-relaxed">{card.detail}</p>
                    </div>
                    <Link to={serviceRoutes[card.description]}>
                      <button className="bg-white text-vibrant-red font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 w-full text-base text-left flex items-center justify-between group/btn">
                        <span>Tìm hiểu thêm</span>
                        <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Service Boxes with Icons */}
      <section className="py-16 bg-pure-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-pure-black">
            Tại sao nên chọn
            <span className="text-vibrant-red"> Hitek Flycam</span>
            ?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {detailedServices.map((service, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <img 
                    src={service.icon} 
                    alt={service.title}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-pure-black">{service.title}</h3>
                <p className="text-\-pure-black mb-6">{service.description}</p>
                <Button className="w-full">Tìm hiểu thêm</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dự án tiêu biểu */}
      <section className="py-16 bg-light-gray">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-pure-black mb-4">Dự án tiêu biểu
                <span className="text-vibrant-red"> Hitek FLycam</span>
                ?
              </h2>
              <p className="text-muted-foreground text-lg">Khám phá những dự án drone ấn tượng chúng tôi đã thực hiện</p>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              Xem tất cả dự án
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-vibrant-red text-pure-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-pure-black mb-3 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <Button variant="ghost" className="p-0 h-auto text-vibrant-red hover:text-vibrant-red/80">
                    Xem chi tiết →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Khách hàng tin tưởng */}
      <section className="py-16 bg-pure-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-pure-black mb-4">Khách hàng của
            <span className="text-vibrant-red"> Hitek Flycam</span>
            ?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Đồng hành cùng các tập đoàn và doanh nghiệp hàng đầu Việt Nam
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-card rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-200">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-pure-black mb-2">{client.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{client.project}</p>
                <p className="text-xs text-muted-foreground italic line-clamp-3">
                  "{client.feedback}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tin tức & Sự kiện */}
      <section className="py-16 bg-light-gray">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">Tin tức mới nhất</h2>
              <p className="text-muted-foreground text-lg">Cập nhật những xu hướng và công nghệ drone mới nhất</p>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              Xem tất cả tin tức
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article
                key={item.id}
                className="bg-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-vibrant-red text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {item.author}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <Button variant="ghost" className="p-0 h-auto text-vibrant-red hover:text-vibrant-red/80">
                    Đọc tiếp →
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}