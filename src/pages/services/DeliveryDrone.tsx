import { Wrench, Clock, Shield, CheckCircle, ArrowRight, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import fix from "@/assets/services/delivery_drone/fix.png";
import delivery from "@/assets/services/delivery_drone/delivery.png";
import setting from "@/assets/services/delivery_drone/setting.png";
import factory from "@/assets/services/delivery_drone/factory.png";
export default function DeliveryDrone() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      icon: factory,
      title: "Giao nhận nội khu: kho, nhà máy, khu sản xuất.",
      description: "Kiểm tra tổng thể, chẩn đoán lỗi, thay thế linh kiện"
    },
    {
      icon: delivery,
      title: "Vận chuyển mẫu, tài liệu, linh kiện trong nông nghiệp hoặc công nghiệp.",
      description: "Cập nhật phần mềm, hiệu chuẩn cảm biến IMU, compass, hệ thống GPS"
    },
    {
      icon: setting,
      title: "Dịch vụ giao hàng thử nghiệm và mô hình logistics drone.",
      description: "Kiểm tra an toàn trước và sau bay, bảo hành dịch vụ sửa chữa"
    }
  ];

  const processes = [
    {
      step: "01",
      title: "Phân tích nhu cầu & trọng lượng hàng hóa.",
    },
    {
      step: "02",
      title: "Lập bản đồ đường bay, điểm cất/hạ, hành trình tự động",
    },
    {
      step: "03",
      title: "Cấu hình thiết bị, kiểm tra an toàn & xin phép bay",
    },
    {
      step: "04",
      title: "Tiến hành bay thử, ghi log dữ liệu và bàn giao quy trình vận hành",
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
      question: "Ứng dụng phổ biến của drone vận chuyển là gì?",
      answer: "chưa có"
    },
    {
      question: "Drone vận chuyển có thể mang tải trọng bao nhiêu?",
      answer: "chưa có"
    },
    {
      question: "Hệ thống điều hướng có an toàn không?",
      answer: "chưa có"
    },
    {
      question: "Điều kiện vận hành trong thời tiết xấu như thế nào?",
      answer: "chưa có"
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-light-gray">
      <div className="pt-20">
      <div className="relative h-[400px] overflow-hidden">

        {/* Lớp bóng mờ màu đen */}
        <div className="absolute inset-0 bg-gradient-to-r from-black to-black opacity-20" />

        {/* Ảnh nền */}
        <img
          src={fix}
          alt="Drone in sky"
          className="w-full h-full object-cover object-[center_30%]"
        />

        {/* Nội dung ở giữa */}
        <div className="absolute inset-0 flex items-center justify-center">
        
          <div className="text-white text-center">
            <h1 className="text-6xl font-bold mb-4">DRONE VẬN CHUYỂN</h1>
            <p className="text-2xl opacity-90">Giải pháp vận chuyển hàng hóa bằng drone được thiết kế cho khu công nghiệp,<br />
nông nghiệp và khu vực khó tiếp cận — tối ưu hóa chi phí, thời gian và nhân lực.</p>
          </div>
        </div>
      </div>
    </div>

      {/* Features Section */}
      <section className="py-20 bg-light-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Ứng dụng của
              <span className="text-vibrant-red"> Drone vận chuyển</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <img 
                    src={feature.icon} 
                    alt={feature.title}
                    className="w-20 h-20 object-contain"
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
                <div className="w-16 h-16 bg-vibrant-red rounded-full flex items-center justify-center mx-auto mb-6">
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