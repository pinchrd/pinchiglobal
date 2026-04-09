import { createClient } from '@sanity/client';
import { SocialPost } from '@/types';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-04-08';

export const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion,
});

// GROQ Queries
export const POSTS_QUERY = `
  *[_type == "socialPost" && publishedAt <= now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    platform,
    mediaUrl,
    content,
    metaTags,
    publishedAt,
    authorHandle
  }
`;

export const SINGLE_POST_QUERY = `
  *[_type == "socialPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    platform,
    mediaUrl,
    content,
    metaTags,
    publishedAt,
    authorHandle,
    description
  }
`;

export const PLATFORMS_STATS_QUERY = `
  {
    "youtube": count(*[_type == "socialPost" && platform == "YouTube"]),
    "tiktok": count(*[_type == "socialPost" && platform == "TikTok"]),
    "x": count(*[_type == "socialPost" && platform == "X"]),
    "threads": count(*[_type == "socialPost" && platform == "Threads"])
  }
`;

// Fetch functions
export async function fetchPosts(): Promise<SocialPost[]> {
  try {
    const posts = await client.fetch(POSTS_QUERY);
    return posts || [];
  } catch (error) {
    console.error('Error fetching posts from Sanity:', error);
    return [];
  }
}

export async function fetchPost(slug: string): Promise<SocialPost | null> {
  try {
    const post = await client.fetch(SINGLE_POST_QUERY, { slug });
    return post || null;
  } catch (error) {
    console.error(`Error fetching post with slug "${slug}":`, error);
    return null;
  }
}

export async function fetchPlatformStats(): Promise<Record<string, number>> {
  try {
    const stats = await client.fetch(PLATFORMS_STATS_QUERY);
    return stats || {};
  } catch (error) {
    console.error('Error fetching platform stats:', error);
    return {};
  }
}

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
