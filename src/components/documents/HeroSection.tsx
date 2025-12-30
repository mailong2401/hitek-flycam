// components/documents/HeroSection.tsx
import { motion } from "framer-motion";
import Lg_flycam from "@/assets/logo/camera-drone.png";
import Bg_flycam from "@/assets/documents/bgdocument.png";

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
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={Bg_flycam}
            alt="Drone Background"
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
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="relative pt-7">
                <img
                  src={Lg_flycam}
                  alt="Hitek Flycam Logo"
                  className="relative w-124 h-auto object-contain mx-auto"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="mb-3 md:mb-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                  <span className="text-black">TÀI LIỆU </span>
                  <span className="text-primary">
                    HITEK FLYCAM
                  </span>
                </h1>
              </motion.div>

              <motion.div variants={itemVariants}>
                <p className="text-sm md:text-lg text-black max-w-2xl mx-auto">
                  Brochure, portfolio và tài liệu kỹ thuật chính thức của Hitek Flycam <br />– đơn vị 
                  cung cấp giải pháp drone chuyên nghiệp hàng đầu Việt Nam.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
