import { test, expect } from '@playwright/test'

test.describe('Canonical Links AEO Tests', () => {
  test('should have exactly one canonical link on each page', async ({ page }) => {
    const pages = [
      '/',
      '/offline', 
      '/client-side',
      '/exclude-similar',
      '/privacy'
    ]
    
    for (const pagePath of pages) {
      await page.goto(pagePath)
      
      // Find all canonical links
      const canonicalLinks = await page.locator('link[rel="canonical"]').all()
      
      // Should have exactly one canonical link
      expect(canonicalLinks.length).toBe(1)
      
      const canonicalHref = await canonicalLinks[0].getAttribute('href')
      
      // Should have valid URL
      expect(canonicalHref).toBeTruthy()
      expect(() => new URL(canonicalHref!)).not.toThrow()
      
      // Should use HTTPS
      expect(canonicalHref).toMatch(/^https:\/\//)
      
      // Should contain correct domain
      expect(canonicalHref).toContain('passmaster.app')
      
      // Should match expected path
      const url = new URL(canonicalHref!)
      if (pagePath === '/') {
        expect(url.pathname).toBe('/')
      } else {
        expect(url.pathname).toBe(pagePath)
      }
      
      // Should not have trailing slash (except root)
      if (pagePath !== '/') {
        expect(url.pathname).not.toMatch(/\/$/)
      }
      
      // Should not have query parameters
      expect(url.search).toBe('')
      
      // Should not have fragment
      expect(url.hash).toBe('')
      
      console.log(`✓ ${pagePath}: ${canonicalHref}`)
    }
  })

  test('should have canonical in metadata API', async ({ page }) => {
    const pages = ['/', '/offline', '/client-side', '/exclude-similar']
    
    for (const pagePath of pages) {
      await page.goto(pagePath)
      
      // Check if canonical is properly set in head
      const canonical = await page.locator('head link[rel="canonical"]').first()
      expect(canonical).toBeTruthy()
      
      const href = await canonical.getAttribute('href')
      expect(href).toBeTruthy()
      expect(href).toMatch(/^https:\/\/passmaster\.app/)
    }
  })

  test('should handle URL normalization correctly', async ({ page }) => {
    // Test with various URL formats
    const testCases = [
      { path: '/', expected: 'https://passmaster.app/' },
      { path: '/offline', expected: 'https://passmaster.app/offline' },
      { path: '/offline/', expected: 'https://passmaster.app/offline' }, // Should remove trailing slash
      { path: '/offline?utm_source=test', expected: 'https://passmaster.app/offline' }, // Should remove UTM params
    ]
    
    for (const testCase of testCases) {
      await page.goto(testCase.path)
      
      const canonical = await page.locator('link[rel="canonical"]').first()
      const href = await canonical.getAttribute('href')
      
      expect(href).toBe(testCase.expected)
    }
  })

  test('should not have multiple canonical declarations', async ({ page }) => {
    const pages = ['/', '/offline', '/client-side', '/exclude-similar', '/privacy']
    
    for (const pagePath of pages) {
      await page.goto(pagePath)
      
      // Check for canonical in link tags
      const linkCanonicals = await page.locator('link[rel="canonical"]').all()
      expect(linkCanonicals.length).toBeLessThanOrEqual(1)
      
      // Check for canonical in HTTP headers (if any)
      const response = await page.goto(pagePath)
      const linkHeader = response?.headers()['link']
      
      if (linkHeader) {
        const canonicalInHeader = linkHeader.includes('rel="canonical"')
        
        // If canonical in header, should not also be in HTML (or vice versa)
        if (canonicalInHeader) {
          expect(linkCanonicals.length).toBe(0)
        }
      }
    }
  })

  test('should have consistent canonical URLs across navigation', async ({ page }) => {
    // Navigate to page directly
    await page.goto('/offline')
    const directCanonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    
    // Navigate to page via homepage
    await page.goto('/')
    await page.click('a[href="/offline"]')
    await page.waitForLoadState('networkidle')
    const navigatedCanonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    
    // Should have same canonical URL regardless of how we arrived
    expect(directCanonical).toBe(navigatedCanonical)
  })

  test('should handle special characters in URLs', async ({ page }) => {
    await page.goto('/exclude-similar')
    
    const canonical = await page.locator('link[rel="canonical"]').first()
    const href = await canonical.getAttribute('href')
    
    // Should properly encode URL
    expect(href).toBeTruthy()
    expect(() => new URL(href!)).not.toThrow()
    
    const url = new URL(href!)
    expect(url.pathname).toBe('/exclude-similar')
  })

  test('should not have self-referential canonical issues', async ({ page }) => {
    const pages = ['/', '/offline', '/client-side']
    
    for (const pagePath of pages) {
      await page.goto(pagePath)
      
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
      const currentUrl = new URL(page.url())
      const canonicalUrl = new URL(canonical!)
      
      // Canonical should match current page path (normalized)
      expect(canonicalUrl.pathname).toBe(currentUrl.pathname === '/' ? '/' : currentUrl.pathname.replace(/\/$/, ''))
      expect(canonicalUrl.hostname).toBe('passmaster.app') // Should use production domain
    }
  })
})