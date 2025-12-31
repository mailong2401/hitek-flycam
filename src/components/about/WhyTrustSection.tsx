// components/about/WhyTrustSection.tsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Award, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Component con cho 3D Image Carousel
const Image3DCarousel = ({ images }: { images: Array<{ src: string; alt: string; title: string }> }) => {
  const quantity = images.length; // 10 ảnh

  return (
    <div className="banner">
      {/* 3D Carousel Container */}
      <div 
        className="slider"
        style={{
          position: 'absolute',
          width: '150px',
          height: '250px',
          top: '10%',
          left: 'calc(50% - 100px)',
          transformStyle: 'preserve-3d',
          transform: 'perspective(1000px)',
          animation: 'autoRun 20s linear infinite'
        }}
      >
        {images.map((image, index) => {
          const position = index + 1;
          const angle = (position - 1) * (360 / quantity);
          
          return (
            <div
              key={index}
              className="item"
              style={{
                position: 'absolute',
                inset: '0 0 0 0',
                transform: `rotateY(${angle}deg) translateZ(255px)`
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        .banner {
          width: 100%;
          height: 500px;
          text-align: center;
          overflow: hidden;
          position: relative;
        }
        
        @keyframes autoRun {
          from {
            transform: perspective(1000px) rotateX(-16deg) rotateY(0deg);
          }
          to {
            transform: perspective(1000px) rotateX(-16deg) rotateY(360deg);
          }
        }
      `}</style>
    </div>
  );
};

const WhyTrustSection = () => {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 100,
        duration: 0.8
      }
    }
  };

  const trustPoints = [
    {
      number: "01",
      title: t(`about.whyTrust.points.${0}.title`),
      description: t(`about.whyTrust.points.${0}.description`),
      icon: Award,
      image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=400&q=80"
    },
    {
      number: "02",
      title: t(`about.whyTrust.points.${1}.title`),
      description: t(`about.whyTrust.points.${1}.description`),
      icon: Shield,
      image: "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      number: "03",
      title: t(`about.whyTrust.points.${2}.title`),
      description: t(`about.whyTrust.points.${2}.description`),
      icon: Zap,
      image: "https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  // Tạo mảng hình ảnh với 10 ảnh
  const carouselImages = [
    {
      src: "https://images.unsplash.com/photo-1527441385177-3dad16222699?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTl8fGRyb25lfGVufDB8fDB8fHww",
      alt: "Award Winning Excellence",
      title: "Award Winning"
    },
    {
      src: "https://images.unsplash.com/photo-1532989029401-439615f3d4b4?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Maximum Security Protection",
      title: "Security Shield"
    },
    {
      src: "https://images.unsplash.com/photo-1495764506633-93d4dfed7c6b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Fast Delivery Service",
      title: "Fast Delivery"
    },
    {
      src: "https://images.unsplash.com/photo-1514043454212-14c181f46583?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Professional Expert Team",
      title: "Expert Team"
    },
    {
      src: "https://images.unsplash.com/photo-1489558546780-a69e0b3293e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGRyb25lfGVufDB8fDB8fHww",
      alt: "Professional Expert Team",
      title: "Expert Team"
    },
    {
      src: "https://images.unsplash.com/photo-1504881464977-380fd2f91c51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGRyb25lfGVufDB8fDB8fHww",
      alt: "Fast Delivery Service",
      title: "Fast Delivery"
    },
    {
      src: "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Modern Advanced Technology",
      title: "Advanced Tech"
    },
  ];

  return (
    <section 
      ref={ref}
      className="py-20 bg-gradient-to-b from-background to-red-50/20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t("about.whyTrust.title1")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
                {t("about.whyTrust.highlightedTitle")}
              </span>{" "}
              {t("about.whyTrust.title2")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              {t("about.whyTrust.subtitle")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - 3D Carousel */}
            <motion.div
              variants={itemVariants}
              className="relative flex justify-center"
            >
              <Image3DCarousel images={carouselImages} />
              
              {/* Decorative Element */}
              <motion.div 
                className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              variants={containerVariants}
              className="space-y-8 md:space-y-10"
            >
              {trustPoints.map((point, index) => (
                <motion.div
                  key={point.number}
                  variants={itemVariants}
                  className="bg-card backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border group"
                >
                  <div className="flex items-start gap-4 md:gap-6">
                    {/* Number */}
                    <motion.div 
                      className="flex-shrink-0"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-white">{point.number}</span>
                      </div>
                    </motion.div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-xl font-bold text-foreground">{point.title}</h3>
                      </div>
                      <motion.p
                        className="text-base text-muted-foreground leading-relaxed"
                        initial={{ opacity: 0.8 }}
                      >
                        {point.description}
                      </motion.p>
                    </div>
                  </div>
                  {/* Accent Line */}
                  <motion.div 
                    className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-500 mt-4"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyTrustSection;