import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import ContentGrid from '@/components/ContentGrid';
import Newsletter from '@/components/Newsletter';
import SEO from '@/components/SEO';
import { mockPosts } from '@/lib/sanity';

export default function Home() {
  // Extract all unique tags from posts for SEO keywords
  const allKeywords = Array.from(new Set([
    'Pinchiglobal', 
    'Global Content', 
    ...mockPosts.flatMap(post => post.metaTags)
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
      <ContentGrid posts={mockPosts} />
      <Newsletter />
    </main>
  );
}
