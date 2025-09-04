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
      title: "Complete Offline Functionality",
      description: "All password generation features work without internet connection. Service Worker ensures local availability."
    },
    {
      icon: WifiOff,
      title: "No Data Transmission",
      description: "100% client-side processing. Your passwords never leave your device, even in online mode."
    },
    {
      icon: Download,
      title: "PWA Installation",
      description: "Install PassMaster as a native app. Works on desktop, tablet and smartphone."
    }
  ]

  const installSteps = [
    {
      step: 1,
      title: "Browser Installation",
      description: "Click 'Install App' in the address bar or use the button below."
    },
    {
      step: 2,
      title: "Offline Test",
      description: "Disable your internet connection and test password generation."
    },
    {
      step: 3,
      title: "App Icon",
      description: "PassMaster appears as an app icon on your home screen or in the app list."
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
            Offline Password Generator (PWA)
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Install and use PassMaster completely offline. Service Worker and local storage for maximum independence.
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
                Online - Ready for Installation
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 mr-2" />
                Offline Mode Active
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
              <span>Install PassMaster as App</span>
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
            Service Worker & Installation | FAQ | Security
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
            PWA Installation in 3 Steps
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
            Platform Support
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card text-center">
              <Monitor className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Desktop Browser
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Chrome, Firefox, Safari, Edge - All modern browsers support PWA installation
              </p>
            </div>
            
            <div className="card text-center">
              <Smartphone className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Mobile Devices
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                iOS Safari, Android Chrome - Installation via "Add to Home Screen"
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
                How do I install PassMaster as a PWA?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                On supported browsers, an installation icon automatically appears in the address bar. 
                Alternatively, use the "Install App" button on this page.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What offline features are available?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                All main functions: password generation, parameter customization, entropy calculation, 
                and copying to clipboard work completely offline.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What is stored locally?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Only app files (HTML, CSS, JavaScript) are stored in the browser cache. 
                No passwords or personal data are ever stored.
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
                  "name": "How do I install PassMaster as a PWA?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "On supported browsers, an installation icon automatically appears in the address bar. Alternatively, use the 'Install App' button."
                  }
                },
                {
                  "@type": "Question",  
                  "name": "What offline features are available?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "All main functions: password generation, parameter customization, entropy calculation, and copying work completely offline."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is stored locally?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Only app files are stored in the browser cache. No passwords or personal data are ever stored."
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
