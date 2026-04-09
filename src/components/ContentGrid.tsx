import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SocialPost, Platform } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Youtube, Twitter, MessageCircle, Video, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const platformIcons: Record<Platform, any> = {
  YouTube: Youtube,
  TikTok: Video,
  X: Twitter,
  Threads: MessageCircle,
};

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

interface ContentGridProps {
  posts: SocialPost[];
}

export default function ContentGrid({ posts }: ContentGridProps) {
  const [filter, setFilter] = useState<Platform | 'All'>('All');

  const filteredPosts = filter === 'All' 
    ? posts 
    : posts.filter(post => post.platform === filter);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter mb-2 uppercase">
            Latest <span className="neon-text">Content</span>
          </h2>
          <p className="text-muted-foreground">Stay updated across all global platforms.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {['All', 'YouTube', 'TikTok', 'X', 'Threads'].map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p as any)}
              className={`px-4 py-1 text-xs font-bold tracking-widest uppercase transition-all border ${
                filter === p 
                  ? 'bg-cyan-500 text-black border-cyan-500' 
                  : 'glass border-white/10 text-muted-foreground hover:border-cyan-500/50'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => {
            const youtubeId = post.platform === 'YouTube' ? getYouTubeId(post.mediaUrl) : null;
            const thumbnailUrl = youtubeId 
              ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` 
              : post.mediaUrl;

            return (
              <motion.div
                key={post._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link to={`/posts/${post.slug.current}`}>
                  <Card className="glass glow-border overflow-hidden group cursor-pointer h-full flex flex-col">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={thumbnailUrl} 
                        alt={post.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-black/60 backdrop-blur-md border-cyan-500/30 text-cyan-400 flex items-center gap-1">
                          {(() => {
                            const Icon = platformIcons[post.platform];
                            return <Icon className="w-3 h-3" />;
                          })()}
                          {post.platform}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-bold tracking-widest uppercase text-cyan-500/70">
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold tracking-tight mb-4 group-hover:text-cyan-400 transition-colors">
                          {post.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.metaTags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[10px] uppercase tracking-widest text-muted-foreground">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
