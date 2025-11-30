import { Link } from "react-router-dom";
import logobg from "@/assets/logo/camera-drone.png"; // đổi đường dẫn cho đúng dự án của bạn

export default function HeroSection() {
  return (
    <div className="pt-20">
      <div className="relative h-[400px] overflow-hidden">

        {/* Lớp bóng mờ màu đen */}
        <div className="absolute inset-0 bg-gradient-to-r from-black to-black opacity-80" />

        {/* Ảnh nền */}
        <img
          src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=2000&q=80"
          alt="Drone in sky"
          className="w-full h-full object-cover"
        />

        {/* Nội dung ở giữa */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={logobg} alt="" className="h-32 w-32 mr-5" />

          <div className="text-white text-right">
            <h1 className="text-6xl font-bold mb-4">HITEK FLYCAM</h1>
            <p className="text-2xl opacity-90">THE DRONE EXPERTS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
