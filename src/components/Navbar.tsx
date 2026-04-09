import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Globe className="w-8 h-8 text-cyan-400" />
            </motion.div>
            <span className="text-xl font-bold tracking-tighter neon-text">
              PINCHIGLOBAL
            </span>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
              <Link to="/platforms/YouTube" className="hover:text-cyan-400 transition-colors">YouTube</Link>
              <Link to="/platforms/TikTok" className="hover:text-cyan-400 transition-colors">TikTok</Link>
              <Link to="/platforms/X" className="hover:text-cyan-400 transition-colors">X</Link>
              <Link to="/platforms/Threads" className="hover:text-cyan-400 transition-colors">Threads</Link>
              <Button variant="outline" className="glow-border bg-transparent text-cyan-400 hover:bg-cyan-400/10">
                Join Global
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cyan-400 hover:text-cyan-300"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-b border-cyan-500/20 px-4 pt-2 pb-6 space-y-4"
        >
          <Link to="/" className="block hover:text-cyan-400">Home</Link>
          <Link to="/platforms/YouTube" className="block hover:text-cyan-400">YouTube</Link>
          <Link to="/platforms/TikTok" className="block hover:text-cyan-400">TikTok</Link>
          <Link to="/platforms/X" className="block hover:text-cyan-400">X</Link>
          <Link to="/platforms/Threads" className="block hover:text-cyan-400">Threads</Link>
          <Button className="w-full glow-border bg-transparent text-cyan-400">
            Join Global
          </Button>
        </motion.div>
      )}
    </nav>
  );
}
