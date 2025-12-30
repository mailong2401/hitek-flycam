import { useState } from "react";
import { Plus, Minus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  faqs: FAQ[];
}

export default function FAQSection({
  title,
  faqs,
}: FAQSectionProps) {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {title}
            </h2>
          </div>

          {/* FAQ Items */}
          <div className="space-y-3 mb-12">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden transition-all duration-200 ${
                  openFaq === index ? "ring-1 ring-primary/20" : ""
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between"
                >
                  <div className="flex items-center w-full">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mr-4">
                      <span className="text-sm font-medium text-foreground">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-grow text-left">
                      <span className="text-base md:text-lg font-semibold text-foreground">
                        {faq.question}
                      </span>
                    </div>
                    {openFaq === index ? (
                      <Minus className="w-5 h-5 text-primary flex-shrink-0 ml-2" />
                    ) : (
                      <Plus className="w-5 h-5 text-primary flex-shrink-0 ml-2" />
                    )}
                  </div>
                </button>
                
                {openFaq === index && (
                  <div className="px-5 pb-5 pt-2 border-t border-border/30">
                    <div className="pl-12">
                      <div className="bg-secondary/5 rounded-lg p-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center pt-4 border-t border-border/50">

            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
              {t("faqSection.ctaTitle" as any)}
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              {t("faqSection.ctaDescription.part1" as any)} <span className="font-bold">{t("faqSection.ctaDescription.highlight" as any)}</span> {t("faqSection.ctaDescription.part2" as any)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md text-lg px-8 py-6"
              >
                {t("faqSection.buttons.contact" as any)}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                className="bg-background text-foreground border-2 border-gray-300 hover:bg-background hover:text-foreground hover:scale-105 transition-transform text-lg px-8 py-6"
              >
                {t("faqSection.buttons.viewMore" as any)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
