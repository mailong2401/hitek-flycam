import React from "react";
import { ThumbnailCarouselProps } from "./BlogTypes";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const ThumbnailCarousel: React.FC<ThumbnailCarouselProps> = ({
  thumbnailPosts,
  isAnimating,
  onThumbnailClick,
  getFallbackImage,
  thumbnailContainerRef
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Xác định ngôn ngữ hiển thị
  const displayLanguage = t("lang") === 'vi' ? 'vi' : 'en';

  // Hàm lấy title theo ngôn ngữ
  const getTitle = (post: any) => {
    if (displayLanguage === 'vi') {
      return post.title_vi || post.title_en || post.title || t('no_title', 'Không có tiêu đề');
    } else {
      return post.title_en || post.title_vi || post.title || t('no_title', 'No title');
    }
  };

  // Hàm lấy category theo ngôn ngữ
  const getCategory = (category: string) => {
    const categoryTranslations: Record<string, { vi: string, en: string }> = {
      'Tin tức': { vi: 'Tin tức', en: 'News' },
      'Hướng dẫn': { vi: 'Hướng dẫn', en: 'Tutorial' },
      'Review': { vi: 'Review', en: 'Review' },
      'Công nghệ': { vi: 'Công nghệ', en: 'Technology' },
      'Sản phẩm': { vi: 'Sản phẩm', en: 'Products' },
      'Pháp lý': { vi: 'Pháp lý', en: 'Legal' },
      'Nhiếp ảnh': { vi: 'Nhiếp ảnh', en: 'Photography' },
      'Bảo trì': { vi: 'Bảo trì', en: 'Maintenance' },
    };

    if (category && categoryTranslations[category]) {
      return displayLanguage === 'vi' 
        ? categoryTranslations[category].vi 
        : categoryTranslations[category].en;
    }
    return category || (displayLanguage === 'vi' ? 'Tin tức' : 'News');
  };

  // Hàm xử lý click vào thumbnail
  const handleThumbnailClick = (post: any, originalIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAnimating) return;

    // Sử dụng slug theo ngôn ngữ hiện tại
    const slug = displayLanguage === 'vi'
      ? (post.slug_vi || post.slug_en || post.slug || post.id)
      : (post.slug_en || post.slug_vi || post.slug || post.id);
    navigate(`/blog/${slug}`);
  };

  // Kiểm tra xem bài viết có bản tiếng Anh không
  const hasEnglishVersion = (post: any) => {
    return !!post.title_en || !!post.content_en;
  };

  // Kiểm tra xem bài viết có bản tiếng Việt không
  const hasVietnameseVersion = (post: any) => {
    return !!post.title_vi || !!post.content_vi;
  };

  return (
    <div className="thumbnail-section absolute bottom-8 right-8 z-20">
      {/* Tiêu đề với ngôn ngữ động */}
      <div className="text-white dark:text-foreground mb-4">
        <h3 className="text-xl font-bold">
          {displayLanguage === 'vi' ? 'CÁC BÀI VIẾT NỔI BẬT' : 'FEATURED POSTS'}
        </h3>
        <div className="w-16 h-1 bg-vibrant-red mt-2"></div>
        {/* Language indicator */}
      </div>
      
      <div 
        ref={thumbnailContainerRef}
        className="thumbnail flex gap-3 overflow-x-auto px-2 py-2"
        aria-label={displayLanguage === 'vi' ? "Các bài viết khác" : "Other posts"}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#ef4444 transparent',
          maxWidth: '50vw',
        }}
      >
        {thumbnailPosts.map((post) => {
          const title = getTitle(post);
          const category = getCategory(post.category);
          const hasVI = hasVietnameseVersion(post);
          const hasEN = hasEnglishVersion(post);
          
          return (
            <article
              key={post.id}
              data-post-id={post.id}
              className="item w-36 h-48 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer relative group"
              onClick={(e) => handleThumbnailClick(post, post.originalIndex, e)}
              aria-label={`Bài viết: ${title}`}
            >
              <img
                src={post.image || getFallbackImage(post.originalIndex)}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              
              
              {/* Gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent dark:from-background/95 dark:via-background/80 dark:to-transparent p-3">
                <h2 className="title text-white dark:text-foreground font-bold text-sm line-clamp-2">
                  {title.length > 30 ? title.substring(0, 30) + '...' : title}
                </h2>
                <div className="flex items-center justify-between mt-1">
                  <div className="des text-white/80 dark:text-foreground/80 text-xs">
                    {category}
                  </div>
                  {/* Read time (if available) */}
                  {post.readTime && (
                    <div className="text-white/60 dark:text-foreground/60 text-[10px]">
                      {post.readTime}{displayLanguage === 'vi' ? 'p' : 'm'}
                    </div>
                  )}
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 dark:bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white dark:text-foreground text-sm font-medium">
                  {displayLanguage === 'vi' ? 'Đọc ngay' : 'Read now'} →
                </span>
              </div>
            </article>
          );
        })}
      </div>
      
      {/* CSS cho scrollbar và thumbnail-section */}
      <style>{`
        .thumbnail::-webkit-scrollbar {
          height: 6px;
        }
        .thumbnail::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .dark .thumbnail::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        .thumbnail::-webkit-scrollbar-thumb {
          background: #ef4444;
          border-radius: 3px;
        }
        .thumbnail::-webkit-scrollbar-thumb:hover {
          background: #dc2626;
        }

        .thumbnail-section {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .dark .thumbnail-section {
          background: rgba(30, 30, 30, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
        }

        .thumbnail-section h3 {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .dark .thumbnail-section h3 {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
        }

        .item {
          transition: all 0.3s ease;
        }

        .item:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
        }

        .dark .item:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.7);
        }
        
        @media (max-width: 768px) {
          .thumbnail-section {
            right: 4px;
            bottom: 4px;
            max-width: 90vw;
            padding: 12px;
          }
          
          .thumbnail {
            max-width: 80vw !important;
          }
          
          .item {
            width: 120px !important;
            height: 160px !important;
          }
          
          .thumbnail-section h3 {
            font-size: 1.1rem;
          }
        }
        
        @media (max-width: 480px) {
          .thumbnail-section {
            left: 4px;
            right: 4px;
            max-width: 100%;
          }
          
          .thumbnail {
            max-width: 100% !important;
          }
          
          .item {
            width: 100px !important;
            height: 140px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ThumbnailCarousel;