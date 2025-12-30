import HeroBanner from "@/components/subService/HeroBanner";
import FeaturesSection from "@/components/subService/FeaturesSection";
import ProcessTimeline from "@/components/subService/ProcessTimeline";
import BenefitsSection from "@/components/subService/BenefitsSection";
import FAQSection from "@/components/subService/FAQSection";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import fix from "@/assets/services/importing_drone/bg.png";
import icon1 from "@/assets/services/delivery_drone/icon1.png";
import icon2 from "@/assets/services/delivery_drone/icon2.png";
import icon3 from "@/assets/services/delivery_drone/icon3.png";
import droneimport from "@/assets/services/importing_drone/droneimport.png";
export default function DroneImport() {
  const { t } = useLanguage();

  const heroData = {
    title: t<string>("services.droneImport.hero.title"),
    subtitle: t<string>("services.droneImport.hero.subtitle"),
    backgroundImage: fix,
    height: "400px",
    titleSize: "text-6xl",
    subtitleSize: "text-2xl",
    overlayOpacity: 0.7,
  };

  const featuresData = {
    title: t<string>("services.droneImport.features.title"),
    highlightedText: t<string>("services.droneImport.features.highlightedText"),
    features: t<any[]>("services.droneImport.features.items").map((item, index) => ({
      icon: [icon1, icon2, icon3][index],
      title: item.title,
      description: item.description || ""
    }))
  };

  const processData = {
    title: t<string>("services.droneImport.process.title"),
    processes: t<any[]>("services.droneImport.process.items"),
    titleSize: "text-[18px]"
  };

  const benefitsData = {
    imageUrl: droneimport,
    title: t<string>("services.droneImport.benefits.title"),
    highlightedText: t<string>("services.droneImport.benefits.highlightedText"),
    benefits: t<any[]>("services.droneImport.benefits.items").map(item => ({
      icon: CheckCircle,
      parts: item.parts
    })),
    imageHeight: "h-[400px] md:h-[500px]"
  };

  const faqData = {
    title: t<string>("services.droneImport.faq.title"),
    faqs: t<any[]>("services.droneImport.faq.items")
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroBanner {...heroData} />
      <FeaturesSection {...featuresData} />
      <ProcessTimeline {...processData} />
      <BenefitsSection {...benefitsData} />
      <FAQSection {...faqData} />
    </div>
  );
}