import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/services/supabase";
import { BlogPost } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  BlogHeroSection,
  BlogSearchFilters,
  BlogPostsGrid,
  BlogSchemaManager
} from "@/components/blog";

interface EnhancedBlogPost extends BlogPost {
  readTime: string;
  views: number;
  likes: number;
  slug: string;
}

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<EnhancedBlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<EnhancedBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "popular">("newest");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);
  const [postsPerRow, setPostsPerRow] = useState(3);
  const navigate = useNavigate();

  const categories = ["all", ...Array.from(new Set(blogPosts.map(post => post.category)))];
  const totalPosts = blogPosts.length;
  const totalViews = blogPosts.reduce((sum, post) => sum + post.views, 0);
  const totalCategories = categories.length - 1;

  const fallbackImages = [
    "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ];

  useEffect(() => {
    fetchBlogPosts();
    updatePostsPerRow();
    window.addEventListener('resize', updatePostsPerRow);
    return () => window.removeEventListener('resize', updatePostsPerRow);
  }, []);

  useEffect(() => {
    filterAndSortPosts();
  }, [blogPosts, searchTerm, sortBy, categoryFilter]);

  const updatePostsPerRow = () => {
    const width = window.innerWidth;
    if (width < 768) setPostsPerRow(1);
    else if (width < 1024) setPostsPerRow(2);
    else setPostsPerRow(3);
  };

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const postsWithDefaults: EnhancedBlogPost[] = (data || []).map((post: any) => ({
        ...post,
        readTime: calculateReadTime(post.content || ''),
        views: post.views || 0,
        likes: post.likes || 0,
        slug: post.slug || generateSlug(post.title),
        tags: post.tags || [],
        excerpt: post.excerpt || (post.content?.substring(0, 150) || '') + "...",
        updated_at: post.updated_at || post.created_at,
        comments: post.comments || 0
      }));
      
      setBlogPosts(postsWithDefaults);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast.error('Lỗi tải bài viết');
    } finally {
      setLoading(false);
    }
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} phút`;
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
  };

  const filterAndSortPosts = () => {
    let filtered = [...blogPosts];

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.excerpt || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags && post.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(post => post.category === categoryFilter);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at || b.date || '').getTime() - 
                 new Date(a.created_at || a.date || '').getTime();
        case "popular":
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });

    setFilteredPosts(filtered);
    setCurrentSlide(0);
  };

  const incrementViewCount = async (postId: string) => {
    if (updatingIds.has(postId)) return;

    try {
      setUpdatingIds(prev => new Set(prev).add(postId));

      const currentPost = blogPosts.find(post => post.id === postId);
      if (!currentPost) return;

      const newViews = (currentPost.views || 0) + 1;
      
      await supabase
        .from('blog_posts')
        .update({ 
          views: newViews,
          updated_at: new Date().toISOString()
        })
        .eq('id', postId);

      setBlogPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, views: newViews } : post
      ));

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setUpdatingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    }
  };

  const handleReadMoreClick = async (e: React.MouseEvent, postId: string) => {
    e.preventDefault();
    await incrementViewCount(postId);
    setTimeout(() => navigate(`/blog/${postId}`), 100);
  };

  const handlePostClick = async (e: React.MouseEvent, postId: string) => {
    e.preventDefault();
    await incrementViewCount(postId);
    setTimeout(() => navigate(`/blog/${postId}`), 100);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setSortBy("newest");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            {/* Loading skeleton giữ nguyên */}
          </div>
        </section>
      </div>
    );
  }

  const lineClampStyles = `
    .line-clamp-1 { /* styles */ }
    .line-clamp-2 { /* styles */ }
  `;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-gray-50/50 to-background dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900">
      <style>{lineClampStyles}</style>
      
      {/* SEO Schema Manager */}
      <BlogSchemaManager filteredPosts={filteredPosts} />

      {/* Hero Section */}
      <BlogHeroSection
        totalPosts={totalPosts}
        totalViews={totalViews}
        totalCategories={totalCategories}
      />

      {/* Main Blog Content */}
      <section className="min-h-screen py-20" itemScope itemType="https://schema.org/Blog">
        <meta itemProp="name" content="Hitek Flycam Blog" />
        <meta itemProp="description" content="Chuyên trang tin tức và kiến thức về drone, flycam tại Việt Nam" />
        <meta itemProp="url" content={window.location.href} />
        
        <div className="container mx-auto px-4">
          {/* Search và Filters */}
          <BlogSearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            categories={categories}
            clearFilters={clearFilters}
          />

          {/* Blog Posts Grid */}
          <div className="pb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {searchTerm ? `Kết quả tìm kiếm cho "${searchTerm}"` : "Bài viết mới nhất về Drone"}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  {filteredPosts.length} bài viết
                  {categoryFilter !== "all" && ` trong danh mục "${categoryFilter}"`}
                  {sortBy !== "newest" && ` - Sắp xếp theo phổ biến nhất`}
                </p>
              </div>
            </div>

            <BlogPostsGrid
              filteredPosts={filteredPosts}
              postsPerRow={postsPerRow}
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
              updatingIds={updatingIds}
              handlePostClick={handlePostClick}
              handleReadMoreClick={handleReadMoreClick}
              searchTerm={searchTerm}
              categoryFilter={categoryFilter}
              clearFilters={clearFilters}
              fallbackImages={fallbackImages}
            />
          </div>
        </div>
      </section>
    </div>
  );
}