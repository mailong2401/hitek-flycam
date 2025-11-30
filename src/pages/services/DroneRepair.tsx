
import { Wrench, Clock, Shield, CheckCircle, ArrowRight, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DroneRepair() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      icon: Wrench,
      title: "Kiểm tra & Thay thế linh kiện",
      description: "Kiểm tra tổng thể, chẩn đoán lỗi, thay thế linh kiện"
    },
    {
      icon: Clock,
      title: "Cập nhật & Hiệu chuẩn hệ thống bay",
      description: "Cập nhật phần mềm, hiệu chuẩn cảm biến IMU, compass, hệ thống GPS"
    },
    {
      icon: Shield,
      title: "Kiểm tra an toàn & Bảo hành sau sữa chữa",
      description: "Kiểm tra an toàn trước và sau bay, bảo hành dịch vụ sửa chữa"
    }
  ];

  const processes = [
    {
      step: "01",
      title: "Tiếp nhận yêu cầu và chẩn đoán sơ bộ thông qua hình ảnh/video hoặc dữ liệu lỗi do khách hàng cung cấp",
    },
    {
      step: "02",
      title: "Kiểm tra thực tế tại workshop hoặc hiện trường: phân tích lỗi, thiết lập kế hoạch sửa chữa",
    },
    {
      step: "03",
      title: "Thực hiện thay linh kiện, nâng cấp phần mềm, hiệu chuẩn cảm biến theo tiêu chuẩn kỹ thuật",
    },
    {
      step: "04",
      title: "Thử bay kiểm định (nếu cần) hoặc kiểm tra hệ thống kết nối dữ liệu & truyền hình ảnh, ghi lại báo cáo",
    },
    {
      step: "05",
      title: "Thử bay kiểm định (nếu cần) hoặc kiểm tra hệ thống kết nối dữ liệu & truyền hình ảnh, ghi lại báo cáo",
    }
  ];

  const benefits = [
  {
    icon: CheckCircle,
    parts: [
      "Thiết bị luôn trong trạng thái ",
      { text: "vận hành ổn định và tối ưu", bold: true },
      ", giảm thiểu thời gian dừng máy và bảo trì ngoài kế hoạch."
    ]
  },
  {
    icon: CheckCircle,
    parts: [
      "Gia tăng ",
      { text: "tuổi thọ và độ bền", bold: true },
      " của hệ thống drone – giúp tiết kiệm chi phí thay thế lớn về lâu dài."
    ]
  },
  {
    icon: CheckCircle,
    parts: [
      "Tăng độ ",
      { text: "an toàn bay,", bold: true },
      " giảm rủi ro vận hành – đặc biệt quan trọng khi thực hiện bay kỹ thuật hoặc bay thương mại."
    ]
  },
  {
    icon: CheckCircle,
    parts: [
      "Hỗ trợ bởi ",
      { text: "đội ngũ kỹ thuật chuyên nghiệp", bold: true },
      " của Hitek Flycam, quy trình chuẩn và báo cáo rõ ràng."
    ]
  }
];

  const faqs = [
    {
      question: "Bao lâu nên thực hiện bảo trì drone một lần?",
      answer: "Thời gian sửa chữa phụ thuộc vào mức độ hỏng hóc. Với lỗi nhẹ: 2-4 giờ, lỗi vừa: 6-12 giờ, lỗi nặng: 24-48 giờ. Chúng tôi luôn cố gắng hoàn thành sớm nhất có thể."
    },
    {
      question: "Drone bị lệch hướng hoặc GPS kém có sửa được không?",
      answer: "Có. Tất cả dịch vụ sửa chữa đều được bảo hành từ 6-24 tháng tùy loại hình sửa chữa. Linh kiện thay thế được bảo hành theo chính sách của hãng."
    },
    {
      question: "Có nhận kiểm tra online hoặc gửi thiết bị từ xa được không?",
      answer: "100% linh kiện thay thế là chính hãng, được nhập khẩu trực tiếp từ các đối tác uy tín. Chúng tôi cam kết không sử dụng linh kiện giả, nhái kém chất lượng."
    },
    {
      question: "Có bảo hành sau khi sửa chữa không?",
      answer: "Có dịch vụ sửa chữa tại nhà/khu vực TP.HCM và Hà Nội với phí dịch vụ. Tuy nhiên, để đảm bảo chất lượng, chúng tôi khuyến nghị mang đến trung tâm để có thiết bị chuyên dụng."
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Giải pháp kĩ thuật của
              <span className="text-vibrant-red"> Hitek Flycam</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-10 h-10 text-primary" />
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
<section className="py-20 bg-secondary">
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
        <section className="py-20">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-vibrant-red mb-16">
            Lợi ích cho khách hàng
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      <section className="py-20 bg-secondary">
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