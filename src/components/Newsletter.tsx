import { motion } from 'motion/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="glass glow-border p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px]" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-black tracking-tighter mb-4 uppercase"
          >
            GLOBAL <span className="neon-text italic">UPDATE</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground mb-8"
          >
            Subscribe to get the latest content drops, platform insights, and global trends delivered directly to your inbox.
          </motion.p>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              className="bg-black/40 border-cyan-500/30 text-white placeholder:text-muted-foreground/50 h-12 rounded-none skew-x-[-12deg]"
            />
            <Button className="bg-cyan-500 text-black hover:bg-cyan-400 h-12 px-8 font-bold rounded-none skew-x-[-12deg]">
              <span className="skew-x-[12deg] flex items-center gap-2">
                SUBSCRIBE <Send className="w-4 h-4" />
              </span>
            </Button>
          </motion.form>
          <p className="mt-4 text-[10px] text-muted-foreground uppercase tracking-widest">
            No spam. Only global signal. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
