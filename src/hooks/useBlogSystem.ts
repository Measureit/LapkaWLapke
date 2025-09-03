import { useState, useEffect } from 'react';
import fm from 'front-matter';
import { APP_CONFIG, BASE_URL } from '../config/app.config';

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

// Funkcja do PRAWDZIWEGO automatycznego skanowania - używa API endpoint!
const discoverAllBlogFiles = async (): Promise<BlogPost[]> => {
  console.log('🔍 Automatyczne odkrywanie WSZYSTKICH plików markdown przez API...');
  
  const loadedPosts: BlogPost[] = [];
  
  try {
    // Użyj API endpoint do listowania plików - NAJLEPSZE ROZWIĄZANIE!
    console.log('🔗 Łączenie z API endpoint...');
    const response = await fetch(`${BASE_URL}${APP_CONFIG.API.BLOG_FILES}`);

      const fileNames = await response.json();
      console.log('📁 API zwróciło pliki:', fileNames);
      
      // Ładuj każdy odkryty plik
      for (const fileName of fileNames) {
        if (fileName.endsWith('.md')) {
          await loadSingleBlogFile(fileName, loadedPosts);
        }
      }
      
      console.log(`✅ API: Załadowano ${loadedPosts.length} postów`);
  } catch (error) {
    console.error('❌ Błąd podczas łączenia z API:', error);
  }
  
  const sortedPosts = sortPosts(loadedPosts);
  console.log(`📚 Finalnie odkryto ${sortedPosts.length} postów`);
  console.log(`📄 Znalezione pliki:`, sortedPosts.map(p => `${p.id}.md`));
  
  return sortedPosts;
};

// Pomocnicze funkcje
const loadSingleBlogFile = async (fileName: string, loadedPosts: BlogPost[]) => {
  try {
    const response = await fetch(`${BASE_URL}${APP_CONFIG.API.BLOG_CONTENT}/${fileName}`);
    if (response.ok) {
      const content = await response.text();
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
        console.log(`✅ Załadowano: ${post.title} (${fileName})`);
      }
    }
  } catch (error) {
    console.warn(`⚠️ Nie udało się załadować ${fileName}:`, error);
  }
};

const sortPosts = (posts: BlogPost[]): BlogPost[] => {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// ===== UNIFIED HOOKS =====

// Hook 1: Wszystkie posty (dla podstawowego użycia)
export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const discoveredPosts = await discoverAllBlogFiles();
        setPosts(discoveredPosts);
        setError(null);
      } catch (err) {
        console.error('Błąd podczas automatycznego odkrywania postów:', err);
        setError('Nie udało się załadować artykułów');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return { posts, loading, error };
};

// Hook 2: Posty z paginacją i wyszukiwaniem (dla strony bloga)
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
        const discoveredPosts = await discoverAllBlogFiles();
        setAllPosts(discoveredPosts);
        setError(null);
      } catch (err) {
        console.error('Błąd podczas automatycznego odkrywania postów:', err);
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
        const allPosts = await discoverAllBlogFiles();
        
        // Bierz najnowsze posty (już posortowane po dacie)
        const latestPosts = allPosts.slice(0, limit);
        
        setPosts(latestPosts);
        setError(null);
        console.log(`🏠 Pokazuję ${latestPosts.length} najnowszych postów na stronie głównej`);
      } catch (err) {
        console.error('Błąd podczas ładowania najnowszych postów:', err);
        setError('Nie udało się załadować najnowszych artykułów');
      } finally {
        setLoading(false);
      }
    };

    loadLatestPosts();
  }, [limit]);

  return { posts, loading, error };
};
