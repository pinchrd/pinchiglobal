export default {
  name: 'socialPost',
  title: 'Social Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(3).max(200),
      description: 'The post title',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Auto-generated from title. Used in URLs.',
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
      validation: (Rule: any) => Rule.required(),
      description: 'Which platform is this content from?',
    },
    {
      name: 'mediaUrl',
      title: 'Media URL',
      type: 'url',
      validation: (Rule: any) => Rule.required(),
      description: 'Link to the media (YouTube video, image, TikTok video, etc.)',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.max(500),
      description: 'Short description for SEO and previews',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      description: 'Full content using rich text (Portable Text)',
    },
    {
      name: 'metaTags',
      title: 'Meta Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tags for categorizing and filtering content (e.g., #design, #tech)',
    },
    {
      name: 'authorHandle',
      title: 'Author Handle',
      type: 'string',
      description: '@username of the content creator',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
      description: 'When was this content published?',
    },
  ],
  preview: {
    select: {
      title: 'title',
      platform: 'platform',
      publishedAt: 'publishedAt',
    },
    prepare(selection: any) {
      return {
        title: selection.title,
        subtitle: `${selection.platform} • ${new Date(selection.publishedAt).toLocaleDateString()}`,
      }
    }
  }
}
