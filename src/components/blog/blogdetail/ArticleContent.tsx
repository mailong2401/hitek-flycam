import React from "react";

interface ArticleContentProps {
  children: React.ReactNode;
}

export const ArticleContent = ({ children }: ArticleContentProps) => {
  return (
    <div
      className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-em:text-foreground prose-blockquote:text-foreground prose-ul:text-foreground/90 prose-ol:text-foreground/90"
      style={{
        '--tw-prose-links': '#2563eb',
        '--tw-prose-links-hover': '#1e40af',
      } as React.CSSProperties}
    >
      <style jsx>{`
        .prose a {
          color: #2563eb !important;
          text-decoration: underline !important;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .prose a:hover {
          color: #1e40af !important;
          text-decoration: none !important;
        }
      `}</style>
      {children}
    </div>
  );
};