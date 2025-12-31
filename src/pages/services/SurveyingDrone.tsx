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
import dronesurveying from "@/assets/services/surveying_drone/dronesurveying.png";
export default function SurveyingDrone() {
  const { t } = useLanguage();

  const heroData = {
    title: t<string>("services.surveyingDrone.hero.title"),
    subtitle: t<string>("services.surveyingDrone.hero.subtitle"),
    backgroundImage: fix,
    height: "400px",
    titleSize: "text-6xl",
    subtitleSize: "text-[25px] leading-[32px]",
  };

  const featuresData = {
    title: t<string>("services.surveyingDrone.features.title"),
    highlightedText: t<string>("services.surveyingDrone.features.highlightedText"),
    features: t<any[]>("services.surveyingDrone.features.items").map((item, index) => ({
      icon: [icon1, icon2, icon3][index],
      title: item.title,
      description: item.description || ""
    }))
  };

  const processData = {
    title: t<string>("services.surveyingDrone.process.title"),
    processes: t<any[]>("services.surveyingDrone.process.items")
  };

  const benefitsData = {
    imageUrl: dronesurveying,
    title: t<string>("services.surveyingDrone.benefits.title"),
    highlightedText: t<string>("services.surveyingDrone.benefits.highlightedText"),
    benefits: t<any[]>("services.surveyingDrone.benefits.items").map(item => ({
      icon: CheckCircle,
      parts: item.parts
    })),
    imageHeight: "h-[300px] md:h-[350px]"
  };

  const faqData = {
    title: t<string>("services.surveyingDrone.faq.title"),
    faqs: t<any[]>("services.surveyingDrone.faq.items")
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