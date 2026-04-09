import { useParams, Link } from 'react-router-dom';
import { mockPosts } from '@/lib/sanity';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Share2, Youtube, Twitter, MessageCircle, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Platform } from '@/types';
import SEO from '@/components/SEO';
import { toast } from 'sonner';

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

export default function PostDetail() {
  const { slug } = useParams();
  const post = mockPosts.find(p => p.slug.current === slug);

  if (!post) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-4xl font-bold">Post Not Found</h1>
        <Link to="/" className="text-cyan-400 mt-4 block">Return Home</Link>
      </div>
    );
  }

  const Icon = platformIcons[post.platform];
  const youtubeId = post.platform === 'YouTube' ? getYouTubeId(post.mediaUrl) : null;

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: `Check out this post on Pinchiglobal: ${post.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success('Shared successfully!');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      } catch (err) {
        console.error('Error copying to clipboard:', err);
        toast.error('Failed to copy link.');
      }
    }
  };

  return (
    <main className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEO 
        title={post.title}
        description={`Read more about ${post.title} on ${post.platform}. Published by ${post.authorHandle}.`}
        keywords={[post.platform, ...post.metaTags, 'Pinchiglobal']}
        image={post.platform === 'YouTube' ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : post.mediaUrl}
      />
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-cyan-400 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          BACK TO FEED
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <Badge className="bg-cyan-500 text-black border-none px-3 py-1 flex items-center gap-1">
            <Icon className="w-3 h-3" />
            {post.platform}
          </Badge>
          <div className="flex items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.publishedAt).toLocaleDateString()}</span>
            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.authorHandle}</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight uppercase">
          {post.title}
        </h1>

        <div className="glass glow-border rounded-xl overflow-hidden mb-12 aspect-video relative">
          {post.platform === 'YouTube' && youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0`}
              title={post.title}
              className="absolute inset-0 w-full h-full border-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img 
              src={post.mediaUrl} 
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        <div className="prose prose-invert max-w-none mb-12">
          <p className="text-xl text-muted-foreground leading-relaxed">
            This is a placeholder for the content from Sanity. In a real application, this would be rendered using PortableText. The retro-futurist aesthetic continues here with deep teal backgrounds and neon cyan accents.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {post.metaTags.map(tag => (
              <Badge key={tag} variant="outline" className="border-cyan-500/20 text-cyan-400">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-white/10">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              className="glow-border bg-transparent text-cyan-400"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 mr-2" /> SHARE
            </Button>
          </div>
          <Button className="bg-cyan-500 text-black hover:bg-cyan-400 font-bold">
            VIEW ON {post.platform.toUpperCase()}
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
