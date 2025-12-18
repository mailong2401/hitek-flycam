import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Tag, Eye } from "lucide-react";

interface ArticleMetadataProps {
  post: any;
  readTime: number;
  viewCount: number;
}

export const ArticleMetadata = ({ post, readTime, viewCount }: ArticleMetadataProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
      <Badge variant="outline" className="flex items-center gap-1">
        <Tag className="w-3 h-3" />
        {post.category}
      </Badge>

      <div className="flex items-center gap-1">
        <User className="w-4 h-4" />
        <span className="font-medium">{post.author}</span>
      </div>

      <div className="flex items-center gap-1">
        <Clock className="w-4 h-4" />
        <span>{readTime} phút đọc</span>
      </div>

      <div className="flex items-center gap-1">
        <Eye className="w-4 h-4" />
        <span>{viewCount} lượt xem</span>
      </div>
    </div>
  );
};