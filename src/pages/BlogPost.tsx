import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, ArrowLeft, Share2, Twitter, Facebook, Linkedin } from "lucide-react";
import { useBlog, BlogPost } from "@/hooks/useBlog";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts } = useBlog();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundPost = posts.find(p => p.slug === slug);
    setPost(foundPost || null);
    setLoading(false);
  }, [slug, posts]);

  const shareUrl = window.location.href;
  const shareTitle = post?.title || "";

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
              <div className="h-12 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-muted rounded w-1/2 mb-8"></div>
              <div className="h-64 bg-muted rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Meta Tags */}
      <head>
        <title>{post.title} - ModanTech Blog</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.image} />
        <link rel="canonical" href={shareUrl} />
      </head>

      <Navigation />
      
      <article className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Button variant="ghost" className="mb-8" asChild>
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.description}
            </p>
          </header>

          {/* Featured Image */}
          <div className="mb-12">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg shadow-soft"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop";
              }}
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="text-foreground leading-relaxed space-y-6">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <Separator className="my-12" />

          {/* Share Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Share this article</h3>
              <div className="flex gap-3">
                {shareLinks.map((link) => (
                  <Button
                    key={link.name}
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`Share on ${link.name}`}
                    >
                      <link.icon className="w-4 h-4" />
                    </a>
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: post.title,
                        text: post.description,
                        url: shareUrl,
                      });
                    } else {
                      navigator.clipboard.writeText(shareUrl);
                    }
                  }}
                  aria-label="Share article"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button variant="hero" asChild>
              <Link to="/contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPostPage;