import React from "react";
import { BlogCarouselProps } from "./BlogTypes";
import BlogContent from "./BlogContent";

interface ExtendedBlogCarouselProps extends BlogCarouselProps {
  children?: React.ReactNode;
  blogPostsLength: number;
}

const BlogCarousel: React.FC<ExtendedBlogCarouselProps> = ({
  currentPost,
  currentIndex,
  blogPostsLength,
  backgroundImageRef,
  getFallbackImage,
  children
}) => {
  return (
    <div className="relative w-full h-full">
      <div key={currentPost.id} className="absolute inset-0">
        <img
          ref={backgroundImageRef}
          src={currentPost.image || getFallbackImage(currentIndex)}
          alt={currentPost.title}
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="eager"
        />
        
        {/* Gradient overlay - TĂNG ĐỘ ĐẬM */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        
        {/* Content - CHUYỂN SANG BÊN TRÁI */}
        <div className="absolute top-1/2 left-8 md:left-16 lg:left-24 transform -translate-y-1/2 w-full max-w-2xl px-4">
          <div className="max-w-xl">
            <BlogContent 
              currentPost={currentPost} 
              currentIndex={currentIndex}
              blogPostsLength={blogPostsLength}
            />
            {/* Render children (BlogControls) here */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCarousel;
