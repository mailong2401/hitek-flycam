import React from "react";
import { BlogContentProps } from "./BlogTypes";
import { useLanguage } from "@/contexts/LanguageContext";

const BlogContent: React.FC<BlogContentProps> = ({ 
  currentPost, 
  currentIndex,
  blogPostsLength
}) => {
  const { t, language } = useLanguage();
  
  // Xác định ngôn ngữ hiển thị (chỉ vi hoặc en)
  const displayLanguage = t("lang") === 'vi' ? 'vi' : 'en';
  
  // Lấy tiêu đề theo ngôn ngữ
  const getTitle = () => {
    if (displayLanguage === 'vi') {
      return currentPost.title_vi || currentPost.title_en || currentPost.title || t('no_title', 'Không có tiêu đề');
    } else {
      return currentPost.title_en || currentPost.title_vi || currentPost.title || t('no_title', 'No title');
    }
  };
  
  // Lấy category theo ngôn ngữ (có thể dịch category nếu cần)
  const getCategory = () => {
    // Category có thể là chung, nhưng nếu muốn dịch có thể dùng t()
    const category = currentPost.category || (displayLanguage === 'vi' ? 'Tin tức' : 'News');
    
    // Dịch các category phổ biến nếu cần
    const categoryTranslations: Record<string, string> = {
      'Tin tức': displayLanguage === 'vi' ? 'Tin tức' : 'News',
      'Hướng dẫn': displayLanguage === 'vi' ? 'Hướng dẫn' : 'Tutorial',
      'Review': displayLanguage === 'vi' ? 'Review' : 'Review',
      'Công nghệ': displayLanguage === 'vi' ? 'Công nghệ' : 'Technology',
      'Sản phẩm': displayLanguage === 'vi' ? 'Sản phẩm' : 'Products',
      'Pháp lý': displayLanguage === 'vi' ? 'Pháp lý' : 'Legal',
      'Nhiếp ảnh': displayLanguage === 'vi' ? 'Nhiếp ảnh' : 'Photography',
      'Bảo trì': displayLanguage === 'vi' ? 'Bảo trì' : 'Maintenance',
    };
    
    return categoryTranslations[category] || category;
  };
  
  // Kiểm tra xem bài viết có bản tiếng Anh không
  const hasEnglishVersion = () => {
    return !!currentPost.title_en || !!currentPost.content_en;
  };
  
  // Kiểm tra xem bài viết có bản tiếng Việt không
  const hasVietnameseVersion = () => {
    return !!currentPost.title_vi || !!currentPost.content_vi;
  };
  
  // Lấy ngày đăng và format theo ngôn ngữ
  const formatDate = () => {
    if (!currentPost.date) return '';
    const date = new Date(currentPost.date);
    
    if (displayLanguage === 'vi') {
      return date.toLocaleDateString('vi-VN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };
  
  // Format author - có thể dịch "Admin" nếu cần
  const getAuthor = () => {
    const author = currentPost.author || (displayLanguage === 'vi' ? 'Admin' : 'Admin');
    return author;
  };

  return (
    <>
      {/* Header với Author, Date và Index Indicator - CANH TRÁI */}
      <div className="flex items-center justify-between gap-4 mb-10 opacity-0 animate-showContent">
        <div className="flex items-center gap-4">
          {/* Author */}
          <div className="author text-white font-bold tracking-[0.3em] text-xs md:text-sm">
            {getAuthor()}
          </div>

          {/* Separator */}
          <div className="w-1 h-4 bg-vibrant-red"></div>

          {/* Date */}
          <div className="text-white/80/80 text-xs md:text-sm hidden md:block">
            {formatDate()}
          </div>
        </div>

        {/* Current Index Indicator và Language badges */}
        <div className="text-white text-sm flex items-center gap-2">
          {/* Language indicator - chỉ hiển thị nếu bài viết có cả 2 ngôn ngữ */}
          {(hasVietnameseVersion() || hasEnglishVersion()) && (
            <>
              <div className="w-1 h-4 bg-vibrant-red"></div>
            </>
          )}

          <span className="text-vibrant-red font-bold">{currentIndex + 1}</span>
          <span className="text-white/70/70">/</span>
          <span>{blogPostsLength}</span>
        </div>
      </div>

      {/* Mobile Date - hiển thị bên dưới trên mobile */}
      <div className="text-white/80/80 text-xs mb-4 opacity-0 animate-showContent md:hidden">
        {formatDate()}
      </div>

      {/* Title - GIỚI HẠN 3 DÒNG, CANH TRÁI */}
      <h1 className="title text-vibrant-red font-bold text-3xl md:text-5xl lg:text-5xl mb-10 py-1 opacity-0 animate-showContent animation-delay-200 line-clamp-3 leading-[1.3] md:leading-[1.25]">
        {getTitle()}
      </h1>

      {/* Category và Read Time - CANH TRÁI */}
      <div className="topic text-white font-bold text-xl md:text-3xl lg:text-3xl mb-12 opacity-0 animate-showContent animation-delay-400">
        {getCategory()}
        {/* Hiển thị read time nếu có */}
        {currentPost.readTime && (
          <span className="text-white/70/70 text-sm md:text-base ml-3 font-normal">
            • {currentPost.readTime} {displayLanguage === 'vi' ? 'phút đọc' : 'min read'}
          </span>
        )}
      </div>

      {/* Excerpt - Hiển thị nếu có và chưa bị ẩn hoàn toàn */}
      {currentPost.excerpt_vi || currentPost.excerpt_en ? (
        <div className="text-white/80/80 text-base md:text-lg mb-6 opacity-0 animate-showContent animation-delay-600 line-clamp-2">
          {displayLanguage === 'vi'
            ? (currentPost.excerpt_vi || currentPost.excerpt_en)
            : (currentPost.excerpt_en || currentPost.excerpt_vi)
          }
        </div>
      ) : null}

      {/* Views count - nếu có */}
      {currentPost.views > 0 && (
        <div className="text-white/60/60 text-xs md:text-sm mb-2 opacity-0 animate-showContent animation-delay-800">
          {currentPost.views} {displayLanguage === 'vi' ? 'lượt xem' : 'views'}
        </div>
      )}
    </>
  );
};

export default BlogContent;