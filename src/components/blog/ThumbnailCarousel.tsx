// Component thumbnail bên dưới
import React from "react";
import { ThumbnailCarouselProps } from "./BlogTypes";

const ThumbnailCarousel: React.FC<ThumbnailCarouselProps> = ({
  thumbnailPosts,
  isAnimating,
  onThumbnailClick,
  getFallbackImage,
  thumbnailContainerRef
}) => {
  return (
    <div 
      ref={thumbnailContainerRef}
      className="thumbnail absolute bottom-8 right-8 z-20 flex gap-4 overflow-x-auto max-w-[50vw] px-2 py-2 scrollbar-hide"
      aria-label="Các bài viết khác"
    >
      {thumbnailPosts.map((post) => (
        <article
          key={post.id}
          data-post-id={post.id}
          className="item w-36 h-48 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer relative group"
          onClick={() => !isAnimating && onThumbnailClick(post.originalIndex)}
          aria-label={`Bài viết: ${post.title}`}
        >
          <img
            src={post.image || getFallbackImage(post.originalIndex)}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
            <h2 className="title text-white font-bold text-sm line-clamp-2">
              {post.title.length > 30 ? post.title.substring(0, 30) + '...' : post.title}
            </h2>
            <div className="des text-white/80 text-xs mt-1">
              {post.category}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ThumbnailCarousel;