import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'PassMaster – Free Offline Secure Password Generator (Open Source)',
  description: 'Generate ultra-secure passwords instantly, offline with client-side encryption. 100% open-source, private, and free.',
  keywords: ['password generator', 'secure passwords', 'offline password generator', 'open source', 'privacy', 'security'],
  authors: [{ name: 'PassMaster' }],
  creator: 'PassMaster',
  publisher: 'PassMaster',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://passmaster.app'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/icons/icon-192.png',
    apple: '/icons/icon-192.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'PassMaster – Free Offline Secure Password Generator (Open Source)',
    description: 'Generate ultra-secure passwords instantly, offline with client-side encryption. 100% open-source, private, and free.',
    url: '/',
    siteName: 'PassMaster',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PassMaster - Secure Password Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PassMaster – Free Offline Secure Password Generator (Open Source)',
    description: 'Generate ultra-secure passwords instantly, offline with client-side encryption. 100% open-source, private, and free.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
        
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "PassMaster",
              "applicationCategory": "SecurityApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "isAccessibleForFree": true,
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://passmaster.app",
              "description": "Generate ultra-secure passwords instantly, offline with client-side encryption. 100% open-source, private, and free.",
              "author": {
                "@type": "Organization",
                "name": "PassMaster"
              },
              "softwareVersion": "1.0.0",
              "downloadUrl": process.env.NEXT_PUBLIC_SITE_URL || "https://passmaster.app",
              "installUrl": process.env.NEXT_PUBLIC_SITE_URL || "https://passmaster.app"
            })
          }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
