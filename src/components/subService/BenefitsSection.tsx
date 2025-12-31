import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface BenefitPart {
  text: string;
  bold?: boolean;
}

interface Benefit {
  icon: LucideIcon;
  parts: (string | BenefitPart)[];
}

interface BenefitsSectionProps {
  title: string;
  highlightedText?: string;
  benefits: Benefit[];
  imageUrl: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  backgroundColor?: string;
  highlightColor?: string;
  iconColor?: string;
  subtitle?: string;
  imageHeight?: string;
  imageClassName?: string;
}

export default function BenefitsSection({
  title,
  highlightedText,
  benefits,
  imageUrl,
  imageAlt = "Benefits illustration",
  imagePosition = 'left',
  backgroundColor = "bg-secondary",
  highlightColor = "text-primary",
  iconColor = "bg-primary",
  subtitle,
  imageHeight,
  imageClassName,
}: BenefitsSectionProps) {
  const isImageLeft = imagePosition === 'left';

  return (
    <section className={`py-16 md:py-20 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
            {highlightedText && <span className={highlightColor}> {highlightedText}</span>}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Main Content - Two Columns */}
        <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${isImageLeft ? '' : 'lg:flex-row-reverse'}`}>
          {/* Left Column - Image */}
          <div className="lg:w-1/2">
            <div className={`relative rounded-2xl overflow-hidden shadow-2xl border border-border ${imageClassName || ''}`}>
              <img
                src={imageUrl}
                alt={imageAlt}
                className={`w-full object-cover rounded-2xl ${imageHeight || 'h-auto'}`}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-24 h-24">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
              </div>
            </div>
            
          </div>

          {/* Right Column - Benefits List */}
          <div className="lg:w-1/2">
            <div className="space-y-3 md:space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 md:gap-4 group"
                >
                  {/* Icon Container */}
                  <div className="flex-shrink-0">
                    <div className={`relative w-10 h-10 md:w-12 md:h-12 ${iconColor} rounded-xl flex items-center justify-center shadow-lg`}>
                      <benefit.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />

                      {/* Step Number (Optional) */}
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-background rounded-full border-2 border-primary flex items-center justify-center">
                        <span className="text-[10px] font-bold text-primary">{index + 1}</span>
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <div className="bg-card/50 rounded-xl p-3 md:p-4 border border-border shadow-sm">
                      <p className="text-foreground leading-relaxed text-sm md:text-base">
                        {benefit.parts.map((part, i) =>
                          typeof part === 'string' ? part : (
                            <span key={i} className="font-bold text-primary">
                              {part.text}
                            </span>
                          )
                        )}
                      </p>
                    </div>

                    {/* Connecting Line (except last item) */}
                    {index < benefits.length - 1 && (
                      <div className="ml-5 md:ml-6 mt-1.5 md:mt-2">
                        <div className="w-0.5 h-3 md:h-4 bg-gradient-to-b from-primary/30 to-transparent"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Stats or Additional Content (Optional) */}
      </div>
    </section>
  );
}
