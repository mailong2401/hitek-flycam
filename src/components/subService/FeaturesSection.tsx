import { ReactNode } from "react";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  title: string;
  highlightedText?: string;
  features: Feature[];
  backgroundColor?: string;
  cardBackground?: string;
  highlightColor?: string;
  titleSize?: string;
  descriptionSize?: string;
}

export default function FeaturesSection({
  title,
  highlightedText,
  features,
  backgroundColor = "bg-secondary",
  cardBackground = "bg-card",
  highlightColor = "text-vibrant-red",
  titleSize = "text-xl",
  descriptionSize = "text-base",
}: FeaturesSectionProps) {
  const featureCount = features.length;
  const gridColumns = featureCount <= 4 ? featureCount : 4;

  return (
    <section className={`py-20 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {title}
            {highlightedText && <span className={highlightColor}> {highlightedText}</span>}
          </h2>
        </div>
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${cardBackground} rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border flex flex-col`}
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h3 className={`${titleSize} font-bold mb-4 text-foreground min-h-[6rem] flex items-center justify-center line-clamp-3`}>
                {feature.title}
              </h3>
              <p className={`${descriptionSize} text-muted-foreground leading-relaxed line-clamp-4 flex-1 flex items-center justify-center`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
