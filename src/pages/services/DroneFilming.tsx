
import { Wrench, Clock, Shield, CheckCircle, ArrowRight, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import bg from "@/assets/services/video/fix.png"
import camcorder from "@/assets/services/video/camcorder.png"
import event from "@/assets/services/video/event.png"
import film from "@/assets/services/video/film.png"
import journey from "@/assets/services/video/journey.png"
export default function DroneFilming() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      icon: camcorder,
      title: "Quay TVC & quảng cáo doanh nghiệp.",
      description: "Resort, khu công nghiệp, bất động sản, nhà máy"
    },
    {
      icon: journey,
      title: "Chụp ảnh/clip du lịch, quảng bá địa phương.",
      description: "Toàn cảnh, panorama, fly-through."
    },
    {
      icon: event,
      title: "Ghi hình sự kiện & lễ hội",
      description: "Quay đa góc, trực tiếp (livestream) bằng nhiều drone"
    },
    {
      icon: film,
      title: "Xử lý hậu kì",
      description: "Chỉnh màu điện ảnh, dựng video, lồng tiếng, motion logo"
    }
    
  ];

  const processes = [
    {
      step: "01",
      title: "Tiếp nhận brief và tư vấn góc quay, storyboard.",
    },
    {
      step: "02",
      title: "Xin phép bay & chuẩn bị thiết bị phù hợp với địa điểm",
    },
    {
      step: "03",
      title: "Tiến hành quay chụp với đội bay & đạo diễn phối hợp",
    },
    {
      step: "04",
      title: "Dựng hậu kỳ, chỉnh màu, xuất bản theo format mong muốn",
    },
    {
      step: "05",
      title: "Bàn giao video, ảnh và file nguồn (theo yêu cầu).",
    },
  ];

  const benefits = [
  {
    icon: CheckCircle,
    parts: [
      "Rút ngắn thời gian khảo sát ",
      { text: "tới 70%", bold: true },
      " so với phương pháp truyền thống"
    ]
  },
  {
    icon: CheckCircle,
    parts: [
      { text: "Sai số thấp, dữ liệu ổn định, xử lý nhanh", bold: true },
      " dành cho các công trình lớn."
    ]
  },
  {
    icon: CheckCircle,
    parts: [
      "Mọi chuyến bay và dữ liệu đều ",
      { text: "tuân thủ tiêu chuẩn", bold: true },
      " pháp lý và kỹ thuật của Hitek Flycam."
    ]
  },
];

  const faqs = [
    {
      question: "Có cần xin phép bay trước khi quay phim không?",
      answer: "Thời gian sửa chữa phụ thuộc vào mức độ hỏng hóc. Với lỗi nhẹ: 2-4 giờ, lỗi vừa: 6-12 giờ, lỗi nặng: 24-48 giờ. Chúng tôi luôn cố gắng hoàn thành sớm nhất có thể."
    },
    {
      question: "Bao gồm hậu kỳ hoặc phối cảnh chuyên nghiệp không?",
      answer: "Có. Tất cả dịch vụ sửa chữa đều được bảo hành từ 6-24 tháng tùy loại hình sửa chữa. Linh kiện thay thế được bảo hành theo chính sách của hãng."
    },
    {
      question: "Kích thước video và ảnh hỗ trợ là gì?",
      answer: "100% linh kiện thay thế là chính hãng, được nhập khẩu trực tiếp từ các đối tác uy tín. Chúng tôi cam kết không sử dụng linh kiện giả, nhái kém chất lượng."
    },
    {
      question: "Có thể quay được trong điều kiện gió mạnh/ban đêm không?",
      answer: "Có dịch vụ sửa chữa tại nhà/khu vực TP.HCM và Hà Nội với phí dịch vụ. Tuy nhiên, để đảm bảo chất lượng, chúng tôi khuyến nghị mang đến trung tâm để có thiết bị chuyên dụng."
    },
    {
      question: "Bao lâu nên thực hiện bảo trì drone một lần?",
      answer: "Khuyến nghị: Tối thiểu mỗi 3 tháng hoặc sau khoảng 30-50 giờ bay — tùy theo mức độ sử dụng."
    },
    {
      question: "Drone bị lệch hướng hoặc GPS kém có sửa được không?",
      answer: "Có dịch vụ sửa chữa tại nhà/khu vực TP.HCM và Hà Nội với phí dịch vụ. Tuy nhiên, để đảm bảo chất lượng, chúng tôi khuyến nghị mang đến trung tâm để có thiết bị chuyên dụng."
    },
    {
      question: "Có nhận kiểm tra online hoặc gửi thiết bị từ xa được không?",
      answer: "Có dịch vụ sửa chữa tại nhà/khu vực TP.HCM và Hà Nội với phí dịch vụ. Tuy nhiên, để đảm bảo chất lượng, chúng tôi khuyến nghị mang đến trung tâm để có thiết bị chuyên dụng."
    },
    {
      question: " Có bảo hành sau khi sửa chữa không?",
      answer: "Có dịch vụ sửa chữa tại nhà/khu vực TP.HCM và Hà Nội với phí dịch vụ. Tuy nhiên, để đảm bảo chất lượng, chúng tôi khuyến nghị mang đến trung tâm để có thiết bị chuyên dụng."
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
     <div className="pt-20">
      <div className="relative h-[400px] overflow-hidden">

        {/* Lớp bóng mờ màu đen */}
        <div className="absolute inset-0 bg-gradient-to-r from-black to-black opacity-60" />

        {/* Ảnh nền */}
        <img
          src={bg}
          alt="Drone in sky"
          className="w-full h-full object-cover object-[center_60%]"
        />

        {/* Nội dung ở giữa */}
        <div className="absolute inset-0 flex items-center justify-center">
          

          <div className="text-white text-center">
            <h1 className="text-6xl font-bold mb-4">NHẬU KHẨU DRONE</h1>
            <p className="text-2xl opacity-90">Giải pháp nhập khẩu, phân phối và tư vấn lựa chọn thiết bị drone công nghiệp, <br />giúp
doanh nghiệp sở hữu thiết bị hợp pháp, chính hãng, tối ưu cho từng lĩnh vực sử dụng.</p>
          </div>
        </div>
      </div>
    </div>

      {/* Features Section */}
      <section className="py-20 bg-light-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-vibrant-red mb-4">
              Hạng mục dịch vụ
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-20 h-20 object-cover "
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Timeline Vertical */}
<section className="py-20 bg-pure-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-vibrant-red mb-4">
        Quy trình triển khai
      </h2>
    </div>
    
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Timeline line */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-vibrant-red/30 via-vibrant-red/50 to-vibrant-red/30 transform -translate-x-1/2" />
        
        <div className="space-y-12 lg:space-y-0">
          {processes.map((process, index) => (
            <div
              key={index}
              className={`relative flex flex-col lg:flex-row items-center gap-8 group ${
                index % 2 === 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Step Number & Connector */}
              <div className="flex-shrink-0 relative">
                <div className="w-20 h-20 bg-gradient-to-br from-vibrant-red to-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl">{process.step}</span>
                </div>
                {/* Connector dot */}
                <div className="hidden lg:block absolute top-1/2 -left-4 transform -translate-y-1/2 w-8 h-8 bg-card border-4 border-vibrant-red rounded-full" />
              </div>
              
              {/* Content Card */}
              <div className="flex-1 bg-card rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl hover:border-vibrant-red/30 transition-all duration-300 group-hover:-translate-y-1">
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-vibrant-red transition-colors">
                  {process.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Benefits Section */}
        <section className="py-20 bg-light-gray">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-vibrant-red mb-16">
            Lợi ích dành cho khách hàng
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
                <div
                key={index}
                className="relative text-center"
                >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-pure-black">
                    {benefit.parts.map((part, i) => 
                    typeof part === 'string' ? part : (
                        <strong key={i} className="font-bold">{part.text}</strong>
                    )
                    )}
                </p>
                {index < benefits.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-border" />
                )}
                </div>
            ))}
            </div>
        </div>
        </section>

      {/* FAQ Section */}
      <section className="py-20 bg-pure-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-foreground mb-16">
              Câu hỏi thường gặp
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl border border-border overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-card/50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-foreground pr-4">
                      {faq.question}
                    </span>
                    {openFaq === index ? (
                      <Minus className="w-5 h-5 text-vibrant-red flex-shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-vibrant-red flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-6">
                Vẫn còn thắc mắc? Liên hệ ngay với chúng tôi
              </p>
              <Button size="lg" className="bg-vibrant-red hover:bg-vibrant-red/90">
                Liên hệ tư vấn
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}