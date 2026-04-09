import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-block mb-6 px-4 py-1 rounded-full glass border border-cyan-500/30 text-cyan-400 text-sm font-medium tracking-widest uppercase"
        >
          Retro-Futurist 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none"
        >
          THE <span className="neon-text italic">GLOBAL</span> <br />
          CONTENT HUB
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10"
        >
          Experience the next evolution of social storytelling. Filtered, optimized, and delivered with a retro-futurist aesthetic.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="bg-cyan-500 text-black hover:bg-cyan-400 px-8 py-6 text-lg font-bold rounded-none skew-x-[-12deg]">
            <span className="skew-x-[12deg] flex items-center gap-2">
              EXPLORE LATEST <ArrowRight className="w-5 h-5" />
            </span>
          </Button>
          <Button size="lg" variant="outline" className="glow-border bg-transparent text-cyan-400 px-8 py-6 text-lg font-bold rounded-none skew-x-[-12deg]">
            <span className="skew-x-[12deg] flex items-center gap-2">
              WATCH REEL <Play className="w-5 h-5 fill-current" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
