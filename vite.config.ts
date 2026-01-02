import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // PWA for better SEO and performance
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,svg}'],
        maximumFileSizeToCacheInBytes: 25 * 1024 * 1024, // 25MB
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|webp|svg)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      },
      includeAssets: ['favicon.ico', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: 'Drone Services - Dịch vụ Drone chuyên nghiệp',
        short_name: 'Drone Services',
        description: 'Dịch vụ drone chuyên nghiệp: sửa chữa, trắc địa, vận chuyển, xin phép bay, nhập khẩu và quay flycam',
        theme_color: '#ffffff',
        icons: []
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        }
      }
    }
  }
}));
