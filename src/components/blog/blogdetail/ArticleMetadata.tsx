import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Tag, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ArticleMetadataProps {
  post: any;
  readTime: number;
  viewCount: number;
}

export const ArticleMetadata = ({ post, readTime, viewCount }: ArticleMetadataProps) => {
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

  return (
    <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
      <Badge variant="outline" className="flex items-center gap-1">
        <Tag className="w-3 h-3" />
        {translateCategory(post.category)}
      </Badge>

      <div className="flex items-center gap-1">
        <User className="w-4 h-4" />
        <span className="font-medium">{post.author || (displayLanguage === 'vi' ? 'Admin' : 'Admin')}</span>
      </div>

      <div className="flex items-center gap-1">
        <Clock className="w-4 h-4" />
        <span>{readTime} {displayLanguage === 'vi' ? 'phút đọc' : 'min read'}</span>
      </div>

      <div className="flex items-center gap-1">
        <Eye className="w-4 h-4" />
        <span>{viewCount} {displayLanguage === 'vi' ? 'lượt xem' : 'views'}</span>
      </div>
    </div>
  );
};