# Sanity Frontend Integration Guide

## ✅ Integration Complete

Your Sanity backend is now fully integrated with your frontend! Here's what has been set up:

---

## 📁 New Files Created

### 1. **Environment Variables** (`.env.local`)
```
VITE_SANITY_PROJECT_ID=t832q344
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-04-09
```

### 2. **Custom Hooks** (`src/hooks/useSanity.ts`)
Three custom React hooks for data fetching:
- `useSanityPosts()` - Fetch all posts
- `useSanityPost(slug)` - Fetch single post by slug
- `useSanityStats()` - Fetch platform statistics

### 3. **Updated Sanity Client** (`src/lib/sanity.ts`)
- Configured with your project ID and dataset
- GROQ queries for fetching posts, single posts, and stats
- Error handling and fallback mechanisms

---

## 🔄 Updated Components & Pages

### Pages Updated:
1. **Home.tsx** - Now fetches all posts from Sanity
2. **PostDetail.tsx** - Now fetches single posts from Sanity
3. **PlatformArchive.tsx** - Now fetches filtered posts from Sanity

### Components Updated:
- **ContentGrid.tsx** - Added loading state support

---

## 📋 Sanity Schema Requirements

Your Sanity project needs a schema for `socialPost` documents. Create this in your Sanity Studio:

```javascript
// schema/socialPost.js
export default {
  name: 'socialPost',
  title: 'Social Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube', value: 'YouTube' },
          { title: 'TikTok', value: 'TikTok' },
          { title: 'X', value: 'X' },
          { title: 'Threads', value: 'Threads' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mediaUrl',
      title: 'Media URL',
      type: 'url',
      description: 'Link to the media (YouTube video, image, etc.)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text content using Portable Text',
    },
    {
      name: 'metaTags',
      title: 'Meta Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tags for categorizing and filtering content',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'authorHandle',
      title: 'Author Handle',
      type: 'string',
      description: '@username of the content creator',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'SEO description for the post',
    },
  ],
  preview: {
    select: {
      title: 'title',
      platform: 'platform',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.platform,
      }
    }
  }
}
```

---

## 🚀 Getting Started

### 1. **Add Your Schema to Sanity**
- Log into your Sanity Studio
- Create the `socialPost` document type using the schema above
- Make sure your dataset has CORS enabled for `http://localhost:3000`

### 2. **Add Content**
- Create at least one SocialPost document in your Sanity Studio
- Ensure `publishedAt` date is not in the future
- Verify the `slug` is properly generated

### 3. **Run Your Frontend**
```bash
cd /home/elementary/Documents/pinchiglobal
pnpm dev
```

### 4. **Test the Integration**
- Navigate to `http://localhost:5173`
- You should see your posts from Sanity displayed on the home page
- Click on a post to view the detail page

---

## 📊 GROQ Queries Used

### Fetch All Posts
```groq
*[_type == "socialPost" && publishedAt <= now()] | order(publishedAt desc) {
  _id, title, slug, platform, mediaUrl, content, metaTags, publishedAt, authorHandle
}
```

### Fetch Single Post
```groq
*[_type == "socialPost" && slug.current == $slug][0] {
  _id, title, slug, platform, mediaUrl, content, metaTags, publishedAt, authorHandle, description
}
```

### Platform Statistics
```groq
{
  "youtube": count(*[_type == "socialPost" && platform == "YouTube"]),
  "tiktok": count(*[_type == "socialPost" && platform == "TikTok"]),
  "x": count(*[_type == "socialPost" && platform == "X"]),
  "threads": count(*[_type == "socialPost" && platform == "Threads"])
}
```

---

## 🔐 Security & CORS

### Enable CORS in Sanity
```bash
cd your-sanity-project
sanity cors add http://localhost:3000
sanity cors add https://yourdomain.com  # Production
```

Or add through [Sanity Dashboard](https://manage.sanity.io):
1. Go to Project Settings → API
2. Click "Add CORS origin"
3. Add your domain

---

## 🐛 Troubleshooting

### Issue: "No posts displayed"
**Solutions:**
- Check that your Sanity project ID is correct in `.env.local`
- Verify posts exist in your Sanity dataset
- Check browser console for error messages
- Ensure `publishedAt` date is in the past

### Issue: "CORS error"
**Solutions:**
- Add your domain to CORS origins in Sanity
- No authentication token is needed (public data)
- Check that dataset is set to "production"

### Issue: "Module not found" errors
**Solution:**
- Run `pnpm install` to ensure all dependencies are installed
- Restart the dev server: `pnpm dev`

---

## 📚 Useful Commands

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm preview

# Type check
pnpm exec tsc --noEmit
```

---

## 🔗 Useful Links

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Portable Text](https://www.sanity.io/docs/portable-text)
- [Project Settings](https://manage.sanity.io)

---

## ✨ Next Steps

Optional enhancements:
1. Add authentication for private posts
2. Implement search/filtering
3. Add pagination
4. Set up webhooks for real-time updates
5. Cache queries with React Query or SWR
6. Add image optimization with Sanity Image URL builder

---

## 📝 Notes

- Your mock data in `sanity.ts` is still available as a fallback
- If Sanity requests fail, the app will gracefully show empty states
- All data fetching is done client-side (no server backend required)
- The integration uses public API (no authentication tokens needed)
