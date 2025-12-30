import HeroBanner from "@/components/subService/HeroBanner";
import FeaturesSection from "@/components/subService/FeaturesSection";
import ProcessTimeline from "@/components/subService/ProcessTimeline";
import BenefitsSection from "@/components/subService/BenefitsSection";
import FAQSection from "@/components/subService/FAQSection";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import fix from "@/assets/services/video/fix.png";
import icon1 from "@/assets/services/video/icon1.png";
import icon2 from "@/assets/services/video/icon2.png";
import icon3 from "@/assets/services/video/icon3.png";
import icon4 from "@/assets/services/video/icon4.png";
import dronefilming from "@/assets/services/dronefilming/dronefilming.avif";
export default function DroneFilming() {
  const { t } = useLanguage();

  const heroData = {
    title: t<string>("services.droneFilming.hero.title"),
    subtitle: t<string>("services.droneFilming.hero.subtitle"),
    backgroundImage: fix,
    height: "400px",
    titleSize: "text-6xl",
    subtitleSize: "text-[25px]",
    overlayOpacity: 0.7,
  };

  const featuresData = {
    title: t<string>("services.droneFilming.features.title"),
    highlightedText: t<string>("services.droneFilming.features.highlightedText"),
    features: t<any[]>("services.droneFilming.features.items").map((item, index) => ({
      icon: [icon1, icon2, icon3, icon4][index],
      title: item.title,
      description: item.description || ""
    })),
    descriptionSize: "text-[15px]"
  };

  const processData = {
    title: t<string>("services.droneFilming.process.title"),
    processes: t<any[]>("services.droneFilming.process.items"),
    titleSize: "text-[22px]"
  };

  const benefitsData = {
    imageUrl: dronefilming,
    title: t<string>("services.droneFilming.benefits.title"),
    highlightedText: t<string>("services.droneFilming.benefits.highlightedText"),
    benefits: t<any[]>("services.droneFilming.benefits.items").map(item => ({
      icon: CheckCircle,
      parts: item.parts
    })),
    imageHeight: "h-[400px] md:h-[500px]"
  };

  const faqData = {
    title: t<string>("services.droneFilming.faq.title"),
    faqs: t<any[]>("services.droneFilming.faq.items")
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