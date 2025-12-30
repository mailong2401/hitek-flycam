import React from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface RelatedPostsProps {
  relatedPosts: any[];
}

export const RelatedPosts = ({ relatedPosts }: RelatedPostsProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Xác định ngôn ngữ hiển thị
  const displayLanguage = t("lang") === 'vi' ? 'vi' : 'en';

  // Dịch category
  const translateCategory = (category: string) => {
    const translations: Record<string, { vi: string, en: string }> = {
      'Tin tức': { vi: 'Tin tức', en: 'News' },
      'Hướng dẫn': { vi: 'Hướng dẫn', en: 'Tutorial' },
      'Review': { vi: 'Review', en: 'Review' },
      'Công nghệ': { vi: 'Công nghệ', en: 'Technology' },
      'Sản phẩm': { vi: 'Sản phẩm', en: 'Products' },
      'Pháp lý': { vi: 'Pháp lý', en: 'Legal' },
      'Nhiếp ảnh': { vi: 'Nhiếp ảnh', en: 'Photography' },
      'Bảo trì': { vi: 'Bảo trì', en: 'Maintenance' },
    };

    if (category && translations[category]) {
      return displayLanguage === 'vi' ? translations[category].vi : translations[category].en;
    }
    return category || (displayLanguage === 'vi' ? 'Tin tức' : 'News');
  };

  if (relatedPosts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">
        {displayLanguage === 'vi' ? 'Bài viết liên quan' : 'Related Posts'}
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((related) => (
          <div
            key={related.id}
            className="bg-card rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer border border-border"
            onClick={() => navigate(`/blog/${related.id}`)}
          >
            {related.image && (
              <img src={related.image} alt={related.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <Badge variant="outline" className="mb-2 text-xs">
                {translateCategory(related.category)}
              </Badge>
              <h3 className="font-bold line-clamp-2 text-foreground">{related.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};