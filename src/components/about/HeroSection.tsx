// components/about/AboutHeroSection.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import BgAbout from "@/assets/about_us/hero.png";
import logo from "@/assets/logo/camera-drone.png";
import LgFlycam from "@/assets/logo/logo-flycam-hitek.png";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
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
        type: "spring" as const,
        damping: 15,
        stiffness: 80,
        duration: 1
      }
    }
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden"> {/* Thay đổi: justify-between */}
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src={BgAbout}
      alt="About Hitek Flycam Background"
      className="w-full h-full object-cover"
    />
  </div>

  <div className="container mx-auto px-4 relative z-10 flex-1 flex items-center justify-center pb-8"> {/* Thêm pb-8 để giảm khoảng cách */}
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto text-center"
    >
      {/* Logo ở giữa màn hình */}
      <motion.div
        variants={itemVariants}
      >
        <img
          src={logo}
          alt="logo"
          className="w-full max-w-3xl h-auto object-contain mx-auto"
        />
      </motion.div>
    </motion.div>
  </div>

  {/* Nút ở đáy */}
  <div className="relative z-10 w-full mb-16 -mt-32 pb-10"> {/* Thêm -mt-8 để kéo lên gần */}
    <div className="container mx-auto px-4">
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
      >
        <Button asChild size="lg" className="text-xl px-10 py-7 rounded-2xl bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary">
          <Link to="/dich-vu">
            <Rocket className="mr-3 w-6 h-6" />
            {t("about.hero.cta.exploreServices")}
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>
        </Button>
        
        <Button asChild variant="outline" size="lg" className="text-xl px-10 py-7 rounded-2xl border-2 border-primary text-primary hover:bg-primary/10">
          <Link to="/lien-he">
            <Users className="mr-3 w-6 h-6" />
            {t("about.hero.cta.contactCooperation")}
          </Link>
        </Button>
      </motion.div>
    </div>
  </div>
</section>
  );
}