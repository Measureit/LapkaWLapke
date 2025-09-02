import { useState, useEffect } from 'react';
import fm from 'front-matter';

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

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);

      // Import wszystkich plików markdown z folderu
      const modules = import.meta.glob('/public/content/blog/*.md', { eager: true, as: 'raw' });

      const loadedPosts: BlogPost[] = [];

      for (const path in modules) {
        const rawContent = modules[path] as string;
        const parsed = fm(rawContent);

        const frontmatter = parsed.attributes as Partial<BlogPost>;

        const fileName = path.split('/').pop() || '';

        const post: BlogPost = {
          id: fileName.replace('.md', ''),
          title: frontmatter.title || 'Brak tytułu',
          excerpt: frontmatter.excerpt || '',
          date: frontmatter.date || '',
          author: frontmatter.author || '',
          category: frontmatter.category || '',
          image: frontmatter.image || 'https://via.placeholder.com/400x250/bb8fce/ffffff?text=Artykuł',
          tags: frontmatter.tags || [],
          readTime: frontmatter.readTime || '',
          featured: frontmatter.featured || false,
          content: parsed.body
        };

        loadedPosts.push(post);
      }

      // Sortuj po dacie
      loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setPosts(loadedPosts);
      setError(null);
    } catch (err) {
      console.error('Błąd podczas ładowania postów:', err);
      setError('Nie udało się załadować artykułów');
    } finally {
      setLoading(false);
    }
  }, []);

  return { posts, loading, error };
};
