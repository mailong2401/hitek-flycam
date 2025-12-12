import React, { useEffect, useState, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { supabase } from "@/services/supabase";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Share2, Bookmark, Clock, User, Tag, Eye, Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// Các components riêng cho từng loại content
const HeadingBlock = ({ element, level, id }: any) => (
  <div className="relative group" id={id}>
    <div 
      className={`font-bold text-gray-900 mb-6 mt-8 ${level === 'h1' ? 'text-3xl md:text-4xl' : level === 'h2' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}
      dangerouslySetInnerHTML={{ __html: element.html }}
    />
    <div className="absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
      <a href={`#${id}`} className="text-gray-400 hover:text-red-500">
        #
      </a>
    </div>
  </div>
);

// ... (giữ nguyên các component khác ImageBlock, TextBlock, etc.)
const ImageBlock = ({ element }: any) => (
  <figure className="my-8 group">
    <div className="overflow-hidden rounded-2xl">
      <img
        src={element.src}
        alt={element.alt || element.text || "Blog image"}
        className="w-full h-auto transition-transform duration-700 group-hover:scale-105 object-cover"
        loading="lazy"
      />
    </div>
    {element.text && (
      <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
        {element.text}
      </figcaption>
    )}
  </figure>
);

const TextBlock = ({ element }: any) => (
  <div 
    className="text-lg leading-relaxed text-gray-700 mb-6"
    dangerouslySetInnerHTML={{ __html: element.html }}
  />
);

const QuoteBlock = ({ element }: any) => (
  <blockquote className="border-l-4 border-red-500 pl-6 py-3 my-8 bg-gradient-to-r from-red-50 to-transparent">
    <div 
      className="text-xl italic text-gray-800"
      dangerouslySetInnerHTML={{ __html: element.html }}
    />
  </blockquote>
);

const CodeBlock = ({ element }: any) => (
  <div className="my-8 relative group">
    <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
      <Button size="sm" variant="outline" className="text-xs">
        Copy
      </Button>
    </div>
    <pre className="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto text-sm">
      <code dangerouslySetInnerHTML={{ __html: element.html }} />
    </pre>
  </div>
);

const TableBlock = ({ element }: any) => (
  <div className="my-8 overflow-x-auto rounded-xl border border-gray-200">
    <div 
      className="min-w-full divide-y divide-gray-200"
      dangerouslySetInnerHTML={{ __html: element.html }}
    />
  </div>
);

const ListBlock = ({ element, isOrdered }: any) => (
  <div className={`my-6 ${isOrdered ? 'pl-6' : 'pl-5'}`}>
    <div 
      className="space-y-2"
      dangerouslySetInnerHTML={{ __html: element.html }}
    />
  </div>
);

// Component Table of Contents
const TableOfContents = ({ headings, onHeadingClick }: any) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -70% 0%' }
    );

    headings.forEach((heading: any) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24 hidden lg:block w-64 ml-8">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Menu className="w-5 h-5 text-red-600" />
          <h3 className="font-bold text-lg text-gray-900">Mục lục</h3>
        </div>
        
        <ScrollArea className="h-[calc(100vh-300px)]">
          <nav className="space-y-2">
            {headings.map((heading: any) => (
              <button
                key={heading.id}
                onClick={() => onHeadingClick(heading.id)}
                className={`block w-full text-left py-2 px-3 rounded-lg transition-all ${
                  activeId === heading.id 
                    ? 'bg-red-50 text-red-700 border-l-4 border-red-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } ${
                  heading.level === 'h1' ? 'text-base font-semibold pl-4' :
                  heading.level === 'h2' ? 'text-sm font-medium pl-8' :
                  'text-xs pl-12'
                }`}
              >
                {heading.text}
              </button>
            ))}
          </nav>
        </ScrollArea>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            {headings.length} mục
          </p>
        </div>
      </div>
      
      {/* Nút quay về đầu trang */}
      <Button
        variant="outline"
        size="sm"
        className="mt-4 w-full"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑ Đầu trang
      </Button>
    </div>
  );
};

