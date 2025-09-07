import { useState, useEffect } from 'react';

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
        // In a real implementation, this would fetch from your CMS or API
        // For now, we'll use mock data that matches our markdown files
        const mockPosts: BlogPost[] = [
          {
            slug: "future-of-web-development",
            title: "The Future of Web Development: AI and Beyond",
            description: "Exploring how artificial intelligence and emerging technologies are reshaping the landscape of web development in 2024 and beyond.",
            author: "ModanTech Team",
            date: "2024-01-15T10:00:00.000Z",
            image: "/images/uploads/future-web-dev.jpg",
            tags: ["Web Development", "AI", "Technology", "Future"],
            content: "The web development landscape is evolving at an unprecedented pace..."
          },
          {
            slug: "mobile-first-design",
            title: "Mobile-First Design: Best Practices for 2024",
            description: "Learn the essential principles and techniques for creating exceptional mobile-first designs that engage users across all devices.",
            author: "Sarah Johnson",
            date: "2024-01-10T14:30:00.000Z",
            image: "/images/uploads/mobile-first.jpg",
            tags: ["Mobile Design", "UX/UI", "Responsive Design", "Best Practices"],
            content: "In today's digital landscape, mobile devices account for over 60% of web traffic..."
          }
        ];
        
        setPosts(mockPosts);
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