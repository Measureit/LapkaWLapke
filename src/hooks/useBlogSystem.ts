import { useState, useEffect } from 'react';
import fm from 'front-matter';
import { APP_CONFIG } from '../config/app.config';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  tags: string[];
  readTime: string;
  featured: boolean;
  content: string;
}

export interface PaginatedBlogPosts {
  posts: BlogPost[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// NAJLEPSZE rozwiązanie - automatyczny import z Vite!
const loadAllBlogPosts = async (): Promise<BlogPost[]> => {
  console.log('🔍 Automatyczne ładowanie blogów z Vite import.meta.glob...');
  
  // Automatycznie importuj wszystkie pliki .md z folderu
  const blogModules = import.meta.glob(`/public/content/blog/*.md`, { 
    as: 'raw',
    eager: false 
  });
  
  console.log('📁 Znalezione pliki:', Object.keys(blogModules));
  
  const loadedPosts: BlogPost[] = [];
  
  // Przeiteruj przez wszystkie znalezione pliki
  for (const [path, moduleLoader] of Object.entries(blogModules)) {
    try {
      // Wyciągnij nazwę pliku z pełnej ścieżki
      const fileName = path.split('/').pop() || '';
      
      // Załaduj zawartość pliku
      const content = await moduleLoader() as string;
      
      if (content.trim()) {
        const parsed = fm(content);
        const frontmatter = parsed.attributes as Partial<BlogPost>;
        
        const post: BlogPost = {
          id: fileName.replace('.md', ''),
          title: frontmatter.title || fileName.replace('.md', '').replace(/-/g, ' '),
          excerpt: frontmatter.excerpt || '',
          date: frontmatter.date || new Date().toISOString().split('T')[0],
          author: frontmatter.author || 'Redakcja',
          category: frontmatter.category || 'Blog',
          image: frontmatter.image || APP_CONFIG.BLOG.DEFAULT_IMAGE,
          tags: frontmatter.tags || [],
          readTime: frontmatter.readTime || '5 min',
          featured: frontmatter.featured || false,
          content: parsed.body
        };
        
        loadedPosts.push(post);
        console.log(`✅ ${post.title}`);
      }
    } catch (error) {
      console.warn(`⚠️ Nie udało się załadować pliku:`, error);
    }
  }
  
  // Sortuj po dacie (najnowsze na górze)
  const sortedPosts = loadedPosts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  console.log(`📚 Załadowano ${sortedPosts.length} postów`);
  return sortedPosts;
};

// ===== HOOKS =====

// Hook 1: Wszystkie posty
export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const allPosts = await loadAllBlogPosts();
        setPosts(allPosts);
        setError(null);
      } catch (err) {
        console.error('Błąd ładowania postów:', err);
        setError('Nie udało się załadować artykułów');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return { posts, loading, error };
};

// Hook 2: Posty z paginacją i wyszukiwaniem
export const usePaginatedBlogPosts = (page: number = 1, postsPerPage: number = 6, searchTerm: string = '') => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [paginatedData, setPaginatedData] = useState<PaginatedBlogPosts>({
    posts: [],
    totalPosts: 0,
    totalPages: 0,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ładowanie wszystkich postów
  useEffect(() => {
    const loadAllPosts = async () => {
      try {
        setLoading(true);
        const posts = await loadAllBlogPosts();
        setAllPosts(posts);
        setError(null);
      } catch (err) {
        console.error('Błąd ładowania postów:', err);
        setError('Nie udało się załadować artykułów');
      } finally {
        setLoading(false);
      }
    };

    loadAllPosts();
  }, []);

  // Filtrowanie i paginacja
  useEffect(() => {
    let filteredPosts = allPosts;

    // Wyszukiwanie
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filteredPosts = allPosts.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        post.category.toLowerCase().includes(searchLower)
      );
    }

    // Paginacja
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const posts = filteredPosts.slice(startIndex, endIndex);

    setPaginatedData({
      posts,
      totalPosts,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    });
  }, [allPosts, page, postsPerPage, searchTerm]);

  return { 
    ...paginatedData, 
    loading, 
    error,
    allPosts
  };
};

// Hook 3: Najnowsze posty dla strony głównej
export const useHomePagePosts = (limit: number = 3) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLatestPosts = async () => {
      try {
        setLoading(true);
        const allPosts = await loadAllBlogPosts();
        
        // Najnowsze posty (już posortowane)
        const latestPosts = allPosts.slice(0, limit);
        
        setPosts(latestPosts);
        setError(null);
        console.log(`🏠 Pokazuję ${latestPosts.length} najnowszych postów`);
      } catch (err) {
        console.error('Błąd ładowania najnowszych postów:', err);
        setError('Nie udało się załadować najnowszych artykułów');
      } finally {
        setLoading(false);
      }
    };

    loadLatestPosts();
  }, [limit]);

  return { posts, loading, error };
};