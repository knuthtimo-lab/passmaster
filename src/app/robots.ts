import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://passmaster.app'
  
  return {
    rules: [
      // Allow all search engines
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/static/',
          '*.json',
          '/*.txt'
        ],
      },
      // Explicitly allow Answer Engine bots
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      // Other AI crawlers
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'FacebookBot',
        allow: '/',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}