import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);

        const parsedPosts: BlogPost[] = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          } as BlogPost))
          .filter(post => post.published);

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
    const postsRef = collection(db, 'posts');
    const q = query(postsRef);
    const querySnapshot = await getDocs(q);

    const post = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      } as BlogPost))
      .find(p => p.slug === slug);

    return post || null;
  } catch (error) {
    console.error('Failed to load blog post:', error);
    return null;
  }
};
