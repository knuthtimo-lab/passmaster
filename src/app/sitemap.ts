import { MetadataRoute } from 'next'
import { readdir, stat } from 'fs/promises'
import { join } from 'path'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://passmaster.app'
  
  // Static pages
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/offline`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/client-side`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/exclude-similar`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Dynamic pages from app directory
  const dynamicPages = await getDynamicPages(siteUrl)
  
  return [...staticPages, ...dynamicPages]
}

async function getDynamicPages(siteUrl: string) {
  try {
    const appDir = join(process.cwd(), 'src', 'app')
    const pages = await findPageFiles(appDir)
    
    return pages.map(page => ({
      url: `${siteUrl}${page.path}`,
      lastModified: page.lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error('Error generating dynamic pages for sitemap:', error)
    return []
  }
}

async function findPageFiles(dir: string, basePath = ''): Promise<Array<{path: string, lastModified: Date}>> {
  const pages: Array<{path: string, lastModified: Date}> = []
  
  try {
    const entries = await readdir(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      
      if (entry.isDirectory()) {
        // Skip special Next.js directories
        if (['api', 'globals.css', '_components'].includes(entry.name)) {
          continue
        }
        
        const subPages = await findPageFiles(fullPath, join(basePath, entry.name))
        pages.push(...subPages)
      } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
        const stats = await stat(fullPath)
        const routePath = basePath || '/'
        
        // Skip duplicate root page
        if (routePath === '/' && basePath === '') {
          continue
        }
        
        pages.push({
          path: routePath === '/' ? '/' : routePath,
          lastModified: stats.mtime
        })
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error)
  }
  
  return pages
}

// Generate news sitemap for recent updates (optional)
export async function generateNewsSitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://passmaster.app'
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  
  // Get recent content updates
  const recentPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    }
  ]
  
  return recentPages.filter(page => page.lastModified > thirtyDaysAgo)
}