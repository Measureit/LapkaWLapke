import { useState, useEffect } from 'react';
import matter from 'gray-matter';

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
    const loadBlogPosts = async () => {
      try {
        setLoading(true);
        
        // Lista plików markdown do załadowania
        const postFiles = [
          'jak-trenowac-szczeniaka.md',
          'zdrowe-odzywianie-psa.md',
          'pielegnacja-sierści.md'
        ];

        const loadedPosts: BlogPost[] = [];

        for (const fileName of postFiles) {
          try {
            const response = await fetch(`/content/blog/${fileName}`);
            if (!response.ok) {
              console.warn(`Nie można załadować pliku: ${fileName}`);
              continue;
            }
            
            const markdownContent = await response.text();
            const { data: frontmatter, content } = matter(markdownContent);
            
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
              content: content
            };

            loadedPosts.push(post);
          } catch (fileError) {
            console.warn(`Błąd podczas ładowania ${fileName}:`, fileError);
          }
        }

        // Sortuj posty po dacie (najnowsze pierwsze)
        loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setPosts(loadedPosts);
        setError(null);
      } catch (err) {
        console.error('Błąd podczas ładowania postów:', err);
        setError('Nie udało się załadować artykułów');
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  return { posts, loading, error };
};
