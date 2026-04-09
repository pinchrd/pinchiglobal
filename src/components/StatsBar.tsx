import { motion } from 'motion/react';
import { Youtube, Twitter, MessageCircle, Video } from 'lucide-react';

const stats = [
  { label: 'YouTube', value: '1.2M+', icon: Youtube, color: 'text-red-500' },
  { label: 'TikTok', value: '850K+', icon: Video, color: 'text-pink-500' },
  { label: 'X (Twitter)', value: '420K+', icon: Twitter, color: 'text-blue-400' },
  { label: 'Threads', value: '150K+', icon: MessageCircle, color: 'text-white' },
];

export default function StatsBar() {
  return (
    <div className="glass border-y border-cyan-500/20 py-8 my-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color} group-hover:scale-110 transition-transform`} />
                <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                  {stat.label}
                </span>
              </div>
              <div className="text-3xl font-black neon-text tracking-tighter">
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