export default function BlogDetail() {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [viewCount, setViewCount] = useState(0);
  const [showMobileToc, setShowMobileToc] = useState(false);

  useEffect(() => {
    loadPost();
    incrementViewCount();
  }, [id]);
  useEffect(() => {
  if (post) {
    loadRelatedPosts();
  }
}, [post]); // Chạy khi post thay đổi
 const loadPost = async () => {
  try {
    let query = supabase
      .from("blog_posts")
      .select("*")
      .eq(id ? "id" : "slug", id || slug);

    // Nếu không phải admin, chỉ lấy bài published
    const { data: sessionData } = await supabase.auth.getSession();
    const isAdmin = sessionData.session?.user?.email?.includes('admin') || false;
    
    if (!isAdmin) {
      query = query.eq('status', 'published');
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
    setViewCount(prev => prev + 1);
  };

  const loadRelatedPosts = async () => {
  if (!post) return;
  
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .neq("id", post.id) // Loại bỏ bài đang xem
      .eq("category", post.category) // Cùng category
      .eq("status", "published") // Chỉ lấy bài đã published
      .order("created_at", { ascending: false }) // Sắp xếp mới nhất
      .limit(3); // Giới hạn 3 bài
    
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

  // Trích xuất headings từ content
  const headings = useMemo(() => {
    if (!post?.content) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content, 'text/html');
    const headingElements = doc.querySelectorAll('h1, h2, h3');
    
    const extractedHeadings = Array.from(headingElements).map((element, index) => {
      const text = element.textContent?.trim() || '';
      const tagName = element.tagName.toLowerCase();
      const id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      
      return {
        id,
        text,
        level: tagName,
        element
      };
    });
    
    return extractedHeadings;
  }, [post?.content]);

  const parsedContent = useMemo(() => {
    if (!post?.content) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content, 'text/html');
    const elements = Array.from(doc.body.children);
    
    let headingIndex = 0;
    
    return elements.map((element, index) => {
      const html = element.outerHTML;
      const tagName = element.tagName.toLowerCase();
      const text = element.textContent?.trim();
      const src = element.querySelector('img')?.getAttribute('src') || element.getAttribute('src');
      const alt = element.querySelector('img')?.getAttribute('alt') || element.getAttribute('alt');
      
      // Tạo ID cho heading
      let id = '';
      if (['h1', 'h2', 'h3'].includes(tagName)) {
        id = headings[headingIndex]?.id || `heading-${headingIndex}`;
        headingIndex++;
      }
      
      // Xác định loại block
      let type = 'text';
      if (['h1', 'h2', 'h3'].includes(tagName)) type = 'heading';
      else if (tagName === 'img' || html.includes('<img')) type = 'image';
      else if (tagName === 'table') type = 'table';
      else if (tagName === 'ul') type = 'list';
      else if (tagName === 'ol') type = 'orderedList';
      else if (tagName === 'blockquote') type = 'quote';
      else if (tagName === 'pre' || tagName === 'code') type = 'code';
      
      return {
        id: `block-${index}`,
        type,
        html: DOMPurify.sanitize(html),
        tagName,
        text,
        src,
        alt,
        level: tagName,
        isOrdered: tagName === 'ol',
        headingId: id
      };
    });
  }, [post?.content, headings]);

  const renderBlock = (block: any, index: number) => {
    const props = { 
      element: block, 
      key: block.id,
      id: block.headingId 
    };
    
    switch (block.type) {
      case 'heading':
        return <HeadingBlock {...props} level={block.tagName} id={block.headingId} />;
      case 'image':
        return <ImageBlock {...props} />;
      case 'quote':
        return <QuoteBlock {...props} />;
      case 'code':
        return <CodeBlock {...props} />;
      case 'table':
        return <TableBlock {...props} />;
      case 'list':
        return <ListBlock {...props} isOrdered={false} />;
      case 'orderedList':
        return <ListBlock {...props} isOrdered={true} />;
      default:
        return <TextBlock {...props} />;
    }
  };

  const handleHeadingClick = (headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      const offset = 100; // Offset để không bị che bởi fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const calculateReadTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / 200);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 w-8 h-8" />
          <p className="text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {/* ... (giữ nguyên phần lỗi) */}
        </div>
      </div>
    );
  }

  const readTime = calculateReadTime(post.content);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section với ảnh cover */}
      {post.image && (
        <div className="relative h-[400px] md:h-[500px] w-full">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/blog')}
                className="text-white hover:bg-white/20 mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Nút mục lục mobile */}
        {headings.length > 0 && (
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              onClick={() => setShowMobileToc(!showMobileToc)}
              className="w-full flex items-center justify-center"
            >
              <Menu className="w-4 h-4 mr-2" />
              {showMobileToc ? 'Ẩn mục lục' : 'Hiện mục lục'}
            </Button>
            
            {showMobileToc && (
              <div className="mt-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <Menu className="w-5 h-5 text-red-600" />
                  <h3 className="font-bold text-gray-900">Mục lục</h3>
                </div>
                
                <nav className="space-y-1 max-h-60 overflow-y-auto">
                  {headings.map((heading: any) => (
                    <button
                      key={heading.id}
                      onClick={() => {
                        handleHeadingClick(heading.id);
                        setShowMobileToc(false);
                      }}
                      className={`block w-full text-left py-2 px-3 rounded-lg transition-all ${
                        heading.level === 'h1' ? 'text-sm font-semibold' :
                        heading.level === 'h2' ? 'text-sm pl-4' :
                        'text-xs pl-6'
                      } text-gray-600 hover:bg-gray-50 hover:text-gray-900`}
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
          <div className="max-w-4xl w-full">
            {/* Header nếu không có ảnh cover */}
            {!post.image && (
              <div className="mb-8">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/blog')}
                  className="mb-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại
                </Button>
              </div>
            )}

            {/* Article Container */}
            <article className="bg-white rounded-2xl shadow-lg p-6 md:p-10 -mt-20 relative z-10">
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-600">
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

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <div className="text-xl text-gray-600 mb-8 italic border-l-4 border-red-500 pl-4 py-2 bg-red-50/50">
                  {post.excerpt}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between mb-8 py-4 border-y">
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
                
                <div className="text-sm text-gray-500">
                  Đăng ngày: {new Date(post.date || post.created_at).toLocaleDateString("vi-VN", {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </div>

              <Separator className="mb-8" />

              {/* Content Blocks */}
              <div className="prose prose-lg max-w-none">
                {parsedContent.map((block, index) => renderBlock(block, index))}
              </div>

              {/* Tags */}
              {post.tags && (
                <div className="mt-12 pt-8 border-t">
                  <h3 className="text-lg font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {JSON.parse(post.tags || '[]').map((tag: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio */}
              <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Về tác giả</h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{post.author}</h4>
                    <p className="text-gray-600 mt-2">
                      Tác giả chuyên viết về {post.category.toLowerCase()}. 
                      Đã xuất bản nhiều bài viết chất lượng trên blog này.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((related) => (
                    <div 
                      key={related.id} 
                      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/blog/${related.id}`)}
                    >
                      {related.image && (
                        <img 
                          src={related.image} 
                          alt={related.title}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <Badge variant="outline" className="mb-2 text-xs">
                          {related.category}
                        </Badge>
                        <h3 className="font-bold line-clamp-2">{related.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div className="mt-12">
              <Tabs defaultValue="comments" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="comments">Bình luận (0)</TabsTrigger>
                  <TabsTrigger value="share">Chia sẻ</TabsTrigger>
                </TabsList>
                <TabsContent value="comments">
                  <div className="bg-white rounded-xl p-6">
                    <p className="text-center text-gray-500 py-8">
                      Tính năng bình luận đang được phát triển
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="share">
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex justify-center gap-4">
                      <Button variant="outline">Facebook</Button>
                      <Button variant="outline">Twitter</Button>
                      <Button variant="outline">LinkedIn</Button>
                      <Button variant="outline">Copy Link</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="hidden lg:block ml-8">
            <TableOfContents 
              headings={headings} 
              onHeadingClick={handleHeadingClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}