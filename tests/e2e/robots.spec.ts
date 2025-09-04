import { test, expect } from '@playwright/test'

test.describe('Robots.txt AEO Tests', () => {
  test('should allow PerplexityBot and GPTBot', async ({ page }) => {
    const response = await page.goto('/robots.txt')
    
    expect(response?.status()).toBe(200)
    
    const content = await page.textContent('body')
    expect(content).toBeTruthy()
    
    // Check for PerplexityBot allowance
    expect(content).toContain('User-agent: PerplexityBot')
    expect(content).toMatch(/User-agent:\s*PerplexityBot[\s\S]*?Allow:\s*\//)
    
    // Check for GPTBot allowance
    expect(content).toContain('User-agent: GPTBot')
    expect(content).toMatch(/User-agent:\s*GPTBot[\s\S]*?Allow:\s*\//)
    
    // Check for ChatGPT-User allowance
    expect(content).toContain('User-agent: ChatGPT-User')
    expect(content).toMatch(/User-agent:\s*ChatGPT-User[\s\S]*?Allow:\s*\//)
    
    // Check for Claude-Web allowance
    expect(content).toContain('User-agent: Claude-Web')
    expect(content).toMatch(/User-agent:\s*Claude-Web[\s\S]*?Allow:\s*\//)
    
    // Check for sitemap reference
    expect(content).toMatch(/Sitemap:\s*https?:\/\/[^\s]+\/sitemap\.xml/)
    
    // Ensure no blanket disallow that would block answer engines
    const lines = content?.split('\n') || []
    const userAgentWildcardSections = []
    let currentSection = []
    let inWildcardSection = false
    
    for (const line of lines) {
      const trimmedLine = line.trim()
      if (trimmedLine.startsWith('User-agent:')) {
        if (currentSection.length > 0) {
          userAgentWildcardSections.push(currentSection)
        }
        currentSection = [trimmedLine]
        inWildcardSection = trimmedLine.includes('*')
      } else if (trimmedLine.startsWith('Disallow:') || trimmedLine.startsWith('Allow:')) {
        currentSection.push(trimmedLine)
      }
    }
    
    if (currentSection.length > 0) {
      userAgentWildcardSections.push(currentSection)
    }
    
    // Check wildcard sections don't have blanket disallow
    for (const section of userAgentWildcardSections) {
      if (section[0].includes('*')) {
        const hasBlankDisallow = section.some(line => 
          line.trim() === 'Disallow: /' || line.trim() === 'Disallow:'
        )
        expect(hasBlankDisallow).toBeFalsy()
      }
    }
  })

  test('should have proper content type and encoding', async ({ page }) => {
    const response = await page.goto('/robots.txt')
    
    expect(response?.status()).toBe(200)
    expect(response?.headers()['content-type']).toContain('text/plain')
  })

  test('should be accessible to crawlers', async ({ page }) => {
    // Simulate different user agents
    const userAgents = [
      'PerplexityBot/1.0',
      'Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)',
      'Mozilla/5.0 (compatible; ChatGPT-User/1.0; +https://openai.com/chatgpt)',
      'Mozilla/5.0 (compatible; Claude-Web/1.0; +https://anthropic.com)'
    ]

    for (const userAgent of userAgents) {
      await page.setUserAgent(userAgent)
      const response = await page.goto('/robots.txt')
      expect(response?.status()).toBe(200)
    }
  })
})