import { useParams } from 'react-router-dom';
import { mockPosts } from '@/lib/sanity';
import ContentGrid from '@/components/ContentGrid';
import { motion } from 'motion/react';
import { Platform } from '@/types';
import { Youtube, Twitter, MessageCircle, Video } from 'lucide-react';
import SEO from '@/components/SEO';

const platformIcons: Record<Platform, any> = {
  YouTube: Youtube,
  TikTok: Video,
  X: Twitter,
  Threads: MessageCircle,
};

export default function PlatformArchive() {
  const { platform } = useParams();
  const filteredPosts = mockPosts.filter(p => p.platform === platform);
  const Icon = platformIcons[platform as Platform];

  return (
    <main className="pt-32 min-h-screen">
      <SEO 
        title={`${platform} Archive`}
        description={`Explore all global content from ${platform} on Pinchiglobal.`}
        keywords={[platform as string, 'Archive', 'Global Content', 'Pinchiglobal']}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="p-4 glass glow-border rounded-2xl">
            {Icon && <Icon className="w-12 h-12 text-cyan-400" />}
          </div>
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase">
              {platform} <span className="neon-text">ARCHIVE</span>
            </h1>
            <p className="text-muted-foreground uppercase tracking-widest text-sm">
              Global content curated for {platform}
            </p>
          </div>
        </motion.div>
      </div>
      
      <ContentGrid posts={filteredPosts} />
    </main>
  );
}
