import React from "react";
import { User } from "lucide-react";

interface AuthorBioProps {
  post: any;
}

export const AuthorBio = ({ post }: AuthorBioProps) => {
  return (
    <div className="mt-12 p-6 bg-accent/30 rounded-xl border border-border">
      <h3 className="text-xl font-bold mb-4 text-foreground">Về tác giả</h3>
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <User className="w-8 h-8 text-muted-foreground" />
        </div>
        <div>
          <h4 className="font-bold text-lg text-foreground">{post.author}</h4>
          <p className="text-muted-foreground mt-2">
            Tác giả chuyên viết về {post.category.toLowerCase()}. 
            Đã xuất bản nhiều bài viết chất lượng trên blog này.
          </p>
        </div>
      </div>
    </div>
  );
};