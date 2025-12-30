import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroSectionProps {
  image?: string;
  title: string;
}

export const HeroSection = ({ image, title }: HeroSectionProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Xác định ngôn ngữ hiển thị
  const displayLanguage = t("lang") === 'vi' ? 'vi' : 'en';

  if (!image) return null;

  return (
    <div className="relative h-[400px] md:h-[500px] w-full">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <div className="container mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/blog")}
            className="text-white hover:bg-white/20 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {displayLanguage === 'vi' ? 'Quay lại' : 'Back'}
          </Button>
        </div>
      </div>
    </div>
  );
};