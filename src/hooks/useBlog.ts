import { useState, useEffect } from 'react';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
  content: string;
}

export const useBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        // Load markdown files at build-time using Vite's glob import
        // Use modern Vite glob API so markdown is bundled reliably in production
        const files = import.meta.glob('/src/content/blog/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

        const parsedPosts: BlogPost[] = Object.entries(files).map(([path, rawContent]) => {
          const { data, content } = matter(rawContent);

          // Compute slug from filename: YYYY-MM-DD-slug.md => slug
          const fileName = path.split('/').pop() || '';
          const baseName = fileName.replace(/\.md$/, '');
          const slug = baseName.replace(/^\d{4}-\d{2}-\d{2}-/, '');

          return {
            slug,
            title: data.title || slug,
            description: data.description || '',
            author: data.author || 'ModanTech',
            date: data.date || new Date().toISOString(),
            image: data.image || '/images/uploads/placeholder.jpg',
            tags: Array.isArray(data.tags) ? data.tags : [],
            content,
          } as BlogPost;
        })
        // sort by date desc
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setPosts(parsedPosts);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  return { posts, loading };
};