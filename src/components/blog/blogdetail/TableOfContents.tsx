import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, ExternalLink } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TableOfContentsProps {
  headings: any[];
  links: any[];
  activeId: string;
  onHeadingClick: (id: string) => void;
}

export const TableOfContents = ({ headings, links, activeId, onHeadingClick }: TableOfContentsProps) => {
  const [showLinks, setShowLinks] = useState(false);

  if (headings.length === 0 && links.length === 0) return null;

  return (
    // GIỮ NGUYÊN 100% GIAO DIỆN CŨ - chỉ sticky, không fixed
    <div className="sticky top-24 hidden lg:block w-64 ml-8">
      <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
        <div className="flex items-center gap-2 mb-4">
          <Menu className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-lg text-foreground">Mục lục</h3>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <nav className="space-y-2">
            {/* Chỉ hiện h1 */}
            {headings.map((heading) => (
              <button
                key={heading.id}
                onClick={() => onHeadingClick(heading.id)}
                className={`block w-full text-left py-2 px-3 rounded-lg transition-all text-base font-semibold pl-4 ${
                  activeId === heading.id
                    ? "bg-primary/10 text-primary border-l-4 border-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {heading.text}
              </button>
            ))}

            {/* Mục "Liên kết trong bài" - có đóng mở */}
            {links.length > 0 && (
              <div className="mt-4">
                <button
                  onClick={() => setShowLinks(!showLinks)}
                  className="block w-full text-left py-2 px-3 rounded-lg transition-all text-base font-semibold pl-4 text-muted-foreground hover:bg-accent hover:text-foreground flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Liên kết trong bài
                  </span>
                  <span className="text-xs">({links.length})</span>
                </button>

                {showLinks && (
                  <div className="mt-2 pl-6 space-y-1">
                    {links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-muted-foreground hover:text-primary truncate"
                      >
                        {link.text || link.href}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>
        </ScrollArea>

        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {headings.length} tiêu đề
          </p>
        </div>
      </div>

      {/* Nút Đầu trang - giữ nguyên */}
      <Button
        variant="outline"
        size="sm"
        className="mt-4 w-full"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑ Đầu trang
      </Button>
    </div>
  );
};