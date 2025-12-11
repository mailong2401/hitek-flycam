import React from "react";
import { ThumbnailCarouselProps } from "./BlogTypes";
import { useNavigate } from "react-router-dom";

const ThumbnailCarousel: React.FC<ThumbnailCarouselProps> = ({
  thumbnailPosts,
  isAnimating,
  onThumbnailClick,
  getFallbackImage,
  thumbnailContainerRef
}) => {
  const navigate = useNavigate();

  // Hàm xử lý click vào thumbnail
  const handleThumbnailClick = (postId: string, originalIndex: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAnimating) return;
    
    // Điều hướng đến trang chi tiết blog luôn
    navigate(`/blog/${postId}`);
  };

  return (
    <div 
      ref={thumbnailContainerRef}
      className="thumbnail absolute bottom-8 right-8 z-20 flex gap-3 overflow-x-auto max-w-[50vw] px-2 py-2"
      aria-label="Các bài viết khác"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#ef4444 transparent',
      }}
    >
      {thumbnailPosts.map((post) => (
        <article
          key={post.id}
          data-post-id={post.id}
          className="item w-36 h-48 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer relative"
          onClick={(e) => handleThumbnailClick(post.id, post.originalIndex, e)}
          aria-label={`Bài viết: ${post.title}`}
        >
          <img
            src={post.image || getFallbackImage(post.originalIndex)}
            alt={post.title}
            className="w-full h-full object-cover" // ĐÃ XÓA HOVER EFFECT
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
      
      {/* CSS cho scrollbar */}
      <style>{`
        .thumbnail::-webkit-scrollbar {
          height: 6px;
        }
        .thumbnail::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .thumbnail::-webkit-scrollbar-thumb {
          background: #ef4444;
          border-radius: 3px;
        }
        .thumbnail::-webkit-scrollbar-thumb:hover {
          background: #dc2626;
        }
      `}</style>
    </div>
  );
};

export default ThumbnailCarousel;