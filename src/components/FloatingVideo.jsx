import { useRef, useEffect, useState } from "react";
import droneIcon from "@/assets/logo/Drone2.webm";

export default function FloatingVideo() {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Hiển thị khi scroll xuống 100px
      setIsVisible(scrollY > 100);
      
      // Tính vị trí dựa trên scroll
      const maxScroll = document.documentElement.scrollHeight - windowHeight;
      const scrollProgress = scrollY / maxScroll;
      setPosition(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Gọi ngay lần đầu

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tính vị trí top dựa trên scroll progress
  const topPosition = 50 + (position * 30); // Di chuyển từ 50% đến 80%

  return (
    <div 
    className={`fixed right-0 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
    }`}
    style={{
        top: `${topPosition}vh`,
        transform: 'translateY(-50%)'
    }}
    >
    <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="w-50 h-50 object-contain mr-6" // Thêm margin-right
    >
        <source src={droneIcon} type="video/webm" />
    </video>
    </div>
  );
}