#!/usr/bin/env tsx

/**
 * Manual IndexNow ping script for PassMaster
 * Usage: npx tsx scripts/ping-indexnow.ts [urls...]
 * Example: npx tsx scripts/ping-indexnow.ts https://passmaster.app/offline https://passmaster.app/client-side
 */

import { config } from 'dotenv'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

// Load environment variables
config({ path: '.env.local' })
config({ path: '.env' })

interface IndexNowRequest {
  host: string
  key: string
  keyLocation: string
  urlList: string[]
}

class IndexNowPinger {
  private readonly key: string
  private readonly host: string
  private readonly enabled: boolean

  constructor() {
    this.key = process.env.INDEXNOW_KEY || ''
    this.host = process.env.SITE_HOST || 'passmaster.app'
    this.enabled = Boolean(this.key)

    if (!this.enabled) {
      throw new Error('INDEXNOW_KEY is required in environment variables')
    }

    this.ensureKeyFile()
  }

  private ensureKeyFile() {
    try {
      const publicDir = join(process.cwd(), 'public')
      if (!existsSync(publicDir)) {
        mkdirSync(publicDir, { recursive: true })
      }

      const keyFilePath = join(publicDir, `${this.key}.txt`)
      if (!existsSync(keyFilePath)) {
        writeFileSync(keyFilePath, this.key)
        console.log(`✅ Created key file: public/${this.key}.txt`)
      }
    } catch (error) {
      console.error('❌ Failed to create key file:', error)
      throw error
    }
  }

  private validateUrls(urls: string[]): string[] {
    return urls.filter(url => {
      try {
        const parsed = new URL(url)
        if (parsed.hostname !== this.host) {
          console.warn(`⚠️  Skipping URL with wrong hostname: ${url} (expected: ${this.host})`)
          return false
        }
        if (parsed.protocol !== 'https:') {
          console.warn(`⚠️  Skipping non-HTTPS URL: ${url}`)
          return false
        }
        return true
      } catch {
        console.warn(`⚠️  Skipping invalid URL: ${url}`)
        return false
      }
    })
  }

  async ping(urls: string[]): Promise<boolean> {
    const validUrls = this.validateUrls(urls)
    
    if (validUrls.length === 0) {
      console.error('❌ No valid URLs to ping')
      return false
    }

    if (validUrls.length > 10000) {
      console.warn(`⚠️  Too many URLs (${validUrls.length}), limiting to 10,000`)
      validUrls.splice(10000)
    }

    const payload: IndexNowRequest = {
      host: this.host,
      key: this.key,
      keyLocation: `https://${this.host}/${this.key}.txt`,
      urlList: validUrls
    }

    console.log(`🚀 Pinging IndexNow with ${validUrls.length} URLs...`)
    console.log('   URLs:', validUrls.join(', '))

    try {
      const response = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'PassMaster IndexNow Manual Client'
        },
        body: JSON.stringify(payload)
      })

      console.log(`📡 Response status: ${response.status} ${response.statusText}`)

      if (response.ok || response.status === 202) {
        console.log('✅ IndexNow ping successful!')
        return true
      } else {
        const errorText = await response.text().catch(() => 'Unknown error')
        console.error('❌ IndexNow ping failed:', errorText)
        return false
      }
    } catch (error) {
      console.error('❌ Network error:', error)
      return false
    }
  }

  getStatus() {
    return {
      enabled: this.enabled,
      key: this.key ? `${this.key.substring(0, 8)}...` : 'Not set',
      host: this.host,
      keyFileUrl: `https://${this.host}/${this.key}.txt`
    }
  }
}

// CLI Interface
async function main() {
  console.log('🔧 PassMaster IndexNow Manual Ping Tool\n')

  try {
    const pinger = new IndexNowPinger()
    const status = pinger.getStatus()
    
    console.log('📊 Configuration:')
    console.log(`   Host: ${status.host}`)
    console.log(`   Key: ${status.key}`)
    console.log(`   Key File: ${status.keyFileUrl}`)
    console.log(`   Enabled: ${status.enabled}\n`)

    const args = process.argv.slice(2)

    if (args.length === 0) {
      console.log('ℹ️  Usage: npx tsx scripts/ping-indexnow.ts [urls...]')
      console.log('   Example: npx tsx scripts/ping-indexnow.ts https://passmaster.app/offline')
      console.log('\n🎯 Common URLs to ping:')
      console.log('   • https://passmaster.app/')
      console.log('   • https://passmaster.app/offline')
      console.log('   • https://passmaster.app/client-side')
      console.log('   • https://passmaster.app/exclude-similar')
      console.log('   • https://passmaster.app/privacy')
      process.exit(0)
    }

    // Special commands
    if (args[0] === '--all') {
      const allUrls = [
        `https://${status.host}/`,
        `https://${status.host}/offline`,
        `https://${status.host}/client-side`,
        `https://${status.host}/exclude-similar`,
        `https://${status.host}/privacy`
      ]
      
      console.log('🎯 Pinging all main pages...')
      const success = await pinger.ping(allUrls)
      process.exit(success ? 0 : 1)
    }

    if (args[0] === '--test') {
      console.log('🧪 Testing with homepage only...')
      const testUrl = `https://${status.host}/`
      const success = await pinger.ping([testUrl])
      process.exit(success ? 0 : 1)
    }

    if (args[0] === '--help' || args[0] === '-h') {
      console.log('📖 IndexNow Ping Commands:')
      console.log('   --all      Ping all main pages')
      console.log('   --test     Test with homepage only')
      console.log('   --status   Show current configuration')
      console.log('   [urls...]  Ping specific URLs')
      process.exit(0)
    }

    if (args[0] === '--status') {
      console.log('✅ Configuration looks good!')
      process.exit(0)
    }

    // Ping provided URLs
    const success = await pinger.ping(args)
    process.exit(success ? 0 : 1)

  } catch (error) {
    console.error('💥 Fatal error:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

// Handle SIGINT gracefully
process.on('SIGINT', () => {
  console.log('\n👋 Interrupted by user')
  process.exit(130)
})

// Run main function
if (require.main === module) {
  main()
}

export { IndexNowPinger }