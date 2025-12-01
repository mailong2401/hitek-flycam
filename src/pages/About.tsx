import { Target, Users, TrendingUp, Award, ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import long from "@/assets/team/Long.png";
import khoi from "@/assets/team/Khoi.png";
import sean from "@/assets/team/Sean.png";
import bg from "@/assets/about_us/hero.png";
import hero2 from "@/assets/about_us/team.png";
import logo_hitek from "@/assets/about_us/logo_hitek.png";
import logobg from "@/assets/logo/camera-drone.png";
export default function About() {
  const teamMembers = [
    {
      name: "Lâm Thứ Tiên",
      position: "Chủ tịch",
      image: long,
      info: [
        "Hơn 10 năm kinh nghiệm lãnh đạo và điều hành doanh nghiệp.",
        "Nền tảng vững chắc trong lĩnh vực kinh doanh và phát triển công nghệ.",
      ]
    },
    {
      name: "Trần Anh Khôi",
      position: "Tổng giám đốc", 
      image: khoi,
      info: [
        "Hơn 10 năm kinh nghiệm trong lĩnh vực công nghệ.",
        "Nhà sáng lập của nhiều doanh nghiệp tiên phong, những giải pháp “lần đầu tiên có mặt tại Việt Nam.",
      ]
    },
    {
      name: "Oh Sean Beom",
      position: "Giám đốc Kinh doanh",
      image: sean,
      info: [
        "Hơn 10 năm kinh nghiệm phát triển công nghệ.",
        "Năng lực lãnh đạo mạnh mẽ.",
        "Quản lý các dự án xuyên biên giới: Nhật Bản, Hàn Quốc, Việt Nam và châu Âu.",
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20">
      <div className="relative h-[400px] overflow-hidden">

        {/* Lớp bóng mờ màu đen */}
        <div className="absolute inset-0 bg-gradient-to-r from-black to-black opacity-40" />

        {/* Ảnh nền */}
        <img
          src={bg}
          alt="Drone in sky"
          className="w-full h-full object-cover object-[center_80%]"
        />

        {/* Nội dung ở giữa */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={logobg} alt="" className="h-50 w-50 mr-5" />

          {/* <div className="text-white text-right">
            <h1 className="text-6xl font-bold mb-4">HITEK FLYCAM</h1>
            <p className="text-2xl opacity-90">THE DRONE EXPERTS</p>
          </div> */}
        </div>
      </div>
    </div>
      {/* Khối 1: Tiêu đề, text và hình ảnh */}
      <section className="py-20 bg-light-gray">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-pure-black mb-6">
                Về 
                <span className="text-vibrant-red"> Hitek Flycam</span>
              </h2>
              <div className="space-y-4 text-pure-black">
                <p>
                  <span className="text-pure-black font-bold">Hitek Flycam </span>
                  là thương hiệu chuyên về giải pháp Drone ứng dụng đa ngành, 
                  được phát triển từ nền tảng công nghệ, nhân lực và kinh nghiệm của Hitek 
                  Drone – đơn vị tiên phong trong lĩnh vực Drone Light Show và công nghệ 
                  trình diễn trên không tại Việt Nam.
                </p>
                <p>
                  Thuộc Hitek Group JSC, Hitek Flycam mở rộng sứ mệnh của Hitek Drone sang 
                  các lĩnh vực kỹ thuật, khảo sát, logistics và dịch vụ công nghiệp, với mục 
                  tiêu đưa công nghệ bay vào phục vụ các lĩnh vực  khác như đời sống, sản
                   xuất và quản lý thông minh.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src={hero2}
                alt="Drone technology"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Khối 2: Nhiều hình ảnh */}
      <section className="py-20 bg-pure-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=400&q=80"
                alt="Drone inspection"
                className="rounded-2xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1532989029401-439615f3d4b4?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Drone delivery"
                className="rounded-2xl shadow-lg mt-8 h-[400px]"
              />
              <img
                src="https://images.unsplash.com/photo-1495764506633-93d4dfed7c6b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Drone photography"
                className="rounded-2xl shadow-lg ml-40"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-pure-black mb-6">
                Tại sao
                <span className="text-vibrant-red"> Hitek Flycam </span>
                là đơn vị đáng tin cậy?
              </h2>
              <div className="space-y-4 text-xl text-pure-black">
                <p>Sự đảm bảo của Hitek Flycam</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Khối 3: Có đường link click được */}
      <section className="py-20 bg-light-gray">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-pure-black mb-6">
                Mối liên hệ giữa
                <div className="text-vibrant-red">
                  <span> Hitek Flycam </span>
                  <span className="text-pure-black">&</span>
                  <span> Hitek Drone</span>
                </div>
              </h2>
              <div className="space-y-4 text-warm-gray mb-8">
                <p>
                  Nếu Hitek Drone là biểu tượng của nghệ thuật và trình diễn, 
                  thì Hitek Flycam là đại diện cho ứng dụng công nghệ Drone vào sản 
                  xuất và vận hành thực tế. Cả hai thương hiệu cùng chia sẻ một tầm 
                  nhìn chung:
                </p>
              </div>
              <div className="flex">
                <div className="w-4 h-[50px] bg-vibrant-red mr-3" />
                <div>
                  <p className="font-bold text-pure-black mb-4">
                    Xây dựng hệ sinh thái Drone toàn diện – nơi công nghệ bay phục vụ 
                    con người trong mọi lĩnh vực của cuộc sống.
                  </p>
                </div>
              </div>
              <Link to="/dich-vu">
                <div className="flex items-center text-vibrant-red font-semibold cursor-pointer hover:underline group">
                  Tìm hiểu thêm
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </div>
            <div className="relative flex justify-end">
              <img
                src={logo_hitek}
                alt="Future vision"
                className="rounded-2xl shadow-2xl w-[500px] h-[500px] border-4 border-vibrant-red"
              />
              
            </div>
          </div>
        </div>
      </section>

      {/* Khối 4: Châm ngôn */}
      <section className="py-20 bg-pure-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="w-12 h-12 text-vibrant-red mx-auto mb-6" />
            <blockquote className="text-3xl font-light text-foreground italic leading-relaxed mb-8">
              Từ nền tảng của Hitek Drone – nơi công nghệ bay được tôn vinh bằng nghệ thuật,
              Hitek Flycam tiếp tục hành trình đó bằng công nghệ, dữ liệu và hiệu quả thực tế.
            </blockquote>
            <div className="text-lg font-semibold text-muted-foreground">
              - Đội ngũ Hitek Flycam -
            </div>
          </div>
        </div>
      </section>

      {/* Khối 5: Đội ngũ lãnh đạo */}
      <section className="py-20 bg-light-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">
            Đội ngũ lãnh đạo
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-60 h-60 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/20">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-center text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-vibrant-red text-center font-semibold mb-6">
                  {member.position}
                </p>
                <div className="space-y-3">
                  {member.info.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <div className="w-2 h-2 bg-vibrant-red rounded-full mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}