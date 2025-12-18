import React from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface RelatedPostsProps {
  relatedPosts: any[];
}

export const RelatedPosts = ({ relatedPosts }: RelatedPostsProps) => {
  const navigate = useNavigate();

  if (relatedPosts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Bài viết liên quan</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((related) => (
          <div
            key={related.id}
            className="bg-card rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer border border-border"
            onClick={() => navigate(`/blog/${related.id}`)}
          >
            {related.image && (
              <img src={related.image} alt={related.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <Badge variant="outline" className="mb-2 text-xs">
                {related.category}
              </Badge>
              <h3 className="font-bold line-clamp-2 text-foreground">{related.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};