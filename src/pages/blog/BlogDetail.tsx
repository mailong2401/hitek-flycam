import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { supabase } from "@/services/supabase";
import { Loader2, ArrowLeft, Share2, Bookmark, Clock, User, Tag, Eye, Menu, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// Import các component đã tách (giữ nguyên giao diện)
import { HeroSection } from "@/components/blog/blogdetail/HeroSection";
import { ArticleMetadata } from "@/components/blog/blogdetail/ArticleMetadata";
import { ArticleTitleAndExcerpt } from "@/components/blog/blogdetail/ArticleTitleAndExcerpt";
import { ArticleActions } from "@/components/blog/blogdetail/ArticleActions";
import { ArticleContent } from "@/components/blog/blogdetail/ArticleContent";
import { TagsSection } from "@/components/blog/blogdetail/TagsSection";
import { AuthorBio } from "@/components/blog/blogdetail/AuthorBio";
import { RelatedPosts } from "@/components/blog/blogdetail/RelatedPosts";
import { CommentsSection } from "@/components/blog/blogdetail/CommentsSection";
import { TableOfContents } from "@/components/blog/blogdetail/TableOfContents";

export default function BlogDetail() {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [viewCount, setViewCount] = useState(0);
  const [showMobileToc, setShowMobileToc] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState<string>("");

  useEffect(() => {
    loadPost();
    incrementViewCount();
  }, [id]);

  useEffect(() => {
    if (post) {
      loadRelatedPosts();
    }
  }, [post]);

  const loadPost = async () => {
    try {
      let query = supabase.from("blog_posts").select("*").eq(id ? "id" : "slug", id || slug);

      const { data: sessionData } = await supabase.auth.getSession();
      const isAdmin = sessionData.session?.user?.email?.includes("admin") || false;

      if (!isAdmin) {
        query = query.eq("status", "published");
      }

      const { data, error } = await query.single();

      if (error) {
        console.error("Error loading post:", error);
        setPost(null);
        setLoading(false);
        return;
      }

      setPost(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading post:", error);
      setPost(null);
      setLoading(false);
    }
  };

  const incrementViewCount = async () => {
    setViewCount((prev) => prev + 1);
  };

  const loadRelatedPosts = async () => {
    if (!post) return;

    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .neq("id", post.id)
        .eq("category", post.category)
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error loading related posts:", error);
        return;
      }

      setRelatedPosts(data || []);
    } catch (error) {
      console.error("Error loading related posts:", error);
      setRelatedPosts([]);
    }
  };

  // Chỉ trích xuất h1 cho mục lục
  const headings = useMemo(() => {
    if (!post?.content) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content, "text/html");
    const headingElements = doc.querySelectorAll("h1");

    return Array.from(headingElements).map((element, index) => {
      const text = element.textContent?.trim() || "";
      const id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

      return { id, text };
    });
  }, [post?.content]);

  // Trích xuất tất cả link trong bài
  const linksInContent = useMemo(() => {
    if (!post?.content) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content, "text/html");
    const linkElements = doc.querySelectorAll("a[href]");

    return Array.from(linkElements)
      .map((link) => ({
        text: link.textContent?.trim() || link.getAttribute("href"),
        href: link.getAttribute("href"),
      }))
      .filter((link) => link.href && link.href.startsWith("http"));
  }, [post?.content]);

  // Observer để active mục lục khi scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -70% 0%" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const parsedContent = useMemo(() => {
    if (!post?.content) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content, "text/html");
    const elements = Array.from(doc.body.children);

    let headingIndex = 0;

    return elements.map((element, index) => {
      const html = element.outerHTML;
      const tagName = element.tagName.toLowerCase();
      const text = element.textContent?.trim();
      const src = element.querySelector("img")?.getAttribute("src") || element.getAttribute("src");
      const alt = element.querySelector("img")?.getAttribute("alt") || element.getAttribute("alt");

      let id = "";
      if (tagName === "h1") {
        id = headings[headingIndex]?.id || `heading-${headingIndex}`;
        headingIndex++;
      }

      let type = "text";
      if (["h1", "h2", "h3"].includes(tagName)) type = "heading";
      else if (tagName === "img" || html.includes("<img")) type = "image";
      else if (tagName === "table") type = "table";
      else if (tagName === "ul") type = "list";
      else if (tagName === "ol") type = "orderedList";
      else if (tagName === "blockquote") type = "quote";
      else if (tagName === "pre" || tagName === "code") type = "code";
      else if (html.includes("youtube.com/embed")) type = "youtube";

      let sanitizedHtml = DOMPurify.sanitize(html, {
        ADD_TAGS: ["iframe", "a"],
        ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "src", "href", "target", "rel"],
        ALLOWED_URI_REGEXP: /^(?:(?:(?:https?|ftp|mailto):)?\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be|[\w-]+(?:\.[\w-]+)+)(?:\/[\w-./?%&=]*)?$/,
      });

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = sanitizedHtml;
      tempDiv.querySelectorAll("a[href]").forEach((link) => {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      });
      sanitizedHtml = tempDiv.innerHTML;

      return {
        id: `block-${index}`,
        type,
        html: sanitizedHtml,
        tagName,
        text,
        src,
        alt,
        level: tagName,
        isOrdered: tagName === "ol",
        headingId: id,
      };
    });
  }, [post?.content, headings]);

  // Các block render - để chung trong file chính như file gốc
  const HeadingBlock = ({ element, level, id }: any) => (
    <div className="relative group" id={id}>
      <div
        className={`font-bold text-foreground mb-6 mt-8 ${
          level === "h1" ? "text-3xl md:text-4xl" : level === "h2" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
        }`}
        dangerouslySetInnerHTML={{ __html: element.html }}
      />
      <div className="absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <a href={`#${id}`} className="text-muted-foreground hover:text-primary">
          #
        </a>
      </div>
    </div>
  );

  const ImageBlock = ({ element }: any) => (
    <figure className="my-8 group">
      <div className="overflow-hidden rounded-2xl border border-border">
        <img
          src={element.src}
          alt={element.alt || element.text || "Blog image"}
          className="w-full h-auto transition-transform duration-700 group-hover:scale-105 object-cover"
          loading="lazy"
        />
      </div>
      {element.text && (
        <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
          {element.text}
        </figcaption>
      )}
    </figure>
  );

  const TextBlock = ({ element }: any) => (
    <div className="text-lg leading-relaxed text-foreground/90 mb-6" dangerouslySetInnerHTML={{ __html: element.html }} />
  );

  const QuoteBlock = ({ element }: any) => (
    <blockquote className="border-l-4 border-primary pl-6 py-3 my-8 bg-gradient-to-r from-primary/10 to-transparent">
      <div className="text-xl italic text-foreground" dangerouslySetInnerHTML={{ __html: element.html }} />
    </blockquote>
  );

  const CodeBlock = ({ element }: any) => (
    <div className="my-8 relative group">
      <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button size="sm" variant="outline" className="text-xs">
          Copy
        </Button>
      </div>
      <pre className="bg-charcoal text-foreground p-5 rounded-xl overflow-x-auto text-sm border border-border">
        <code dangerouslySetInnerHTML={{ __html: element.html }} />
      </pre>
    </div>
  );

  const TableBlock = ({ element }: any) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-border bg-card">
      <div className="min-w-full divide-y divide-border" dangerouslySetInnerHTML={{ __html: element.html }} />
    </div>
  );

  const ListBlock = ({ element, isOrdered }: any) => (
    <div className={`my-6 ${isOrdered ? "pl-6" : "pl-5"}`}>
      <div className="space-y-2 text-foreground/90" dangerouslySetInnerHTML={{ __html: element.html }} />
    </div>
  );

  const YoutubeBlock = ({ element }: any) => {
    const iframeMatch = element.html.match(/<iframe[^>]+src="([^"]+)"[^>]*>/);
    const figcaptionMatch = element.html.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/);

    const videoSrc = iframeMatch ? iframeMatch[1] : null;
    const videoTitle = figcaptionMatch ? figcaptionMatch[1].trim() : "Video YouTube";

    if (!videoSrc) {
      return <TextBlock element={element} />;
    }

    return (
      <figure className="my-12 mx-auto max-w-5xl w-full group">
        <div className="overflow-hidden rounded-2xl border border-border shadow-lg hover:shadow-xl transition-shadow">
          <div className="relative w-full pb-[56.25%] bg-black">
            <iframe
              src={videoSrc}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
        <figcaption className="text-center text-sm text-muted-foreground mt-4 italic">
          {videoTitle}
        </figcaption>
      </figure>
    );
  };

  const renderBlock = (block: any, index: number) => {
    switch (block.type) {
      case "heading":
        return <HeadingBlock element={block} level={block.tagName} id={block.headingId} key={block.id} />;
      case "image":
        return <ImageBlock element={block} key={block.id} />;
      case "quote":
        return <QuoteBlock element={block} key={block.id} />;
      case "code":
        return <CodeBlock element={block} key={block.id} />;
      case "table":
        return <TableBlock element={block} key={block.id} />;
      case "list":
        return <ListBlock element={block} isOrdered={false} key={block.id} />;
      case "orderedList":
        return <ListBlock element={block} isOrdered={true} key={block.id} />;
      case "youtube":
        return <YoutubeBlock element={block} key={block.id} />;
      default:
        return <TextBlock element={block} key={block.id} />;
    }
  };

  const handleHeadingClick = (headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const calculateReadTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / 200);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 w-8 h-8 text-primary" />
          <p className="text-muted-foreground">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy bài viết</h1>
          <Button onClick={() => navigate("/blog")}>Quay lại danh sách</Button>
        </div>
      </div>
    );
  }

  const readTime = calculateReadTime(post.content);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection image={post.image} title={post.title} />

      <div className="container mx-auto px-4 py-8 max-w-[1600px]">
        {/* Mobile TOC - giữ nguyên như gốc */}
        {headings.length > 0 && (
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              onClick={() => setShowMobileToc(!showMobileToc)}
              className="w-full flex items-center justify-center"
            >
              <Menu className="w-4 h-4 mr-2" />
              {showMobileToc ? "Ẩn mục lục" : "Hiện mục lục"}
            </Button>

            {showMobileToc && (
              <div className="mt-4 bg-card rounded-xl shadow-lg p-4 border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Menu className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-foreground">Mục lục</h3>
                </div>

                <nav className="space-y-1 max-h-60 overflow-y-auto">
                  {headings.map((heading) => (
                    <button
                      key={heading.id}
                      onClick={() => {
                        handleHeadingClick(heading.id);
                        setShowMobileToc(false);
                      }}
                      className="block w-full text-left py-2 px-3 rounded-lg transition-all text-sm font-semibold text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      {heading.text}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center relative">
          {/* Main Content */}
          <div className="max-w-6xl w-full">
            {!post.image && (
              <div className="mb-8">
                <Button variant="ghost" onClick={() => navigate("/blog")} className="mb-6">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại
                </Button>
              </div>
            )}

            <article className="bg-card text-card-foreground rounded-2xl shadow-lg p-6 md:p-10 -mt-20 relative z-10 border border-border">
              <ArticleMetadata post={post} readTime={readTime} viewCount={viewCount} />
              <ArticleTitleAndExcerpt title={post.title} excerpt={post.excerpt} />
              <ArticleActions post={post} />
              <Separator className="mb-8" />
              <ArticleContent>
                {parsedContent.map((block, index) => renderBlock(block, index))}
              </ArticleContent>
              <TagsSection tags={post.tags} />
              <AuthorBio post={post} />
            </article>

            <RelatedPosts relatedPosts={relatedPosts} />
            <CommentsSection />
          </div>

          {/* Mục lục - giữ nguyên sticky như gốc */}
          <div className="hidden lg:block ml-8">
            <TableOfContents
              headings={headings}
              links={linksInContent}
              activeId={activeHeadingId}
              onHeadingClick={handleHeadingClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}