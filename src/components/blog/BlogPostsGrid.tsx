
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BlogPostCard from "./BlogPostCard";
import { EnhancedBlogPost } from "@/types";
import React, { useRef, useEffect } from "react";
interface BlogPostsGridProps {
  filteredPosts: EnhancedBlogPost[];
  postsPerRow: number;
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  updatingIds: Set<string>;
  handlePostClick: (e: React.MouseEvent, postId: string) => void;
  handleReadMoreClick: (e: React.MouseEvent, postId: string) => void;
  searchTerm: string;
  categoryFilter: string;
  clearFilters: () => void;
  fallbackImages: string[];
}

export default function BlogPostsGrid({
  filteredPosts,
  postsPerRow,
  currentSlide,
  setCurrentSlide,
  updatingIds,
  handlePostClick,
  handleReadMoreClick,
  searchTerm,
  categoryFilter,
  clearFilters,
  fallbackImages
}: BlogPostsGridProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    const maxSlides = Math.ceil(filteredPosts.length / postsPerRow) - 1;
    if (currentSlide < maxSlides) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };

  const prevSlide = () => {
    const maxSlides = Math.ceil(filteredPosts.length / postsPerRow) - 1;
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(maxSlides);
    }
  };

  const scrollToSlide = (slideIndex: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.clientWidth || 0;
      const gap = 24;
      const scrollPosition = (cardWidth + gap) * slideIndex * postsPerRow;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  React.useEffect(() => {
    scrollToSlide(currentSlide);
  }, [currentSlide]);

  if (filteredPosts.length === 0) {
    return (
      <Card className="py-16">
        <CardContent className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Search className="w-10 h-10 text-gray-400" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Không tìm thấy bài viết
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {searchTerm || categoryFilter !== "all" 
              ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm' 
              : 'Sẽ sớm có bài viết mới về drone'}
          </p>
          {(searchTerm || categoryFilter !== "all") && (
            <Button onClick={clearFilters} variant="outline" aria-label="Xóa tất cả bộ lọc tìm kiếm">
              Xóa bộ lọc
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative">
      {/* Container với horizontal scroll */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-hidden scroll-smooth gap-6 pb-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {filteredPosts.map((post, index) => {
          const postImage = post.image || fallbackImages[index % fallbackImages.length];
          const isUpdating = updatingIds.has(post.id);
          
          return (
            <BlogPostCard
              key={post.id}
              post={post}
              postImage={postImage}
              isUpdating={isUpdating}
              onPostClick={handlePostClick}
              onReadMoreClick={handleReadMoreClick}
              fallbackImages={fallbackImages}
              index={index}
            />
          );
        })}
      </div>
      
      {/* Navigation Buttons */}
      {filteredPosts.length > postsPerRow && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="h-10 w-10 rounded-full"
            aria-label="Xem bài viết drone trước đó"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </Button>
          
          {/* Dot indicators */}
          <div className="flex items-center gap-1 mx-2">
            {Array.from({ length: Math.ceil(filteredPosts.length / postsPerRow) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                }`}
                aria-label={`Đến trang bài viết drone ${index + 1}`}
                aria-current={index === currentSlide ? "page" : undefined}
              />
            ))}
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="h-10 w-10 rounded-full"
            aria-label="Xem bài viết drone tiếp theo"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      )}
    </div>
  );
}