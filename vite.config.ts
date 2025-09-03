// @ts-nocheck
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { APP_CONFIG, BASE_URL } from './src/config/app.config'

// Plugin do automatycznego skanowania blogów - API endpoint
const blogScannerPlugin = () => {
  return {
    name: 'blog-scanner',
    configureServer(server) {
      // API endpoint z base URL!
      server.middlewares.use(`${BASE_URL}${APP_CONFIG.API.BLOG_FILES}`, (req, res) => {
        try {
          const blogDir = path.join(process.cwd(), 'public', 'content', 'blog');
          
          if (fs.existsSync(blogDir)) {
            const files = fs.readdirSync(blogDir)
              .filter(file => file.endsWith('.md'))
              .filter(file => {
                // Sprawdź czy plik nie jest pusty
                const filePath = path.join(blogDir, file);
                const stats = fs.statSync(filePath);
                return stats.size > 0;
              });
            
            console.log(`📁 API: Automatycznie znaleziono ${files.length} plików:`, files);
            
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(files));
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Blog directory not found' }));
          }
        } catch (error) {
          console.error('❌ API błąd skanowania foldera:', error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Failed to scan blog directory' }));
        }
      });
      
      // Dodaj też bez base URL na wypadek problemów z routingiem
      server.middlewares.use(APP_CONFIG.API.BLOG_FILES, (req, res) => {
        try {
          const blogDir = path.join(process.cwd(), 'public', 'content', 'blog');
          
          if (fs.existsSync(blogDir)) {
            const files = fs.readdirSync(blogDir)
              .filter(file => file.endsWith('.md'))
              .filter(file => {
                const filePath = path.join(blogDir, file);
                const stats = fs.statSync(filePath);
                return stats.size > 0;
              });
            
            console.log(`📁 API (fallback): Znaleziono ${files.length} plików:`, files);
            
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(files));
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Blog directory not found' }));
          }
        } catch (error) {
          console.error('❌ API fallback błąd:', error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Failed to scan blog directory' }));
        }
      });
    }
  };
};

// https://vite.dev/config/
export default defineConfig({
  base: `${BASE_URL}/`, // Base URL dla aplikacji - używa stałej!
  plugins: [
    react(),
    blogScannerPlugin() // API endpoint dla automatycznego skanowania
  ],
  server: {
    port: 5175,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
