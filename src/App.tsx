import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import PostDetail from '@/pages/PostDetail';
import PlatformArchive from '@/pages/PlatformArchive';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground selection:bg-cyan-500/30 selection:text-cyan-400">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts/:slug" element={<PostDetail />} />
              <Route path="/platforms/:platform" element={<PlatformArchive />} />
            </Routes>
          </AnimatePresence>
          
          <footer className="py-12 border-t border-white/10 glass text-center">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-xl font-bold tracking-tighter neon-text">
                  PINCHIGLOBAL
                </span>
              </div>
              <p className="text-muted-foreground text-sm uppercase tracking-widest">
                © 2026 GLOBAL CONTENT HUB. ALL RIGHTS RESERVED.
              </p>
              <div className="mt-6 flex justify-center gap-6 text-muted-foreground text-xs uppercase tracking-widest">
                <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
              </div>
            </div>
          </footer>
          <Toaster position="bottom-right" theme="dark" />
        </div>
      </Router>
    </HelmetProvider>
  );
}
