import { useEffect, useRef, useState } from "react";
import { supabase } from "@/services/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BlogCarousel,
  ThumbnailCarousel,
  BlogControls,
  BlogSEO,
  AllBlogsPage,
  EnhancedBlogPost,
  getFallbackImage,
  getDefaultPosts,
  calculateReadTime,
  generateSlug
} from "@/components/blog";

export default function Blog() {
  const { t, language } = useLanguage(); // Sử dụng useLanguage
  const [blogPosts, setBlogPosts] = useState<EnhancedBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const backgroundImageRef = useRef<HTMLImageElement>(null);
  const allBlogsRef = useRef<HTMLDivElement>(null);

  // Xác định ngôn ngữ hiển thị (chỉ vi hoặc en)
  const displayLanguage = t("lang") === 'vi' ? 'vi' : 'en';

  // Fetch dữ liệu blog chính (6 bài đầu)
  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Thêm scroll listener để hiện nút "Back to Top"
  useEffect(() => {
    const handleScroll = () => {
      if (allBlogsRef.current) {
        const rect = allBlogsRef.current.getBoundingClientRect();
        setShowBackToTop(rect.top < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      
      if (data) {
        const postsWithDefaults: EnhancedBlogPost[] = data.map((post: any) => {
          // Lấy dữ liệu theo ngôn ngữ hiển thị
          const title = displayLanguage === 'vi' 
            ? (post.title_vi || post.title_en || t('no_title'))
            : (post.title_en || post.title_vi || t('no_title'));
          
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
            ...post,
            title,
            excerpt,
            content,
            slug,
            meta_title: metaTitle,
            meta_description: metaDescription,
            readTime: calculateReadTime(content),
            hasEnglish: !!post.title_en || !!post.content_en,
            hasVietnamese: !!post.title_vi || !!post.content_vi,
            // Giữ nguyên các trường gốc để dễ xử lý
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
        setBlogPosts(postsWithDefaults);
      } else {
        setBlogPosts(getDefaultPosts());
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setBlogPosts(getDefaultPosts());
    } finally {
      setLoading(false);
    }
  };

  // Hàm scroll xuống AllBlogsPage
  const scrollToAllBlogs = () => {
    if (allBlogsRef.current) {
      allBlogsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Hàm scroll lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Hàm chuyển slide với hiệu ứng
  const showSlider = (type: 'next' | 'prev') => {
    if (isAnimating || blogPosts.length <= 1) return;

    setIsAnimating(true);

    // Vô hiệu hóa nút khi đang animate
    if (nextBtnRef.current) nextBtnRef.current.disabled = true;
    if (prevBtnRef.current) prevBtnRef.current.disabled = true;

    // Xác định index mới
    const newIndex = type === 'next'
      ? (currentIndex + 1) % blogPosts.length
      : currentIndex === 0 ? blogPosts.length - 1 : currentIndex - 1;

    // Lấy các phần tử cần làm mờ - CHỈ ẢNH VÀ BLOG CONTENT, KHÔNG LÀM MỜ CONTROLS
    const carouselImage = backgroundImageRef.current;
    const blogContentWrapper = carouselRef.current?.querySelector('.blog-content-wrapper');

    // Bắt đầu làm mờ nội dung - KHÔNG CẦN OVERLAY
    if (carouselImage) {
      carouselImage.style.opacity = '0';
      carouselImage.style.transition = 'opacity 0.3s ease-in-out';
    }

    if (blogContentWrapper) {
      (blogContentWrapper as HTMLElement).style.opacity = '0';
      (blogContentWrapper as HTMLElement).style.transform = 'scale(0.98)';
      (blogContentWrapper as HTMLElement).style.transition = 'all 0.3s ease-in-out';
    }

    // Sau khi fade out hoàn tất, thay đổi nội dung
    setTimeout(() => {
      // Thay đổi currentIndex
      setCurrentIndex(newIndex);

      // Chờ một chút để nội dung mới được render, sau đó fade in
      requestAnimationFrame(() => {
        // Phục hồi ảnh background
        if (carouselImage) {
          carouselImage.style.opacity = '1';
        }

        // Phục hồi nội dung blog
        if (blogContentWrapper) {
          (blogContentWrapper as HTMLElement).style.opacity = '1';
          (blogContentWrapper as HTMLElement).style.transform = 'scale(1)';
        }
      });

      // Kết thúc animation và reset styles
      setTimeout(() => {
        // Reset styles
        if (carouselImage) {
          carouselImage.style.transition = '';
        }

        if (blogContentWrapper) {
          (blogContentWrapper as HTMLElement).style.transition = '';
        }

        setIsAnimating(false);
        if (nextBtnRef.current) nextBtnRef.current.disabled = false;
        if (prevBtnRef.current) prevBtnRef.current.disabled = false;
      }, 400);
    }, 300);
  };

  // Xử lý click thumbnail
  const handleThumbnailClick = (clickedIndex: number) => {
    if (!isAnimating && clickedIndex !== currentIndex) {
      setCurrentIndex(clickedIndex);
    }
  };

  // Xử lý click xem chi tiết
  const handleViewDetails = (postId: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const post = blogPosts.find(p => p.id === postId);
    if (post) {
      // Sử dụng slug theo ngôn ngữ hiện tại
      const slug = displayLanguage === 'vi'
        ? (post.slug_vi || post.slug_en || post.slug || post.id)
        : (post.slug_en || post.slug_vi || post.slug || post.id);
      navigate(`/blog/${slug}`);
    } else {
      navigate(`/blog/${postId}`);
    }
  };

  // Lấy các bài viết cho thumbnail
  const getThumbnailPosts = () => {
    if (blogPosts.length <= 1) return [];
    const thumbnailPosts = [];
    
    for (let i = 1; i < blogPosts.length; i++) {
      const index = (currentIndex + i) % blogPosts.length;
      thumbnailPosts.push({
        ...blogPosts[index],
        originalIndex: index
      });
    }
    
    return thumbnailPosts;
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <Skeleton className="w-32 h-8 bg-gray-800" />
        <div className="text-white text-xl ml-4">
          {t('loading_posts')}
        </div>
      </div>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">
          {t('no_posts')}
        </div>
      </div>
    );
  }

  const currentPost = blogPosts[currentIndex];
  const thumbnailPosts = getThumbnailPosts();

  return (
    <div className="relative">
      {/* Language Toggle Button - chỉ hiển thị VI/EN */}

      {/* Phần Blog Carousel chính */}
      <div 
        ref={carouselRef}
        className="w-full h-screen overflow-hidden relative bg-black"
      >
        <BlogSEO 
          blogPosts={blogPosts}
          currentPost={currentPost}
          currentIndex={currentIndex}
          currentLanguage={displayLanguage}
        />

        <BlogCarousel
          currentPost={currentPost}
          currentIndex={currentIndex}
          blogPostsLength={blogPosts.length}
          backgroundImageRef={backgroundImageRef}
          getFallbackImage={getFallbackImage}
        >
          <BlogControls
            isAnimating={isAnimating}
            onPrev={() => showSlider('prev')}
            onNext={() => showSlider('next')}
            onViewDetails={handleViewDetails}
            onViewAllPosts={scrollToAllBlogs}
            currentPostId={currentPost.id}
            prevBtnRef={prevBtnRef}
            nextBtnRef={nextBtnRef}
          />
        </BlogCarousel>

        <ThumbnailCarousel
          thumbnailPosts={thumbnailPosts}
          isAnimating={isAnimating}
          onThumbnailClick={handleThumbnailClick}
          getFallbackImage={getFallbackImage}
          thumbnailContainerRef={thumbnailContainerRef}
        />
      </div>

      {/* Phần AllBlogsPage - LUÔN HIỆN */}
      <div ref={allBlogsRef} className="relative">
        <AllBlogsPage
          getFallbackImage={getFallbackImage}
          onBack={scrollToTop}
        />
      </div>

      {/* Nút Back to Top - chỉ hiện khi scroll xuống */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-[#d62323] text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-colors animate-bounce"
          aria-label={t('back_to_top')}
        >
          ↑
        </button>
      )}

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes showContent {
          0% { opacity: 0; transform: translateY(30px); filter: blur(5px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-showContent { animation: showContent 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        
        img { transition: opacity 0.5s ease-in-out; }
        
        @media (max-width: 768px) {
          .thumbnail { 
            max-width: 70vw !important; 
            right: 4px !important; 
            bottom: 4px !important; 
          }
          
          .thumbnail .item { 
            width: 100px !important; 
            height: 140px !important; 
          }
          
          .title { 
            font-size: 2.2rem !important; 
            margin-bottom: 0.75rem !important;
          }
          
          .topic { 
            font-size: 1.75rem !important; 
            margin-bottom: 2rem !important;
          }
          
          .max-w-xs {
            max-width: 180px !important;
          }
          
          .px-12 {
            padding-left: 2rem !important;
            padding-right: 2rem !important;
          }
          
          .tracking-\[0\.5em\] {
            letter-spacing: 0.3em !important;
          }
        }
        
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        button:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}