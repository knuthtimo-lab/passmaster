'use client'

import { usePathname } from 'next/navigation'

interface CanonicalProps {
  url?: string
  baseUrl?: string
}

export function Canonical({ url, baseUrl }: CanonicalProps) {
  const pathname = usePathname()
  const siteUrl = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://passmaster.app'
  
  // Use provided URL or construct from current pathname
  const canonicalUrl = url || `${siteUrl}${pathname}`
  
  // Ensure URL is properly formatted
  const normalizedUrl = normalizeUrl(canonicalUrl)
  
  return (
    <link rel="canonical" href={normalizedUrl} />
  )
}

function normalizeUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    
    // Remove trailing slash except for root
    if (urlObj.pathname !== '/' && urlObj.pathname.endsWith('/')) {
      urlObj.pathname = urlObj.pathname.slice(0, -1)
    }
    
    // Remove common query parameters that shouldn't be canonical
    const paramsToRemove = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref', 'fbclid', 'gclid']
    paramsToRemove.forEach(param => {
      urlObj.searchParams.delete(param)
    })
    
    // Remove fragment
    urlObj.hash = ''
    
    return urlObj.toString()
  } catch (error) {
    console.error('Error normalizing URL:', error)
    return url
  }
}

// Metadata helper for Next.js metadata API
export function getCanonicalUrl(pathname: string, baseUrl?: string): string {
  const siteUrl = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://passmaster.app'
  return normalizeUrl(`${siteUrl}${pathname}`)
}

// Alternative component that works with Next.js metadata API
export function generateCanonicalMetadata(pathname: string, baseUrl?: string) {
  return {
    alternates: {
      canonical: getCanonicalUrl(pathname, baseUrl)
    }
  }
}