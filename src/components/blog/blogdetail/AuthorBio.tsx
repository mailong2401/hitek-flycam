import React from "react";
import { User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AuthorBioProps {
  post: any;
}

export const AuthorBio = ({ post }: AuthorBioProps) => {
  const { t } = useLanguage();

  // Xác định ngôn ngữ hiển thị
  const displayLanguage = t("lang") === 'vi' ? 'vi' : 'en';

  // Dịch category
  const translateCategory = (category: string) => {
    const translations: Record<string, { vi: string, en: string }> = {
      'Tin tức': { vi: 'tin tức', en: 'news' },
      'Hướng dẫn': { vi: 'hướng dẫn', en: 'tutorials' },
      'Review': { vi: 'review', en: 'reviews' },
      'Công nghệ': { vi: 'công nghệ', en: 'technology' },
      'Sản phẩm': { vi: 'sản phẩm', en: 'products' },
      'Pháp lý': { vi: 'pháp lý', en: 'legal topics' },
      'Nhiếp ảnh': { vi: 'nhiếp ảnh', en: 'photography' },
      'Bảo trì': { vi: 'bảo trì', en: 'maintenance' },
    };

    if (category && translations[category]) {
      return displayLanguage === 'vi' ? translations[category].vi : translations[category].en;
    }
    return category ? category.toLowerCase() : (displayLanguage === 'vi' ? 'các chủ đề' : 'various topics');
  };

  return (
    <div className="mt-12 p-6 bg-accent/30 rounded-xl border border-border">
      <h3 className="text-xl font-bold mb-4 text-foreground">
        {displayLanguage === 'vi' ? 'Về tác giả' : 'About the Author'}
      </h3>
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <User className="w-8 h-8 text-muted-foreground" />
        </div>
        <div>
          <h4 className="font-bold text-lg text-foreground">
            {post.author || (displayLanguage === 'vi' ? 'Admin' : 'Admin')}
          </h4>
          <p className="text-muted-foreground mt-2">
            {displayLanguage === 'vi'
              ? `Tác giả chuyên viết về ${translateCategory(post.category)}. Đã xuất bản nhiều bài viết chất lượng trên blog này.`
              : `An author specializing in ${translateCategory(post.category)}. Has published many quality articles on this blog.`}
          </p>
        </div>
      </div>
    </div>
  );
};