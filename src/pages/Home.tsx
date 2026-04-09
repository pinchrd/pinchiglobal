import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import ContentGrid from '@/components/ContentGrid';
import Newsletter from '@/components/Newsletter';
import SEO from '@/components/SEO';
import { useSanityPosts } from '@/hooks/useSanity';

export default function Home() {
  const { posts, loading, error } = useSanityPosts();

  // Extract all unique tags from posts for SEO keywords
  const allKeywords = Array.from(new Set([
    'Pinchiglobal', 
    'Global Content', 
    ...posts.flatMap(post => post.metaTags)
  ]));

  return (
    <main className="min-h-screen">
      <SEO 
        title="Pinchiglobal | The Global Content Hub"
        description="Stay updated with the latest global content across YouTube, TikTok, X, and Threads. Filtered and optimized for the retro-futurist era."
        keywords={allKeywords}
      />
      <Hero />
      <StatsBar />
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="glass glow-border p-6 text-destructive">
            <p>Error loading content: {error}</p>
          </div>
        </div>
      )}
      <ContentGrid posts={posts} loading={loading} />
      <Newsletter />
    </main>
  );
}
