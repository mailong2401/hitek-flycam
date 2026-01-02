import React from 'react';
import { Helmet } from 'react-helmet-async';

interface BlogDetailSEOProps {
  post: any;
  language: string;
}

export const BlogDetailSEO: React.FC<BlogDetailSEOProps> = ({ post, language }) => {
  const baseUrl = 'https://flycam.hitek.com.vn';

  const title = language === 'vi'
    ? (post.title_vi || post.title_en || post.title)
    : (post.title_en || post.title_vi || post.title);

  const description = language === 'vi'
    ? (post.meta_description_vi || post.excerpt_vi || post.meta_description_en || post.excerpt_en || '')
    : (post.meta_description_en || post.excerpt_en || post.meta_description_vi || post.excerpt_vi || '');

  const metaTitle = language === 'vi'
    ? (post.meta_title_vi || title)
    : (post.meta_title_en || title);

  const slug = language === 'vi'
    ? (post.slug_vi || post.slug_en || post.slug || post.id)
    : (post.slug_en || post.slug_vi || post.slug || post.id);

  const canonicalUrl = `${baseUrl}/blog/${slug}`;
  const imageUrl = post.image || `${baseUrl}/placeholder.svg`;
  const publishedDate = post.created_at || post.date || new Date().toISOString();
  const modifiedDate = post.updated_at || publishedDate;

  const content = language === 'vi'
    ? (post.content_vi || post.content_en || '')
    : (post.content_en || post.content_vi || '');

  const readTime = content ? Math.ceil(content.split(/\s+/).length / 200) : 5;

  const tags = post.tags || [];
  const keywords = tags.length > 0
    ? tags.join(', ')
    : 'drone, flycam, công nghệ, quay phim, chụp ảnh, UAV, việt nam';

  // Structured Data for Blog Post
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": imageUrl,
    "datePublished": publishedDate,
    "dateModified": modifiedDate,
    "author": {
      "@type": "Person",
      "name": post.author || "Hitek Flycam Team",
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "Hitek Flycam",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/favicon.ico`,
        "width": "60",
        "height": "60"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "url": canonicalUrl,
    "articleSection": post.category || "Tin tức",
    "keywords": keywords,
    "wordCount": content ? content.split(/\s+/).length : 0,
    "timeRequired": `PT${readTime}M`,
    "thumbnailUrl": imageUrl,
    "isAccessibleForFree": true,
    "inLanguage": language === 'vi' ? "vi-VN" : "en-US",
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": { "@type": "ViewAction" },
      "userInteractionCount": post.views || 0
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": language === 'vi' ? "Trang chủ" : "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{metaTitle} | Hitek Flycam Blog</title>
      <meta name="title" content={`${metaTitle} | Hitek Flycam Blog`} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={post.author || "Hitek Flycam Team"} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Hitek Flycam" />
      <meta property="og:locale" content={language === 'vi' ? "vi_VN" : "en_US"} />
      <meta property="article:published_time" content={publishedDate} />
      <meta property="article:modified_time" content={modifiedDate} />
      <meta property="article:author" content={post.author || "Hitek Flycam Team"} />
      <meta property="article:section" content={post.category || "Tin tức"} />
      {tags.map((tag: string) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content="@hitekflycam" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* Language Alternates */}
      {post.slug_vi && post.slug_en && (
        <>
          <link rel="alternate" hrefLang="vi" href={`${baseUrl}/blog/${post.slug_vi}`} />
          <link rel="alternate" hrefLang="en" href={`${baseUrl}/blog/${post.slug_en}`} />
          <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/blog/${post.slug_vi}`} />
        </>
      )}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
    </Helmet>
  );
};
