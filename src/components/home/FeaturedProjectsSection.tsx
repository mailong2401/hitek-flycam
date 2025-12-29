import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import photo1 from "@/assets/home/project/photo-1.avif";
import photo2 from "@/assets/home/project/photo-2.avif";
import photo3 from "@/assets/home/project/photo-3.avif";
import photo4 from "@/assets/home/project/photo-4.avif";
import { useLanguage } from "@/contexts/LanguageContext";

// Define interface for project
interface Project {
  title: string;
  category: string;
  description: string;
}

// Static images
const projectImages = [photo1, photo2, photo3, photo4];

export default function FeaturedProjectsSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Get projects data from translation
  const projectsData = t<Project[]>("home.featuredProjects.projects");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 12,
        duration: 0.7
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      x: 20 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.8,
        delay: 0.5
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="py-16 bg-secondary"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6"
        >
          <div className="flex-1">
            <motion.h2 
              variants={titleVariants}
              className="text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-4"
            >
              {t<string>("home.featuredProjects.title")}{" "}
              <motion.span 
                className="text-primary dark:text-red-400 ml-2"
              >
                {t<string>("home.featuredProjects.highlight")}
              </motion.span>
            </motion.h2>
            <motion.p 
              variants={titleVariants}
              className="text-muted-foreground dark:text-gray-300 text-lg max-w-2xl"
            >
              {t<string>("home.featuredProjects.subtitle")}
            </motion.p>
          </div>
          
          <motion.div
            variants={buttonVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-2 border-primary dark:border-red-400 text-primary dark:text-red-400 hover:bg-primary/10 dark:hover:bg-blue-400/10 transition-all duration-300"
            >
              {t<string>("home.featuredProjects.viewAllProjects")}
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  repeatDelay: 1 
                }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {projectsData.map((project: Project, index: number) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
              }}
              className="group relative overflow-hidden"
            >
              {/* Project Card */}
              <div className="bg-card dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 h-full border border-border dark:border-gray-700">
                {/* Image Container */}
                <motion.div 
                  className="relative overflow-hidden h-56"
                >
                  <img
                    src={projectImages[index]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <motion.div 
                    className="absolute top-4 left-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <span className="bg-gradient-to-r from-primary to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {project.category}
                    </span>
                  </motion.div>
                  
                  {/* View Button on Hover */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Button className="bg-white text-primary hover:bg-white/90 font-semibold px-6 py-3 rounded-full shadow-lg">
                      Xem chi tiết
                    </Button>
                  </motion.div>
                </motion.div>
                
                {/* Content */}
                <div className="p-6">
                  <motion.h3 
                    className="text-xl font-bold text-foreground dark:text-white mb-3 line-clamp-2 group-hover:text-primary dark:group-hover:text-red-400 transition-colors duration-300"
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p 
                    className="text-muted-foreground dark:text-gray-300 mb-4 line-clamp-2"
                  >
                    {project.description}
                  </motion.p>
                  <motion.div
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto text-primary dark:text-red-400 hover:text-primary/80 dark:hover:text-red-300 hover:bg-transparent group/btn"
                    >
                      <span className="flex items-center gap-2">
                        Xem chi tiết
                        <motion.span
                          className="inline-block"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 1.5,
                            repeatDelay: 0.5 
                          }}
                        >
                          →
                        </motion.span>
                      </span>
                    </Button>
                  </motion.div>
                </div>
              </div>
              
              {/* Glow Effect */}
              <motion.div 
                className="absolute -z-10 top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground dark:text-gray-300 mb-6 text-lg">
            {t<string>("home.featuredProjects.cta.projectInquiry")}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary text-white font-bold py-6 px-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <span className="flex items-center gap-3">
                {t<string>("home.featuredProjects.cta.submitProject")}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2, 
                    ease: "linear",
                    repeatDelay: 3 
                  }}
                  className="group-hover:rotate-90 transition-transform duration-300"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}