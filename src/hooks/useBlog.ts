import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
  content: string;
  published: boolean;
}

export const useBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('date', { ascending: false })
          .eq('published', true);

        if (error) throw error;

        const parsedPosts: BlogPost[] = (data || []).map((row: any) => ({
          id: String(row.id),
          ...row
        })) as BlogPost[];

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

export const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    if (!data) return null;

    return { id: String(data.id), ...data } as BlogPost;
  } catch (error) {
    console.error('Failed to load blog post:', error);
    return null;
  }
};
