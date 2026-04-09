import { useState, useEffect } from 'react';
import { SocialPost } from '@/types';
import { fetchPosts, fetchPost, fetchPlatformStats } from '@/lib/sanity';

interface UseFetchPostsResult {
  posts: SocialPost[];
  loading: boolean;
  error: string | null;
}

export function useSanityPosts(): UseFetchPostsResult {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const getPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPosts();
        if (isMounted) {
          setPosts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch posts');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  return { posts, loading, error };
}

interface UseFetchPostResult {
  post: SocialPost | null;
  loading: boolean;
  error: string | null;
}

export function useSanityPost(slug: string): UseFetchPostResult {
  const [post, setPost] = useState<SocialPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const getPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPost(slug);
        if (isMounted) {
          setPost(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch post');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (slug) {
      getPost();
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { post, loading, error };
}

interface UseFetchStatsResult {
  stats: Record<string, number>;
  loading: boolean;
  error: string | null;
}

export function useSanityStats(): UseFetchStatsResult {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const getStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPlatformStats();
        if (isMounted) {
          setStats(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch stats');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return { stats, loading, error };
}
