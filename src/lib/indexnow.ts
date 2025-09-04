import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'

interface IndexNowRequest {
  host: string
  key: string
  keyLocation: string
  urlList: string[]
}

interface QueuedPing {
  urls: string[]
  timestamp: number
  retryCount: number
  nextRetry?: number
}

class IndexNowClient {
  private readonly key: string
  private readonly host: string
  private readonly enabled: boolean
  private readonly queuePath: string
  private queue: QueuedPing[] = []
  private processing = false

  constructor() {
    this.key = process.env.INDEXNOW_KEY || ''
    this.host = process.env.SITE_HOST || 'passmaster.app'
    this.enabled = process.env.ENABLE_INDEXNOW === 'true' && Boolean(this.key)
    this.queuePath = join(process.cwd(), 'tmp', 'indexnow-queue.json')
    
    if (this.enabled) {
      this.initializeQueue()
      this.createKeyFile()
    }
  }

  private async initializeQueue() {
    try {
      if (!existsSync(join(process.cwd(), 'tmp'))) {
        await mkdir(join(process.cwd(), 'tmp'), { recursive: true })
      }

      if (existsSync(this.queuePath)) {
        const data = await readFile(this.queuePath, 'utf-8')
        this.queue = JSON.parse(data)
      }
    } catch (error) {
      console.error('Failed to initialize IndexNow queue:', error)
      this.queue = []
    }
  }

  private async saveQueue() {
    try {
      await writeFile(this.queuePath, JSON.stringify(this.queue, null, 2))
    } catch (error) {
      console.error('Failed to save IndexNow queue:', error)
    }
  }

  private async createKeyFile() {
    try {
      const keyFilePath = join(process.cwd(), 'public', `${this.key}.txt`)
      const keyFileContent = this.key
      
      if (!existsSync(keyFilePath)) {
        await writeFile(keyFilePath, keyFileContent)
        console.log(`Created IndexNow key file: ${this.key}.txt`)
      }
    } catch (error) {
      console.error('Failed to create IndexNow key file:', error)
    }
  }

  private validateUrls(urls: string[]): string[] {
    return urls
      .filter(url => {
        try {
          const parsed = new URL(url)
          return parsed.hostname === this.host && parsed.protocol === 'https:'
        } catch {
          return false
        }
      })
      .slice(0, 10000) // IndexNow limit
  }

  private deduplicateUrls(newUrls: string[]): string[] {
    const existingUrls = new Set(
      this.queue.flatMap(item => item.urls)
    )
    
    return newUrls.filter(url => !existingUrls.has(url))
  }

  private getRetryDelay(retryCount: number): number {
    // Exponential backoff: 1s, 5s, 30s, 5m, 30m
    const delays = [1000, 5000, 30000, 300000, 1800000]
    return delays[Math.min(retryCount, delays.length - 1)]
  }

  async queuePing(urls: string[]): Promise<boolean> {
    if (!this.enabled || !urls.length) {
      return false
    }

    const validUrls = this.validateUrls(urls)
    const uniqueUrls = this.deduplicateUrls(validUrls)
    
    if (!uniqueUrls.length) {
      return false
    }

    const queuedPing: QueuedPing = {
      urls: uniqueUrls,
      timestamp: Date.now(),
      retryCount: 0
    }

    this.queue.push(queuedPing)
    await this.saveQueue()
    
    // Process immediately if not already processing
    if (!this.processing) {
      this.processQueue()
    }

    return true
  }

  private async processQueue(): Promise<void> {
    if (this.processing || !this.queue.length) {
      return
    }

    this.processing = true

    try {
      const now = Date.now()
      const readyItems = this.queue.filter(item => 
        !item.nextRetry || item.nextRetry <= now
      )

      for (const item of readyItems) {
        try {
          const success = await this.sendPing(item.urls)
          
          if (success) {
            // Remove from queue on success
            this.queue = this.queue.filter(queued => queued !== item)
            console.log(`IndexNow ping successful for ${item.urls.length} URLs`)
          } else {
            // Schedule retry with exponential backoff
            item.retryCount++
            if (item.retryCount <= 5) {
              item.nextRetry = now + this.getRetryDelay(item.retryCount - 1)
              console.log(`IndexNow ping failed, retrying in ${this.getRetryDelay(item.retryCount - 1)}ms (attempt ${item.retryCount})`)
            } else {
              // Remove after 5 failed attempts
              this.queue = this.queue.filter(queued => queued !== item)
              console.error(`IndexNow ping failed permanently for URLs: ${item.urls.join(', ')}`)
            }
          }
        } catch (error) {
          console.error('IndexNow ping error:', error)
          item.retryCount++
          if (item.retryCount <= 5) {
            item.nextRetry = now + this.getRetryDelay(item.retryCount - 1)
          } else {
            this.queue = this.queue.filter(queued => queued !== item)
          }
        }
      }

      await this.saveQueue()
    } finally {
      this.processing = false
      
      // Schedule next processing if queue has items
      if (this.queue.length > 0) {
        const nextRetry = Math.min(...this.queue.map(item => item.nextRetry || 0))
        const delay = Math.max(0, nextRetry - Date.now())
        setTimeout(() => this.processQueue(), delay)
      }
    }
  }

  private async sendPing(urls: string[]): Promise<boolean> {
    if (!this.enabled) {
      return false
    }

    const payload: IndexNowRequest = {
      host: this.host,
      key: this.key,
      keyLocation: `https://${this.host}/${this.key}.txt`,
      urlList: urls
    }

    try {
      const response = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'PassMaster IndexNow Client'
        },
        body: JSON.stringify(payload)
      })

      // IndexNow API returns 200 for success, 202 for accepted, 4xx/5xx for errors
      return response.ok || response.status === 202
    } catch (error) {
      console.error('IndexNow API request failed:', error)
      return false
    }
  }

  async getQueueStatus() {
    return {
      enabled: this.enabled,
      queueLength: this.queue.length,
      processing: this.processing,
      queue: this.queue
    }
  }

  async clearQueue() {
    this.queue = []
    await this.saveQueue()
  }
}

// Singleton instance
const indexNowClient = new IndexNowClient()

// Public API
export const queueIndexNowPing = (urls: string[]) => indexNowClient.queuePing(urls)
export const getIndexNowStatus = () => indexNowClient.getQueueStatus()
export const clearIndexNowQueue = () => indexNowClient.clearQueue()

// Helper to ping current page and related pages
export const pingCurrentPage = (currentUrl: string, relatedUrls: string[] = []) => {
  const allUrls = [currentUrl, ...relatedUrls]
  return queueIndexNowPing(allUrls)
}

// Helper to ping on content update
export const pingContentUpdate = (contentPath: string) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://passmaster.app'
  const fullUrl = `${siteUrl}${contentPath.startsWith('/') ? contentPath : '/' + contentPath}`
  
  const relatedUrls = [
    `${siteUrl}/`, // Homepage
    `${siteUrl}/sitemap.xml` // Sitemap
  ]
  
  return pingCurrentPage(fullUrl, relatedUrls)
}