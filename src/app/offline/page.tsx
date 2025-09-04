"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Wifi, 
  WifiOff, 
  Download, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Smartphone,
  Monitor
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Passwort Generator offline | PWA PassMaster',
  description: 'Testen Sie unseren PWA Password Generator offline, komplett client-side – Service Worker, ohne Tracking. Installation und Nutzung ohne Internet.',
  keywords: ['passwort generator offline', 'PWA', 'Service Worker', 'offline nutzung', 'app installation', 'client-side', 'DSGVO'],
  openGraph: {
    title: 'Passwort Generator offline | PWA PassMaster',
    description: 'Testen Sie unseren PWA Password Generator offline, komplett client-side – Service Worker, ohne Tracking.',
  },
}

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(true)
  const [isInstallable, setIsInstallable] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // PWA install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setDeferredPrompt(null)
        setIsInstallable(false)
      }
    }
  }

  const offlineFeatures = [
    {
      icon: Shield,
      title: "Vollständige Offline-Funktionalität",
      description: "Alle Passwort-Generierungsfeatures funktionieren ohne Internetverbindung. Service Worker sorgt für lokale Verfügbarkeit."
    },
    {
      icon: WifiOff,
      title: "Keine Datenübertragung",
      description: "100% client-seitige Verarbeitung. Ihre Passwörter verlassen niemals Ihr Gerät, auch nicht im Online-Modus."
    },
    {
      icon: Download,
      title: "PWA Installation",
      description: "Installieren Sie PassMaster als native App. Funktioniert auf Desktop, Tablet und Smartphone."
    }
  ]

  const installSteps = [
    {
      step: 1,
      title: "Browser-Installation",
      description: "Klicken Sie auf 'App installieren' in der Adressleiste oder verwenden Sie den Button unten."
    },
    {
      step: 2,
      title: "Offline-Test",
      description: "Deaktivieren Sie Ihre Internetverbindung und testen Sie die Passwort-Generierung."
    },
    {
      step: 3,
      title: "App-Icon",
      description: "PassMaster erscheint als App-Icon auf Ihrem Home-Screen oder in der App-Liste."
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary-100 dark:bg-primary-900/20 rounded-full">
              {isOnline ? (
                <Wifi className="h-12 w-12 text-primary-600" />
              ) : (
                <WifiOff className="h-12 w-12 text-primary-600" />
              )}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Offline Passwort Generator (PWA)
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Installieren und nutzen Sie PassMaster komplett offline. Service Worker und lokale Speicherung für maximale Unabhängigkeit.
          </p>

          {/* Connection Status */}
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
            isOnline 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
              : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
          }`}>
            {isOnline ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Online - Bereit für Installation
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 mr-2" />
                Offline-Modus aktiv
              </>
            )}
          </div>
        </motion.div>

        {/* Install Button */}
        {isInstallable && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            <button
              onClick={handleInstallClick}
              className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>PassMaster als App installieren</span>
            </button>
          </motion.div>
        )}

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Service Worker & Installation | FAQ | Sicherheit
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {offlineFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="card text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-full">
                    <feature.icon className="h-8 w-8 text-primary-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Installation Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            PWA Installation in 3 Schritten
          </h2>
          
          <div className="space-y-6">
            {installSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start space-x-4 card"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Platform Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Plattform-Unterstützung
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card text-center">
              <Monitor className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Desktop Browser
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Chrome, Firefox, Safari, Edge - Alle modernen Browser unterstützen PWA-Installation
              </p>
            </div>
            
            <div className="card text-center">
              <Smartphone className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Mobile Geräte
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                iOS Safari, Android Chrome - Installation über "Zum Home-Bildschirm hinzufügen"
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Offline FAQ
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Wie installiere ich PassMaster als PWA?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Bei unterstützten Browsern erscheint automatisch ein Installations-Symbol in der Adressleiste. 
                Alternativ verwenden Sie den "App installieren" Button auf dieser Seite.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Welche Offline-Features sind verfügbar?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Alle Hauptfunktionen: Passwort-Generierung, Anpassung der Parameter, Entropie-Berechnung, 
                und Kopieren in die Zwischenablage funktionieren vollständig offline.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Was wird lokal gespeichert?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Nur die App-Dateien (HTML, CSS, JavaScript) werden im Browser-Cache gespeichert. 
                Keine Passwörter oder persönlichen Daten werden jemals gespeichert.
              </p>
            </div>
          </div>
        </motion.div>

        {/* JSON-LD for FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Wie installiere ich PassMaster als PWA?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Bei unterstützten Browsern erscheint automatisch ein Installations-Symbol in der Adressleiste. Alternativ verwenden Sie den 'App installieren' Button."
                  }
                },
                {
                  "@type": "Question",  
                  "name": "Welche Offline-Features sind verfügbar?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Alle Hauptfunktionen: Passwort-Generierung, Anpassung der Parameter, Entropie-Berechnung, und Kopieren funktionieren vollständig offline."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Was wird lokal gespeichert?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Nur App-Dateien werden im Browser-Cache gespeichert. Keine Passwörter oder persönlichen Daten werden jemals gespeichert."
                  }
                }
              ]
            })
          }}
        />
      </div>
    </div>
  )
}