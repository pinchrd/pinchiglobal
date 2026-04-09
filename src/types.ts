export type Platform = 'YouTube' | 'TikTok' | 'X' | 'Threads';

export interface SocialPost {
  _id: string;
  title: string;
  slug: { current: string };
  platform: Platform;
  mediaUrl: string;
  content: any; // PortableText
  metaTags: string[];
  publishedAt: string;
  authorHandle?: string;
}

export interface SocialStats {
  platform: Platform;
  count: string;
  label: string;
}
