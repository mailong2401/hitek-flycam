import React from "react";
import { Button } from "@/components/ui/button";
import { Share2, Bookmark } from "lucide-react";

interface ArticleActionsProps {
  post: any;
}

export const ArticleActions = ({ post }: ArticleActionsProps) => {
  return (
    <div className="flex items-center justify-between mb-8 py-4 border-y border-border">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm">
          <Share2 className="w-4 h-4 mr-2" />
          Chia sẻ
        </Button>
        <Button variant="outline" size="sm">
          <Bookmark className="w-4 h-4 mr-2" />
          Lưu lại
        </Button>
      </div>

      <div className="text-sm text-muted-foreground">
        Đăng ngày: {new Date(post.date || post.created_at).toLocaleDateString("vi-VN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>
    </div>
  );
};