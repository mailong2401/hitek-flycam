import React from "react";
import { BlogContentProps } from "./BlogTypes";

const BlogContent: React.FC<BlogContentProps> = ({ 
  currentPost, 
  currentIndex,
  blogPostsLength
}) => {
  return (
    <>
      {/* Header với Author và Index Indicator - CANH TRÁI */}
      <div className="flex items-center gap-4 mb-10 opacity-0 animate-showContent">
        {/* Author */}
        <div className="author text-white font-bold tracking-[0.3em] text-xs md:text-sm">
          {currentPost.author}
        </div>
        
        {/* Separator */}
        <div className="w-1 h-4 bg-[#d62323]"></div>
        
        {/* Current Index Indicator */}
        <div className="text-white text-sm">
          <span className="text-[#d62323] font-bold">{currentIndex + 1}</span> / {blogPostsLength}
        </div>
      </div>

      {/* Title - GIỚI HẠN 3 DÒNG, CANH TRÁI */}
      <h1 className="title text-[#d62323] font-bold text-3xl md:text-5xl lg:text-5xl mb-10 py-1 opacity-0 animate-showContent animation-delay-200 line-clamp-3 leading-[1.3] md:leading-[1.25]">
        {currentPost.title}
      </h1>
      
      {/* Topic - CANH TRÁI */}
      <div className="topic text-white font-bold text-xl md:text-3xl lg:text-3xl mb-12 opacity-0 animate-showContent animation-delay-400">
        {currentPost.category}
      </div>
      
      {/* ĐÃ BỎ PHẦN MÔ TẢ */}
    </>
  );
};

export default BlogContent;
