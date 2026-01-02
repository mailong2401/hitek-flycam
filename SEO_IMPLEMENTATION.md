# Triển khai SEO cho Blog - Hitek Flycam

## Tổng quan

Dự án đã được cài đặt các tối ưu hóa SEO cho blog, bao gồm:

1. ✅ **Dynamic Meta Tags** - React Helmet Async
2. ✅ **Sitemap tự động** - Tạo từ Supabase
3. ✅ **Structured Data** - JSON-LD Schema.org
4. ✅ **PWA Support** - Service Worker & Caching
5. ✅ **Robots.txt** - Cho phép crawl
6. ✅ **Canonical URLs** - Tránh duplicate content
7. ✅ **Multi-language Support** - Vi/En với hreflang

## Cấu trúc Files

```
hitek-flycam/
├── scripts/
│   ├── generate-sitemap.ts      # Script tạo sitemap từ Supabase
│   └── generate-blog-routes.ts  # Script tạo routes list
├── public/
│   ├── sitemap.xml              # Sitemap (auto-generated)
│   └── robots.txt               # Robots config
├── src/
│   └── components/blog/
│       └── BlogDetailSEO.tsx    # SEO component cho blog detail
└── vite.config.ts               # PWA & build config
```

## Scripts Có Sẵn

### 1. Generate Sitemap
```bash
npm run generate:sitemap
```
- Kết nối Supabase
- Lấy tất cả blog posts published
- Tạo sitemap.xml với tất cả routes
- Output: `public/sitemap.xml`

### 2. Build Production
```bash
npm run build
```
- Tự động generate sitemap trước khi build
- Build React app với Vite
- Tạo PWA manifest & service worker
- Output: `dist/` folder

### 3. Deploy
```bash
npm run deploy
```
- Chạy build
- Deploy lên GitHub Pages

## Tính năng SEO

### Meta Tags (BlogDetailSEO Component)

Mỗi blog post có:
- **Title Tag**: `{meta_title} | Hitek Flycam Blog`
- **Description**: Từ `meta_description_vi/en` hoặc `excerpt`
- **Keywords**: Từ tags của post
- **Canonical URL**: URL duy nhất cho mỗi post
- **Open Graph Tags**: Cho Facebook share
- **Twitter Card**: Cho Twitter share
- **Language Alternates**: Vi/En hreflang tags

### Structured Data (JSON-LD)

Mỗi blog post có 2 schema:

1. **BlogPosting Schema**
   - Headline, description, image
   - Author, publisher info
   - Published/modified dates
   - Reading time, word count
   - View count, interaction stats

2. **Breadcrumb Schema**
   - Home > Blog > Post Title
   - Giúp Google hiểu cấu trúc site

### Sitemap.xml

Tự động tạo với:
- Tất cả static pages
- Tất cả blog posts (Vi + En)
- Priority & changefreq cho mỗi URL
- LastMod date cho blog posts

### PWA Features

- Service Worker auto-update
- Runtime caching cho images
- Offline support
- Manifest.webmanifest

## Cách Thêm Blog Post Mới

1. **Tạo post trong Supabase**
   - Điền đầy đủ: title_vi, title_en
   - Meta: meta_title_vi, meta_description_vi
   - Slug: slug_vi, slug_en
   - Tags: array of keywords

2. **Generate lại sitemap**
   ```bash
   npm run generate:sitemap
   ```

3. **Build & Deploy**
   ```bash
   npm run deploy
   ```

## Google Search Console Setup

1. **Submit Sitemap**
   - URL: `https://flycam.hitek.com.vn/sitemap.xml`
   - Search Console > Sitemaps > Add new sitemap

2. **Verify Indexing**
   - Check coverage report
   - Monitor performance
   - Fix any errors

3. **Fetch as Google**
   - URL inspection tool
   - Request indexing cho posts mới

## Tối Ưu Hóa Thêm

### Hiện Tại
- ✅ Meta tags động
- ✅ Structured data
- ✅ Sitemap tự động
- ✅ PWA support
- ✅ Multi-language

### Có Thể Thêm
- 🔲 Pre-rendering với Puppeteer (cho Google bot)
- 🔲 Image optimization (WebP, lazy loading)
- 🔲 Content compression (Brotli)
- 🔲 CDN caching headers
- 🔲 AMP pages

## Kiểm Tra SEO

### Tools
1. **Google PageSpeed Insights**
   - https://pagespeed.web.dev/

2. **Google Rich Results Test**
   - https://search.google.com/test/rich-results

3. **Lighthouse (Chrome DevTools)**
   - SEO score
   - Performance score
   - Best practices

### Manual Checks
```bash
# Check sitemap
curl https://flycam.hitek.com.vn/sitemap.xml

# Check robots.txt
curl https://flycam.hitek.com.vn/robots.txt

# Check meta tags
curl -s https://flycam.hitek.com.vn/blog/{slug} | grep -E '<meta|<title'
```

## Environment Variables

Cần có trong `.env`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Troubleshooting

### Sitemap không tạo được
- Check .env có đúng credentials
- Check Supabase connection
- Chạy: `npm run generate:sitemap` manually

### Meta tags không hiện
- Check BlogDetailSEO component đã import
- Check react-helmet-async Provider trong App.tsx
- Inspect HTML trong browser DevTools

### Build fail
- Check vite.config.ts syntax
- Check PWA config
- Clear node_modules và reinstall

## Performance Tips

1. **Optimize Images**
   - Compress trước khi upload
   - Dùng WebP format
   - Lazy loading

2. **Code Splitting**
   - Dynamic imports cho routes
   - Chunk splitting trong vite.config

3. **Caching Strategy**
   - Static assets: long cache
   - HTML: short cache
   - API: no cache hoặc stale-while-revalidate

## Liên Hệ

Nếu có vấn đề, liên hệ team development.
