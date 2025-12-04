// components/documents/HeroSection.tsx
import { motion } from "framer-motion";
import Lg_flycam from "@/assets/logo/logo-flycam-hitek.png";
import Bg_flycam from "@/assets/home/bg.png";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      }
    }
  } as const;

  return (
    <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={Bg_flycam}
          alt="Drone Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="mb-4 md:mb-6 flex justify-center">
            <div className="relative">
              <img
                src={Lg_flycam}
                alt="Hitek Flycam Logo"
                className="relative w-24 h-24 md:w-32 md:h-32 object-contain mx-auto"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-3 md:mb-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              <span className="text-foreground">TÀI LIỆU </span>
              <span className="text-primary">
                HITEK FLYCAM
              </span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Brochure, portfolio và tài liệu kỹ thuật chính thức của Hitek Flycam – đơn vị<br/>
              cung cấp giải pháp drone chuyên nghiệp hàng đầu Việt Nam.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
