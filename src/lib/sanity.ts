import { createClient } from '@sanity/client';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'placeholder';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

export const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: '2024-04-08',
});

// Mock data for when Sanity is not configured
export const mockPosts: any[] = [
  {
    _id: '1',
    title: 'The Future of Global Connectivity',
    slug: { current: 'future-global-connectivity' },
    platform: 'YouTube',
    mediaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    content: [],
    metaTags: ['Future', 'Tech', 'Global'],
    publishedAt: new Date().toISOString(),
    authorHandle: '@pinchiglobal'
  },
  {
    _id: '2',
    title: 'Retro-Futurist Design Trends 2026',
    slug: { current: 'retro-futurist-trends' },
    platform: 'TikTok',
    mediaUrl: 'https://picsum.photos/seed/design/450/800',
    content: [],
    metaTags: ['Design', '2026', 'Aesthetic'],
    publishedAt: new Date().toISOString(),
    authorHandle: '@pinchiglobal'
  },
  {
    _id: '3',
    title: 'Why Deep Teal is the New Black',
    slug: { current: 'deep-teal-black' },
    platform: 'X',
    mediaUrl: 'https://picsum.photos/seed/color/800/450',
    content: [],
    metaTags: ['Color', 'Style', 'Trends'],
    publishedAt: new Date().toISOString(),
    authorHandle: '@pinchiglobal'
  },
  {
    _id: '4',
    title: 'Threads: The New Town Square?',
    slug: { current: 'threads-town-square' },
    platform: 'Threads',
    mediaUrl: 'https://picsum.photos/seed/social/800/450',
    content: [],
    metaTags: ['Social', 'Threads', 'Community'],
    publishedAt: new Date().toISOString(),
    authorHandle: '@pinchiglobal'
  }
];
