// DetailedServicesSection.tsx
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import tech from '@/assets/services/icon2/tech.png';
import group from '@/assets/services/icon2/group.png';
import app from '@/assets/services/icon2/app.png';
import security from '@/assets/services/icon2/security.png';
import engineer from '@/assets/services/icon2/engineer.png';
import fix from '@/assets/services/icon2/fix.png';
import { useLanguage } from "@/contexts/LanguageContext";

interface ServiceItem {
  title: string;
  description: string;
}

export default function DetailedServicesSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // FIXED PATH: từ "servicesPage.detailedServices.services" → "home.servicesPage.detailedServices.services"
  const serviceItems = t<ServiceItem[]>("home.servicesPage.detailedServices.services");
  
  const serviceIcons = [tech, engineer, fix, security, group, app];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.7
      }
    }
  };

   return (
    <section ref={ref} className="py-16 bg-background dark:bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground dark:text-white">
            {t<string>("home.servicesPage.detailedServices.title")} {/* FIXED */}
            <span className="text-primary dark:text-red-400 ml-2">
              {t<string>("home.servicesPage.detailedServices.highlight")} {/* FIXED */}
            </span>
            {t<string>("home.servicesPage.detailedServices.question")} {/* FIXED */}
          </h2>
          <p className="text-lg text-muted-foreground dark:text-gray-300 mx-auto whitespace-nowrap">
            {t<string>("home.servicesPage.detailedServices.subtitle")} {/* FIXED */}
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {serviceItems.map((service: ServiceItem, index: number) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className="bg-card dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-border dark:border-gray-700 h-full">
                {/* Icon với hiệu ứng */}
                <motion.div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-blue-900/20 dark:to-blue-800/10"
                >
                  <motion.img 
                    src={serviceIcons[index]} 
                    alt={service.title}
                    className="w-16 h-16 object-contain"
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </motion.div>
                
                {/* Title */}
                <motion.h3 
                  className="text-2xl font-bold mb-4 text-foreground dark:text-white"
                >
                  {service.title}
                </motion.h3>
                
                {/* Description */}
                <motion.p 
                  className="text-muted-foreground dark:text-gray-300 mb-6 leading-relaxed"
                >
                  {service.description}
                </motion.p>
                
                {/* Decorative elements */}
                <motion.div 
                  className="absolute -z-10 top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Additional decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold py-6 px-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t<string>("home.servicesPage.detailedServices.cta.learnMore")} {/* FIXED */}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}