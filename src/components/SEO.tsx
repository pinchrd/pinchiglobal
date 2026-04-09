import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export default function SEO({ 
  title = 'Pinchiglobal | The Global Content Hub', 
  description = 'Experience the next evolution of social storytelling. Filtered, optimized, and delivered with a retro-futurist aesthetic.',
  keywords = ['Pinchiglobal', 'Social Content', 'Retro-Futurist', 'YouTube', 'TikTok', 'X', 'Threads'],
  image = 'https://picsum.photos/seed/global/1200/630',
  url = 'https://pinchiglobal.com'
}: SEOProps) {
  const siteTitle = title.includes('Pinchiglobal') ? title : `${title} | Pinchiglobal`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
