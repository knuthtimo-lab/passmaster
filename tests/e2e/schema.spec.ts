import { test, expect } from '@playwright/test'

test.describe('JSON-LD Schema AEO Tests', () => {
  test('should have valid JSON-LD on homepage', async ({ page }) => {
    await page.goto('/')
    
    // Find all JSON-LD script tags
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all()
    
    expect(jsonLdScripts.length).toBeGreaterThan(0)
    
    // Check each JSON-LD script for valid JSON
    for (const script of jsonLdScripts) {
      const content = await script.textContent()
      expect(content).toBeTruthy()
      
      let jsonData
      expect(() => {
        jsonData = JSON.parse(content!)
      }).not.toThrow()
      
      // Should have @context and @type
      expect(jsonData).toHaveProperty('@context')
      expect(jsonData).toHaveProperty('@type')
      expect(jsonData['@context']).toBe('https://schema.org')
    }
  })

  test('should have SoftwareApplication schema on homepage', async ({ page }) => {
    await page.goto('/')
    
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all()
    
    let hasSoftwareApplication = false
    
    for (const script of jsonLdScripts) {
      const content = await script.textContent()
      const jsonData = JSON.parse(content!)
      
      if (jsonData['@type'] === 'SoftwareApplication') {
        hasSoftwareApplication = true
        
        // Validate required fields
        expect(jsonData).toHaveProperty('name')
        expect(jsonData).toHaveProperty('description')
        expect(jsonData).toHaveProperty('applicationCategory')
        expect(jsonData).toHaveProperty('operatingSystem')
        expect(jsonData).toHaveProperty('offers')
        expect(jsonData).toHaveProperty('isAccessibleForFree')
        
        // Check offers structure
        expect(jsonData.offers).toHaveProperty('@type', 'Offer')
        expect(jsonData.offers).toHaveProperty('price')
        expect(jsonData.offers).toHaveProperty('priceCurrency')
      }
    }
    
    expect(hasSoftwareApplication).toBeTruthy()
  })

  test('should have Organization schema', async ({ page }) => {
    await page.goto('/')
    
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all()
    let hasOrganization = false
    
    for (const script of jsonLdScripts) {
      const content = await script.textContent()
      const jsonData = JSON.parse(content!)
      
      if (jsonData['@type'] === 'Organization') {
        hasOrganization = true
        
        // Validate required fields
        expect(jsonData).toHaveProperty('name')
        expect(jsonData).toHaveProperty('url')
        expect(jsonData).toHaveProperty('logo')
        
        // Check logo structure
        if (typeof jsonData.logo === 'object') {
          expect(jsonData.logo).toHaveProperty('@type', 'ImageObject')
          expect(jsonData.logo).toHaveProperty('url')
        }
      }
    }
    
    expect(hasOrganization).toBeTruthy()
  })

  test('should have WebSite schema with SearchAction', async ({ page }) => {
    await page.goto('/')
    
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all()
    let hasWebSite = false
    
    for (const script of jsonLdScripts) {
      const content = await script.textContent()
      const jsonData = JSON.parse(content!)
      
      if (jsonData['@type'] === 'WebSite') {
        hasWebSite = true
        
        // Validate required fields
        expect(jsonData).toHaveProperty('name')
        expect(jsonData).toHaveProperty('url')
        
        // Check for SearchAction
        if (jsonData.potentialAction) {
          expect(jsonData.potentialAction).toHaveProperty('@type', 'SearchAction')
          expect(jsonData.potentialAction).toHaveProperty('target')
          expect(jsonData.potentialAction).toHaveProperty('query-input')
        }
      }
    }
    
    expect(hasWebSite).toBeTruthy()
  })

  test('should have FAQPage schema on FAQ pages', async ({ page }) => {
    await page.goto('/')
    
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all()
    let hasFAQPage = false
    
    for (const script of jsonLdScripts) {
      const content = await script.textContent()
      const jsonData = JSON.parse(content!)
      
      if (jsonData['@type'] === 'FAQPage') {
        hasFAQPage = true
        
        // Validate structure
        expect(jsonData).toHaveProperty('mainEntity')
        expect(Array.isArray(jsonData.mainEntity)).toBeTruthy()
        expect(jsonData.mainEntity.length).toBeGreaterThan(0)
        
        // Check first FAQ item
        const firstFaq = jsonData.mainEntity[0]
        expect(firstFaq).toHaveProperty('@type', 'Question')
        expect(firstFaq).toHaveProperty('name')
        expect(firstFaq).toHaveProperty('acceptedAnswer')
        
        // Check answer structure
        expect(firstFaq.acceptedAnswer).toHaveProperty('@type', 'Answer')
        expect(firstFaq.acceptedAnswer).toHaveProperty('text')
      }
    }
    
    expect(hasFAQPage).toBeTruthy()
  })

  test('should have Article schema on content pages', async ({ page }) => {
    const contentPages = ['/offline', '/client-side', '/exclude-similar']
    
    for (const pagePath of contentPages) {
      await page.goto(pagePath)
      
      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all()
      
      for (const script of jsonLdScripts) {
        const content = await script.textContent()
        const jsonData = JSON.parse(content!)
        
        if (jsonData['@type'] === 'Article' || jsonData['@type'] === 'TechArticle') {
          // Validate article fields
          expect(jsonData).toHaveProperty('headline')
          expect(jsonData).toHaveProperty('description')
          expect(jsonData).toHaveProperty('author')
          
          // Check author structure
          if (jsonData.author) {
            expect(jsonData.author).toHaveProperty('@type')
            expect(jsonData.author).toHaveProperty('name')
          }
          
          // Check dates if present
          if (jsonData.datePublished) {
            expect(() => new Date(jsonData.datePublished)).not.toThrow()
          }
          if (jsonData.dateModified) {
            expect(() => new Date(jsonData.dateModified)).not.toThrow()
          }
        }
      }
    }
  })

  test('should validate JSON-LD syntax', async ({ page }) => {
    const pages = ['/', '/offline', '/client-side', '/exclude-similar', '/privacy']
    
    for (const pagePath of pages) {
      await page.goto(pagePath)
      
      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all()
      
      for (const script of jsonLdScripts) {
        const content = await script.textContent()
        
        // Should be valid JSON
        let jsonData
        expect(() => {
          jsonData = JSON.parse(content!)
        }).not.toThrow()
        
        // Should have schema.org context
        expect(jsonData).toHaveProperty('@context')
        expect(jsonData['@context']).toContain('schema.org')
        
        // Should have valid type
        expect(jsonData).toHaveProperty('@type')
        expect(typeof jsonData['@type']).toBe('string')
        
        // No empty required fields
        const requiredFields = ['name', 'headline', 'title', 'text']
        for (const field of requiredFields) {
          if (jsonData[field] !== undefined) {
            expect(jsonData[field]).not.toBe('')
            expect(jsonData[field]).not.toBeNull()
          }
        }
      }
    }
  })
})