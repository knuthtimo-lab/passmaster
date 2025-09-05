'use client'

import { useEffect, useRef, useState } from 'react'
import { AdSense } from './AdSense'

// PWA-optimized AdSense component
export function PWAAdSense({ 
  slot, 
  format = 'auto', 
  className = '',
  pwaPriority = 'normal' // 'high' for critical ads, 'normal' for regular
}: { 
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  className?: string
  pwaPriority?: 'high' | 'normal'
}) {
  const [isPWA, setIsPWA] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Detect if running as PWA
    const isPWAMode = window.matchMedia('(display-mode: standalone)').matches ||
                      window.matchMedia('(display-mode: fullscreen)').matches ||
                      (window.navigator as any).standalone === true

    setIsPWA(isPWAMode)

    // Intersection Observer for lazy loading ads
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Load ads 50px before they become visible
      }
    )

    if (adRef.current) {
      observer.observe(adRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // PWA-specific styling
  const pwaStyles = isPWA ? {
    // Better visibility in PWA mode
    marginTop: '16px',
    marginBottom: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    background: '#f8fafc'
  } : {}

  return (
    <div 
      ref={adRef}
      className={`pwa-adsense ${className}`}
      style={pwaStyles}
      data-pwa={isPWA}
      data-priority={pwaPriority}
    >
      {/* PWA indicator for high-priority ads */}
      {isPWA && pwaPriority === 'high' && (
        <div className="text-xs text-center text-gray-500 mb-2">
          📱 PWA Enhanced
        </div>
      )}
      
      {/* Only render ad when visible (performance optimization) */}
      {isVisible ? (
        <AdSense
          slot={slot}
          format={format}
          className="pwa-optimized"
        />
      ) : (
        <div 
          style={{
            height: format === 'horizontal' ? '90px' : 
                   format === 'rectangle' ? '250px' : 
                   format === 'vertical' ? '600px' : '200px',
            background: '#f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            fontSize: '14px'
          }}
        >
          Loading ad...
        </div>
      )}
    </div>
  )
}

// PWA-specific ad placements
export function PWABannerAd({ className = '' }: { className?: string }) {
  return (
    <PWAAdSense
      slot="1234567890"
      format="horizontal"
      pwaPriority="high"
      className={className}
    />
  )
}

export function PWASquareAd({ className = '' }: { className?: string }) {
  return (
    <PWAAdSense
      slot="0987654321"
      format="rectangle"
      pwaPriority="normal"
      className={className}
    />
  )
}

export function PWAResponsiveAd({ 
  slot = "2468135790", 
  className = '' 
}: { 
  slot?: string
  className?: string 
}) {
  return (
    <PWAAdSense
      slot={slot}
      format="auto"
      pwaPriority="high"
      className={className}
    />
  )
}