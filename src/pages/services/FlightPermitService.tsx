import HeroBanner from "@/components/subService/HeroBanner";
import FeaturesSection from "@/components/subService/FeaturesSection";
import ProcessTimeline from "@/components/subService/ProcessTimeline";
import BenefitsSection from "@/components/subService/BenefitsSection";
import FAQSection from "@/components/subService/FAQSection";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import fix from "@/assets/services/surveying_drone/bg.png";
import icon1 from "@/assets/services/surveying_drone/icon1.png";
import icon2 from "@/assets/services/surveying_drone/icon2.png";
import icon3 from "@/assets/services/surveying_drone/icon3.png";

export default function FlightPermitService() {
  const { t } = useLanguage();

  const heroData = {
    title: t<string>("services.flightPermitService.hero.title"),
    subtitle: t<string>("services.flightPermitService.hero.subtitle"),
    backgroundImage: fix,
    height: "400px",
    titleSize: "text-6xl",
    subtitleSize: "text-2xl",
  };

  const featuresData = {
    title: t<string>("services.flightPermitService.features.title"),
    highlightedText: t<string>("services.flightPermitService.features.highlightedText"),
    features: t<any[]>("services.flightPermitService.features.items").map((item, index) => ({
      icon: [icon1, icon2, icon3][index],
      title: item.title,
      description: item.description || ""
    }))
  };

  const processData = {
    title: t<string>("services.flightPermitService.process.title"),
    processes: t<any[]>("services.flightPermitService.process.items")
  };

  const benefitsData = {
    imageUrl: "https://victory.com.vn/wp-content/uploads/2022/12/mavic-3m-nong-nghiep-5.png",
    title: t<string>("services.flightPermitService.benefits.title"),
    highlightedText: t<string>("services.flightPermitService.benefits.highlightedText"),
    benefits: t<any[]>("services.flightPermitService.benefits.items").map(item => ({
      icon: CheckCircle,
      parts: item.parts
    }))
  };

  const faqData = {
    title: t<string>("services.flightPermitService.faq.title"),
    faqs: t<any[]>("services.flightPermitService.faq.items")
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