import HeroBanner from "@/components/subService/HeroBanner";
import FeaturesSection from "@/components/subService/FeaturesSection";
import ProcessTimeline from "@/components/subService/ProcessTimeline";
import BenefitsSection from "@/components/subService/BenefitsSection";
import FAQSection from "@/components/subService/FAQSection";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import fix from "@/assets/services/repairing_drone/fix.png";
import icon1 from "@/assets/services/repairing_drone/icon2.png";
import icon2 from "@/assets/services/repairing_drone/icon3.png";
import icon3 from "@/assets/services/repairing_drone/icon1.png";
import dronerepair from "@/assets/services/repairing_drone/dronerepair.jpg";
export default function DroneRepair() {
  const { t } = useLanguage();

  const heroData = {
    title: t<string>("services.droneRepair.hero.title"),
    subtitle: t<string>("services.droneRepair.hero.subtitle"),
    backgroundImage: fix,
    height: "400px",
    titleSize: "text-6xl",
    subtitleSize: "text-2xl",
  };

  const featuresData = {
    title: t<string>("services.droneRepair.features.title"),
    highlightedText: t<string>("services.droneRepair.features.highlightedText"),
    features: t<any[]>("services.droneRepair.features.items").map((item, index) => ({
      icon: [icon1, icon2, icon3][index],
      title: item.title,
      description: item.description || ""
    }))
  };

  const processData = {
    title: t<string>("services.droneRepair.process.title"),
    processes: t<any[]>("services.droneRepair.process.items")
  };

  const benefitsData = {
    imageUrl: dronerepair,
    title: t<string>("services.droneRepair.benefits.title"),
    highlightedText: t<string>("services.droneRepair.benefits.highlightedText"),
    benefits: t<any[]>("services.droneRepair.benefits.items").map(item => ({
      icon: CheckCircle,
      parts: item.parts
    })),
    imageHeight: "h-[400px] md:h-[500px]",
    imageClassName: "mt-8"
  };

  const faqData = {
    title: t<string>("services.droneRepair.faq.title"),
    faqs: t<any[]>("services.droneRepair.faq.items")
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