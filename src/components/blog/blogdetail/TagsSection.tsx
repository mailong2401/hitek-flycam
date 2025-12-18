import React from "react";
import { Badge } from "@/components/ui/badge";

interface TagsSectionProps {
  tags?: string;
}

export const TagsSection = ({ tags }: TagsSectionProps) => {
  if (!tags) return null;

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {JSON.parse(tags || "[]").map((tag: string, index: number) => (
          <Badge key={index} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};