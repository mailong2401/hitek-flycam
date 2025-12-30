// pages/Services.tsx
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BgServices from "@/assets/services/banner.jpg";
import LgFlycam from "@/assets/logo/camera-drone.png";
import { useLanguage } from "@/contexts/LanguageContext";
import InteractiveCardsSection from "@/components/home/InteractiveCardsSection";

export default function Services() {
  const { t } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
        duration: 1
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[55vh] md:min-h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={BgServices}
            alt="Drone Solutions Background"
            className="w-full h-full object-cover object-[50%_20%]"
          />
          {/* Lớp phủ mờ màu đen */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto text-center"
          >
            <motion.div
              variants={itemVariants}
              className="mb-10"
            >
              <div className="flex flex-col items-center gap-8 pt-16">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full" />
                  <img
                    src={LgFlycam}
                    alt="Hitek Flycam Logo"
                    className="relative w-124 h-auto md:w-124 object-contain"
                  />
                </div>
                
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-black">{t("servicesPage.title.part1" as any)} </span>
                <span className="text-vibrant-red">{t("servicesPage.title.highlight" as any)}</span>
              </h1>
              <p className="text-[19px] leading-[28px] text-gray-700">{t("servicesPage.description" as any)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gọi component InteractiveCardsSection từ file cũ */}
      <InteractiveCardsSection showTitle={false} />
    </div>
  );
}