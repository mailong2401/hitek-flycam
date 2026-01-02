import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Supabase config
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function generateBlogRoutes() {
  try {
    console.log('Fetching blog posts from Supabase...');

    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug_vi, slug_en, id')
      .eq('status', 'published');

    if (error) {
      console.error('Error fetching posts:', error);
      return;
    }

    if (!posts || posts.length === 0) {
      console.log('No published posts found');
      return;
    }

    // Generate routes for both Vietnamese and English
    const routes = new Set<string>();
    routes.add('/');
    routes.add('/blog');
    routes.add('/gioi-thieu');
    routes.add('/dich-vu');
    routes.add('/tai-lieu');
    routes.add('/lien-he');
    routes.add('/services/drone-repair');
    routes.add('/services/surveying-drone');
    routes.add('/services/delivery-drone');
    routes.add('/services/drone-import');
    routes.add('/services/flight-permit-service');
    routes.add('/services/drone-filming');

    posts.forEach((post: any) => {
      if (post.slug_vi) {
        routes.add(`/blog/${post.slug_vi}`);
      }
      if (post.slug_en && post.slug_en !== post.slug_vi) {
        routes.add(`/blog/${post.slug_en}`);
      }
    });

    const routesArray = Array.from(routes);

    // Write routes to a JSON file
    const outputPath = path.join(process.cwd(), 'blog-routes.json');
    fs.writeFileSync(outputPath, JSON.stringify(routesArray, null, 2));

    console.log(`✓ Generated ${routesArray.length} routes`);
    console.log(`✓ Routes saved to ${outputPath}`);

    return routesArray;
  } catch (error) {
    console.error('Error generating routes:', error);
    throw error;
  }
}

generateBlogRoutes();
