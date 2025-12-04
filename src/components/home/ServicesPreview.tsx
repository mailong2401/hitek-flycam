import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface Service {
  title: string;
  description: string;
  image: string;
  link: string;
}



export default function ServicesPreview() {
  const { t } = useLanguage();
  const services: Service[] = [
  {
    title: t(`services.${0}.title`),
    description: t(`services.${0}.subDes`),
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80",
    link: "/dich-vu/sua-chua-drone",
  },
  {
    title: t(`services.${1}.title`),
    description: t(`services.${1}.title`),
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
    link: "/dich-vu/drone-trac-dia",
  },
  {
    title: t(`services.${2}.title`),
    description: t(`services.${2}.title`),
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80",
    link: "/dich-vu/quay-flycam",
  },
];
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t("home.servicesSection.title")}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t("home.servicesSection.subtitle")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link to="/dich-vu">{t("home.servicesSection.viewAll")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ title, description, image, link }: Service) {
  const { t } = useLanguage();

  return (
    <Link
      to={link}
      className="group relative overflow-hidden rounded-xl aspect-[4/3] block"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/50 to-transparent flex items-end p-8">
        <div>
          <h3 className="text-white font-bold text-2xl mb-2">{title}</h3>
          <p className="text-white/80 mb-4">{description}</p>
          <span className="inline-flex items-center text-primary font-medium">
            {t("linkText")} <ArrowRight className="ml-2 w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
