import React, { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { calculateReadTime, generateSlug } from "./BlogUtils";
import type { EnhancedBlogPost } from "./BlogTypes";

interface AllBlogsPageProps {
  getFallbackImage: (index: number) => string;
  onBack: () => void;
}

const AllBlogsPage: React.FC<AllBlogsPageProps> = ({ getFallbackImage, onBack }) => {
  const { t, language } = useLanguage();
  const [allBlogs, setAllBlogs] = useState<EnhancedBlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Xác định ngôn ngữ hiển thị
  const displayLanguage = t("lang") === 'vi' ? 'vi' : 'en';

  useEffect(() => {
    fetchAllBlogs();
  }, [displayLanguage]); // Refetch khi ngôn ngữ thay đổi

  // Helper function để lấy dữ liệu theo ngôn ngữ
  const getPostDataByLanguage = (post: any) => {
    const title = displayLanguage === 'vi' 
      ? (post.title_vi || post.title_en || post.title || t('no_title'))
      : (post.title_en || post.title_vi || post.title || t('no_title'));
    
    const excerpt = displayLanguage === 'vi'
      ? (post.excerpt_vi || post.excerpt_en || '')
      : (post.excerpt_en || post.excerpt_vi || '');
    
    const content = displayLanguage === 'vi'
      ? (post.content_vi || post.content_en || '')
      : (post.content_en || post.content_vi || '');
    
    const slug = displayLanguage === 'vi'
      ? (post.slug_vi || post.slug_en || generateSlug(title))
      : (post.slug_en || post.slug_vi || generateSlug(title));
    
    const metaTitle = displayLanguage === 'vi'
      ? (post.meta_title_vi || post.meta_title_en || '')
      : (post.meta_title_en || post.meta_title_vi || '');
    
    const metaDescription = displayLanguage === 'vi'
      ? (post.meta_description_vi || post.meta_description_en || '')
      : (post.meta_description_en || post.meta_description_vi || '');

    return {
      title,
      excerpt,
      content,
      slug,
      metaTitle,
      metaDescription,
      hasEnglish: !!post.title_en || !!post.content_en,
      hasVietnamese: !!post.title_vi || !!post.content_vi,
    };
  };

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

  // Format ngày theo ngôn ngữ
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    
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

  const fetchAllBlogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data) {
        const postsWithDefaults: EnhancedBlogPost[] = data.map((post: any) => {
          const postData = getPostDataByLanguage(post);
          
          return {
            ...post,
            title: postData.title,
            excerpt: postData.excerpt,
            content: postData.content,
            slug: postData.slug,
            meta_title: postData.metaTitle,
            meta_description: postData.metaDescription,
            readTime: calculateReadTime(postData.content),
            hasEnglish: postData.hasEnglish,
            hasVietnamese: postData.hasVietnamese,
            // Giữ nguyên các trường gốc
            title_vi: post.title_vi,
            title_en: post.title_en,
            excerpt_vi: post.excerpt_vi,
            excerpt_en: post.excerpt_en,
            content_vi: post.content_vi,
            content_en: post.content_en,
            slug_vi: post.slug_vi,
            slug_en: post.slug_en,
          };
        });
        setAllBlogs(postsWithDefaults);
      }
    } catch (error) {
      console.error('Error fetching all blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (post: EnhancedBlogPost) => {
    navigate(`/blog/${post.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header với nút quay lại */}
        <div className="mb-8 md:mb-12">
          <button
            onClick={onBack}
            className="mb-6 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            {t('back_to_top')}
          </button>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {displayLanguage === 'vi' ? 'TẤT CẢ BÀI VIẾT' : 'ALL BLOG POSTS'}
          </h1>
          <div className="w-20 h-1 bg-accent mb-2"></div>
          <p className="text-muted-foreground">
            {displayLanguage === 'vi' 
              ? `Khám phá tất cả ${allBlogs.length} bài viết của chúng tôi`
              : `Explore all ${allBlogs.length} of our blog posts`
            }
          </p>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
            <p className="text-muted-foreground">
              {displayLanguage === 'vi' ? 'Đang tải tất cả bài viết...' : 'Loading all blog posts...'}
            </p>
          </div>
        ) : (
          <>
            {/* Blog Grid */}
            {allBlogs.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">
                  {displayLanguage === 'vi' ? 'Chưa có bài viết nào.' : 'No blog posts yet.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {allBlogs.map((blog, index) => (
                  <article
                    key={blog.id}
                    className="bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-card/80 border border-border flex flex-col h-full min-h-[500px] md:min-h-[550px]"
                    onClick={() => handleViewDetails(blog)}
                  >
                    {/* Blog Image */}
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={blog.image || getFallbackImage(index)}
                        alt={blog.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>

                    {/* Blog Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Category và Read Time */}
                      <div className="inline-flex items-center gap-2 mb-3">
                        <div className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                          {translateCategory(blog.category || '')}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {blog.readTime} {displayLanguage === 'vi' ? 'phút đọc' : 'min read'}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold mb-3 line-clamp-2 flex-grow-0">
                        {blog.title}
                      </h2>

                      {/* Excerpt */}
                      <div className="mb-4 flex-grow">
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {blog.excerpt || blog.content?.substring(0, 150) + '...'}
                        </p>
                      </div>

                      {/* Meta Info */}
                      <div className="mt-auto pt-4 border-t border-border/50">
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                              <span className="text-xs font-bold">👤</span>
                            </div>
                            <span className="font-medium">{blog.author || (displayLanguage === 'vi' ? 'Admin' : 'Admin')}</span>
                          </div>
                          <span className="text-xs">
                            {formatDate(blog.created_at)}
                          </span>
                        </div>

                        {/* Views count (if available) */}
                        {blog.views > 0 && (
                          <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                            <span>👁️</span>
                            <span>{blog.views} {displayLanguage === 'vi' ? 'lượt xem' : 'views'}</span>
                          </div>
                        )}

                        {/* Read More Button */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(blog);
                          }}
                          className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground py-3 rounded-lg transition-colors font-medium group"
                        >
                          <span className="flex items-center justify-center gap-2">
                            {displayLanguage === 'vi' ? 'Đọc tiếp' : 'Read more'}
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

        {/* Nút quay lại đầu trang */}
        <div className="mt-12 pt-8 border-t border-border/50 flex justify-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground px-6 py-3 rounded-lg transition-colors backdrop-blur-sm"
          >
            ↑ {t('back_to_top')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllBlogsPage;