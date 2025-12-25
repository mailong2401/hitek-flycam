// components/services/HeroSection.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import BgServices from "@/assets/home/bg.png";
import LgFlycam from "@/assets/logo/camera-drone.png";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServicesHero() {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={BgServices}
          alt="Drone Services Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto text-center"
        >
          {/* Logo và Tiêu đề */}
          <motion.div
            variants={itemVariants}
            className="mb-10"
          >
            <div className="flex flex-col items-center gap-8">
              <div className="relative">
                <div className="absolute inset-0 rounded-full" />
                <img
                  src={LgFlycam}
                  alt="Hitek Flycam Logo"
                  className="relative w-124 h-auto md:w-124 object-contain"
                />
              </div>
              <div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button asChild size="lg" className="text-xl px-10 py-7 rounded-2xl">
              <Link to="/lien-he">
                <Phone className="mr-3 w-6 h-6" />
                {t<string>("home.servicesPage.servicesHero.cta.contact")}
                <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}