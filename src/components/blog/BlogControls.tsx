import React from "react";
import { BlogControlsProps } from "./BlogTypes";
import { useLanguage } from "@/contexts/LanguageContext";

const BlogControls: React.FC<BlogControlsProps> = ({
  isAnimating,
  onPrev,
  onNext,
  onViewDetails,
  onViewAllPosts,
  currentPostId,
  prevBtnRef,
  nextBtnRef
}) => {
  const { t, language } = useLanguage();
  
  // Xác định ngôn ngữ hiển thị
  const displayLanguage = language === 'vi' ? 'vi' : 'en';

  // Text theo ngôn ngữ
  const texts = {
    viewDetails: displayLanguage === 'vi' ? 'XEM CHI TIẾT' : 'VIEW DETAILS',
    viewAllPosts: displayLanguage === 'vi' ? 'XEM TẤT CẢ' : 'VIEW ALL',
    switchPost: displayLanguage === 'vi' ? 'Chuyển bài' : 'Switch posts',
    viewDetailsAria: displayLanguage === 'vi' ? 'Xem chi tiết bài viết' : 'View post details',
    viewAllPostsAria: displayLanguage === 'vi' ? 'Xem tất cả bài viết' : 'View all blog posts',
    prevPost: displayLanguage === 'vi' ? 'Xem bài viết trước' : 'View previous post',
    nextPost: displayLanguage === 'vi' ? 'Xem bài viết tiếp theo' : 'View next post',
  };

  return (
    <>
      {/* Container cho tất cả button - CANH TRÁI */}
      <div className="space-y-10 opacity-0 animate-showContent animation-delay-600">
        {/* Buttons wrapper với responsive layout */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Button XEM CHI TIẾT */}
          <div className="flex-1">
            <button
              onClick={(e) => onViewDetails(currentPostId, e)}
              className="w-full lg:w-auto bg-[#d62323] text-black font-medium tracking-wider py-3 px-8 hover:bg-red-400 transition-all duration-300 text-lg min-w-[200px] text-left rounded-3xl hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl group"
              aria-label={texts.viewDetailsAria}
            >
              <span className="flex items-center justify-between gap-2">
                {texts.viewDetails}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </button>
          </div>
          
          {/* Button XEM TẤT CẢ BÀI VIẾT */}
          <div className="flex-1">
            <button
              onClick={onViewAllPosts}
              className="w-full lg:w-auto bg-transparent border-2 border-white text-white font-medium tracking-wider py-3 px-8 hover:bg-white/10 transition-all duration-300 text-lg min-w-[200px] text-left rounded-3xl hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl group"
              aria-label={texts.viewAllPostsAria}
            >
              <span className="flex items-center justify-between gap-2">
                {texts.viewAllPosts}
                <span className="group-hover:translate-x-1 transition-transform">↓</span>
              </span>
            </button>
          </div>
        </div>
        

        {/* Navigation Arrows - NẰM NGANG DƯỚI NÚT XEM CHI TIẾT */}
        <div className="flex items-center gap-4">
          <button
            ref={prevBtnRef}
            onClick={onPrev}
            className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg hover:scale-110 active:scale-95 group"
            disabled={isAnimating}
            aria-label={texts.prevPost}
          >
            <span className="group-hover:-translate-x-0.5 transition-transform">&lt;</span>
          </button>
          
          <span className="text-white/70 text-sm">
            {texts.switchPost}
          </span>
          
          <button
            ref={nextBtnRef}
            onClick={onNext}
            className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg hover:scale-110 active:scale-95 group"
            disabled={isAnimating}
            aria-label={texts.nextPost}
          >
            <span className="group-hover:translate-x-0.5 transition-transform">&gt;</span>
          </button>
        </div>

        {/* Language indicator (optional) */}

      </div>

      {/* CSS cho responsive và hiệu ứng */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .min-w-\\[200px\\] {
            min-width: 100%;
          }
        }
        
        @media (max-width: 640px) {
          .space-y-10 {
            margin-top: 1.5rem;
          }
          
          .text-lg {
            font-size: 1rem;
          }
          
          .px-8 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }
        
        button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .shadow-lg {
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
        }
        
        .hover\\:shadow-xl:hover {
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </>
  );
};

export default BlogControls;