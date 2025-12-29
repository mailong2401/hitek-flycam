// components/about/QuoteSection.tsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Quote } from "lucide-react";

const QuoteSection = () => {
  const { t } = useLanguage();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const quoteVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 80,
        duration: 1.2
      }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  return (
    <section 
      ref={ref}
      className="py-20 relative overflow-hidden bg-background"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background" />
        
        {/* Animated Orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-red-600/5 to-transparent rounded-full blur-3xl"
          animate={pulseAnimation}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-red-400/5 to-transparent rounded-full blur-3xl"
          animate={{
            ...pulseAnimation,
            transition: { ...pulseAnimation.transition, delay: 1 }
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Quote Text */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={quoteVariants}
          >
            <div className="relative">
              {/* Icon ngoặc kép đầu - màu đỏ */}
              <div className="absolute -left-2 -top-2 md:-left-4 md:-top-4 scale-x-[-1]">
                <Quote className="w-10 h-10 md:w-14 md:h-14 text-red-600 fill-red-600" />
              </div>

              {/* Icon ngoặc kép cuối - màu đỏ */}
              <div className="absolute -right-2 -bottom-2 md:-right-4 md:-bottom-4">
                <Quote className="w-10 h-10 md:w-14 md:h-14 text-red-600 fill-red-600" />
              </div>

              {/* Nội dung quote */}
              <div className="relative z-10 px-8 py-4">
                <p className="text-base md:text-lg lg:text-xl font-bold text-black text-center leading-relaxed">
                  {t("about.quote.content.0" as any)}{" "}
                  <span className="text-black">
                    {t("about.quote.content.1" as any)}
                  </span>{" "}
                  {t("about.quote.content.2" as any)}{" "}
                  <span className="text-black">
                    {t("about.quote.content.3" as any)}
                  </span>{" "}
                  {t("about.quote.content.4" as any)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;