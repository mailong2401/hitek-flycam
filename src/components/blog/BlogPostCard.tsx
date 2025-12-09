import { Calendar, User, ArrowRight, Clock, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnhancedBlogPost } from "@/types";
import React, { useRef, useEffect } from "react";
interface BlogPostCardProps {
  post: EnhancedBlogPost;
  postImage: string;
  isUpdating: boolean;
  onPostClick: (e: React.MouseEvent, postId: string) => void;
  onReadMoreClick: (e: React.MouseEvent, postId: string) => void;
  fallbackImages: string[];
  index: number;
}

export default function BlogPostCard({
  post,
  postImage,
  isUpdating,
  onPostClick,
  onReadMoreClick,
  fallbackImages,
  index
}: BlogPostCardProps) {
  const postUrl = `/blog/${post.id}`;
  
  return (
    <Card 
      className="group overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full w-full md:w-[398px] flex-shrink-0 min-h-[460px] md:min-h-[480px]"
      itemScope
      itemType="https://schema.org/BlogPosting"
      itemProp="blogPost"
    >
      <link itemProp="url" href={`${window.location.origin}${postUrl}`} />
      
      <div className="relative">
        <img
          src={postImage}
          alt={`${post.title} - Hình ảnh minh họa bài viết về drone flycam tại Việt Nam`}
          className="w-[398px] h-[192px] object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          width="398"
          height="192"
          itemProp="image"
        />
        <Badge 
          variant="secondary" 
          className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
          itemProp="articleSection"
        >
          {post.category}
        </Badge>
      </div>

      <CardContent className="p-6 flex flex-col flex-grow">
        <h3 
          onClick={(e) => onPostClick(e, post.id)}
          className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors cursor-pointer line-clamp-1"
          itemProp="headline"
        >
          <a href={postUrl} itemProp="url" className="hover:no-underline">
            {post.title}
          </a>
        </h3>

        <p 
          className="text-muted-foreground mb-4 flex-grow" 
          itemProp="description"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '1.5rem',
            maxHeight: '3rem'
          }}
        >
          {post.excerpt || post.content?.substring(0, 150)}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-3">
            <time 
              className="flex items-center gap-1"
              dateTime={post.created_at || post.date}
              itemProp="datePublished"
            >
              <Calendar className="w-3 h-3" aria-hidden="true" />
              {post.date || new Date(post.created_at || '').toLocaleDateString('vi-VN')}
            </time>
            <span className="flex items-center gap-1" itemProp="timeRequired">
              <Clock className="w-3 h-3" aria-hidden="true" />
              {post.readTime}
            </span>
          </div>
          
          <span 
            className={`flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full transition-all ${isUpdating ? 'bg-primary/10' : ''}`}
          >
            <Eye className={`w-3 h-3 ${isUpdating ? 'animate-pulse' : ''}`} aria-hidden="true" />
            <span className="font-medium">
              {isUpdating ? '...' : post.views.toLocaleString()}
            </span>
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center text-sm">
            <User className="w-4 h-4 mr-2 text-gray-400" aria-hidden="true" />
            <span className="text-gray-600 dark:text-gray-400" itemProp="author">
              <span itemProp="name">{post.author}</span>
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => onReadMoreClick(e, post.id)}
            disabled={isUpdating}
            className="text-primary hover:text-primary/80 hover:bg-primary/5"
            aria-label={`Đọc thêm bài viết về ${post.title}`}
          >
            {isUpdating ? (
              <span className="flex items-center">
                <span className="animate-spin mr-2 h-4 w-4 border-2 border-primary border-t-transparent rounded-full" aria-hidden="true" />
                Đang xử lý...
              </span>
            ) : (
              <span className="flex items-center">
                Đọc thêm
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </span>
            )}
          </Button>
        </div>

        {/* Hidden meta data for SEO */}
        <meta itemProp="dateModified" content={post.updated_at || post.created_at || post.date} />
        <meta itemProp="mainEntityOfPage" content={`${window.location.origin}${postUrl}`} />
        {post.tags && post.tags.length > 0 && (
          <meta itemProp="keywords" content={post.tags.join(", ")} />
        )}
        <meta itemProp="wordCount" content={post.content ? post.content.split(/\s+/).length.toString() : "0"} />
        <meta itemProp="inLanguage" content="vi-VN" />
      </CardContent>
    </Card>
  );
}