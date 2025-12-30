import { ReactNode, useRef, useEffect, useState } from "react";

interface HeroBannerProps {
  title: string;
  subtitle: string | ReactNode;
  backgroundImage: string;
  overlayOpacity?: number;
  overlayColor?: string;
  height?: string;
  titleSize?: string;
  subtitleSize?: string;
  imageClassName?: string;
}

export default function HeroBanner({
  title,
  subtitle,
  backgroundImage,
  overlayOpacity = 0.2,
  overlayColor = "black",
  height = "400px",
  titleSize = "text-6xl",
  subtitleSize = "text-2xl",
  imageClassName,
}: HeroBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageStyle, setImageStyle] = useState({});

  useEffect(() => {
    const updateImageStyle = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = parseInt(height);

        // Tính toán để ảnh có chiều cao chính xác bằng container
        // và chiều rộng đủ để cover, crop phần thừa
        // Nếu có imageClassName thì không set objectPosition để className có thể override
        const style: any = {
          width: "100%",
          height: `${containerHeight}px`,
        };

        if (!imageClassName) {
          style.objectFit = "cover";
          style.objectPosition = "center center";
        }

        setImageStyle(style);
      }
    };

    updateImageStyle();
    window.addEventListener("resize", updateImageStyle);

    return () => {
      window.removeEventListener("resize", updateImageStyle);
    };
  }, [height, imageClassName]);

  return (
    <div className="pt-20">
      <div 
        ref={containerRef}
        className={`relative overflow-hidden`}
        style={{ height }}
      >
        {/* Lớp bóng mờ màu đen */}
        <div 
          className="absolute inset-0 z-10" 
          style={{ 
            background: `linear-gradient(to right, ${overlayColor}, ${overlayColor})`,
            opacity: overlayOpacity 
          }} 
        />

        {/* Ảnh nền với kích thước cố định */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={backgroundImage}
            alt={title}
            style={imageStyle}
            className={imageClassName || "w-full"}
            loading="eager"
          />
        </div>

        {/* Nội dung ở giữa */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-white text-center px-4 max-w-6xl mx-auto">
            <h1 className={`${titleSize} font-bold mb-4`}>{title}</h1>
            <div className={`${subtitleSize} opacity-90`}>{subtitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
