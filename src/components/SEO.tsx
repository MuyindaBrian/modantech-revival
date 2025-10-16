import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    author?: string;
    tags?: string[];
  };
}

const SEO = ({ title, description, image, url, type = 'website', article }: SEOProps) => {
  const envSiteName = import.meta.env.VITE_SITE_NAME as string | undefined;
  const envSiteUrl = import.meta.env.VITE_SITE_URL as string | undefined;
  const siteName = envSiteName || 'ModanTech';
  const runtimeOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const siteUrl = envSiteUrl || runtimeOrigin || 'https://example.com';
  const defaultImage = `${siteUrl}/images/brand/og-social.svg`;

  const fullTitle = `${title} | ${siteName}`;
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImage = image?.startsWith('http') ? image : (image ? `${siteUrl}${image}` : defaultImage);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />

      {article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.tags?.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type === 'article' ? 'Article' : 'WebSite',
          name: fullTitle,
          description,
          url: fullUrl,
          image: fullImage,
          ...(type === 'article' && article ? {
            headline: title,
            datePublished: article.publishedTime,
            author: {
              '@type': 'Person',
              name: article.author || siteName,
            },
            keywords: article.tags?.join(', '),
          } : {}),
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
