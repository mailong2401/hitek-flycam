// components/contact/ContactHero.tsx
import { motion } from "framer-motion";

const ContactHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center max-w-3xl mx-auto mb-16"
    >
      <motion.h1 
        variants={itemVariants}
        className="text-4xl md:text-5xl font-bold text-foreground mb-6"
      >
        Liên hệ với chúng tôi
      </motion.h1>
      
      <motion.p 
        variants={itemVariants}
        className="text-lg md:text-xl text-muted-foreground"
      >
        Hãy để chúng tôi giúp bạn với dự án drone của bạn. Chúng tôi luôn sẵn sàng hỗ trợ 24/7.
      </motion.p>

      {/* Decorative elements */}
      <motion.div
        variants={itemVariants}
        className="mt-8 flex justify-center space-x-4"
      >
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        <div className="w-2 h-2 bg-primary rounded-full"></div>
      </motion.div>
    </motion.div>
  );
};

export default ContactHero;
