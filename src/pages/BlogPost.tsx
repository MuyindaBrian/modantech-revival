import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, ArrowLeft, Share2, Twitter, Facebook, Linkedin } from "lucide-react";
import { useBlog, BlogPost } from "@/hooks/useBlog";
import { Helmet } from "react-helmet-async";
import { useSettings } from "@/hooks/useSettings";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts } = useBlog();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [views, setViews] = useState<number | null>(null);
  const { settings } = useSettings();

  useEffect(() => {
    const foundPost = posts.find(p => p.slug === slug);
    setPost(foundPost || null);
    setLoading(false);
  }, [slug, posts]);

  useEffect(() => {
    if (!slug) return;
    const ns = 'modantech_blog';
    const key = slug;
    // CountAPI: create/increment and then get value
    fetch(`https://api.countapi.xyz/hit/${ns}/${key}`)
      .then(() => fetch(`https://api.countapi.xyz/get/${ns}/${key}`))
      .then(r => r.json())
      .then(data => setViews(typeof data.value === 'number' ? data.value : null))
      .catch(() => setViews(null));
  }, [slug]);

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

  const readTime = useMemo(() => {
    if (!post) return 1;
    const words = post.content.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  }, [post]);

  const headings = useMemo(() => {
    if (!post) return [] as { depth: number; text: string; id: string }[];
    const lines = post.content.split('\n');
    const items: { depth: number; text: string; id: string }[] = [];
    const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    for (const line of lines) {
      const m = /^(#{1,6})\s+(.*)$/.exec(line);
      if (m) {
        const depth = m[1].length;
        const text = m[2].trim();
        const id = slugify(text);
        items.push({ depth, text, id });
      }
    }
    return items;
  }, [post]);

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
      <Helmet>
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
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.description,
          image: [post.image],
          datePublished: post.date,
          author: [{ '@type': 'Person', name: post.author }],
          mainEntityOfPage: { '@type': 'WebPage', '@id': shareUrl },
        })}</script>
      </Helmet>

      <Navigation />

      {/* Hero Banner */}
      <div className="relative mt-16 md:mt-20">
        <div className="h-56 md:h-72 w-full" style={{
          backgroundImage: `url(${post.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <div className="w-full h-full bg-gradient-to-t from-background/80 to-background/20" />
        </div>
      </div>

      <article className="pt-10 pb-16">
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
              <div className="flex items-center gap-2">
                <span>•</span>
                <span>{readTime} min read</span>
              </div>
              {views !== null && (
                <div className="flex items-center gap-2">
                  <span>•</span>
                  <span>{views.toLocaleString()} views</span>
                </div>
              )}
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

          {/* Author Card */}
          <div className="mb-10 flex items-center gap-4 p-4 rounded-lg border bg-card/60">
            {settings?.avatar ? (
              <img src={settings.avatar} alt={settings.displayName} className="h-12 w-12 rounded-full object-cover" />
            ) : (
              <div className="h-12 w-12 rounded-full bg-primary text-white grid place-items-center font-semibold">
                {(settings?.initials || 'AD').slice(0,2)}
              </div>
            )}
            <div>
              <div className="font-semibold">{settings?.displayName || post.author}</div>
              <div className="text-sm text-muted-foreground">Published {new Date(post.date).toLocaleDateString()}</div>
            </div>
          </div>

          {/* Table of Contents */}
          {headings.length > 0 && (
            <aside className="mb-12 rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
              <nav>
                <ul className="space-y-2 text-sm">
                  {headings.map((h, i) => (
                    <li key={i} className="leading-snug" style={{ paddingLeft: (h.depth - 1) * 12 }}>
                      <a className="text-muted-foreground hover:text-primary" href={`#${h.id}`}>{h.text}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[
                rehypeRaw,
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: 'wrap' }],
              ]}
            >
              {post.content}
            </ReactMarkdown>
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