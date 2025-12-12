import IconServicesSection from "@/components/home/IconServicesSection";
import IntroSection from "@/components/home/IntroSection";
import InteractiveCardsSection from "@/components/home/InteractiveCardsSection";
import DetailedServicesSection from "@/components/home/DetailedServicesSection";
import FeaturedProjectsSection from "@/components/home/FeaturedProjectsSection";
import TrustedClientsSection from "@/components/home/TrustedClientsSection";
import NewsSection from "@/components/home/NewsSection";
import HeroSection from "@/components/home/HeroSection"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <IconServicesSection />
      <IntroSection />
      <InteractiveCardsSection />
      <DetailedServicesSection />
      <FeaturedProjectsSection />
      <TrustedClientsSection />
      <NewsSection />
    </div>
  );
}
