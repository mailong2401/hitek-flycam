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
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const navigate = useNavigate();

  // Xác định ngôn ngữ hiển thị
  const displayLanguage = t("lang") === 'vi' ? 'vi' : 'en';

  useEffect(() => {
    fetchAllBlogs();
  }, [displayLanguage]); // Refetch khi ngôn ngữ thay đổi

  useEffect(() => {
    // Cuộn lên đầu phần AllBlogs khi chuyển trang
    const allBlogsSection = document.querySelector('.all-blogs-section');
    if (allBlogsSection) {
      allBlogsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

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
      setCurrentPage(1); // Reset về trang 1 khi fetch lại dữ liệu

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
    // Sử dụng slug theo ngôn ngữ hiện tại
    const slug = displayLanguage === 'vi'
      ? (post.slug_vi || post.slug_en || post.slug || post.id)
      : (post.slug_en || post.slug_vi || post.slug || post.id);
    navigate(`/blog/${slug}`);
  };

  // Tính toán dữ liệu phân trang
  const totalPages = Math.ceil(allBlogs.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentBlogs = allBlogs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    // Tính toán phạm vi trang hiển thị
    const getPageNumbers = () => {
      const delta = 2; // Số trang hiển thị mỗi bên trang hiện tại
      const range = [];
      const rangeWithDots = [];
      let l;

      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
          range.push(i);
        }
      }

      range.forEach((i) => {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
            rangeWithDots.push('...');
          }
        }
        rangeWithDots.push(i);
        l = i;
      });

      return rangeWithDots;
    };

    return (
      <div className="flex flex-col items-center justify-center mt-12 pt-8 border-t border-border/50">
        {/* Các nút phân trang */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {/* Nút về trang đầu */}
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg bg-card border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-vibrant-red/10 hover:border-vibrant-red transition-all duration-300 flex items-center gap-1 text-sm"
            title={displayLanguage === 'vi' ? 'Về trang đầu' : 'First page'}
          >
            <span className="text-xs">««</span>
          </button>

          {/* Nút trang trước */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-card border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-vibrant-red/10 hover:border-vibrant-red transition-all duration-300 flex items-center gap-1 text-sm"
          >
            <span className="text-xs">←</span>
            {displayLanguage === 'vi' ? 'Trước' : 'Prev'}
          </button>

          {/* Các số trang */}
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) => (
              typeof page === 'number' ? (
                <button
                  key={index}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 text-sm ${
                    currentPage === page
                      ? 'bg-vibrant-red text-white font-bold shadow-lg'
                      : 'bg-card border border-border hover:bg-vibrant-red/10 hover:border-vibrant-red'
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span key={index} className="w-10 h-10 flex items-center justify-center text-muted-foreground">
                  ...
                </span>
              )
            ))}
          </div>

          {/* Nút trang sau */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-card border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-vibrant-red/10 hover:border-vibrant-red transition-all duration-300 flex items-center gap-1 text-sm"
          >
            {displayLanguage === 'vi' ? 'Sau' : 'Next'}
            <span className="text-xs">→</span>
          </button>

          {/* Nút đến trang cuối */}
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg bg-card border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-vibrant-red/10 hover:border-vibrant-red transition-all duration-300 flex items-center gap-1 text-sm"
            title={displayLanguage === 'vi' ? 'Đến trang cuối' : 'Last page'}
          >
            <span className="text-xs">»»</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="all-blogs-section min-h-screen bg-gradient-to-b from-background via-background/95 to-background py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header với nút quay lại */}
        <div className="mb-8 md:mb-12">
          <button
            onClick={onBack}
            className="mb-6 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            {displayLanguage === 'vi' ? 'Quay lại đầu trang' : 'Back to top'}
          </button>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {displayLanguage === 'vi' ? 'TẤT CẢ BÀI VIẾT' : 'ALL BLOG POSTS'}
          </h1>
          <div className="w-20 h-1 bg-vibrant-red mb-2"></div>
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
                <div className="text-5xl mb-4">📝</div>
                <p className="text-muted-foreground text-lg mb-4">
                  {displayLanguage === 'vi' ? 'Chưa có bài viết nào được đăng.' : 'No blog posts published yet.'}
                </p>
                <button
                  onClick={fetchAllBlogs}
                  className="px-4 py-2 bg-vibrant-red/10 text-vibrant-red rounded-lg hover:bg-vibrant-red/20 transition-all duration-300"
                >
                  {displayLanguage === 'vi' ? 'Thử lại' : 'Retry'}
                </button>
              </div>
            ) : (
              <>
                {/* Thông báo nếu không có bài viết ở trang hiện tại */}
                {currentBlogs.length === 0 && currentPage > 1 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      {displayLanguage === 'vi' ? 'Không có bài viết nào ở trang này.' : 'No posts on this page.'}
                    </p>
                    <button
                      onClick={() => handlePageChange(1)}
                      className="px-4 py-2 bg-vibrant-red text-white rounded-lg hover:opacity-90 transition-all duration-300"
                    >
                      {displayLanguage === 'vi' ? 'Quay lại trang đầu' : 'Back to first page'}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {currentBlogs.map((blog, index) => (
                      <article
                        key={blog.id}
                        className="bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-card/80 border border-border flex flex-col h-full min-h-[500px] md:min-h-[550px]"
                        onClick={() => handleViewDetails(blog)}
                      >
                        {/* Blog Image */}
                        <div className="h-48 overflow-hidden relative">
                          <img
                            src={blog.image || getFallbackImage(startIndex + index)}
                            alt={blog.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          {/* Số thứ tự bài viết */}
                          <div className="absolute top-3 right-3 bg-black/70 text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center">
                            {startIndex + index + 1}
                          </div>
                        </div>

                        {/* Blog Content */}
                        <div className="p-6 flex flex-col flex-grow">
                          {/* Category và Read Time */}
                          <div className="inline-flex items-center gap-2 mb-3">
                            <div className="bg-vibrant-red text-white text-xs font-bold px-3 py-1 rounded-full">
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

                {/* Hiển thị phân trang */}
                {renderPagination()}
              </>
            )}
          </>
        )}

        {/* Nút quay lại đầu trang */}
        <div className="mt-12 pt-8 border-t border-border/50 flex justify-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-vibrant-red hover:opacity-90 text-white px-6 py-3 rounded-lg transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl"
          >
            ↑ {displayLanguage === 'vi' ? 'Quay lại đầu trang' : 'Back to top'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllBlogsPage;