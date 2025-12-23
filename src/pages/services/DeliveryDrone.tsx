import HeroBanner from "@/components/subService/HeroBanner";
import FeaturesSection from "@/components/subService/FeaturesSection";
import ProcessTimeline from "@/components/subService/ProcessTimeline";
import BenefitsSection from "@/components/subService/BenefitsSection";
import FAQSection from "@/components/subService/FAQSection";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import fix from "@/assets/services/delivery_drone/fix.png";
import icon1 from "@/assets/services/delivery_drone/icon1.png";
import icon2 from "@/assets/services/delivery_drone/icon2.png";
import icon3 from "@/assets/services/delivery_drone/icon3.png";

export default function DeliveryDrone() {
  const { t } = useLanguage();

  const heroData = {
    title: t<string>("services.deliveryDrone.hero.title"),
    subtitle: t<string>("services.deliveryDrone.hero.subtitle"),
    backgroundImage: fix,
    height: "400px",
    titleSize: "text-6xl",
    subtitleSize: "text-2xl",
  };

  const featuresData = {
    title: t<string>("services.deliveryDrone.features.title"),
    highlightedText: t<string>("services.deliveryDrone.features.highlightedText"),
    features: t<any[]>("services.deliveryDrone.features.items").map((item, index) => ({
      icon: [icon1, icon2, icon3][index],
      title: item.title,
      description: item.description || ""
    }))
  };

  const processData = {
    title: t<string>("services.deliveryDrone.process.title"),
    processes: t<any[]>("services.deliveryDrone.process.items")
  };

  const benefitsData = {
    imageUrl: "https://victory.com.vn/wp-content/uploads/2022/12/mavic-3m-nong-nghiep-5.png",
    title: t<string>("services.deliveryDrone.benefits.title"),
    highlightedText: t<string>("services.deliveryDrone.benefits.highlightedText"),
    benefits: t<any[]>("services.deliveryDrone.benefits.items").map(item => ({
      icon: CheckCircle,
      parts: item.parts
    }))
  };

  const faqData = {
    title: t<string>("services.deliveryDrone.faq.title"),
    faqs: t<any[]>("services.deliveryDrone.faq.items")
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