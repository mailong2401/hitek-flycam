// Tất cả schema SEO 
import { useEffect } from "react";
import { EnhancedBlogPost } from "./BlogTypes";
import Lg_flycam from "@/assets/logo/logo-flycam-hitek.png";

interface BlogSEOProps {
  blogPosts: EnhancedBlogPost[];
  currentPost: EnhancedBlogPost;
  currentIndex: number;
}

// Function để thêm schema script vào head
const addSchemaScript = (schemaData: any, id: string) => {
  const oldScript = document.getElementById(id);
  if (oldScript) oldScript.remove();
  
  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schemaData, null, 2);
  document.head.appendChild(script);
};

// Function xóa schema script
const removeSchemaScript = (id: string) => {
  const script = document.getElementById(id);
  if (script) script.remove();
};

// Tạo Organization Schema
const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Hitek Flycam",
  "url": window.location.origin,
  "logo": `${window.location.origin}${Lg_flycam}`,
  "description": "Chuyên trang chia sẻ kiến thức, tin tức và đánh giá về công nghệ drone, flycam tại Việt Nam",
  "sameAs": [
    "https://facebook.com/hitekflycam",
    "https://youtube.com/hitekflycam"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+84-28-9995-9588",
    "contactType": "customer service",
    "areaServed": "VN",
    "availableLanguage": "Vietnamese"
  },
  "founder": {
    "@type": "Person",
    "name": "Hitek Flycam Team"
  },
  "foundingDate": "2020",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ho Chi Minh City",
    "addressRegion": "Vietnam",
    "addressCountry": "VN"
  }
});

// Tạo Breadcrumb Schema
const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Trang chủ",
      "item": window.location.origin
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog Drone",
      "item": `${window.location.origin}/blog`
    }
  ]
});

// Tạo Website Schema
const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Hitek Flycam Blog",
  "url": window.location.origin,
  "description": "Blog chia sẻ kiến thức về drone, flycam, công nghệ chụp ảnh từ trên cao tại Việt Nam",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${window.location.origin}/blog?search={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  },
  "inLanguage": "vi-VN",
  "copyrightYear": new Date().getFullYear(),
  "copyrightHolder": {
    "@type": "Organization",
    "name": "Hitek Flycam"
  }
});

