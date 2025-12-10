import { motion } from "framer-motion";
import { Shield, Zap } from "lucide-react";
import Bg_flycam from "@/assets/home/bg.png";
import Lg_flycam from "@/assets/logo/logo-flycam-hitek.png";
import photo1 from "@/assets/blog/photo1.avif";
import React, { useRef, useEffect } from "react";
interface BlogHeroSectionProps {
  totalPosts: number;
  totalViews: number;
  totalCategories: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 100,
      duration: 0.8
    }
  }
} as const;

const floatingAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const
  }
} as const;

export default function BlogHeroSection({ 
  totalPosts, 
  totalViews, 
  totalCategories 
}: BlogHeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={photo1}
          alt="Nền drone chuyên nghiệp - Hitek Flycam Drone Services Việt Nam"
          className="w-full h-full object-cover"
          loading="eager"
          width="1920"
          height="1080"
        />
        {/* Đơn giản - chỉ một lớp overlay tối */}
        <div className="absolute inset-0 bg-black/40" />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/90" /> */}
        {/* Gradient Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-primary/10 to-background/30" /> */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" /> */}
      </div>

      {/* Floating Drone Elements */}
      <motion.div
        animate={floatingAnimation}
        className="absolute top-30 left-10 hidden lg:block"
      >
        <div className="w-8 h-8 bg-primary/20 rounded-full blur-sm" />
        <img
          src={Lg_flycam}
          alt="Logo Hitek Flycam - Drone Camera Việt Nam"
          className="w-10 h-10 absolute inset-0 m-auto"
          loading="lazy"
          width="40"
          height="40"
        />
      </motion.div>
      
      <motion.div
        animate={{
          ...floatingAnimation,
          y: [5, -5, 5],
          transition: { ...floatingAnimation.transition, delay: 1 }
        }}
        className="absolute top-1/3 right-20 hidden lg:block"
      >
        <div className="w-10 h-10 bg-primary/15 rounded-full blur-sm" />
        <img
          src={Lg_flycam}
          alt="Logo Flycam Hitek - Thiết bị bay không người lái UAV"
          className="w-10 h-10 absolute inset-0 m-auto"
          loading="lazy"
          width="40"
          height="40"
        />
      </motion.div>

      <motion.div
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 1.5 }
        }}
        className="absolute bottom-32 left-1/4 hidden lg:block"
      >
        <Shield className="w-7 h-7 text-primary/30" aria-label="Bảo hành drone 2 năm chính hãng" />
      </motion.div>

      <motion.div
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 0.5 }
        }}
        className="absolute bottom-20 right-1/4 hidden lg:block"
      >
        <Zap className="w-6 h-6 text-primary/25" aria-label="Drone tốc độ cao 120km/h pin lâu" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto text-center"
        >
          {/* Logo với semantic markup */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full" />
              <img
                src={Lg_flycam}
                alt="Logo Hitek Flycam - Chuyên drone Việt Nam uy tín"
                className="relative w-32 h-32 md:w-48 md:h-48 object-contain mx-auto"
                loading="eager"
                width="192"
                height="192"
              />
            </div>
          </motion.div>

          {/* Main Heading với SEO headings */}
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              <span className="block">BLOG DRONE</span>
              <span className="block text-2xl md:text-4xl lg:text-5xl text-primary mt-2">
                Kiến thức & Tin tức Flycam
              </span>
            </h1>
            <meta itemProp="headline" content="Blog Drone - Kiến thức & Tin tức về Flycam tại Việt Nam" />
          </motion.div>

          {/* Description */}
          <motion.div
            variants={itemVariants}
            className="mb-10"
          >
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Cập nhật tin tức mới nhất, đánh giá chuyên sâu và hướng dẫn chi tiết 
              về công nghệ drone, kỹ thuật bay và các ứng dụng thực tiễn tại Việt Nam.
            </p>
          </motion.div>

          {/* Stats - chỉ hiển thị khi có data */}
          {totalPosts > 0 && (
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-16 max-w-3xl mx-auto"
            >
              {[
                { number: totalPosts.toString(), label: "Bài viết" },
                { number: totalViews.toLocaleString(), label: "Lượt xem" },
                { number: totalCategories.toString(), label: "Danh mục" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border"
                >
                  <div className="text-xl md:text-2xl font-bold text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" /> */}
    </section>
  );
}