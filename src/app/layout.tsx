import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'PassMaster – Passwort Generator offline, open-source | DSGVO-konform',
  description: 'Kostenlos, offline, client-side: Erstelle sichere Passwörter mit PassMaster. Transparent, DSGVO-konform, Open-Source für maximale Sicherheit.',
  keywords: ['passwort generator', 'passwort generator offline', 'client-side password generator', 'open source password generator', 'exclude similar characters', 'password generator DSGVO', 'diceware vs random', 'passwort generator DACH', 'password length security', 'passwort generator open source', 'DSGVO', 'Web Crypto API', 'PWA', 'offline', 'client-seitig', 'Datenschutz', 'Sicherheit'],
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
    languages: {
      'de': '/de',
      'de-AT': '/de-AT', 
      'de-CH': '/de-CH',
      'en': '/en',
    },
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
    title: 'PassMaster – Passwort Generator offline, open-source | DSGVO-konform',
    description: 'Kostenlos, offline, client-side: Erstelle sichere Passwörter mit PassMaster. Transparent, DSGVO-konform, Open-Source für maximale Sicherheit.',
    url: '/',
    siteName: 'PassMaster',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PassMaster - Sicherer Passwort Generator',
      },
    ],
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PassMaster – Passwort Generator offline, open-source',
    description: 'Kostenlos, offline, client-side: Erstelle sichere Passwörter mit PassMaster. Transparent, DSGVO-konform, Open-Source.',
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
    <html lang="de" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* hreflang Support */}
        <link rel="alternate" hrefLang="de" href="/" />
        <link rel="alternate" hrefLang="de-DE" href="/" />
        <link rel="alternate" hrefLang="de-AT" href="/de-AT" />
        <link rel="alternate" hrefLang="de-CH" href="/de-CH" />
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="x-default" href="/" />
        
        {/* Content Security Policy */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'; font-src 'self'; object-src 'none'; media-src 'self'; frame-src 'none';" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), interest-cohort=()" />
        
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
        
        {/* Enhanced JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "PassMaster Passwort Generator",
                "description": "100% client-seitiger, offline-fähiger, PWA Passwort Generator. Kostenlos, Open-Source, DSGVO-konform für maximale Sicherheit und Datenschutz.",
                "applicationCategory": "SecurityApplication",
                "operatingSystem": "Web, PWA",
                "featureList": [
                  "Web Crypto API für kryptografische Sicherheit",
                  "offline-fähig mit Service Worker",
                  "exclude similar characters Funktion",
                  "open-source und auditierbar",
                  "keine Serverübertragung",
                  "DSGVO-konform",
                  "Client-seitige Verschlüsselung",
                  "Progressive Web App (PWA)"
                ],
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "EUR"
                },
                "isAccessibleForFree": true,
                "url": process.env.NEXT_PUBLIC_SITE_URL || "https://passmaster.app",
                "author": {
                  "@type": "Organization",
                  "name": "PassMaster"
                },
                "softwareVersion": "1.0.0",
                "license": "MIT",
                "downloadUrl": process.env.NEXT_PUBLIC_SITE_URL || "https://passmaster.app",
                "installUrl": process.env.NEXT_PUBLIC_SITE_URL || "https://passmaster.app",
                "screenshot": [
                  (process.env.NEXT_PUBLIC_SITE_URL || "https://passmaster.app") + "/screenshots/desktop.png",
                  (process.env.NEXT_PUBLIC_SITE_URL || "https://passmaster.app") + "/screenshots/mobile.png"
                ],
                "keywords": "passwort generator, offline, client-side, DSGVO, Web Crypto API, PWA, open source, sicherheit, datenschutz"
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "PassMaster",
                "url": process.env.NEXT_PUBLIC_SITE_URL || "https://passmaster.app",
                "logo": {
                  "@type": "ImageObject",
                  "url": (process.env.NEXT_PUBLIC_SITE_URL || "https://passmaster.app") + "/icons/icon-512.png",
                  "width": "512",
                  "height": "512"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "email": "contact@passmaster.app",
                  "contactType": "customer service"
                },
                "foundingDate": "2024",
                "description": "Open-Source Passwort Generator für maximale Sicherheit und Datenschutz"
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "PassMaster",
                "url": process.env.NEXT_PUBLIC_SITE_URL || "https://passmaster.app",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": (process.env.NEXT_PUBLIC_SITE_URL || "https://passmaster.app") + "/?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                },
                "author": {
                  "@type": "Organization",
                  "name": "PassMaster"
                }
              }
            ])
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
