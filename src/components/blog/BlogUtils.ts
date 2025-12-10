// Các utility functions
import { EnhancedBlogPost } from "./BlogTypes";

// Hàm tính thời gian đọc
export const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} phút`;
};

// Hàm tạo slug
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
};

// Hàm lấy ảnh fallback
export const getFallbackImage = (index: number): string => {
  const fallbackImages = [
    "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];
  return fallbackImages[index % fallbackImages.length];
};

// Hàm lấy dữ liệu mặc định
export const getDefaultPosts = (): EnhancedBlogPost[] => {
  return [
    {
      id: '1',
      title: "BLOG DRONE - KIẾN THỨC & TIN TỨC FLYCAM",
      author: "HITEK FLYCAM",
      category: "Drone",
      excerpt: "Cập nhật tin tức mới nhất, đánh giá chuyên sâu và hướng dẫn chi tiết về công nghệ drone.",
      content: "Nội dung chi tiết về drone...",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      created_at: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      views: 1500,
      likes: 120,
      status: 'published',
      readTime: "5 phút",
      slug: "blog-drone",
      tags: ["drone", "flycam", "tin tức"],
      comments: 15
    },
    {
      id: '2',
      title: "DRONE MỚI NHẤT 2024 - CÔNG NGHỆ AI",
      author: "HITEK FLYCAM",
      category: "Công nghệ",
      excerpt: "Khám phá những mẫu drone mới nhất với công nghệ AI và camera 8K.",
      content: "Nội dung về drone mới...",
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      created_at: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      views: 1200,
      likes: 85,
      status: 'published',
      readTime: "7 phút",
      slug: "drone-moi-2024",
      tags: ["drone", "công nghệ", "2024"],
      comments: 10
    },
    {
      id: '3',
      title: "HƯỚNG DẪN BAY DRONE AN TOÀN",
      author: "HITEK FLYCAM",
      category: "Hướng dẫn",
      excerpt: "Tổng hợp kiến thức cơ bản về kỹ thuật bay drone an toàn.",
      content: "Nội dung hướng dẫn...",
      image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      created_at: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      views: 1800,
      likes: 200,
      status: 'published',
      readTime: "10 phút",
      slug: "huong-dan-bay",
      tags: ["hướng dẫn", "drone", "bay"],
      comments: 25
    },
    {
      id: '4',
      title: "PHÁP LÝ DRONE TẠI VIỆT NAM",
      author: "HITEK FLYCAM",
      category: "Pháp lý",
      excerpt: "Cập nhật quy định mới nhất về giấy phép bay drone.",
      content: "Nội dung pháp lý...",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      created_at: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      views: 900,
      likes: 75,
      status: 'published',
      readTime: "8 phút",
      slug: "phap-ly-drone",
      tags: ["pháp lý", "giấy phép", "drone"],
      comments: 12
    }
  ];
};

// Hàm tạo clone của thumbnail để animation
export const createThumbnailClone = (
  thumbnailContainerRef: React.RefObject<HTMLDivElement>,
  postId: string,
  isPrev: boolean = false
): HTMLElement | null => {
  const thumbnailContainer = thumbnailContainerRef.current;
  if (!thumbnailContainer) return null;
  
  let thumbnailElement;
  
  if (isPrev) {
    thumbnailElement = thumbnailContainer.children[0] as HTMLElement;
  } else {
    thumbnailElement = Array.from(thumbnailContainer.children).find(
      (child) => child.getAttribute('data-post-id') === postId
    ) as HTMLElement;
  }
  
  if (!thumbnailElement) {
    thumbnailElement = thumbnailContainer.children[0] as HTMLElement;
  }
  
  const rect = thumbnailElement.getBoundingClientRect();
  const clone = thumbnailElement.cloneNode(true) as HTMLElement;
  
  clone.style.position = 'fixed';
  clone.style.left = `${rect.left}px`;
  clone.style.top = `${rect.top}px`;
  clone.style.width = `${rect.width}px`;
  clone.style.height = `${rect.height}px`;
  clone.style.zIndex = '1000';
  clone.style.pointerEvents = 'none';
  clone.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  clone.style.borderRadius = '12px';
  clone.style.overflow = 'hidden';
  
  document.body.appendChild(clone);
  return clone;
};