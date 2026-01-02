import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const baseUrl = 'https://flycam.hitek.com.vn';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in environment variables');
  console.error('Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function generateSitemap() {
  try {
    console.log('Generating sitemap from Supabase...');

    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug_vi, slug_en, updated_at, created_at')
      .eq('status', 'published');

    if (error) {
      console.error('Error fetching posts:', error);
      return;
    }

    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/blog', priority: '0.9', changefreq: 'daily' },
      { url: '/gioi-thieu', priority: '0.8', changefreq: 'weekly' },
      { url: '/dich-vu', priority: '0.8', changefreq: 'weekly' },
      { url: '/tai-lieu', priority: '0.7', changefreq: 'weekly' },
      { url: '/lien-he', priority: '0.7', changefreq: 'monthly' },
      { url: '/services/drone-repair', priority: '0.8', changefreq: 'weekly' },
      { url: '/services/surveying-drone', priority: '0.8', changefreq: 'weekly' },
      { url: '/services/delivery-drone', priority: '0.8', changefreq: 'weekly' },
      { url: '/services/drone-import', priority: '0.8', changefreq: 'weekly' },
      { url: '/services/flight-permit-service', priority: '0.8', changefreq: 'weekly' },
      { url: '/services/drone-filming', priority: '0.8', changefreq: 'weekly' },
    ];

    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static pages
    staticPages.forEach(page => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}${page.url}</loc>\n`;
      sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${page.priority}</priority>\n`;
      sitemap += '  </url>\n';
    });

    // Add blog posts
    if (posts && posts.length > 0) {
      posts.forEach((post: any) => {
        const lastmod = post.updated_at || post.created_at;

        if (post.slug_vi) {
          sitemap += '  <url>\n';
          sitemap += `    <loc>${baseUrl}/blog/${post.slug_vi}</loc>\n`;
          sitemap += `    <lastmod>${new Date(lastmod).toISOString().split('T')[0]}</lastmod>\n`;
          sitemap += '    <changefreq>weekly</changefreq>\n';
          sitemap += '    <priority>0.8</priority>\n';
          sitemap += '  </url>\n';
        }

        if (post.slug_en && post.slug_en !== post.slug_vi) {
          sitemap += '  <url>\n';
          sitemap += `    <loc>${baseUrl}/blog/${post.slug_en}</loc>\n`;
          sitemap += `    <lastmod>${new Date(lastmod).toISOString().split('T')[0]}</lastmod>\n`;
          sitemap += '    <changefreq>weekly</changefreq>\n';
          sitemap += '    <priority>0.8</priority>\n';
          sitemap += '  </url>\n';
        }
      });
    }

    sitemap += '</urlset>';

    const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, sitemap);

    console.log(`✓ Sitemap generated successfully at ${outputPath}`);
    console.log(`✓ Total URLs: ${staticPages.length + (posts ? posts.length * 2 : 0)}`);

  } catch (error) {
    console.error('Error generating sitemap:', error);
    throw error;
  }
}

generateSitemap();