// Tạo BlogPosting Schema
const generateBlogPostSchema = (post: EnhancedBlogPost) => {
  const postUrl = `${window.location.origin}/blog/${post.id}`;
  const postImage = post.image || "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  const readTimeMinutes = parseInt(post.readTime?.replace(' phút', '') || '5');
  const publishDate = post.created_at || post.date || new Date().toISOString();
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || post.content?.substring(0, 160) || "Bài viết về drone và công nghệ flycam tại Việt Nam",
    "image": postImage,
    "datePublished": publishDate,
    "dateModified": publishDate,
    "author": {
      "@type": "Person",
      "name": post.author || "Hitek Flycam Team",
      "url": window.location.origin
    },
    "publisher": {
      "@type": "Organization",
      "name": "Hitek Flycam",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}${Lg_flycam}`,
        "width": "200",
        "height": "200"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "url": postUrl,
    "articleSection": post.category,
    "keywords": post.tags ? post.tags.join(", ") : "drone, flycam, công nghệ, quay phim, chụp ảnh, UAV, việt nam",
    "wordCount": post.content ? post.content.split(/\s+/).length : 0,
    "timeRequired": `PT${readTimeMinutes}M`,
    "thumbnailUrl": postImage,
    "isAccessibleForFree": true,
    "inLanguage": "vi-VN",
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": { "@type": "ViewAction" },
      "userInteractionCount": post.views || 0
    },
    "commentCount": post.comments || 0
  };
};

// Tạo CollectionPage Schema
const generateCollectionPageSchema = (blogPosts: EnhancedBlogPost[]) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Blog Drone - Kiến thức & Tin tức | Hitek Flycam",
  "description": "Tổng hợp bài viết, tin tức, đánh giá và hướng dẫn về công nghệ drone, flycam tại Việt Nam",
  "url": window.location.href,
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": blogPosts.length,
    "itemListElement": blogPosts.slice(0, 10).map((post, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "BlogPosting",
        "url": `${window.location.origin}/blog/${post.id}`,
        "name": post.title,
        "description": post.excerpt || "",
        "datePublished": post.created_at || post.date || ""
      }
    }))
  }
});

// Tạo Blog Schema tổng
const generateBlogSchema = (blogPosts: EnhancedBlogPost[]) => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Hitek Flycam Blog",
  "description": "Chuyên trang tin tức và kiến thức về drone, flycam tại Việt Nam",
  "url": `${window.location.origin}/blog`,
  "publisher": {
    "@type": "Organization",
    "name": "Hitek Flycam",
    "logo": {
      "@type": "ImageObject",
      "url": `${window.location.origin}${Lg_flycam}`,
      "width": "200",
      "height": "200"
    }
  },
  "blogPost": blogPosts.slice(0, 10).map(post => ({
    "@type": "BlogPosting",
    "headline": post.title,
    "url": `${window.location.origin}/blog/${post.id}`,
    "datePublished": post.created_at || post.date || "",
    "author": {
      "@type": "Person",
      "name": post.author || "Hitek Flycam"
    },
    "articleSection": post.category
  })),
  "inLanguage": "vi-VN",
  "isFamilyFriendly": true,
  "copyrightYear": new Date().getFullYear()
});

// Tạo FAQ Schema
const generateFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Blog Hitek Flycam viết về chủ đề gì?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Blog Hitek Flycam chuyên chia sẻ kiến thức, tin tức, đánh giá và hướng dẫn về công nghệ drone, flycam, kỹ thuật bay và ứng dụng thực tiễn tại Việt Nam. Chúng tôi cập nhật các thông tin mới nhất về thiết bị bay không người lái, kỹ thuật quay phim chụp ảnh từ trên cao, và các ứng dụng của drone trong đời sống."
      }
    },
    {
      "@type": "Question",
      "name": "Có những loại drone nào được đề cập trong blog?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chúng tôi đề cập đến đa dạng các loại drone từ drone chụp ảnh, quay phim chuyên nghiệp (DJI, Autel, Skydio), drone racing, đến drone công nghiệp, nông nghiệp và drone tự chế. Các hãng drone phổ biến như DJI, Parrot, Yuneec, Autel Robotics đều được đánh giá chi tiết."
      }
    },
    {
      "@type": "Question",
      "name": "Tần suất cập nhật bài viết mới là bao lâu?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Blog được cập nhật thường xuyên với ít nhất 3-5 bài viết mới mỗi tuần. Chúng tôi cập nhật tin tức công nghệ drone hàng ngày, đánh giá sản phẩm mới hàng tuần, và hướng dẫn kỹ thuật chi tiết hàng tháng."
      }
    }
  ]
});

// Tạo LocalBusiness Schema
const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Hitek Flycam",
  "image": `${window.location.origin}${Lg_flycam}`,
  "@id": window.location.origin,
  "url": window.location.origin,
  "telephone": "+84-28-9995-9588",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Đường ABC",
    "addressLocality": "Ho Chi Minh City",
    "postalCode": "700000",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 10.8231,
    "longitude": 106.6297
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    "opens": "08:00",
    "closes": "18:00"
  },
  "priceRange": "$$",
  "sameAs": [
    "https://facebook.com/hitekflycam",
    "https://youtube.com/hitekflycam"
  ]
});

const BlogSEO: React.FC<BlogSEOProps> = ({ blogPosts, currentPost, currentIndex }) => {
  useEffect(() => {
    // Thêm các schema cơ bản
    addSchemaScript(generateOrganizationSchema(), 'schema-organization');
    addSchemaScript(generateBreadcrumbSchema(), 'schema-breadcrumb');
    addSchemaScript(generateWebsiteSchema(), 'schema-website');
    addSchemaScript(generateLocalBusinessSchema(), 'schema-local-business');
    addSchemaScript(generateFAQSchema(), 'schema-faq');

    return () => {
      ['schema-organization', 'schema-breadcrumb', 'schema-website', 
       'schema-local-business', 'schema-faq', 'schema-blog', 
       'schema-collection-page'].forEach(removeSchemaScript);
      
      const oldPostScripts = document.querySelectorAll('[id^="schema-post-"]');
      oldPostScripts.forEach(script => script.remove());
    };
  }, []);

  useEffect(() => {
    if (blogPosts.length > 0) {
      addSchemaScript(generateBlogSchema(blogPosts), 'schema-blog');
      addSchemaScript(generateCollectionPageSchema(blogPosts), 'schema-collection-page');

      blogPosts.slice(0, 6).forEach((post, index) => {
        setTimeout(() => {
          addSchemaScript(generateBlogPostSchema(post), `schema-post-${post.id}`);
        }, index * 50);
      });
    }
  }, [blogPosts]);

  // Meta tags
  return (
    <head>
      <title>Blog Drone - Kiến thức & Tin tức Flycam | Hitek Flycam</title>
      <meta 
        name="description" 
        content="Cập nhật tin tức mới nhất, đánh giá chuyên sâu và hướng dẫn chi tiết về công nghệ drone, flycam tại Việt Nam." 
      />
      <meta 
        name="keywords" 
        content="drone, flycam, UAV, công nghệ drone, hướng dẫn bay drone, đánh giá drone, tin tức drone, pháp lý drone, Việt Nam, Hitek Flycam" 
      />
      <meta name="author" content="Hitek Flycam" />
      <meta property="og:title" content="Blog Drone - Kiến thức & Tin tức Flycam | Hitek Flycam" />
      <meta 
        property="og:description" 
        content="Cập nhật tin tức mới nhất, đánh giá chuyên sâu và hướng dẫn chi tiết về công nghệ drone, flycam tại Việt Nam." 
      />
      <meta property="og:image" content={currentPost.image} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="vi_VN" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Blog Drone - Kiến thức & Tin tức Flycam | Hitek Flycam" />
      <meta name="twitter:description" content="Chuyên trang chia sẻ kiến thức về drone, flycam, công nghệ chụp ảnh từ trên cao tại Việt Nam" />
      <meta name="twitter:image" content={currentPost.image} />
      <link rel="canonical" href={window.location.href} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Additional semantic HTML for screen readers */}
      <nav aria-label="Breadcrumb" className="sr-only">
        <ol>
          <li><a href={window.location.origin}>Trang chủ</a></li>
          <li><a href={`${window.location.origin}/blog`}>Blog</a></li>
          <li>{currentPost.title}</li>
        </ol>
      </nav>

      <main role="main" className="sr-only">
        <h1>{currentPost.title}</h1>
        <p>{currentPost.excerpt}</p>
      </main>
    </head>
  );
};

export default BlogSEO;