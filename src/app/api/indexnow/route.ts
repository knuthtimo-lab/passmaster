import { NextRequest, NextResponse } from 'next/server'
import { queueIndexNowPing, getIndexNowStatus } from '@/lib/indexnow'

// POST /api/indexnow - Queue URLs for IndexNow pinging
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { urls } = body

    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json(
        { error: 'URLs array is required' },
        { status: 400 }
      )
    }

    if (urls.length === 0) {
      return NextResponse.json(
        { error: 'At least one URL is required' },
        { status: 400 }
      )
    }

    // Validate URLs belong to this domain
    const siteHost = process.env.SITE_HOST || 'passmaster.app'
    const validUrls = urls.filter(url => {
      try {
        const parsed = new URL(url)
        return parsed.hostname === siteHost && parsed.protocol === 'https:'
      } catch {
        return false
      }
    })

    if (validUrls.length === 0) {
      return NextResponse.json(
        { error: 'No valid URLs found' },
        { status: 400 }
      )
    }

    const success = await queueIndexNowPing(validUrls)

    return NextResponse.json({
      success,
      queued: validUrls.length,
      urls: validUrls
    })
  } catch (error) {
    console.error('IndexNow API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/indexnow - Get IndexNow status
export async function GET() {
  try {
    const status = await getIndexNowStatus()
    
    return NextResponse.json(status)
  } catch (error) {
    console.error('IndexNow status error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Rate limiting helper
const rateLimit = new Map()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 10

  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  const limitInfo = rateLimit.get(ip)
  
  if (now > limitInfo.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (limitInfo.count >= maxRequests) {
    return false
  }

  limitInfo.count++
  return true
}