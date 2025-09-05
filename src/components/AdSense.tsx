'use client'

import { useEffect, useRef } from 'react'

interface AdSenseProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  responsive?: boolean
  className?: string
}

export function AdSense({ 
  slot, 
  format = 'auto', 
  responsive = true, 
  className = '' 
}: AdSenseProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const isAdLoaded = useRef(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && !isAdLoaded.current) {
      try {
        // Check if adsbygoogle is available
        const adsbygoogle = (window as any).adsbygoogle
        if (adsbygoogle) {
          adsbygoogle.push({})
          isAdLoaded.current = true
        }
      } catch (error) {
        console.warn('AdSense loading error:', error)
      }
    }
  }, [])

  // Demo placeholder for development
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className={`adsense-container bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg p-4 text-center ${className}`}>
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          📺 AdSense Preview ({format})
        </div>
        <div className="bg-white dark:bg-gray-800 rounded p-4 shadow-sm border border-gray-200 dark:border-gray-600">
          <div className={`flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium ${
            format === 'horizontal' ? 'h-20' : 
            format === 'rectangle' ? 'h-32' : 
            format === 'vertical' ? 'h-48' : 
            'h-24'
          }`}>
            <div className="text-center">
              <div className="text-lg mb-1">🎯</div>
              <div className="text-sm">
                {format === 'horizontal' ? '728×90 Banner' : 
                 format === 'rectangle' ? '300×250 Square' : 
                 format === 'vertical' ? '160×600 Skyscraper' : 
                 'Responsive Ad'}
              </div>
              <div className="text-xs opacity-75 mt-1">
                High-Impact Placement
              </div>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Slot: {slot} | Format: {format}
        </div>
      </div>
    )
  }

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
        ref={adRef}
      />
    </div>
  )
}

// Banner ad component (728x90)
export function BannerAd({ className = '' }: { className?: string }) {
  return (
    <AdSense
      slot="1234567890"
      format="horizontal"
      className={`banner-ad ${className}`}
    />
  )
}

// Square ad component (300x250)
export function SquareAd({ className = '' }: { className?: string }) {
  return (
    <AdSense
      slot="0987654321"
      format="rectangle"
      className={`square-ad ${className}`}
    />
  )
}

// Sidebar ad component (160x600)
export function SidebarAd({ className = '' }: { className?: string }) {
  return (
    <AdSense
      slot="1357924680"
      format="vertical"
      className={`sidebar-ad ${className}`}
    />
  )
}

// Responsive ad component
export function ResponsiveAd({ 
  slot = "2468135790",
  className = '' 
}: { 
  slot?: string
  className?: string 
}) {
  return (
    <AdSense
      slot={slot}
      format="auto"
      responsive={true}
      className={`responsive-ad ${className}`}
    />
  )
}